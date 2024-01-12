package vse.team.dietapplication_backend.dietPlan;

import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/*
 * Třída DietPlanController - je třída správce plánů, která se zabývá operováním událostí.
 * Nejdřív nastaví příslušné mapování, pak při vyvolání některého z těch mapování, spustí příslušnou metodu ze služby,
 * vygeneruje a pošle odpověď
 *
 * @author Andrei Kuznetsov
 */
@RestController
@RequestMapping("/api")
public class DietPlanController {
    private DietPlanService dietPlanService;
    public DietPlanController (DietPlanService dietPlanService) {
        this.dietPlanService = dietPlanService;
    }
    @GetMapping("/plan")
    public String getPlan () {
       return dietPlanService.getPlan();

    }
}
