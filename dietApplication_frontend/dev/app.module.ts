import { AppService } from './app.service'
import { DietPlanModule } from './dietPlan/dietPlan.module'
import { UserModule } from './user/user.module'

/*
	Třída AppModule - je třída hlávního modulu aplikace, která se zabývá spuštením vedlejších modlů.
*/
export class AppModule {

	constructor() {
		// vytvoří službu aplikace
		new AppService()

		// spustí všechny vedlejší moduly
		this.initModules()
	}

	// metoda spuštění vedlejších modulů
	private initModules = () => {

		new DietPlanModule()
		new UserModule()
	}

}