import { AppService } from '../app.service'
import { ServerEvents } from '../enums/ServerEvents.enum'

/*
	Třída ExampleService - je služba příkladu, která se zabývá zpracováním základní logiky příkladu
*/
export class ExampleService {

	// metoda nastaví poslouhač událostí při kliknutí tlačitka
	constructor() {
		$("#submit").click(() => {
			const yearOfBirth = $("#ageInput").val()
			// vyvolá event posílání dat na server
			AppService.emitServer(ServerEvents.SENDAGE, [yearOfBirth, yearOfBirth])
		})
	}

	// metoda nastaví věk na obrazovce
	public setAge = (age: string | number) => {
		$('#age').text(age)
	}

}