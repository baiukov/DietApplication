import { AppModule } from './app.module'
import { AppService } from './app.service'
import { ServerEvents } from './enums/ServerEvents.enum'

/* Jelikož minifikujeme všechen js kód, včetně názvů proměnných k nepoznaní,
* potřebujeme pro komunikování s Kotlinem, resp. pro získaní z něho dat,
* nějakou předem nastavenou globální metodu s konstantním názvem. Pravě proto
* do globálního objektu window, který je součastí jakéhokoliv prohlížeče je,
* je nastavená tato metoda, která neudělá nic jiného, než předá data k zpracovnání aplikaci
*/
// @ts-ignore
window.getData = (eventName: string, data: any) => {
	AppService.emitClient(eventName as ServerEvents, data)
}

// spuštění hlávního modulu aplikace
new AppModule()