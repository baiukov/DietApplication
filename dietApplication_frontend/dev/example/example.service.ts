import { AppService } from '../app.service'
import { ServerEvents } from '../enums/ServerEvents.enum'

export class ExampleService {

	constructor() {
		$("#submit").click(() => {
			const yearOfBirth = $("#ageInput").val()
			AppService.emitServer(ServerEvents.SENDAGE, [yearOfBirth, yearOfBirth])
		})
	}

}