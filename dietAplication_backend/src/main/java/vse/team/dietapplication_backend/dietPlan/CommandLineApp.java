package vse.team.dietapplication_backend.dietPlan;

import java.util.Map;
import java.util.Scanner;

import org.json.JSONObject;
import vse.team.dietapplication_backend.dietPlan.DietPlanService;

public class CommandLineApp {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        DietPlanService dietPlanService = new DietPlanService();

        Map<String, String> mealPlan;
        while (true) {
            System.out.println("Enter your prompt (type 'exit' to quit):");
            String userInput = scanner.nextLine();

            if ("exit".equalsIgnoreCase(userInput)) {
                break;
            }

            String gptResponse = dietPlanService.getPlan(userInput);
            mealPlan = dietPlanService.extractMealPlan(gptResponse);

            String breakfast = mealPlan.get("breakfast");
            String lunch = mealPlan.get("lunch");
            String snacks = mealPlan.get("snacks");
            String dinner = mealPlan.get("dinner");


             String description = dietPlanService.extractDescription(gptResponse);

            String notes = dietPlanService.extractNotes(gptResponse);

//            System.out.println("GPT response: " + gptResponse);
//            System.out.println("Breakfast: " + breakfast + "\n" + "Lunch: " + lunch + "\n" + "Snacks: " + snacks + "\n" +"Dinner: " + dinner);
//            System.out.println("Description response: " + description);
//            System.out.println("Notes response: " + notes);

            JSONObject jsonOutput = new JSONObject();
            jsonOutput.put("gptResponse", gptResponse);
            jsonOutput.put("mealPlan", mealPlan);
            jsonOutput.put("description", description);
            jsonOutput.put("notes", notes);

            System.out.println(jsonOutput.toString(4));
        }
    }
}
