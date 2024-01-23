package vse.team.dietapplication_backend.dietPlan;

import org.apache.hc.client5.http.classic.methods.HttpPost;
import org.apache.hc.client5.http.impl.classic.CloseableHttpClient;
import org.apache.hc.client5.http.impl.classic.HttpClients;
import org.apache.hc.core5.http.io.entity.EntityUtils;
import org.apache.hc.core5.http.io.entity.StringEntity;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.stereotype.Component;
import vse.team.dietapplication_backend.courses.CourseEntity;
import vse.team.dietapplication_backend.days.DayEntity;
import vse.team.dietapplication_backend.food.FoodEntity;
import vse.team.dietapplication_backend.user.UserEntity;
import vse.team.dietapplication_backend.user.UserRepository;

import java.io.IOException;
import java.io.InputStream;
import java.time.LocalDate;
import java.util.*;

/*
 * Třída DietPlanService - je třída služby plánů, která se zabývá zpracováním jejích logiky.
 *
 * @author Andrei Kuznetsov
 */
@Component

public class DietPlanService {

    private String apiKey;

    public DietPlanService() {
        this.loadConfig();
    }

    private void loadConfig() {
        Properties prop = new Properties();
        try (InputStream input = getClass().getClassLoader().getResourceAsStream("gptConfiguration.properties")) {
            if (input == null) {
                System.out.println("Sorry, unable to find gptConfiguration.properties");
                return;
            }
            // Load the properties file
            prop.load(input);
            // Get the property value and print it out
            this.apiKey = prop.getProperty("apiKey");
        } catch (IOException ex) {
            ex.printStackTrace();
        }
    }


    public String getPlan(String userInput) {

        try (CloseableHttpClient httpClient = HttpClients.createDefault()) {
            HttpPost request = new HttpPost("https://api.openai.com/v1/engines/ft:babbage-002:personal::8imW80zf/completions");
            request.setHeader("Authorization", "Bearer " + apiKey);
            request.setHeader("Content-Type", "application/json");

            String jsonBody = "{\"prompt\": \"" + userInput + "\", \"max_tokens\": 100}";
            request.setEntity(new StringEntity(jsonBody));

            String responseString = httpClient.execute(request, httpResponse ->
                    EntityUtils.toString(httpResponse.getEntity()));

            return responseString;

        } catch (Exception e) {
            return e.toString();
        }
    }

    public String extractDescription(String response) {
        return extractPart(response, "description:", "meal_plan:");
    }

    public Map<String, String> extractMealPlan(String response) {
        String mealPlanStr = extractPart(response, "meal_plan:", "notes:");
        Map<String, String> mealPlan = new HashMap<>();

        if (mealPlanStr != null && !mealPlanStr.isEmpty()) {
            mealPlan.put("breakfast", extractMeal(mealPlanStr, "breakfast:", "lunch:"));
            mealPlan.put("lunch", extractMeal(mealPlanStr, "lunch:", "dinner:"));
            mealPlan.put("dinner", extractMeal(mealPlanStr, "dinner:", "snacks:"));
            mealPlan.put("snacks", extractMeal(mealPlanStr, "snacks:", "}"));
        }
        return mealPlan;
    }

    public String extractNotes(String response) {
        String notes = extractPart(response, "notes:", ".");

        if (notes == null || notes.length() > 90) {
            return null;
        } else return notes;
    }

    private String extractPart(String response, String startDelimiter, String endDelimiter) {
        int startIndex = response.indexOf(startDelimiter);

        if (startIndex == -1) {
            return null;
        }

        startIndex += startDelimiter.length();
        int endIndex = (endDelimiter != null) ? response.indexOf(endDelimiter, startIndex) : response.length();

        if (endIndex == -1) {
            endIndex = response.length();
        }
        return response.substring(startIndex, endIndex).trim();
    }

