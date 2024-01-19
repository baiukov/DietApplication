package vse.team.dietapplication_backend.dietPlan;

import java.util.Scanner;
import vse.team.dietapplication_backend.dietPlan.DietPlanService;

public class CommandLineApp {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        DietPlanService dietPlanService = new DietPlanService();

        while (true) {
            System.out.println("Enter your prompt (type 'exit' to quit):");
            String userInput = scanner.nextLine();

            if ("exit".equalsIgnoreCase(userInput)) {
                break;
            }

            String response = dietPlanService.getPlan(userInput);
            System.out.println("Response from GPT-3.5: " + response);
        }
    }
}
