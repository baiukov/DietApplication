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
			const currentEvent = parseInt(currentServerEventName) as ServerEvents
			if (currentEvent !== eventName) return
			// @ts-ignore
			this.serverEvents[currentServerEventName](data)
		})
	}

	public static emitServer = (eventName: ServerEvents, data: any) => {
		const eventData = {
			key: eventName,
			value: data
		}
		// @ts-ignore
		AndroidInterface.emitServer(JSON.stringify(eventData))
	}

}