    private String extractMeal(String mealPlanStr, String mealType, String nextMealType) {
        int startIndex = mealPlanStr.indexOf(mealType);

        if (startIndex == -1) {
            return ""; // Meal type not found
        }

        startIndex += mealType.length();

        int endIndex = (nextMealType != null) ? mealPlanStr.indexOf(nextMealType, startIndex) : mealPlanStr.length();

        if (endIndex == -1 || endIndex < startIndex) {
            endIndex = mealPlanStr.length(); // Next meal type not found
        }

        String mealDetail = mealPlanStr.substring(startIndex, endIndex).trim();

        // "," deleteing
        if (mealDetail.endsWith(",")) {
            mealDetail = mealDetail.substring(0, mealDetail.length() - 1);
        }

        // Array structure deleting
        if (mealDetail.startsWith("[") && mealDetail.endsWith("]")) {
            mealDetail = mealDetail.substring(1, mealDetail.length() - 1);

        }

        return mealDetail.trim();
    }

    public JSONObject getJSONPlan(String userInput) {
        String gptResponse = this.getPlan(userInput);
        Map<String, String> mealPlan = this.extractMealPlan(gptResponse);
        String description = this.extractDescription(gptResponse);
        String notes = this.extractNotes(gptResponse);

        JSONObject jsonOutput = new JSONObject();
        jsonOutput.put("mealPlan", mealPlan);
        jsonOutput.put("description", description);
        jsonOutput.put("notes", notes);
        return jsonOutput;
    }

    public void save(String userID, String planName, JSONObject plan) {
        UserRepository userRepository = new UserRepository();
        UserEntity user = userRepository.getById(userID);
        // ! if (user == null) return;

        DietRepository dietRepository = new DietRepository();
        DietEntity dietPlan = new DietEntity();
        String description = (String) plan.get("description");
        JSONObject mealPlan = (JSONObject) plan.get("mealPlan");

//        Map<String, String> courses;
//        if (mealPlan != null) {
//            courses = (Map<String, String>) mealPlan;
//            System.out.println(courses);
//        }

//        System.out.println("courses::   " + courses);

        dietPlan.setName(planName);
        dietPlan.setDescription(description);
        dietPlan.setUser(user);
        dietRepository.deleteFirstDietPlanByUser(userID);
        dietRepository.save(dietPlan);

        DayEntity day = new DayEntity();
        day.setPlan(dietPlan);
        dietRepository.save(day);

        String[] coursesNames = new String[]{"breakfast", "lunch", "dinner"};
        for (String courseName : coursesNames) {
            CourseEntity course = new CourseEntity();
            course.setName(courseName);
            course.setDay(day);
            dietRepository.save(course);

            FoodEntity food = new FoodEntity();
            food.setName(mealPlan.get(courseName).toString());
            food.setCourse(course);
            dietRepository.save(food);
        }

//        for (Map.Entry<String, String> entry : courses.entrySet()) {
//            String courseName = entry.getKey();
//            CourseEntity course = new CourseEntity();
//            course.setName(courseName);
//            course.setDay(day);
//            dietRepository.save(course);
//
//            FoodEntity food = new FoodEntity();
//            food.setName(entry.getValue());
//            food.setCourse(course);
//            dietRepository.save(food);
//        }

    }

    public JSONArray getPlans(String userID) {
        DietRepository dietRepository = new DietRepository();
        UserRepository userRepository = new UserRepository();
        UserEntity user = userRepository.getById(userID);
        System.out.println("Get plan:" + user.getId());

        List<DietEntity> plans = dietRepository.getByUser(user);
        DietEntity plan = plans.get(0);

        List<DayEntity> days = dietRepository.getDaysByPlan(plan);
        System.out.println(days);
        JSONArray daysArray = new JSONArray();
        JSONArray mealPlans = new JSONArray();
        for (DayEntity day : days) {
            List<CourseEntity> courses = dietRepository.getCourseByDay(day);
            for (CourseEntity course : courses){
                JSONObject courseFoodPair = new JSONObject();
                String courseName = course.getName();
                FoodEntity food = dietRepository.getFoodByCourse(course).get(0);
                String foodName = food.getName();
                courseFoodPair.put(courseName, foodName);
                mealPlans.put(courseFoodPair);
            }
            daysArray.put(mealPlans);
        }

        return daysArray;
    }

}
