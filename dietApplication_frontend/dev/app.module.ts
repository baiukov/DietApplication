import { AppController } from './app.controller'
import { AppService } from './app.service'

export class AppModule {

	constructor() {
		const appService = new AppService()
		new AppController(appService)

		this.initModules()
	}

	private initModules = () => {

	}
}