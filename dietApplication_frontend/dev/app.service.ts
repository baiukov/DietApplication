import { Events } from './enums/Events.enum'
import { ServerEvents } from './enums/ServerEvents.enum'

export class AppService {
	private static events: Record<Events, () => {}> = {}
	private static serverEvents: Record<string, () => {}> = {}

	constructor() {

	}

	public static on = (eventName: Events, func: Function) => {
		Object.defineProperty(this.events, eventName, { value: func })
	}

	public static emit = (eventName: Events) => {
		Object.getOwnPropertyNames(this.events).forEach((currentEventName) => {
			const currentEvent = parseInt(currentEventName) as Events
			if (currentEvent !== eventName) return
			this.events[currentEvent]()
		})
	}

	public static onServer = (eventName: ServerEvents, func: Function) => {
		Object.defineProperty(this.serverEvents, eventName, { value: func })
	}

	public static emitClient = (eventName: ServerEvents, data: any) => {
		Object.getOwnPropertyNames(this.serverEvents).forEach((currentServerEventName) => {
			console.log(eventName == currentServerEventName)
			if (currentServerEventName !== eventName) return
			// @ts-ignore
			this.serverEvents[currentServerEventName](data)
		})
	}

	public static emitServer = (event: ServerEvents, data: any) => {
		const elements = event.split(":")
		const module = elements[0]
		const eventName = elements[1]

		const eventData = {
			data: data,
		}

		// @ts-ignore
		AndroidInterface.emitServer(module, eventName, JSON.stringify(eventData))
	}

}