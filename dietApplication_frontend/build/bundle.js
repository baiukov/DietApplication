/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./dev/app.module.ts":
/*!***************************!*\
  !*** ./dev/app.module.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const app_service_1 = __webpack_require__(/*! ./app.service */ "./dev/app.service.ts");
const dietPlan_module_1 = __webpack_require__(/*! ./dietPlan/dietPlan.module */ "./dev/dietPlan/dietPlan.module.ts");
const user_module_1 = __webpack_require__(/*! ./user/user.module */ "./dev/user/user.module.ts");
/*
    Třída AppModule - je třída hlávního modulu aplikace, která se zabývá spuštením vedlejších modlů.
*/
class AppModule {
    constructor() {
        // metoda spuštění vedlejších modulů
        this.initModules = () => {
            new dietPlan_module_1.DietPlanModule();
            new user_module_1.UserModule();
        };
        // vytvoří službu aplikace
        new app_service_1.AppService();
        // spustí všechny vedlejší moduly
        this.initModules();
    }
}
exports.AppModule = AppModule;


/***/ }),

/***/ "./dev/app.service.ts":
/*!****************************!*\
  !*** ./dev/app.service.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, exports) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppService = void 0;
/*
    Třída AppService - je hlávní služba aplikace, která se zabývá zpracováním komunikaci jak uvnitř frontendový aplikace,
    tak i vnějšími komunkacemi s klientovou aplikaci
*/
class AppService {
}
exports.AppService = AppService;
_a = AppService;
// objekt, ve kterém se uloží zaregistrováné lokální událostí
AppService.events = {};
// objekt, ve kterém se uloží vnější serverové událostí
AppService.serverEvents = {};
// metoda registrace lokální událostí
AppService.on = (eventName, func) => {
    // nadefenuje klíč v podobě názvu událostí a hodnotu v podbe spuštěnou funkci
    Object.defineProperty(_a.events, eventName, { value: func });
};
// metoda vyvolání lokální údalostí
AppService.emit = (eventName, data) => {
    // získá všechny klíče existujícího objektu lokálních událostí
    Object.getOwnPropertyNames(_a.events).forEach(currentEventName => {
        // převede do typu enum z třídy událostí
        const currentEvent = parseInt(currentEventName);
        // pokud je současný název eventu je shodný s vyvoláným, vyvolá příslušnou funkci s poskytnutými daty
        if (currentEvent !== eventName)
            return;
        _a.events[currentEvent](data);
    });
};
// metoda registrace serverové událostí
AppService.onServer = (eventName, func) => {
    // nadefenuje klíč v podobě názvu událostí a hodnotu v podbe spuštěnou funkci
    Object.defineProperty(_a.serverEvents, eventName, { value: func });
};
// metoda vyvolání údalostí ze serveru
AppService.emitClient = (eventName, data) => {
    // získá všechny klíče existujícího objektu serverových událostí
    Object.getOwnPropertyNames(_a.serverEvents).forEach(currentServerEventName => {
        // pokud je současný název eventu je shodný s vyvoláným, vyvolá příslušnou funkci s poskytnutými daty
        console.log('App Service Check:', currentServerEventName, eventName, data);
        if (currentServerEventName !== eventName)
            return;
        _a.serverEvents[currentServerEventName](data);
    });
};
// metoda pro posílaní eventu na server
AppService.emitServer = (eventName, data) => {
    // zabalí poskytnutá data do nutné podoby
    const eventData = {
        data: data,
    };
    // vyvolá v poskytnutém Kotlinovou aplikací objektu (mostě) metodu pro posílání dat na server
    // převede vytvořený objekt v řádek typu JSON
    // @ts-ignore
    AndroidInterface.emitServer(eventName, JSON.stringify(eventData));
};


/***/ }),

/***/ "./dev/dietPlan/dietPlan.controller.ts":
/*!*********************************************!*\
  !*** ./dev/dietPlan/dietPlan.controller.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DietPlanController = void 0;
const app_service_1 = __webpack_require__(/*! ../app.service */ "./dev/app.service.ts");
const Events_enum_1 = __webpack_require__(/*! ../enums/Events.enum */ "./dev/enums/Events.enum.ts");
const ServerEvents_enum_1 = __webpack_require__(/*! ../enums/ServerEvents.enum */ "./dev/enums/ServerEvents.enum.ts");
class DietPlanController {
    constructor(dietPlanService) {
        this.dietPlanService = dietPlanService;
        app_service_1.AppService.on(Events_enum_1.Events.GetPlans, (userID) => {
            this.dietPlanService.getPlans(userID);
        });
        app_service_1.AppService.onServer(ServerEvents_enum_1.ServerEvents.GetPlans, (plan) => {
            console.log('Plan controller:', plan);
            this.dietPlanService.setPlans(plan);
        });
    }
}
exports.DietPlanController = DietPlanController;


/***/ }),

/***/ "./dev/dietPlan/dietPlan.module.ts":
/*!*****************************************!*\
  !*** ./dev/dietPlan/dietPlan.module.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DietPlanModule = void 0;
const dietPlan_controller_1 = __webpack_require__(/*! ./dietPlan.controller */ "./dev/dietPlan/dietPlan.controller.ts");
const dietPlan_service_1 = __webpack_require__(/*! ./dietPlan.service */ "./dev/dietPlan/dietPlan.service.ts");
class DietPlanModule {
    constructor() {
        const dietPlanService = new dietPlan_service_1.DietPlanService();
        new dietPlan_controller_1.DietPlanController(dietPlanService);
    }
}
exports.DietPlanModule = DietPlanModule;


/***/ }),

