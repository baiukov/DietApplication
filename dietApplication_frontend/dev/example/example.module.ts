import { ExampleController } from './example.controller'
import { ExampleService } from './example.service'

export class ExampleModule {

	constructor() {
		const exampleService = new ExampleService()
		new ExampleController(exampleService)
	}

}