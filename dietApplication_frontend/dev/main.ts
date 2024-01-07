import { AppModule } from './app.module'
import { AppService } from './app.service'
import { ServerEvents } from './enums/ServerEvents.enum'

// @ts-ignore
window.getData = (eventName: string, data: any) => {
	AppService.emitClient(eventName as ServerEvents, data)
}

new AppModule()