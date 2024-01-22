import { AppService } from '../app.service'
import { ServerEvents } from '../enums/ServerEvents.enum'
import { UserService } from './user.service'

export class UserController {

	private userService: UserService

	constructor(userService: UserService) {
		this.userService = userService

		AppService.onServer(ServerEvents.LoginUser, (userID: string) => {
			this.userService.login(userID)
		})
	}

}