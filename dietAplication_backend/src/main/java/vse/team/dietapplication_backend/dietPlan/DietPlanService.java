package vse.team.dietapplication_backend.dietPlan;

import org.apache.hc.client5.http.classic.methods.HttpPost;
import org.apache.hc.client5.http.impl.classic.CloseableHttpClient;
import org.apache.hc.client5.http.impl.classic.HttpClients;
import org.apache.hc.core5.http.io.entity.EntityUtils;
import org.apache.hc.core5.http.io.entity.StringEntity;
import org.springframework.stereotype.Component;

/*
 * Třída DietPlanService - je třída služby plánů, která se zabývá zpracováním jejích logiky.
 *
 * @author Andrei Kuznetsov
 */
@Component

public class DietPlanService {
    //TODO - move to the conf
    private String apiKey = "";

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

}
