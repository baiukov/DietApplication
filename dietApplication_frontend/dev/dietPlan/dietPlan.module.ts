import { DietPlanController } from './dietPlan.controller'
import { DietPlanService } from './dietPlan.service'

export class DietPlanModule {

	constructor() {
		const dietPlanService = new DietPlanService();
		new DietPlanController(dietPlanService)
	}
}