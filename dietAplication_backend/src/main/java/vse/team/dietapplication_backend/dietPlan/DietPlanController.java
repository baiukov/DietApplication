package vse.team.dietapplication_backend.dietPlan;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vse.team.dietapplication_backend.utils.DataRequest;

import java.util.List;

/*
 * Třída DietPlanController - je třída správce plánů, která se zabývá operováním událostí.
 * Nejdřív nastaví příslušné mapování, pak při vyvolání některého z těch mapování, spustí příslušnou metodu ze služby,
 * vygeneruje a pošle odpověď
 *
 * @author Andrei Kuznetsov
 */
@RestController
@RequestMapping("/api/dietPlan")
public class DietPlanController {
    private DietPlanService dietPlanService;
    public DietPlanController (DietPlanService dietPlanService) {
        this.dietPlanService = dietPlanService;
    }
    @PostMapping("/plan")
    public ResponseEntity<JSONObject> getPlan(@RequestBody DataRequest requestData) {
        try {

            List<String> inputData = requestData.getData();

            String userID = inputData.get(0);
            String planName = inputData.get(1);
            String userInput = "user_profile:" + inputData.get(2);


            JSONObject plan = this.dietPlanService.getJSONPlan(userInput);

            this.dietPlanService.save(userID, planName, plan);

            return ResponseEntity.ok(plan);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);
        }
    }

    @PostMapping("/getPlan")
    public String getPlansByUserID(@RequestBody DataRequest requestData) {

            System.out.println("Get Plan");
            List<String> inputData = requestData.getData();
            String userID = inputData.get(0);
//            String response = ResponseEntity.ok(this.dietPlanService.getPlans(userID)).toString();
//            System.out.println(response);
            JSONArray a = this.dietPlanService.getPlans(userID);
            return a.toString();


    }
}
