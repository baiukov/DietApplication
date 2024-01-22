import { AppService } from '../app.service'
import { ServerEvents } from '../enums/ServerEvents.enum'

export class DietPlanService {

	public getPlans = (userID: string) => {
		AppService.emitServer(ServerEvents.GetPlans, [userID])
	}

	public setPlans = (plans: Array<Array<Record<string, string>>>) => {

		const container = $(".plans")

		for (let i = 0; i < plans.length; i++) {

			const currentDay = plans[i];

			const article = document.createElement("article")
			$(article).addClass("day-plan")	
	
			const title = document.createElement("H3")
			$(title).addClass("day-title")
				.text("Day " + (i + 1))

			$(article).append(title)	

			for (let j = 0; j < currentDay.length; j++) {

				const currentCourse = currentDay[j]
				const courseName = currentCourse.key;
				const food = currentCourse.value;

				const section = document.createElement("section")
				$(section).addClass("meal")
				.attr("id", courseName)

				const subtitile = document.createElement("h4")
				$(subtitile).text(courseName)
				
				const ul = document.createElement("ul")
				const li = document.createElement("li")
				$(li).text(food)
				$(ul).append(li)
				
				$(section).append(subtitile, ul)

				$(article).append(section)

			}

			$(container).append(article)
		}
	}

	


}