/***/ "./dev/dietPlan/dietPlan.service.ts":
/*!******************************************!*\
  !*** ./dev/dietPlan/dietPlan.service.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DietPlanService = void 0;
const app_service_1 = __webpack_require__(/*! ../app.service */ "./dev/app.service.ts");
const ServerEvents_enum_1 = __webpack_require__(/*! ../enums/ServerEvents.enum */ "./dev/enums/ServerEvents.enum.ts");
class DietPlanService {
    constructor() {
        this.getPlans = (userID) => {
            app_service_1.AppService.emitServer(ServerEvents_enum_1.ServerEvents.GetPlans, [userID]);
        };
        this.setPlans = (plansStr) => {
            console.log('Plans: ' + plansStr);
            const container = $('.plans');
            container.empty(); // Clear existing content
            const plans = JSON.parse(plansStr);
            let dayIndex = 0;
            plans.forEach((currentDay) => {
                console.log(currentDay);
                const dayArticle = $('<article>').addClass('day-plan');
                const title = $(`<h3>`)
                    .addClass('day-title')
                    .text(`Day ${dayIndex + 1}`);
                dayIndex++;
                dayArticle.append(title);
                currentDay.forEach((dayObject) => {
                    Object.entries(dayObject).forEach(([key, value]) => {
                        const section = $('<section>').addClass('meal').attr('id', key);
                        const subtitle = $('<h4>').text(key);
                        const ul = $('<ul>');
                        const li = $('<li>').text(value);
                        ul.append(li);
                        section.append(subtitle, ul);
                        dayArticle.append(section);
                    });
                    container.append(dayArticle);
                });
            });
        };
        this.getPlans(sessionStorage.getItem('userID'));
    }
}
exports.DietPlanService = DietPlanService;


/***/ }),

/***/ "./dev/enums/Events.enum.ts":
/*!**********************************!*\
  !*** ./dev/enums/Events.enum.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Events = void 0;
// Objekt obsahující lokální události pro frontend
var Events;
(function (Events) {
    Events[Events["SendUserData"] = 0] = "SendUserData";
    Events[Events["GetPlans"] = 1] = "GetPlans";
})(Events || (exports.Events = Events = {}));


/***/ }),

/***/ "./dev/enums/ServerEvents.enum.ts":
/*!****************************************!*\
  !*** ./dev/enums/ServerEvents.enum.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ServerEvents = void 0;
// objekt obsahující události pro komunikaci se serverem
var ServerEvents;
(function (ServerEvents) {
    ServerEvents["SendAge"] = "user/sendAge";
    ServerEvents["RegisterUser"] = "user/signup";
    ServerEvents["LoginUser"] = "user/login";
    ServerEvents["UpdateUser"] = "user/update";
    ServerEvents["GetPlan"] = "dietPlan/plan";
    ServerEvents["GetPlans"] = "dietPlan/getPlan";
})(ServerEvents || (exports.ServerEvents = ServerEvents = {}));


/***/ }),

/***/ "./dev/user/user.controller.ts":
/*!*************************************!*\
  !*** ./dev/user/user.controller.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserController = void 0;
const app_service_1 = __webpack_require__(/*! ../app.service */ "./dev/app.service.ts");
const ServerEvents_enum_1 = __webpack_require__(/*! ../enums/ServerEvents.enum */ "./dev/enums/ServerEvents.enum.ts");
class UserController {
    constructor(userService) {
        this.userService = userService;
        app_service_1.AppService.onServer(ServerEvents_enum_1.ServerEvents.LoginUser, (userID) => {
            this.userService.login(userID);
        });
    }
}
exports.UserController = UserController;


/***/ }),

/***/ "./dev/user/user.module.ts":
/*!*********************************!*\
  !*** ./dev/user/user.module.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserModule = void 0;
const user_controller_1 = __webpack_require__(/*! ./user.controller */ "./dev/user/user.controller.ts");
const user_service_1 = __webpack_require__(/*! ./user.service */ "./dev/user/user.service.ts");
class UserModule {
    constructor() {
        const userService = new user_service_1.UserService();
        new user_controller_1.UserController(userService);
    }
}
exports.UserModule = UserModule;


/***/ }),

/***/ "./dev/user/user.service.ts":
/*!**********************************!*\
  !*** ./dev/user/user.service.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserService = void 0;
const app_service_1 = __webpack_require__(/*! ../app.service */ "./dev/app.service.ts");
const Events_enum_1 = __webpack_require__(/*! ../enums/Events.enum */ "./dev/enums/Events.enum.ts");
const ServerEvents_enum_1 = __webpack_require__(/*! ../enums/ServerEvents.enum */ "./dev/enums/ServerEvents.enum.ts");
/*
    Třída UserService - je služba uživatelů, která se zabývá zpracováním logiky uživatelů
*/
class UserService {
    constructor() {
        this.watch = () => {
            $("#registerForm").on("submit", this.submitRegisterForm);
            $("#registerForm2").on("submit", this.submitRegisterForm2);
            $("#loginForm").on("submit", this.submitLoginForm);
            $("#updateForm").on("submit", this.submitUpdateForm);
            $("#dietPlanForm").on("submit", this.submitDietForm);
        };
        this.submitRegisterForm2 = () => {
            const userDataString = sessionStorage.getItem("userData");
            if (!userDataString)
                return;
            const userData = JSON.parse(userDataString);
            const gender = $("#gender").val();
            const height = $("#height").val();
            const weight = $("#weight").val();
            const dateOfBirth = $("#dateOfBirth").val();
            app_service_1.AppService.emitServer(ServerEvents_enum_1.ServerEvents.RegisterUser, [
                userData.email,
                userData.password,
                gender,
                height,
                weight,
                dateOfBirth
            ]);
        };
        this.submitRegisterForm = () => {
            const email = $("#newEmail").val();
            const password = $("#newPassword").val();
            const userData = {
                email: email,
                password: password,
            };
            sessionStorage.setItem("userData", JSON.stringify(userData));
        };
        this.submitLoginForm = () => {
            const email = $("#email").val();
            const password = $("#password").val();
            app_service_1.AppService.emitServer(ServerEvents_enum_1.ServerEvents.LoginUser, [
                email,
                password
            ]);
        };
        this.submitUpdateForm = () => {
            const toUpdate = {
                "gender": $("#gender").val() || undefined,
                "height": $("#height").val() || undefined,
                "weight": $("#weight").val() || undefined,
                "date": $("#date").val() || undefined,
                "alergies": $("#alergies").val() || undefined,
            };
            Object.entries(toUpdate).forEach((entry) => {
                const key = entry[0];
                const value = entry[1];
                if (!value)
                    return;
                const userID = sessionStorage.getItem("userID");
                if (!userID)
                    return;
                app_service_1.AppService.emitServer(ServerEvents_enum_1.ServerEvents.UpdateUser, [userID, key, value]);
            });
        };
        this.submitDietForm = () => {
            const name = $("#dietName").val();
            const daysNumber = $("#dietPlanDays").val();
            const planType = $("#dietType").val();
            const preferences = $("#requirements").val();
            const userID = sessionStorage.getItem("userID");
            const userInput = planType + " " + preferences;
            for (let i = daysNumber; i > 0; i--) {
                console.log(userID, name, userInput);
                app_service_1.AppService.emitServer(ServerEvents_enum_1.ServerEvents.GetPlan, [
                    userID,
                    name,
                    userInput,
                ]);
            }
        };
        this.login = (userID) => {
            if (!userID)
                return;
            sessionStorage.setItem("userID", userID);
            window.location.href = './main/index.html';
            app_service_1.AppService.emit(Events_enum_1.Events.GetPlans, userID);
        };
        this.watch();
    }
}
exports.UserService = UserService;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!*********************!*\
  !*** ./dev/main.ts ***!
  \*********************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const app_module_1 = __webpack_require__(/*! ./app.module */ "./dev/app.module.ts");
