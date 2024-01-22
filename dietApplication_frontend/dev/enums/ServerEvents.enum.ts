// objekt obsahující události pro komunikaci se serverem
export enum ServerEvents {
	SendAge = "user/sendAge",
	RegisterUser = 'user/signup',
	LoginUser = 'user/login',
	UpdateUser = 'user/update',
	GetPlan = 'dietPlan/plan',
	GetPlans = 'dietPlan/getPlan'
}