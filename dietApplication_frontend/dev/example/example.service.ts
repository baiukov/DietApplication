import { AppService } from '../app.service'
import { ServerEvents } from '../enums/ServerEvents.enum'

/*
	Třída ExampleService - je služba příkladu, která se zabývá zpracováním základní logiky příkladu
*/
export class ExampleService {

	// metoda nastaví poslouhač událostí při kliknutí tlačitka
	constructor() {
		// nastavení poslouhače událostí kliknutí na tlačitko s id "submit"
		$("#submit").click(() => {
			// po kliknutí získá z elementu s id "ageInput" hodnotu
			const yearOfBirth = $("#ageInput").val()
			// vyvolá event posílání dat na server. Pro příklad posílá se pole s dvěma hodnoty
			AppService.emitServer(ServerEvents.SendAge, [yearOfBirth, yearOfBirth])
		})
	}

	// metoda nastaví věk na obrazovce
	public setAge = (age: string | number) => {
		// nastaví v elementu s id "age", textový řádek získané hodnoty
		$('#age').text(age)


	}

}