import { AppService } from '../app.service'
import { ServerEvents } from '../enums/ServerEvents.enum'

/*
	Třída UserService - je služba uživatelů, která se zabývá zpracováním logiky uživatelů
*/
export class UserService {

	constructor () {
		this.watch();
	}

	public watch = () => {
		$("#registerForm").on("submit", () => {
			const email = $("#newEmail").val() as string
			const password = $("#newPassword").val() as string

			const userData = {
				email: email,
				password: password, 
			}

			sessionStorage.setItem("userData", JSON.stringify(userData))
		})

		$("#registerForm2").on("submit", () => {
			const userDataString = sessionStorage.getItem("userData")
			
			if (!userDataString) return
			const userData = JSON.parse(userDataString)

			const gender = $("#gender").val() as string
			const height = $("#height").val() as string
			const weight = $("#weight").val() as string
			const dateOfBirth = $("#dateOfBirth").val() as string

			AppService.emitServer(
				ServerEvents.RegisterUser, 
				[
					userData.email,
					userData.password,
					gender,
					height,
					weight,
					dateOfBirth
				]
			)
		})

		$("#loginForm").on("submit", () => {

			const email = $("#email").val()
			const password = $("#password").val()

			AppService.emitServer(
				ServerEvents.LoginUser,
				[
					email,
					password
				]
			)
		})

		$("#updateForm").on("submit", () => {

			const toUpdate = {
				"gender": $("#gender").val() || undefined,
				"height": $("#height").val() || undefined,
				"weight": $("#weight").val() || undefined,
				"date": $("#date").val() || undefined,
				"alergies": $("#alergies").val() || undefined,
			}

			Object.entries(toUpdate).forEach((entry: Array<any>) => {
				const key = entry[0]
				const value = entry[1]

				if (!value) return;

				const userID = sessionStorage.getItem("userID")
				if (!userID) return;

				console.log(userID)
				AppService.emitServer(ServerEvents.UpdateUser, [userID, key, value]);
			})

		})
	}

	public login = (userID: string) => {
		if (!userID) return;
		sessionStorage.setItem("userID", userID)
		window.location.href = './main/index.html'
	}

}
