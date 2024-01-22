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
    Object.getOwnPropertyNames(_a.events).forEach((currentEventName) => {
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
    Object.getOwnPropertyNames(_a.serverEvents).forEach((currentServerEventName) => {
        // pokud je současný název eventu je shodný s vyvoláným, vyvolá příslušnou funkci s poskytnutými daty
        console.log(currentServerEventName, eventName, data);
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
        this.setPlans = (plans) => {
            const container = $(".plans");
            for (let i = 0; i < plans.length; i++) {
                const currentDay = plans[i];
                const article = document.createElement("article");
                $(article).addClass("day-plan");
                const title = document.createElement("H3");
                $(title).addClass("day-title")
                    .text("Day " + (i + 1));
                $(article).append(title);
                for (let j = 0; j < currentDay.length; j++) {
                    const currentCourse = currentDay[j];
                    const courseName = currentCourse.key;
                    const food = currentCourse.value;
                    const section = document.createElement("section");
                    $(section).addClass("meal")
                        .attr("id", courseName);
                    const subtitile = document.createElement("h4");
                    $(subtitile).text(courseName);
                    const ul = document.createElement("ul");
                    const li = document.createElement("li");
                    $(li).text(food);
                    $(ul).append(li);
                    $(section).append(subtitile, ul);
                    $(article).append(section);
                }
                $(container).append(article);
            }
        };
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7Ozs7Ozs7QUN0QmE7QUFDYiw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0QscUJBQXFCLG1CQUFPLENBQUMseUNBQWM7QUFDM0Msc0JBQXNCLG1CQUFPLENBQUMsMkNBQWU7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZGlldGFwcGxpY2F0aW9uX2Zyb250ZW5kLy4vZGV2L2FwcC5tb2R1bGUudHMiLCJ3ZWJwYWNrOi8vZGlldGFwcGxpY2F0aW9uX2Zyb250ZW5kLy4vZGV2L2FwcC5zZXJ2aWNlLnRzIiwid2VicGFjazovL2RpZXRhcHBsaWNhdGlvbl9mcm9udGVuZC8uL2Rldi9kaWV0UGxhbi9kaWV0UGxhbi5jb250cm9sbGVyLnRzIiwid2VicGFjazovL2RpZXRhcHBsaWNhdGlvbl9mcm9udGVuZC8uL2Rldi9kaWV0UGxhbi9kaWV0UGxhbi5tb2R1bGUudHMiLCJ3ZWJwYWNrOi8vZGlldGFwcGxpY2F0aW9uX2Zyb250ZW5kLy4vZGV2L2RpZXRQbGFuL2RpZXRQbGFuLnNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vZGlldGFwcGxpY2F0aW9uX2Zyb250ZW5kLy4vZGV2L2VudW1zL0V2ZW50cy5lbnVtLnRzIiwid2VicGFjazovL2RpZXRhcHBsaWNhdGlvbl9mcm9udGVuZC8uL2Rldi9lbnVtcy9TZXJ2ZXJFdmVudHMuZW51bS50cyIsIndlYnBhY2s6Ly9kaWV0YXBwbGljYXRpb25fZnJvbnRlbmQvLi9kZXYvdXNlci91c2VyLmNvbnRyb2xsZXIudHMiLCJ3ZWJwYWNrOi8vZGlldGFwcGxpY2F0aW9uX2Zyb250ZW5kLy4vZGV2L3VzZXIvdXNlci5tb2R1bGUudHMiLCJ3ZWJwYWNrOi8vZGlldGFwcGxpY2F0aW9uX2Zyb250ZW5kLy4vZGV2L3VzZXIvdXNlci5zZXJ2aWNlLnRzIiwid2VicGFjazovL2RpZXRhcHBsaWNhdGlvbl9mcm9udGVuZC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9kaWV0YXBwbGljYXRpb25fZnJvbnRlbmQvLi9kZXYvbWFpbi50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuQXBwTW9kdWxlID0gdm9pZCAwO1xuY29uc3QgYXBwX3NlcnZpY2VfMSA9IHJlcXVpcmUoXCIuL2FwcC5zZXJ2aWNlXCIpO1xuY29uc3QgZGlldFBsYW5fbW9kdWxlXzEgPSByZXF1aXJlKFwiLi9kaWV0UGxhbi9kaWV0UGxhbi5tb2R1bGVcIik7XG5jb25zdCB1c2VyX21vZHVsZV8xID0gcmVxdWlyZShcIi4vdXNlci91c2VyLm1vZHVsZVwiKTtcbi8qXG4gICAgVMWZw61kYSBBcHBNb2R1bGUgLSBqZSB0xZnDrWRhIGhsw6F2bsOtaG8gbW9kdWx1IGFwbGlrYWNlLCBrdGVyw6Egc2UgemFiw712w6Egc3B1xaF0ZW7DrW0gdmVkbGVqxaHDrWNoIG1vZGzFry5cbiovXG5jbGFzcyBBcHBNb2R1bGUge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICAvLyBtZXRvZGEgc3B1xaF0xJtuw60gdmVkbGVqxaHDrWNoIG1vZHVsxa9cbiAgICAgICAgdGhpcy5pbml0TW9kdWxlcyA9ICgpID0+IHtcbiAgICAgICAgICAgIG5ldyBkaWV0UGxhbl9tb2R1bGVfMS5EaWV0UGxhbk1vZHVsZSgpO1xuICAgICAgICAgICAgbmV3IHVzZXJfbW9kdWxlXzEuVXNlck1vZHVsZSgpO1xuICAgICAgICB9O1xuICAgICAgICAvLyB2eXR2b8WZw60gc2x1xb5idSBhcGxpa2FjZVxuICAgICAgICBuZXcgYXBwX3NlcnZpY2VfMS5BcHBTZXJ2aWNlKCk7XG4gICAgICAgIC8vIHNwdXN0w60gdsWhZWNobnkgdmVkbGVqxaHDrSBtb2R1bHlcbiAgICAgICAgdGhpcy5pbml0TW9kdWxlcygpO1xuICAgIH1cbn1cbmV4cG9ydHMuQXBwTW9kdWxlID0gQXBwTW9kdWxlO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX2E7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkFwcFNlcnZpY2UgPSB2b2lkIDA7XG4vKlxuICAgIFTFmcOtZGEgQXBwU2VydmljZSAtIGplIGhsw6F2bsOtIHNsdcW+YmEgYXBsaWthY2UsIGt0ZXLDoSBzZSB6YWLDvXbDoSB6cHJhY292w6Fuw61tIGtvbXVuaWthY2kgamFrIHV2bml0xZkgZnJvbnRlbmRvdsO9IGFwbGlrYWNlLFxuICAgIHRhayBpIHZuxJtqxaHDrW1pIGtvbXVua2FjZW1pIHMga2xpZW50b3ZvdSBhcGxpa2FjaVxuKi9cbmNsYXNzIEFwcFNlcnZpY2Uge1xufVxuZXhwb3J0cy5BcHBTZXJ2aWNlID0gQXBwU2VydmljZTtcbl9hID0gQXBwU2VydmljZTtcbi8vIG9iamVrdCwgdmUga3RlcsOpbSBzZSB1bG/FvsOtIHphcmVnaXN0cm92w6Fuw6kgbG9rw6FsbsOtIHVkw6Fsb3N0w60gXG5BcHBTZXJ2aWNlLmV2ZW50cyA9IHt9O1xuLy8gb2JqZWt0LCB2ZSBrdGVyw6ltIHNlIHVsb8W+w60gdm7Em2rFocOtIHNlcnZlcm92w6kgdWTDoWxvc3TDrVxuQXBwU2VydmljZS5zZXJ2ZXJFdmVudHMgPSB7fTtcbi8vIG1ldG9kYSByZWdpc3RyYWNlIGxva8OhbG7DrSB1ZMOhbG9zdMOtXG5BcHBTZXJ2aWNlLm9uID0gKGV2ZW50TmFtZSwgZnVuYykgPT4ge1xuICAgIC8vIG5hZGVmZW51amUga2zDrcSNIHYgcG9kb2LEmyBuw6F6dnUgdWTDoWxvc3TDrSBhIGhvZG5vdHUgdiBwb2RiZSBzcHXFoXTEm25vdSBmdW5rY2lcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoX2EuZXZlbnRzLCBldmVudE5hbWUsIHsgdmFsdWU6IGZ1bmMgfSk7XG59O1xuLy8gbWV0b2RhIHZ5dm9sw6Fuw60gbG9rw6FsbsOtIMO6ZGFsb3N0w61cbkFwcFNlcnZpY2UuZW1pdCA9IChldmVudE5hbWUsIGRhdGEpID0+IHtcbiAgICAvLyB6w61za8OhIHbFoWVjaG55IGtsw63EjWUgZXhpc3R1asOtY8OtaG8gb2JqZWt0dSBsb2vDoWxuw61jaCB1ZMOhbG9zdMOtXG4gICAgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoX2EuZXZlbnRzKS5mb3JFYWNoKChjdXJyZW50RXZlbnROYW1lKSA9PiB7XG4gICAgICAgIC8vIHDFmWV2ZWRlIGRvIHR5cHUgZW51bSB6IHTFmcOtZHkgdWTDoWxvc3TDrSBcbiAgICAgICAgY29uc3QgY3VycmVudEV2ZW50ID0gcGFyc2VJbnQoY3VycmVudEV2ZW50TmFtZSk7XG4gICAgICAgIC8vIHBva3VkIGplIHNvdcSNYXNuw70gbsOhemV2IGV2ZW50dSBqZSBzaG9kbsO9IHMgdnl2b2zDoW7DvW0sIHZ5dm9sw6EgcMWZw61zbHXFoW5vdSBmdW5rY2kgcyBwb3NreXRudXTDvW1pIGRhdHlcbiAgICAgICAgaWYgKGN1cnJlbnRFdmVudCAhPT0gZXZlbnROYW1lKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBfYS5ldmVudHNbY3VycmVudEV2ZW50XShkYXRhKTtcbiAgICB9KTtcbn07XG4vLyBtZXRvZGEgcmVnaXN0cmFjZSBzZXJ2ZXJvdsOpIHVkw6Fsb3N0w61cbkFwcFNlcnZpY2Uub25TZXJ2ZXIgPSAoZXZlbnROYW1lLCBmdW5jKSA9PiB7XG4gICAgLy8gbmFkZWZlbnVqZSBrbMOtxI0gdiBwb2RvYsSbIG7DoXp2dSB1ZMOhbG9zdMOtIGEgaG9kbm90dSB2IHBvZGJlIHNwdcWhdMSbbm91IGZ1bmtjaVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShfYS5zZXJ2ZXJFdmVudHMsIGV2ZW50TmFtZSwgeyB2YWx1ZTogZnVuYyB9KTtcbn07XG4vLyBtZXRvZGEgdnl2b2zDoW7DrSDDumRhbG9zdMOtIHplIHNlcnZlcnVcbkFwcFNlcnZpY2UuZW1pdENsaWVudCA9IChldmVudE5hbWUsIGRhdGEpID0+IHtcbiAgICAvLyB6w61za8OhIHbFoWVjaG55IGtsw63EjWUgZXhpc3R1asOtY8OtaG8gb2JqZWt0dSBzZXJ2ZXJvdsO9Y2ggdWTDoWxvc3TDrVxuICAgIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKF9hLnNlcnZlckV2ZW50cykuZm9yRWFjaCgoY3VycmVudFNlcnZlckV2ZW50TmFtZSkgPT4ge1xuICAgICAgICAvLyBwb2t1ZCBqZSBzb3XEjWFzbsO9IG7DoXpldiBldmVudHUgamUgc2hvZG7DvSBzIHZ5dm9sw6Fuw71tLCB2eXZvbMOhIHDFmcOtc2x1xaFub3UgZnVua2NpIHMgcG9za3l0bnV0w71taSBkYXR5XG4gICAgICAgIGNvbnNvbGUubG9nKGN1cnJlbnRTZXJ2ZXJFdmVudE5hbWUsIGV2ZW50TmFtZSwgZGF0YSk7XG4gICAgICAgIGlmIChjdXJyZW50U2VydmVyRXZlbnROYW1lICE9PSBldmVudE5hbWUpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIF9hLnNlcnZlckV2ZW50c1tjdXJyZW50U2VydmVyRXZlbnROYW1lXShkYXRhKTtcbiAgICB9KTtcbn07XG4vLyBtZXRvZGEgcHJvIHBvc8OtbGFuw60gZXZlbnR1IG5hIHNlcnZlclxuQXBwU2VydmljZS5lbWl0U2VydmVyID0gKGV2ZW50TmFtZSwgZGF0YSkgPT4ge1xuICAgIC8vIHphYmFsw60gcG9za3l0bnV0w6EgZGF0YSBkbyBudXRuw6kgcG9kb2J5XG4gICAgY29uc3QgZXZlbnREYXRhID0ge1xuICAgICAgICBkYXRhOiBkYXRhLFxuICAgIH07XG4gICAgLy8gdnl2b2zDoSB2IHBvc2t5dG51dMOpbSBLb3RsaW5vdm91IGFwbGlrYWPDrSBvYmpla3R1IChtb3N0xJspIG1ldG9kdSBwcm8gcG9zw61sw6Fuw60gZGF0IG5hIHNlcnZlclxuICAgIC8vIHDFmWV2ZWRlIHZ5dHZvxZllbsO9IG9iamVrdCB2IMWZw6FkZWsgdHlwdSBKU09OXG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIEFuZHJvaWRJbnRlcmZhY2UuZW1pdFNlcnZlcihldmVudE5hbWUsIEpTT04uc3RyaW5naWZ5KGV2ZW50RGF0YSkpO1xufTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5EaWV0UGxhbkNvbnRyb2xsZXIgPSB2b2lkIDA7XG5jb25zdCBhcHBfc2VydmljZV8xID0gcmVxdWlyZShcIi4uL2FwcC5zZXJ2aWNlXCIpO1xuY29uc3QgRXZlbnRzX2VudW1fMSA9IHJlcXVpcmUoXCIuLi9lbnVtcy9FdmVudHMuZW51bVwiKTtcbmNvbnN0IFNlcnZlckV2ZW50c19lbnVtXzEgPSByZXF1aXJlKFwiLi4vZW51bXMvU2VydmVyRXZlbnRzLmVudW1cIik7XG5jbGFzcyBEaWV0UGxhbkNvbnRyb2xsZXIge1xuICAgIGNvbnN0cnVjdG9yKGRpZXRQbGFuU2VydmljZSkge1xuICAgICAgICB0aGlzLmRpZXRQbGFuU2VydmljZSA9IGRpZXRQbGFuU2VydmljZTtcbiAgICAgICAgYXBwX3NlcnZpY2VfMS5BcHBTZXJ2aWNlLm9uKEV2ZW50c19lbnVtXzEuRXZlbnRzLkdldFBsYW5zLCAodXNlcklEKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmRpZXRQbGFuU2VydmljZS5nZXRQbGFucyh1c2VySUQpO1xuICAgICAgICB9KTtcbiAgICAgICAgYXBwX3NlcnZpY2VfMS5BcHBTZXJ2aWNlLm9uU2VydmVyKFNlcnZlckV2ZW50c19lbnVtXzEuU2VydmVyRXZlbnRzLkdldFBsYW5zLCAocGxhbikgPT4ge1xuICAgICAgICAgICAgdGhpcy5kaWV0UGxhblNlcnZpY2Uuc2V0UGxhbnMocGxhbik7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbmV4cG9ydHMuRGlldFBsYW5Db250cm9sbGVyID0gRGlldFBsYW5Db250cm9sbGVyO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkRpZXRQbGFuTW9kdWxlID0gdm9pZCAwO1xuY29uc3QgZGlldFBsYW5fY29udHJvbGxlcl8xID0gcmVxdWlyZShcIi4vZGlldFBsYW4uY29udHJvbGxlclwiKTtcbmNvbnN0IGRpZXRQbGFuX3NlcnZpY2VfMSA9IHJlcXVpcmUoXCIuL2RpZXRQbGFuLnNlcnZpY2VcIik7XG5jbGFzcyBEaWV0UGxhbk1vZHVsZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIGNvbnN0IGRpZXRQbGFuU2VydmljZSA9IG5ldyBkaWV0UGxhbl9zZXJ2aWNlXzEuRGlldFBsYW5TZXJ2aWNlKCk7XG4gICAgICAgIG5ldyBkaWV0UGxhbl9jb250cm9sbGVyXzEuRGlldFBsYW5Db250cm9sbGVyKGRpZXRQbGFuU2VydmljZSk7XG4gICAgfVxufVxuZXhwb3J0cy5EaWV0UGxhbk1vZHVsZSA9IERpZXRQbGFuTW9kdWxlO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkRpZXRQbGFuU2VydmljZSA9IHZvaWQgMDtcbmNvbnN0IGFwcF9zZXJ2aWNlXzEgPSByZXF1aXJlKFwiLi4vYXBwLnNlcnZpY2VcIik7XG5jb25zdCBTZXJ2ZXJFdmVudHNfZW51bV8xID0gcmVxdWlyZShcIi4uL2VudW1zL1NlcnZlckV2ZW50cy5lbnVtXCIpO1xuY2xhc3MgRGlldFBsYW5TZXJ2aWNlIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5nZXRQbGFucyA9ICh1c2VySUQpID0+IHtcbiAgICAgICAgICAgIGFwcF9zZXJ2aWNlXzEuQXBwU2VydmljZS5lbWl0U2VydmVyKFNlcnZlckV2ZW50c19lbnVtXzEuU2VydmVyRXZlbnRzLkdldFBsYW5zLCBbdXNlcklEXSk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuc2V0UGxhbnMgPSAocGxhbnMpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGNvbnRhaW5lciA9ICQoXCIucGxhbnNcIik7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBsYW5zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgY3VycmVudERheSA9IHBsYW5zW2ldO1xuICAgICAgICAgICAgICAgIGNvbnN0IGFydGljbGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYXJ0aWNsZVwiKTtcbiAgICAgICAgICAgICAgICAkKGFydGljbGUpLmFkZENsYXNzKFwiZGF5LXBsYW5cIik7XG4gICAgICAgICAgICAgICAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiSDNcIik7XG4gICAgICAgICAgICAgICAgJCh0aXRsZSkuYWRkQ2xhc3MoXCJkYXktdGl0bGVcIilcbiAgICAgICAgICAgICAgICAgICAgLnRleHQoXCJEYXkgXCIgKyAoaSArIDEpKTtcbiAgICAgICAgICAgICAgICAkKGFydGljbGUpLmFwcGVuZCh0aXRsZSk7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBjdXJyZW50RGF5Lmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRDb3Vyc2UgPSBjdXJyZW50RGF5W2pdO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBjb3Vyc2VOYW1lID0gY3VycmVudENvdXJzZS5rZXk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGZvb2QgPSBjdXJyZW50Q291cnNlLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBzZWN0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNlY3Rpb25cIik7XG4gICAgICAgICAgICAgICAgICAgICQoc2VjdGlvbikuYWRkQ2xhc3MoXCJtZWFsXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAuYXR0cihcImlkXCIsIGNvdXJzZU5hbWUpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBzdWJ0aXRpbGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDRcIik7XG4gICAgICAgICAgICAgICAgICAgICQoc3VidGl0aWxlKS50ZXh0KGNvdXJzZU5hbWUpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB1bCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ1bFwiKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIik7XG4gICAgICAgICAgICAgICAgICAgICQobGkpLnRleHQoZm9vZCk7XG4gICAgICAgICAgICAgICAgICAgICQodWwpLmFwcGVuZChsaSk7XG4gICAgICAgICAgICAgICAgICAgICQoc2VjdGlvbikuYXBwZW5kKHN1YnRpdGlsZSwgdWwpO1xuICAgICAgICAgICAgICAgICAgICAkKGFydGljbGUpLmFwcGVuZChzZWN0aW9uKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgJChjb250YWluZXIpLmFwcGVuZChhcnRpY2xlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9XG59XG5leHBvcnRzLkRpZXRQbGFuU2VydmljZSA9IERpZXRQbGFuU2VydmljZTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5FdmVudHMgPSB2b2lkIDA7XG4vLyBPYmpla3Qgb2JzYWh1asOtY8OtIGxva8OhbG7DrSB1ZMOhbG9zdGkgcHJvIGZyb250ZW5kXG52YXIgRXZlbnRzO1xuKGZ1bmN0aW9uIChFdmVudHMpIHtcbiAgICBFdmVudHNbRXZlbnRzW1wiU2VuZFVzZXJEYXRhXCJdID0gMF0gPSBcIlNlbmRVc2VyRGF0YVwiO1xuICAgIEV2ZW50c1tFdmVudHNbXCJHZXRQbGFuc1wiXSA9IDFdID0gXCJHZXRQbGFuc1wiO1xufSkoRXZlbnRzIHx8IChleHBvcnRzLkV2ZW50cyA9IEV2ZW50cyA9IHt9KSk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuU2VydmVyRXZlbnRzID0gdm9pZCAwO1xuLy8gb2JqZWt0IG9ic2FodWrDrWPDrSB1ZMOhbG9zdGkgcHJvIGtvbXVuaWthY2kgc2Ugc2VydmVyZW1cbnZhciBTZXJ2ZXJFdmVudHM7XG4oZnVuY3Rpb24gKFNlcnZlckV2ZW50cykge1xuICAgIFNlcnZlckV2ZW50c1tcIlNlbmRBZ2VcIl0gPSBcInVzZXIvc2VuZEFnZVwiO1xuICAgIFNlcnZlckV2ZW50c1tcIlJlZ2lzdGVyVXNlclwiXSA9IFwidXNlci9zaWdudXBcIjtcbiAgICBTZXJ2ZXJFdmVudHNbXCJMb2dpblVzZXJcIl0gPSBcInVzZXIvbG9naW5cIjtcbiAgICBTZXJ2ZXJFdmVudHNbXCJVcGRhdGVVc2VyXCJdID0gXCJ1c2VyL3VwZGF0ZVwiO1xuICAgIFNlcnZlckV2ZW50c1tcIkdldFBsYW5cIl0gPSBcImRpZXRQbGFuL3BsYW5cIjtcbiAgICBTZXJ2ZXJFdmVudHNbXCJHZXRQbGFuc1wiXSA9IFwiZGlldFBsYW4vZ2V0UGxhblwiO1xufSkoU2VydmVyRXZlbnRzIHx8IChleHBvcnRzLlNlcnZlckV2ZW50cyA9IFNlcnZlckV2ZW50cyA9IHt9KSk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuVXNlckNvbnRyb2xsZXIgPSB2b2lkIDA7XG5jb25zdCBhcHBfc2VydmljZV8xID0gcmVxdWlyZShcIi4uL2FwcC5zZXJ2aWNlXCIpO1xuY29uc3QgU2VydmVyRXZlbnRzX2VudW1fMSA9IHJlcXVpcmUoXCIuLi9lbnVtcy9TZXJ2ZXJFdmVudHMuZW51bVwiKTtcbmNsYXNzIFVzZXJDb250cm9sbGVyIHtcbiAgICBjb25zdHJ1Y3Rvcih1c2VyU2VydmljZSkge1xuICAgICAgICB0aGlzLnVzZXJTZXJ2aWNlID0gdXNlclNlcnZpY2U7XG4gICAgICAgIGFwcF9zZXJ2aWNlXzEuQXBwU2VydmljZS5vblNlcnZlcihTZXJ2ZXJFdmVudHNfZW51bV8xLlNlcnZlckV2ZW50cy5Mb2dpblVzZXIsICh1c2VySUQpID0+IHtcbiAgICAgICAgICAgIHRoaXMudXNlclNlcnZpY2UubG9naW4odXNlcklEKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuZXhwb3J0cy5Vc2VyQ29udHJvbGxlciA9IFVzZXJDb250cm9sbGVyO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLlVzZXJNb2R1bGUgPSB2b2lkIDA7XG5jb25zdCB1c2VyX2NvbnRyb2xsZXJfMSA9IHJlcXVpcmUoXCIuL3VzZXIuY29udHJvbGxlclwiKTtcbmNvbnN0IHVzZXJfc2VydmljZV8xID0gcmVxdWlyZShcIi4vdXNlci5zZXJ2aWNlXCIpO1xuY2xhc3MgVXNlck1vZHVsZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIGNvbnN0IHVzZXJTZXJ2aWNlID0gbmV3IHVzZXJfc2VydmljZV8xLlVzZXJTZXJ2aWNlKCk7XG4gICAgICAgIG5ldyB1c2VyX2NvbnRyb2xsZXJfMS5Vc2VyQ29udHJvbGxlcih1c2VyU2VydmljZSk7XG4gICAgfVxufVxuZXhwb3J0cy5Vc2VyTW9kdWxlID0gVXNlck1vZHVsZTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5Vc2VyU2VydmljZSA9IHZvaWQgMDtcbmNvbnN0IGFwcF9zZXJ2aWNlXzEgPSByZXF1aXJlKFwiLi4vYXBwLnNlcnZpY2VcIik7XG5jb25zdCBFdmVudHNfZW51bV8xID0gcmVxdWlyZShcIi4uL2VudW1zL0V2ZW50cy5lbnVtXCIpO1xuY29uc3QgU2VydmVyRXZlbnRzX2VudW1fMSA9IHJlcXVpcmUoXCIuLi9lbnVtcy9TZXJ2ZXJFdmVudHMuZW51bVwiKTtcbi8qXG4gICAgVMWZw61kYSBVc2VyU2VydmljZSAtIGplIHNsdcW+YmEgdcW+aXZhdGVsxa8sIGt0ZXLDoSBzZSB6YWLDvXbDoSB6cHJhY292w6Fuw61tIGxvZ2lreSB1xb5pdmF0ZWzFr1xuKi9cbmNsYXNzIFVzZXJTZXJ2aWNlIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy53YXRjaCA9ICgpID0+IHtcbiAgICAgICAgICAgICQoXCIjcmVnaXN0ZXJGb3JtXCIpLm9uKFwic3VibWl0XCIsIHRoaXMuc3VibWl0UmVnaXN0ZXJGb3JtKTtcbiAgICAgICAgICAgICQoXCIjcmVnaXN0ZXJGb3JtMlwiKS5vbihcInN1Ym1pdFwiLCB0aGlzLnN1Ym1pdFJlZ2lzdGVyRm9ybTIpO1xuICAgICAgICAgICAgJChcIiNsb2dpbkZvcm1cIikub24oXCJzdWJtaXRcIiwgdGhpcy5zdWJtaXRMb2dpbkZvcm0pO1xuICAgICAgICAgICAgJChcIiN1cGRhdGVGb3JtXCIpLm9uKFwic3VibWl0XCIsIHRoaXMuc3VibWl0VXBkYXRlRm9ybSk7XG4gICAgICAgICAgICAkKFwiI2RpZXRQbGFuRm9ybVwiKS5vbihcInN1Ym1pdFwiLCB0aGlzLnN1Ym1pdERpZXRGb3JtKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5zdWJtaXRSZWdpc3RlckZvcm0yID0gKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdXNlckRhdGFTdHJpbmcgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFwidXNlckRhdGFcIik7XG4gICAgICAgICAgICBpZiAoIXVzZXJEYXRhU3RyaW5nKVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIGNvbnN0IHVzZXJEYXRhID0gSlNPTi5wYXJzZSh1c2VyRGF0YVN0cmluZyk7XG4gICAgICAgICAgICBjb25zdCBnZW5kZXIgPSAkKFwiI2dlbmRlclwiKS52YWwoKTtcbiAgICAgICAgICAgIGNvbnN0IGhlaWdodCA9ICQoXCIjaGVpZ2h0XCIpLnZhbCgpO1xuICAgICAgICAgICAgY29uc3Qgd2VpZ2h0ID0gJChcIiN3ZWlnaHRcIikudmFsKCk7XG4gICAgICAgICAgICBjb25zdCBkYXRlT2ZCaXJ0aCA9ICQoXCIjZGF0ZU9mQmlydGhcIikudmFsKCk7XG4gICAgICAgICAgICBhcHBfc2VydmljZV8xLkFwcFNlcnZpY2UuZW1pdFNlcnZlcihTZXJ2ZXJFdmVudHNfZW51bV8xLlNlcnZlckV2ZW50cy5SZWdpc3RlclVzZXIsIFtcbiAgICAgICAgICAgICAgICB1c2VyRGF0YS5lbWFpbCxcbiAgICAgICAgICAgICAgICB1c2VyRGF0YS5wYXNzd29yZCxcbiAgICAgICAgICAgICAgICBnZW5kZXIsXG4gICAgICAgICAgICAgICAgaGVpZ2h0LFxuICAgICAgICAgICAgICAgIHdlaWdodCxcbiAgICAgICAgICAgICAgICBkYXRlT2ZCaXJ0aFxuICAgICAgICAgICAgXSk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuc3VibWl0UmVnaXN0ZXJGb3JtID0gKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZW1haWwgPSAkKFwiI25ld0VtYWlsXCIpLnZhbCgpO1xuICAgICAgICAgICAgY29uc3QgcGFzc3dvcmQgPSAkKFwiI25ld1Bhc3N3b3JkXCIpLnZhbCgpO1xuICAgICAgICAgICAgY29uc3QgdXNlckRhdGEgPSB7XG4gICAgICAgICAgICAgICAgZW1haWw6IGVtYWlsLFxuICAgICAgICAgICAgICAgIHBhc3N3b3JkOiBwYXNzd29yZCxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKFwidXNlckRhdGFcIiwgSlNPTi5zdHJpbmdpZnkodXNlckRhdGEpKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5zdWJtaXRMb2dpbkZvcm0gPSAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBlbWFpbCA9ICQoXCIjZW1haWxcIikudmFsKCk7XG4gICAgICAgICAgICBjb25zdCBwYXNzd29yZCA9ICQoXCIjcGFzc3dvcmRcIikudmFsKCk7XG4gICAgICAgICAgICBhcHBfc2VydmljZV8xLkFwcFNlcnZpY2UuZW1pdFNlcnZlcihTZXJ2ZXJFdmVudHNfZW51bV8xLlNlcnZlckV2ZW50cy5Mb2dpblVzZXIsIFtcbiAgICAgICAgICAgICAgICBlbWFpbCxcbiAgICAgICAgICAgICAgICBwYXNzd29yZFxuICAgICAgICAgICAgXSk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuc3VibWl0VXBkYXRlRm9ybSA9ICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHRvVXBkYXRlID0ge1xuICAgICAgICAgICAgICAgIFwiZ2VuZGVyXCI6ICQoXCIjZ2VuZGVyXCIpLnZhbCgpIHx8IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICBcImhlaWdodFwiOiAkKFwiI2hlaWdodFwiKS52YWwoKSB8fCB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgXCJ3ZWlnaHRcIjogJChcIiN3ZWlnaHRcIikudmFsKCkgfHwgdW5kZWZpbmVkLFxuICAgICAgICAgICAgICAgIFwiZGF0ZVwiOiAkKFwiI2RhdGVcIikudmFsKCkgfHwgdW5kZWZpbmVkLFxuICAgICAgICAgICAgICAgIFwiYWxlcmdpZXNcIjogJChcIiNhbGVyZ2llc1wiKS52YWwoKSB8fCB1bmRlZmluZWQsXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgT2JqZWN0LmVudHJpZXModG9VcGRhdGUpLmZvckVhY2goKGVudHJ5KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3Qga2V5ID0gZW50cnlbMF07XG4gICAgICAgICAgICAgICAgY29uc3QgdmFsdWUgPSBlbnRyeVsxXTtcbiAgICAgICAgICAgICAgICBpZiAoIXZhbHVlKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgY29uc3QgdXNlcklEID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShcInVzZXJJRFwiKTtcbiAgICAgICAgICAgICAgICBpZiAoIXVzZXJJRClcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIGFwcF9zZXJ2aWNlXzEuQXBwU2VydmljZS5lbWl0U2VydmVyKFNlcnZlckV2ZW50c19lbnVtXzEuU2VydmVyRXZlbnRzLlVwZGF0ZVVzZXIsIFt1c2VySUQsIGtleSwgdmFsdWVdKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLnN1Ym1pdERpZXRGb3JtID0gKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgbmFtZSA9ICQoXCIjZGlldE5hbWVcIikudmFsKCk7XG4gICAgICAgICAgICBjb25zdCBkYXlzTnVtYmVyID0gJChcIiNkaWV0UGxhbkRheXNcIikudmFsKCk7XG4gICAgICAgICAgICBjb25zdCBwbGFuVHlwZSA9ICQoXCIjZGlldFR5cGVcIikudmFsKCk7XG4gICAgICAgICAgICBjb25zdCBwcmVmZXJlbmNlcyA9ICQoXCIjcmVxdWlyZW1lbnRzXCIpLnZhbCgpO1xuICAgICAgICAgICAgY29uc3QgdXNlcklEID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShcInVzZXJJRFwiKTtcbiAgICAgICAgICAgIGNvbnN0IHVzZXJJbnB1dCA9IHBsYW5UeXBlICsgXCIgXCIgKyBwcmVmZXJlbmNlcztcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSBkYXlzTnVtYmVyOyBpID4gMDsgaS0tKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codXNlcklELCBuYW1lLCB1c2VySW5wdXQpO1xuICAgICAgICAgICAgICAgIGFwcF9zZXJ2aWNlXzEuQXBwU2VydmljZS5lbWl0U2VydmVyKFNlcnZlckV2ZW50c19lbnVtXzEuU2VydmVyRXZlbnRzLkdldFBsYW4sIFtcbiAgICAgICAgICAgICAgICAgICAgdXNlcklELFxuICAgICAgICAgICAgICAgICAgICBuYW1lLFxuICAgICAgICAgICAgICAgICAgICB1c2VySW5wdXQsXG4gICAgICAgICAgICAgICAgXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMubG9naW4gPSAodXNlcklEKSA9PiB7XG4gICAgICAgICAgICBpZiAoIXVzZXJJRClcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKFwidXNlcklEXCIsIHVzZXJJRCk7XG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9ICcuL21haW4vaW5kZXguaHRtbCc7XG4gICAgICAgICAgICBhcHBfc2VydmljZV8xLkFwcFNlcnZpY2UuZW1pdChFdmVudHNfZW51bV8xLkV2ZW50cy5HZXRQbGFucywgdXNlcklEKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy53YXRjaCgpO1xuICAgIH1cbn1cbmV4cG9ydHMuVXNlclNlcnZpY2UgPSBVc2VyU2VydmljZTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGFwcF9tb2R1bGVfMSA9IHJlcXVpcmUoXCIuL2FwcC5tb2R1bGVcIik7XG5jb25zdCBhcHBfc2VydmljZV8xID0gcmVxdWlyZShcIi4vYXBwLnNlcnZpY2VcIik7XG4vKiBKZWxpa2/FviBtaW5pZmlrdWplbWUgdsWhZWNoZW4ganMga8OzZCwgdsSNZXRuxJsgbsOhenbFryBwcm9txJtubsO9Y2ggayBuZXBvem5hbsOtLFxuKiBwb3TFmWVidWplbWUgcHJvIGtvbXVuaWtvdsOhbsOtIHMgS290bGluZW0sIHJlc3AuIHBybyB6w61za2Fuw60geiBuxJtobyBkYXQsXG4qIG7Em2pha291IHDFmWVkZW0gbmFzdGF2ZW5vdSBnbG9iw6FsbsOtIG1ldG9kdSBzIGtvbnN0YW50bsOtbSBuw6F6dmVtLiBQcmF2xJsgcHJvdG9cbiogZG8gZ2xvYsOhbG7DrWhvIG9iamVrdHUgd2luZG93LCBrdGVyw70gamUgc291xI1hc3TDrSBqYWvDqWhva29saXYgcHJvaGzDrcW+ZcSNZSBqZSxcbiogamUgbmFzdGF2ZW7DoSB0YXRvIG1ldG9kYSwga3RlcsOhIG5ldWTEm2zDoSBuaWMgamluw6lobywgbmXFviBwxZllZMOhIGRhdGEgayB6cHJhY292bsOhbsOtIGFwbGlrYWNpXG4qL1xuLy8gQHRzLWlnbm9yZVxud2luZG93LmdldERhdGEgPSAoZXZlbnROYW1lLCBkYXRhKSA9PiB7XG4gICAgYXBwX3NlcnZpY2VfMS5BcHBTZXJ2aWNlLmVtaXRDbGllbnQoZXZlbnROYW1lLCBkYXRhKTtcbn07XG4vLyBzcHXFoXTEm27DrSBobMOhdm7DrWhvIG1vZHVsdSBhcGxpa2FjZVxubmV3IGFwcF9tb2R1bGVfMS5BcHBNb2R1bGUoKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==