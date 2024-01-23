import { AppService } from '../app.service';
import { ServerEvents } from '../enums/ServerEvents.enum';

export class DietPlanService {
	constructor() {
		this.getPlans(sessionStorage.getItem('userID') as string);
	}

	public getPlans = (userID: string) => {
		AppService.emitServer(ServerEvents.GetPlans, [userID]);
	};

	public setPlans = (plansStr: string) => {
		console.log('Plans: ' + plansStr);
		const container = $('.plans');
		container.empty(); // Clear existing content
		const plans = JSON.parse(plansStr);
		let dayIndex = 0;
		plans.forEach((currentDay: any) => {
			console.log(currentDay);
			const dayArticle = $('<article>').addClass('day-plan');
			const title = $(`<h3>`)
				.addClass('day-title')
				.text(`Day ${dayIndex + 1}`);
			dayIndex++;
			dayArticle.append(title);
			currentDay.forEach((dayObject: any) => {
				Object.entries(dayObject).forEach(([key, value]) => {
					const section = $('<section>').addClass('meal').attr('id', key);
					const subtitle = $('<h4>').text(key);
					const ul = $('<ul>');
					const li = $('<li>').text(value as string);

					ul.append(li);
					section.append(subtitle, ul);
					dayArticle.append(section);
				});

				container.append(dayArticle);
			});
		});
	};
}
