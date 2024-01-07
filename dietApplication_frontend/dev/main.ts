import { AppModule } from './app.module'
import { AppService } from './app.service'

// @ts-ignore
window.getData = (dataType: any, data: any) => {
	//$('body').text(dataType + data)
	AppService.emitClient(dataType, data)
}

new AppModule()