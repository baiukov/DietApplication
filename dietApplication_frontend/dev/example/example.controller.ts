import { AppService } from '../app.service'
import { ServerEvents } from '../enums/ServerEvents.enum'
import { ExampleService } from './example.service'

/*
	Třída ExampleService - je služba příkladu, která se zabývá zpracováním základní logiky příkladu
*/
export class ExampleController {
	private exampleService: ExampleService

	constructor(exampleService: ExampleService) {
		this.exampleService = exampleService

		// zare
		AppService.onServer(ServerEvents.SENDAGE, (age: string) => {
			this.exampleService.setAge(age)
		})
	}

}