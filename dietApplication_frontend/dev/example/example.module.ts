import { ExampleController } from './example.controller'
import { ExampleService } from './example.service'

/*
	Třída ExampleModule - je třída modulu příkladu, která se zabývá vytvařením služby a správce.
*/
export class ExampleModule {

	constructor() {
		// vytvoří novou službu pro příklad
		const exampleService = new ExampleService()

		// vytvoří nového správce příkladové služby
		new ExampleController(exampleService)
	}

}