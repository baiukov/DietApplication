import { AppService } from '../app.service'
import { ServerEvents } from '../enums/ServerEvents.enum'
import { ExampleService } from './example.service'

export class ExampleController {
	private exampleService: ExampleService

	constructor(exampleService: ExampleService) {
		this.exampleService = exampleService

		AppService.onServer(ServerEvents.SENDAGE, (age: string) => {
			$('#age').text(age)
		})
	}

}