import { UserController } from './user.controller'
import { UserService } from './user.service'

export class UserModule {

	constructor() {
		const userService = new UserService()
		new UserController(userService)

	}

}