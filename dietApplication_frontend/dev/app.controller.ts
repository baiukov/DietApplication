import { AppService } from './app.service'

export class AppController {
	private appService: AppService

	constructor(appService: AppService) {
		this.appService = appService
	}
}