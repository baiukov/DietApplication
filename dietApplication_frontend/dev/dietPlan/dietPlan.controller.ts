import { AppService } from '../app.service';
import { Events } from '../enums/Events.enum';
import { ServerEvents } from '../enums/ServerEvents.enum';
import { DietPlanService } from './dietPlan.service';

export class DietPlanController {
	private dietPlanService: DietPlanService;

	constructor(dietPlanService: DietPlanService) {
		this.dietPlanService = dietPlanService;

		AppService.on(Events.GetPlans, (userID: string) => {
			this.dietPlanService.getPlans(userID);
		});

		AppService.onServer(ServerEvents.GetPlans, (plan: any) => {
			console.log('Plan controller:', plan);
			this.dietPlanService.setPlans(plan);
		});
	}
}
