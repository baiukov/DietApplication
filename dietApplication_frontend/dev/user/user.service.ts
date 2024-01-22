import { AppService } from '../app.service'
import { ServerEvents } from '../enums/ServerEvents.enum'

/*
	Třída UserService - je služba uživatelů, která se zabývá zpracováním logiky uživatelů
*/
export class UserService {

	private userData: Record<string, string | number> = {}

	constructor () {
		this.watch();
	}

	public watch = () => {
		$("#registerForm").on("submit", () => {
			this.userData.email = $("#newEmail").val() as string
			this.userData.password = $("#newPassword").val() as string
		})

		$("#registerForm2").on("submit", () => {

			if (!this.userData.email) return;

			const gender = $("#gender").val() as string
			const height = $("#height").val() as string
			const weight = $("#weight").val() as string
			const dateOfBirth = $("#dateOfBirth").val() as string

			AppService.emitServer(
				ServerEvents.RegisterUser, 
				[
					this.userData.email,
					this.userData.password,
					gender,
					height,
					weight,
					dateOfBirth
				]
			)
		})
	}

}
