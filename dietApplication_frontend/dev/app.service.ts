import { Events } from './enums/Events.enum'
import { ServerEvents } from './enums/ServerEvents.enum'

/*
	Třída AppService - je hlávní služba aplikace, která se zabývá zpracováním komunikaci jak uvnitř frontendový aplikace, 
	tak i vnějšími komunkacemi s klientovou aplikaci
*/
export class AppService {
	// objekt, ve kterém se uloží zaregistrováné lokální událostí 
	private static events: Record<Events, Function> = {}
	
	// objekt, ve kterém se uloží vnější serverové událostí
	private static serverEvents: Record<string, Function> = {}

	// metoda registrace lokální událostí
	public static on = (eventName: Events, func: Function) => {
		// nadefenuje klíč v podobě názvu událostí a hodnotu v podbe spuštěnou funkci
		Object.defineProperty(this.events, eventName, { value: func })
	}

	// metoda vyvolání lokální údalostí
	public static emit = (eventName: Events, data: any) => {
		// získá všechny klíče existujícího objektu lokálních událostí
		Object.getOwnPropertyNames(this.events).forEach((currentEventName) => {
			// převede do typu enum z třídy událostí 
			const currentEvent = parseInt(currentEventName) as Events
			// pokud je současný název eventu je shodný s vyvoláným, vyvolá příslušnou funkci s poskytnutými daty
			if (currentEvent !== eventName) return
			this.events[currentEvent](data)
		})
	}

	// metoda registrace serverové událostí
	public static onServer = (eventName: ServerEvents, func: Function) => {
		// nadefenuje klíč v podobě názvu událostí a hodnotu v podbe spuštěnou funkci
		Object.defineProperty(this.serverEvents, eventName, { value: func })
	}

	// metoda vyvolání údalostí ze serveru
	public static emitClient = (eventName: ServerEvents, data: any) => {
		// získá všechny klíče existujícího objektu serverových událostí
		Object.getOwnPropertyNames(this.serverEvents).forEach((currentServerEventName) => {
			// pokud je současný název eventu je shodný s vyvoláným, vyvolá příslušnou funkci s poskytnutými daty
			if (currentServerEventName !== eventName) return
			this.serverEvents[currentServerEventName](data)
		})
	}

	// metoda pro posílaní eventu na server
	public static emitServer = (eventName: ServerEvents, data: any) => {
		// zabalí poskytnutá data do nutné podoby
		const eventData = {
			data: data,
		}

		// vyvolá v poskytnutém Kotlinovou aplikací objektu (mostě) metodu pro posílání dat na server
		// převede vytvořený objekt v řádek typu JSON
		// @ts-ignore
		AndroidInterface.emitServer(eventName, JSON.stringify(eventData))
	}

}