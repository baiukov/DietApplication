import { AppModule } from './app.module'
import { AppService } from './app.service'

// @ts-ignore
window.getData = (dataType: any, data: any) => {
	AppService.emitClient(dataType, data)
}

// @ts-ignore
window.sendData = (dataType: any, data: any) => {
	// @ts-ignore
	AndroidInterface.sendDataToAndroid(dataType, data)
}

new AppModule()