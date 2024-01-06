import { AppService } from './app.service'
import { ClientEvents } from './enums/ClientEvents.enum'
import { ServerEvents } from './enums/serverEvents.enum'

export class AppController {
	private appService: AppService

	constructor(appService: AppService) {
		this.appService = appService

		AppService.onServer(ServerEvents.TEST, (data: any) => {
			AppService.emitServer(ClientEvents.TEST, "123")
		})
	}
}