const app_service_1 = __webpack_require__(/*! ./app.service */ "./dev/app.service.ts");
/* Jelikož minifikujeme všechen js kód, včetně názvů proměnných k nepoznaní,
* potřebujeme pro komunikování s Kotlinem, resp. pro získaní z něho dat,
* nějakou předem nastavenou globální metodu s konstantním názvem. Pravě proto
* do globálního objektu window, který je součastí jakéhokoliv prohlížeče je,
* je nastavená tato metoda, která neudělá nic jiného, než předá data k zpracovnání aplikaci
*/
// @ts-ignore
window.getData = (eventName, data) => {
    app_service_1.AppService.emitClient(eventName, data);
};
// spuštění hlávního modulu aplikace
new app_module_1.AppModule();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7Ozs7OztBQ3RCYTtBQUNiLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCxxQkFBcUIsbUJBQU8sQ0FBQyx5Q0FBYztBQUMzQyxzQkFBc0IsbUJBQU8sQ0FBQywyQ0FBZTtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kaWV0YXBwbGljYXRpb25fZnJvbnRlbmQvLi9kZXYvYXBwLm1vZHVsZS50cyIsIndlYnBhY2s6Ly9kaWV0YXBwbGljYXRpb25fZnJvbnRlbmQvLi9kZXYvYXBwLnNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vZGlldGFwcGxpY2F0aW9uX2Zyb250ZW5kLy4vZGV2L2RpZXRQbGFuL2RpZXRQbGFuLmNvbnRyb2xsZXIudHMiLCJ3ZWJwYWNrOi8vZGlldGFwcGxpY2F0aW9uX2Zyb250ZW5kLy4vZGV2L2RpZXRQbGFuL2RpZXRQbGFuLm1vZHVsZS50cyIsIndlYnBhY2s6Ly9kaWV0YXBwbGljYXRpb25fZnJvbnRlbmQvLi9kZXYvZGlldFBsYW4vZGlldFBsYW4uc2VydmljZS50cyIsIndlYnBhY2s6Ly9kaWV0YXBwbGljYXRpb25fZnJvbnRlbmQvLi9kZXYvZW51bXMvRXZlbnRzLmVudW0udHMiLCJ3ZWJwYWNrOi8vZGlldGFwcGxpY2F0aW9uX2Zyb250ZW5kLy4vZGV2L2VudW1zL1NlcnZlckV2ZW50cy5lbnVtLnRzIiwid2VicGFjazovL2RpZXRhcHBsaWNhdGlvbl9mcm9udGVuZC8uL2Rldi91c2VyL3VzZXIuY29udHJvbGxlci50cyIsIndlYnBhY2s6Ly9kaWV0YXBwbGljYXRpb25fZnJvbnRlbmQvLi9kZXYvdXNlci91c2VyLm1vZHVsZS50cyIsIndlYnBhY2s6Ly9kaWV0YXBwbGljYXRpb25fZnJvbnRlbmQvLi9kZXYvdXNlci91c2VyLnNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vZGlldGFwcGxpY2F0aW9uX2Zyb250ZW5kL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2RpZXRhcHBsaWNhdGlvbl9mcm9udGVuZC8uL2Rldi9tYWluLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5BcHBNb2R1bGUgPSB2b2lkIDA7XG5jb25zdCBhcHBfc2VydmljZV8xID0gcmVxdWlyZShcIi4vYXBwLnNlcnZpY2VcIik7XG5jb25zdCBkaWV0UGxhbl9tb2R1bGVfMSA9IHJlcXVpcmUoXCIuL2RpZXRQbGFuL2RpZXRQbGFuLm1vZHVsZVwiKTtcbmNvbnN0IHVzZXJfbW9kdWxlXzEgPSByZXF1aXJlKFwiLi91c2VyL3VzZXIubW9kdWxlXCIpO1xuLypcbiAgICBUxZnDrWRhIEFwcE1vZHVsZSAtIGplIHTFmcOtZGEgaGzDoXZuw61obyBtb2R1bHUgYXBsaWthY2UsIGt0ZXLDoSBzZSB6YWLDvXbDoSBzcHXFoXRlbsOtbSB2ZWRsZWrFocOtY2ggbW9kbMWvLlxuKi9cbmNsYXNzIEFwcE1vZHVsZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIC8vIG1ldG9kYSBzcHXFoXTEm27DrSB2ZWRsZWrFocOtY2ggbW9kdWzFr1xuICAgICAgICB0aGlzLmluaXRNb2R1bGVzID0gKCkgPT4ge1xuICAgICAgICAgICAgbmV3IGRpZXRQbGFuX21vZHVsZV8xLkRpZXRQbGFuTW9kdWxlKCk7XG4gICAgICAgICAgICBuZXcgdXNlcl9tb2R1bGVfMS5Vc2VyTW9kdWxlKCk7XG4gICAgICAgIH07XG4gICAgICAgIC8vIHZ5dHZvxZnDrSBzbHXFvmJ1IGFwbGlrYWNlXG4gICAgICAgIG5ldyBhcHBfc2VydmljZV8xLkFwcFNlcnZpY2UoKTtcbiAgICAgICAgLy8gc3B1c3TDrSB2xaFlY2hueSB2ZWRsZWrFocOtIG1vZHVseVxuICAgICAgICB0aGlzLmluaXRNb2R1bGVzKCk7XG4gICAgfVxufVxuZXhwb3J0cy5BcHBNb2R1bGUgPSBBcHBNb2R1bGU7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfYTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuQXBwU2VydmljZSA9IHZvaWQgMDtcbi8qXG4gICAgVMWZw61kYSBBcHBTZXJ2aWNlIC0gamUgaGzDoXZuw60gc2x1xb5iYSBhcGxpa2FjZSwga3RlcsOhIHNlIHphYsO9dsOhIHpwcmFjb3bDoW7DrW0ga29tdW5pa2FjaSBqYWsgdXZuaXTFmSBmcm9udGVuZG92w70gYXBsaWthY2UsXG4gICAgdGFrIGkgdm7Em2rFocOtbWkga29tdW5rYWNlbWkgcyBrbGllbnRvdm91IGFwbGlrYWNpXG4qL1xuY2xhc3MgQXBwU2VydmljZSB7XG59XG5leHBvcnRzLkFwcFNlcnZpY2UgPSBBcHBTZXJ2aWNlO1xuX2EgPSBBcHBTZXJ2aWNlO1xuLy8gb2JqZWt0LCB2ZSBrdGVyw6ltIHNlIHVsb8W+w60gemFyZWdpc3Ryb3bDoW7DqSBsb2vDoWxuw60gdWTDoWxvc3TDrVxuQXBwU2VydmljZS5ldmVudHMgPSB7fTtcbi8vIG9iamVrdCwgdmUga3RlcsOpbSBzZSB1bG/FvsOtIHZuxJtqxaHDrSBzZXJ2ZXJvdsOpIHVkw6Fsb3N0w61cbkFwcFNlcnZpY2Uuc2VydmVyRXZlbnRzID0ge307XG4vLyBtZXRvZGEgcmVnaXN0cmFjZSBsb2vDoWxuw60gdWTDoWxvc3TDrVxuQXBwU2VydmljZS5vbiA9IChldmVudE5hbWUsIGZ1bmMpID0+IHtcbiAgICAvLyBuYWRlZmVudWplIGtsw63EjSB2IHBvZG9ixJsgbsOhenZ1IHVkw6Fsb3N0w60gYSBob2Rub3R1IHYgcG9kYmUgc3B1xaF0xJtub3UgZnVua2NpXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KF9hLmV2ZW50cywgZXZlbnROYW1lLCB7IHZhbHVlOiBmdW5jIH0pO1xufTtcbi8vIG1ldG9kYSB2eXZvbMOhbsOtIGxva8OhbG7DrSDDumRhbG9zdMOtXG5BcHBTZXJ2aWNlLmVtaXQgPSAoZXZlbnROYW1lLCBkYXRhKSA9PiB7XG4gICAgLy8gesOtc2vDoSB2xaFlY2hueSBrbMOtxI1lIGV4aXN0dWrDrWPDrWhvIG9iamVrdHUgbG9rw6FsbsOtY2ggdWTDoWxvc3TDrVxuICAgIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKF9hLmV2ZW50cykuZm9yRWFjaChjdXJyZW50RXZlbnROYW1lID0+IHtcbiAgICAgICAgLy8gcMWZZXZlZGUgZG8gdHlwdSBlbnVtIHogdMWZw61keSB1ZMOhbG9zdMOtXG4gICAgICAgIGNvbnN0IGN1cnJlbnRFdmVudCA9IHBhcnNlSW50KGN1cnJlbnRFdmVudE5hbWUpO1xuICAgICAgICAvLyBwb2t1ZCBqZSBzb3XEjWFzbsO9IG7DoXpldiBldmVudHUgamUgc2hvZG7DvSBzIHZ5dm9sw6Fuw71tLCB2eXZvbMOhIHDFmcOtc2x1xaFub3UgZnVua2NpIHMgcG9za3l0bnV0w71taSBkYXR5XG4gICAgICAgIGlmIChjdXJyZW50RXZlbnQgIT09IGV2ZW50TmFtZSlcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgX2EuZXZlbnRzW2N1cnJlbnRFdmVudF0oZGF0YSk7XG4gICAgfSk7XG59O1xuLy8gbWV0b2RhIHJlZ2lzdHJhY2Ugc2VydmVyb3bDqSB1ZMOhbG9zdMOtXG5BcHBTZXJ2aWNlLm9uU2VydmVyID0gKGV2ZW50TmFtZSwgZnVuYykgPT4ge1xuICAgIC8vIG5hZGVmZW51amUga2zDrcSNIHYgcG9kb2LEmyBuw6F6dnUgdWTDoWxvc3TDrSBhIGhvZG5vdHUgdiBwb2RiZSBzcHXFoXTEm25vdSBmdW5rY2lcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoX2Euc2VydmVyRXZlbnRzLCBldmVudE5hbWUsIHsgdmFsdWU6IGZ1bmMgfSk7XG59O1xuLy8gbWV0b2RhIHZ5dm9sw6Fuw60gw7pkYWxvc3TDrSB6ZSBzZXJ2ZXJ1XG5BcHBTZXJ2aWNlLmVtaXRDbGllbnQgPSAoZXZlbnROYW1lLCBkYXRhKSA9PiB7XG4gICAgLy8gesOtc2vDoSB2xaFlY2hueSBrbMOtxI1lIGV4aXN0dWrDrWPDrWhvIG9iamVrdHUgc2VydmVyb3bDvWNoIHVkw6Fsb3N0w61cbiAgICBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhfYS5zZXJ2ZXJFdmVudHMpLmZvckVhY2goY3VycmVudFNlcnZlckV2ZW50TmFtZSA9PiB7XG4gICAgICAgIC8vIHBva3VkIGplIHNvdcSNYXNuw70gbsOhemV2IGV2ZW50dSBqZSBzaG9kbsO9IHMgdnl2b2zDoW7DvW0sIHZ5dm9sw6EgcMWZw61zbHXFoW5vdSBmdW5rY2kgcyBwb3NreXRudXTDvW1pIGRhdHlcbiAgICAgICAgY29uc29sZS5sb2coJ0FwcCBTZXJ2aWNlIENoZWNrOicsIGN1cnJlbnRTZXJ2ZXJFdmVudE5hbWUsIGV2ZW50TmFtZSwgZGF0YSk7XG4gICAgICAgIGlmIChjdXJyZW50U2VydmVyRXZlbnROYW1lICE9PSBldmVudE5hbWUpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIF9hLnNlcnZlckV2ZW50c1tjdXJyZW50U2VydmVyRXZlbnROYW1lXShkYXRhKTtcbiAgICB9KTtcbn07XG4vLyBtZXRvZGEgcHJvIHBvc8OtbGFuw60gZXZlbnR1IG5hIHNlcnZlclxuQXBwU2VydmljZS5lbWl0U2VydmVyID0gKGV2ZW50TmFtZSwgZGF0YSkgPT4ge1xuICAgIC8vIHphYmFsw60gcG9za3l0bnV0w6EgZGF0YSBkbyBudXRuw6kgcG9kb2J5XG4gICAgY29uc3QgZXZlbnREYXRhID0ge1xuICAgICAgICBkYXRhOiBkYXRhLFxuICAgIH07XG4gICAgLy8gdnl2b2zDoSB2IHBvc2t5dG51dMOpbSBLb3RsaW5vdm91IGFwbGlrYWPDrSBvYmpla3R1IChtb3N0xJspIG1ldG9kdSBwcm8gcG9zw61sw6Fuw60gZGF0IG5hIHNlcnZlclxuICAgIC8vIHDFmWV2ZWRlIHZ5dHZvxZllbsO9IG9iamVrdCB2IMWZw6FkZWsgdHlwdSBKU09OXG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIEFuZHJvaWRJbnRlcmZhY2UuZW1pdFNlcnZlcihldmVudE5hbWUsIEpTT04uc3RyaW5naWZ5KGV2ZW50RGF0YSkpO1xufTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5EaWV0UGxhbkNvbnRyb2xsZXIgPSB2b2lkIDA7XG5jb25zdCBhcHBfc2VydmljZV8xID0gcmVxdWlyZShcIi4uL2FwcC5zZXJ2aWNlXCIpO1xuY29uc3QgRXZlbnRzX2VudW1fMSA9IHJlcXVpcmUoXCIuLi9lbnVtcy9FdmVudHMuZW51bVwiKTtcbmNvbnN0IFNlcnZlckV2ZW50c19lbnVtXzEgPSByZXF1aXJlKFwiLi4vZW51bXMvU2VydmVyRXZlbnRzLmVudW1cIik7XG5jbGFzcyBEaWV0UGxhbkNvbnRyb2xsZXIge1xuICAgIGNvbnN0cnVjdG9yKGRpZXRQbGFuU2VydmljZSkge1xuICAgICAgICB0aGlzLmRpZXRQbGFuU2VydmljZSA9IGRpZXRQbGFuU2VydmljZTtcbiAgICAgICAgYXBwX3NlcnZpY2VfMS5BcHBTZXJ2aWNlLm9uKEV2ZW50c19lbnVtXzEuRXZlbnRzLkdldFBsYW5zLCAodXNlcklEKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmRpZXRQbGFuU2VydmljZS5nZXRQbGFucyh1c2VySUQpO1xuICAgICAgICB9KTtcbiAgICAgICAgYXBwX3NlcnZpY2VfMS5BcHBTZXJ2aWNlLm9uU2VydmVyKFNlcnZlckV2ZW50c19lbnVtXzEuU2VydmVyRXZlbnRzLkdldFBsYW5zLCAocGxhbikgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ1BsYW4gY29udHJvbGxlcjonLCBwbGFuKTtcbiAgICAgICAgICAgIHRoaXMuZGlldFBsYW5TZXJ2aWNlLnNldFBsYW5zKHBsYW4pO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5leHBvcnRzLkRpZXRQbGFuQ29udHJvbGxlciA9IERpZXRQbGFuQ29udHJvbGxlcjtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5EaWV0UGxhbk1vZHVsZSA9IHZvaWQgMDtcbmNvbnN0IGRpZXRQbGFuX2NvbnRyb2xsZXJfMSA9IHJlcXVpcmUoXCIuL2RpZXRQbGFuLmNvbnRyb2xsZXJcIik7XG5jb25zdCBkaWV0UGxhbl9zZXJ2aWNlXzEgPSByZXF1aXJlKFwiLi9kaWV0UGxhbi5zZXJ2aWNlXCIpO1xuY2xhc3MgRGlldFBsYW5Nb2R1bGUge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBjb25zdCBkaWV0UGxhblNlcnZpY2UgPSBuZXcgZGlldFBsYW5fc2VydmljZV8xLkRpZXRQbGFuU2VydmljZSgpO1xuICAgICAgICBuZXcgZGlldFBsYW5fY29udHJvbGxlcl8xLkRpZXRQbGFuQ29udHJvbGxlcihkaWV0UGxhblNlcnZpY2UpO1xuICAgIH1cbn1cbmV4cG9ydHMuRGlldFBsYW5Nb2R1bGUgPSBEaWV0UGxhbk1vZHVsZTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5EaWV0UGxhblNlcnZpY2UgPSB2b2lkIDA7XG5jb25zdCBhcHBfc2VydmljZV8xID0gcmVxdWlyZShcIi4uL2FwcC5zZXJ2aWNlXCIpO1xuY29uc3QgU2VydmVyRXZlbnRzX2VudW1fMSA9IHJlcXVpcmUoXCIuLi9lbnVtcy9TZXJ2ZXJFdmVudHMuZW51bVwiKTtcbmNsYXNzIERpZXRQbGFuU2VydmljZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuZ2V0UGxhbnMgPSAodXNlcklEKSA9PiB7XG4gICAgICAgICAgICBhcHBfc2VydmljZV8xLkFwcFNlcnZpY2UuZW1pdFNlcnZlcihTZXJ2ZXJFdmVudHNfZW51bV8xLlNlcnZlckV2ZW50cy5HZXRQbGFucywgW3VzZXJJRF0pO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLnNldFBsYW5zID0gKHBsYW5zU3RyKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnUGxhbnM6ICcgKyBwbGFuc1N0cik7XG4gICAgICAgICAgICBjb25zdCBjb250YWluZXIgPSAkKCcucGxhbnMnKTtcbiAgICAgICAgICAgIGNvbnRhaW5lci5lbXB0eSgpOyAvLyBDbGVhciBleGlzdGluZyBjb250ZW50XG4gICAgICAgICAgICBjb25zdCBwbGFucyA9IEpTT04ucGFyc2UocGxhbnNTdHIpO1xuICAgICAgICAgICAgbGV0IGRheUluZGV4ID0gMDtcbiAgICAgICAgICAgIHBsYW5zLmZvckVhY2goKGN1cnJlbnREYXkpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhjdXJyZW50RGF5KTtcbiAgICAgICAgICAgICAgICBjb25zdCBkYXlBcnRpY2xlID0gJCgnPGFydGljbGU+JykuYWRkQ2xhc3MoJ2RheS1wbGFuJyk7XG4gICAgICAgICAgICAgICAgY29uc3QgdGl0bGUgPSAkKGA8aDM+YClcbiAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdkYXktdGl0bGUnKVxuICAgICAgICAgICAgICAgICAgICAudGV4dChgRGF5ICR7ZGF5SW5kZXggKyAxfWApO1xuICAgICAgICAgICAgICAgIGRheUluZGV4Kys7XG4gICAgICAgICAgICAgICAgZGF5QXJ0aWNsZS5hcHBlbmQodGl0bGUpO1xuICAgICAgICAgICAgICAgIGN1cnJlbnREYXkuZm9yRWFjaCgoZGF5T2JqZWN0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIE9iamVjdC5lbnRyaWVzKGRheU9iamVjdCkuZm9yRWFjaCgoW2tleSwgdmFsdWVdKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzZWN0aW9uID0gJCgnPHNlY3Rpb24+JykuYWRkQ2xhc3MoJ21lYWwnKS5hdHRyKCdpZCcsIGtleSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzdWJ0aXRsZSA9ICQoJzxoND4nKS50ZXh0KGtleSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB1bCA9ICQoJzx1bD4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGxpID0gJCgnPGxpPicpLnRleHQodmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdWwuYXBwZW5kKGxpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlY3Rpb24uYXBwZW5kKHN1YnRpdGxlLCB1bCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBkYXlBcnRpY2xlLmFwcGVuZChzZWN0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lci5hcHBlbmQoZGF5QXJ0aWNsZSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5nZXRQbGFucyhzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCd1c2VySUQnKSk7XG4gICAgfVxufVxuZXhwb3J0cy5EaWV0UGxhblNlcnZpY2UgPSBEaWV0UGxhblNlcnZpY2U7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuRXZlbnRzID0gdm9pZCAwO1xuLy8gT2JqZWt0IG9ic2FodWrDrWPDrSBsb2vDoWxuw60gdWTDoWxvc3RpIHBybyBmcm9udGVuZFxudmFyIEV2ZW50cztcbihmdW5jdGlvbiAoRXZlbnRzKSB7XG4gICAgRXZlbnRzW0V2ZW50c1tcIlNlbmRVc2VyRGF0YVwiXSA9IDBdID0gXCJTZW5kVXNlckRhdGFcIjtcbiAgICBFdmVudHNbRXZlbnRzW1wiR2V0UGxhbnNcIl0gPSAxXSA9IFwiR2V0UGxhbnNcIjtcbn0pKEV2ZW50cyB8fCAoZXhwb3J0cy5FdmVudHMgPSBFdmVudHMgPSB7fSkpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLlNlcnZlckV2ZW50cyA9IHZvaWQgMDtcbi8vIG9iamVrdCBvYnNhaHVqw61jw60gdWTDoWxvc3RpIHBybyBrb211bmlrYWNpIHNlIHNlcnZlcmVtXG52YXIgU2VydmVyRXZlbnRzO1xuKGZ1bmN0aW9uIChTZXJ2ZXJFdmVudHMpIHtcbiAgICBTZXJ2ZXJFdmVudHNbXCJTZW5kQWdlXCJdID0gXCJ1c2VyL3NlbmRBZ2VcIjtcbiAgICBTZXJ2ZXJFdmVudHNbXCJSZWdpc3RlclVzZXJcIl0gPSBcInVzZXIvc2lnbnVwXCI7XG4gICAgU2VydmVyRXZlbnRzW1wiTG9naW5Vc2VyXCJdID0gXCJ1c2VyL2xvZ2luXCI7XG4gICAgU2VydmVyRXZlbnRzW1wiVXBkYXRlVXNlclwiXSA9IFwidXNlci91cGRhdGVcIjtcbiAgICBTZXJ2ZXJFdmVudHNbXCJHZXRQbGFuXCJdID0gXCJkaWV0UGxhbi9wbGFuXCI7XG4gICAgU2VydmVyRXZlbnRzW1wiR2V0UGxhbnNcIl0gPSBcImRpZXRQbGFuL2dldFBsYW5cIjtcbn0pKFNlcnZlckV2ZW50cyB8fCAoZXhwb3J0cy5TZXJ2ZXJFdmVudHMgPSBTZXJ2ZXJFdmVudHMgPSB7fSkpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLlVzZXJDb250cm9sbGVyID0gdm9pZCAwO1xuY29uc3QgYXBwX3NlcnZpY2VfMSA9IHJlcXVpcmUoXCIuLi9hcHAuc2VydmljZVwiKTtcbmNvbnN0IFNlcnZlckV2ZW50c19lbnVtXzEgPSByZXF1aXJlKFwiLi4vZW51bXMvU2VydmVyRXZlbnRzLmVudW1cIik7XG5jbGFzcyBVc2VyQ29udHJvbGxlciB7XG4gICAgY29uc3RydWN0b3IodXNlclNlcnZpY2UpIHtcbiAgICAgICAgdGhpcy51c2VyU2VydmljZSA9IHVzZXJTZXJ2aWNlO1xuICAgICAgICBhcHBfc2VydmljZV8xLkFwcFNlcnZpY2Uub25TZXJ2ZXIoU2VydmVyRXZlbnRzX2VudW1fMS5TZXJ2ZXJFdmVudHMuTG9naW5Vc2VyLCAodXNlcklEKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnVzZXJTZXJ2aWNlLmxvZ2luKHVzZXJJRCk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbmV4cG9ydHMuVXNlckNvbnRyb2xsZXIgPSBVc2VyQ29udHJvbGxlcjtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5Vc2VyTW9kdWxlID0gdm9pZCAwO1xuY29uc3QgdXNlcl9jb250cm9sbGVyXzEgPSByZXF1aXJlKFwiLi91c2VyLmNvbnRyb2xsZXJcIik7XG5jb25zdCB1c2VyX3NlcnZpY2VfMSA9IHJlcXVpcmUoXCIuL3VzZXIuc2VydmljZVwiKTtcbmNsYXNzIFVzZXJNb2R1bGUge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBjb25zdCB1c2VyU2VydmljZSA9IG5ldyB1c2VyX3NlcnZpY2VfMS5Vc2VyU2VydmljZSgpO1xuICAgICAgICBuZXcgdXNlcl9jb250cm9sbGVyXzEuVXNlckNvbnRyb2xsZXIodXNlclNlcnZpY2UpO1xuICAgIH1cbn1cbmV4cG9ydHMuVXNlck1vZHVsZSA9IFVzZXJNb2R1bGU7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuVXNlclNlcnZpY2UgPSB2b2lkIDA7XG5jb25zdCBhcHBfc2VydmljZV8xID0gcmVxdWlyZShcIi4uL2FwcC5zZXJ2aWNlXCIpO1xuY29uc3QgRXZlbnRzX2VudW1fMSA9IHJlcXVpcmUoXCIuLi9lbnVtcy9FdmVudHMuZW51bVwiKTtcbmNvbnN0IFNlcnZlckV2ZW50c19lbnVtXzEgPSByZXF1aXJlKFwiLi4vZW51bXMvU2VydmVyRXZlbnRzLmVudW1cIik7XG4vKlxuICAgIFTFmcOtZGEgVXNlclNlcnZpY2UgLSBqZSBzbHXFvmJhIHXFvml2YXRlbMWvLCBrdGVyw6Egc2UgemFiw712w6EgenByYWNvdsOhbsOtbSBsb2dpa3kgdcW+aXZhdGVsxa9cbiovXG5jbGFzcyBVc2VyU2VydmljZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMud2F0Y2ggPSAoKSA9PiB7XG4gICAgICAgICAgICAkKFwiI3JlZ2lzdGVyRm9ybVwiKS5vbihcInN1Ym1pdFwiLCB0aGlzLnN1Ym1pdFJlZ2lzdGVyRm9ybSk7XG4gICAgICAgICAgICAkKFwiI3JlZ2lzdGVyRm9ybTJcIikub24oXCJzdWJtaXRcIiwgdGhpcy5zdWJtaXRSZWdpc3RlckZvcm0yKTtcbiAgICAgICAgICAgICQoXCIjbG9naW5Gb3JtXCIpLm9uKFwic3VibWl0XCIsIHRoaXMuc3VibWl0TG9naW5Gb3JtKTtcbiAgICAgICAgICAgICQoXCIjdXBkYXRlRm9ybVwiKS5vbihcInN1Ym1pdFwiLCB0aGlzLnN1Ym1pdFVwZGF0ZUZvcm0pO1xuICAgICAgICAgICAgJChcIiNkaWV0UGxhbkZvcm1cIikub24oXCJzdWJtaXRcIiwgdGhpcy5zdWJtaXREaWV0Rm9ybSk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuc3VibWl0UmVnaXN0ZXJGb3JtMiA9ICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHVzZXJEYXRhU3RyaW5nID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShcInVzZXJEYXRhXCIpO1xuICAgICAgICAgICAgaWYgKCF1c2VyRGF0YVN0cmluZylcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICBjb25zdCB1c2VyRGF0YSA9IEpTT04ucGFyc2UodXNlckRhdGFTdHJpbmcpO1xuICAgICAgICAgICAgY29uc3QgZ2VuZGVyID0gJChcIiNnZW5kZXJcIikudmFsKCk7XG4gICAgICAgICAgICBjb25zdCBoZWlnaHQgPSAkKFwiI2hlaWdodFwiKS52YWwoKTtcbiAgICAgICAgICAgIGNvbnN0IHdlaWdodCA9ICQoXCIjd2VpZ2h0XCIpLnZhbCgpO1xuICAgICAgICAgICAgY29uc3QgZGF0ZU9mQmlydGggPSAkKFwiI2RhdGVPZkJpcnRoXCIpLnZhbCgpO1xuICAgICAgICAgICAgYXBwX3NlcnZpY2VfMS5BcHBTZXJ2aWNlLmVtaXRTZXJ2ZXIoU2VydmVyRXZlbnRzX2VudW1fMS5TZXJ2ZXJFdmVudHMuUmVnaXN0ZXJVc2VyLCBbXG4gICAgICAgICAgICAgICAgdXNlckRhdGEuZW1haWwsXG4gICAgICAgICAgICAgICAgdXNlckRhdGEucGFzc3dvcmQsXG4gICAgICAgICAgICAgICAgZ2VuZGVyLFxuICAgICAgICAgICAgICAgIGhlaWdodCxcbiAgICAgICAgICAgICAgICB3ZWlnaHQsXG4gICAgICAgICAgICAgICAgZGF0ZU9mQmlydGhcbiAgICAgICAgICAgIF0pO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLnN1Ym1pdFJlZ2lzdGVyRm9ybSA9ICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGVtYWlsID0gJChcIiNuZXdFbWFpbFwiKS52YWwoKTtcbiAgICAgICAgICAgIGNvbnN0IHBhc3N3b3JkID0gJChcIiNuZXdQYXNzd29yZFwiKS52YWwoKTtcbiAgICAgICAgICAgIGNvbnN0IHVzZXJEYXRhID0ge1xuICAgICAgICAgICAgICAgIGVtYWlsOiBlbWFpbCxcbiAgICAgICAgICAgICAgICBwYXNzd29yZDogcGFzc3dvcmQsXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShcInVzZXJEYXRhXCIsIEpTT04uc3RyaW5naWZ5KHVzZXJEYXRhKSk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuc3VibWl0TG9naW5Gb3JtID0gKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZW1haWwgPSAkKFwiI2VtYWlsXCIpLnZhbCgpO1xuICAgICAgICAgICAgY29uc3QgcGFzc3dvcmQgPSAkKFwiI3Bhc3N3b3JkXCIpLnZhbCgpO1xuICAgICAgICAgICAgYXBwX3NlcnZpY2VfMS5BcHBTZXJ2aWNlLmVtaXRTZXJ2ZXIoU2VydmVyRXZlbnRzX2VudW1fMS5TZXJ2ZXJFdmVudHMuTG9naW5Vc2VyLCBbXG4gICAgICAgICAgICAgICAgZW1haWwsXG4gICAgICAgICAgICAgICAgcGFzc3dvcmRcbiAgICAgICAgICAgIF0pO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLnN1Ym1pdFVwZGF0ZUZvcm0gPSAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCB0b1VwZGF0ZSA9IHtcbiAgICAgICAgICAgICAgICBcImdlbmRlclwiOiAkKFwiI2dlbmRlclwiKS52YWwoKSB8fCB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgXCJoZWlnaHRcIjogJChcIiNoZWlnaHRcIikudmFsKCkgfHwgdW5kZWZpbmVkLFxuICAgICAgICAgICAgICAgIFwid2VpZ2h0XCI6ICQoXCIjd2VpZ2h0XCIpLnZhbCgpIHx8IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICBcImRhdGVcIjogJChcIiNkYXRlXCIpLnZhbCgpIHx8IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICBcImFsZXJnaWVzXCI6ICQoXCIjYWxlcmdpZXNcIikudmFsKCkgfHwgdW5kZWZpbmVkLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIE9iamVjdC5lbnRyaWVzKHRvVXBkYXRlKS5mb3JFYWNoKChlbnRyeSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGtleSA9IGVudHJ5WzBdO1xuICAgICAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gZW50cnlbMV07XG4gICAgICAgICAgICAgICAgaWYgKCF2YWx1ZSlcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIGNvbnN0IHVzZXJJRCA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJ1c2VySURcIik7XG4gICAgICAgICAgICAgICAgaWYgKCF1c2VySUQpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICBhcHBfc2VydmljZV8xLkFwcFNlcnZpY2UuZW1pdFNlcnZlcihTZXJ2ZXJFdmVudHNfZW51bV8xLlNlcnZlckV2ZW50cy5VcGRhdGVVc2VyLCBbdXNlcklELCBrZXksIHZhbHVlXSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5zdWJtaXREaWV0Rm9ybSA9ICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG5hbWUgPSAkKFwiI2RpZXROYW1lXCIpLnZhbCgpO1xuICAgICAgICAgICAgY29uc3QgZGF5c051bWJlciA9ICQoXCIjZGlldFBsYW5EYXlzXCIpLnZhbCgpO1xuICAgICAgICAgICAgY29uc3QgcGxhblR5cGUgPSAkKFwiI2RpZXRUeXBlXCIpLnZhbCgpO1xuICAgICAgICAgICAgY29uc3QgcHJlZmVyZW5jZXMgPSAkKFwiI3JlcXVpcmVtZW50c1wiKS52YWwoKTtcbiAgICAgICAgICAgIGNvbnN0IHVzZXJJRCA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJ1c2VySURcIik7XG4gICAgICAgICAgICBjb25zdCB1c2VySW5wdXQgPSBwbGFuVHlwZSArIFwiIFwiICsgcHJlZmVyZW5jZXM7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gZGF5c051bWJlcjsgaSA+IDA7IGktLSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHVzZXJJRCwgbmFtZSwgdXNlcklucHV0KTtcbiAgICAgICAgICAgICAgICBhcHBfc2VydmljZV8xLkFwcFNlcnZpY2UuZW1pdFNlcnZlcihTZXJ2ZXJFdmVudHNfZW51bV8xLlNlcnZlckV2ZW50cy5HZXRQbGFuLCBbXG4gICAgICAgICAgICAgICAgICAgIHVzZXJJRCxcbiAgICAgICAgICAgICAgICAgICAgbmFtZSxcbiAgICAgICAgICAgICAgICAgICAgdXNlcklucHV0LFxuICAgICAgICAgICAgICAgIF0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICB0aGlzLmxvZ2luID0gKHVzZXJJRCkgPT4ge1xuICAgICAgICAgICAgaWYgKCF1c2VySUQpXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShcInVzZXJJRFwiLCB1c2VySUQpO1xuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSAnLi9tYWluL2luZGV4Lmh0bWwnO1xuICAgICAgICAgICAgYXBwX3NlcnZpY2VfMS5BcHBTZXJ2aWNlLmVtaXQoRXZlbnRzX2VudW1fMS5FdmVudHMuR2V0UGxhbnMsIHVzZXJJRCk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMud2F0Y2goKTtcbiAgICB9XG59XG5leHBvcnRzLlVzZXJTZXJ2aWNlID0gVXNlclNlcnZpY2U7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBhcHBfbW9kdWxlXzEgPSByZXF1aXJlKFwiLi9hcHAubW9kdWxlXCIpO1xuY29uc3QgYXBwX3NlcnZpY2VfMSA9IHJlcXVpcmUoXCIuL2FwcC5zZXJ2aWNlXCIpO1xuLyogSmVsaWtvxb4gbWluaWZpa3VqZW1lIHbFoWVjaGVuIGpzIGvDs2QsIHbEjWV0bsSbIG7DoXp2xa8gcHJvbcSbbm7DvWNoIGsgbmVwb3puYW7DrSxcbiogcG90xZllYnVqZW1lIHBybyBrb211bmlrb3bDoW7DrSBzIEtvdGxpbmVtLCByZXNwLiBwcm8gesOtc2thbsOtIHogbsSbaG8gZGF0LFxuKiBuxJtqYWtvdSBwxZllZGVtIG5hc3RhdmVub3UgZ2xvYsOhbG7DrSBtZXRvZHUgcyBrb25zdGFudG7DrW0gbsOhenZlbS4gUHJhdsSbIHByb3RvXG4qIGRvIGdsb2LDoWxuw61obyBvYmpla3R1IHdpbmRvdywga3RlcsO9IGplIHNvdcSNYXN0w60gamFrw6lob2tvbGl2IHByb2hsw63FvmXEjWUgamUsXG4qIGplIG5hc3RhdmVuw6EgdGF0byBtZXRvZGEsIGt0ZXLDoSBuZXVkxJtsw6EgbmljIGppbsOpaG8sIG5lxb4gcMWZZWTDoSBkYXRhIGsgenByYWNvdm7DoW7DrSBhcGxpa2FjaVxuKi9cbi8vIEB0cy1pZ25vcmVcbndpbmRvdy5nZXREYXRhID0gKGV2ZW50TmFtZSwgZGF0YSkgPT4ge1xuICAgIGFwcF9zZXJ2aWNlXzEuQXBwU2VydmljZS5lbWl0Q2xpZW50KGV2ZW50TmFtZSwgZGF0YSk7XG59O1xuLy8gc3B1xaF0xJtuw60gaGzDoXZuw61obyBtb2R1bHUgYXBsaWthY2Vcbm5ldyBhcHBfbW9kdWxlXzEuQXBwTW9kdWxlKCk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=