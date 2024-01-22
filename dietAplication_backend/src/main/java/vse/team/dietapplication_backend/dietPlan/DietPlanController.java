package vse.team.dietapplication_backend.dietPlan;

import org.json.JSONObject;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vse.team.dietapplication_backend.utils.DataRequest;

import java.util.List;
import java.util.Map;

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
            System.out.println("her");
            List<String> inputData = requestData.getData();

            String userID = inputData.get(0);
            String planName = inputData.get(1);
            String userInput = inputData.get(2);

            JSONObject plan = this.dietPlanService.getJSONPlan(userInput);

            this.dietPlanService.save(userID, planName, plan);

            System.out.println(plan);
            return ResponseEntity.ok(plan);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);
        }
    }

    @PostMapping("/getPlan")
    public ResponseEntity<JSONObject> getPlansByUserID(@RequestBody DataRequest requestData) {
        try {
            List<String> inputData = requestData.getData();

            String userID = inputData.get(0);

            return ResponseEntity.ok(this.dietPlanService.getPlans(userID));

        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);
        }
    }
}
