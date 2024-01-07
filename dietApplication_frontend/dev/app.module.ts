import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ExampleModule } from './example/example.module'

export class AppModule {

	constructor() {
		const appService = new AppService()
		new AppController(appService)

		this.initModules()
	}

	private initModules = () => {
		new ExampleModule()
	}
}