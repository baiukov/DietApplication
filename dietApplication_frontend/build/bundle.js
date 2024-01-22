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
const example_module_1 = __webpack_require__(/*! ./example/example.module */ "./dev/example/example.module.ts");
const user_module_1 = __webpack_require__(/*! ./user/user.module */ "./dev/user/user.module.ts");
/*
    Třída AppModule - je třída hlávního modulu aplikace, která se zabývá spuštením vedlejších modlů.
*/
class AppModule {
    constructor() {
        // metoda spuštění vedlejších modulů
        this.initModules = () => {
            // vytvoří se příkladový modul
            new example_module_1.ExampleModule();
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
})(ServerEvents || (exports.ServerEvents = ServerEvents = {}));


/***/ }),

/***/ "./dev/example/example.controller.ts":
/*!*******************************************!*\
  !*** ./dev/example/example.controller.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ExampleController = void 0;
const app_service_1 = __webpack_require__(/*! ../app.service */ "./dev/app.service.ts");
const ServerEvents_enum_1 = __webpack_require__(/*! ../enums/ServerEvents.enum */ "./dev/enums/ServerEvents.enum.ts");
/*
    Třída ExampleService - je služba příkladu, která se zabývá zpracováním základní logiky příkladu
*/
class ExampleController {
    constructor(exampleService) {
        // proměnná ve které je uložená služba příkladového balíčku
        this.exampleService = exampleService;
        // zaregestruje posluhač událostí ze serveru. 
        app_service_1.AppService.onServer(ServerEvents_enum_1.ServerEvents.SendAge, (age) => {
            this.exampleService.setAge(age);
        });
    }
}
exports.ExampleController = ExampleController;


/***/ }),

/***/ "./dev/example/example.module.ts":
/*!***************************************!*\
  !*** ./dev/example/example.module.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ExampleModule = void 0;
const example_controller_1 = __webpack_require__(/*! ./example.controller */ "./dev/example/example.controller.ts");
const example_service_1 = __webpack_require__(/*! ./example.service */ "./dev/example/example.service.ts");
/*
    Třída ExampleModule - je třída modulu příkladu, která se zabývá vytvařením služby a správce.
*/
class ExampleModule {
    constructor() {
        // vytvoří novou službu pro příklad
        const exampleService = new example_service_1.ExampleService();
        // vytvoří nového správce příkladové služby
        new example_controller_1.ExampleController(exampleService);
    }
}
exports.ExampleModule = ExampleModule;


/***/ }),

/***/ "./dev/example/example.service.ts":
/*!****************************************!*\
  !*** ./dev/example/example.service.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ExampleService = void 0;
const app_service_1 = __webpack_require__(/*! ../app.service */ "./dev/app.service.ts");
const ServerEvents_enum_1 = __webpack_require__(/*! ../enums/ServerEvents.enum */ "./dev/enums/ServerEvents.enum.ts");
/*
    Třída ExampleService - je služba příkladu, která se zabývá zpracováním základní logiky příkladu
*/
class ExampleService {
    // metoda nastaví poslouhač událostí při kliknutí tlačitka
    constructor() {
        // metoda nastaví věk na obrazovce
        this.setAge = (age) => {
            // nastaví v elementu s id "age", textový řádek získané hodnoty
            $('#age').text(age);
        };
        // nastavení poslouhače událostí kliknutí na tlačitko s id "submit"
        $("#submit").click(() => {
            // po kliknutí získá z elementu s id "ageInput" hodnotu
            const yearOfBirth = $("#ageInput").val();
            // vyvolá event posílání dat na server. Pro příklad posílá se pole s dvěma hodnoty
            app_service_1.AppService.emitServer(ServerEvents_enum_1.ServerEvents.SendAge, [yearOfBirth, yearOfBirth]);
        });
    }
}
exports.ExampleService = ExampleService;


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
const ServerEvents_enum_1 = __webpack_require__(/*! ../enums/ServerEvents.enum */ "./dev/enums/ServerEvents.enum.ts");
/*
    Třída UserService - je služba uživatelů, která se zabývá zpracováním logiky uživatelů
*/
class UserService {
    constructor() {
        this.watch = () => {
            $("#registerForm").on("submit", () => {
                const email = $("#newEmail").val();
                const password = $("#newPassword").val();
                const userData = {
                    email: email,
                    password: password,
                };
                sessionStorage.setItem("userData", JSON.stringify(userData));
            });
            $("#registerForm2").on("submit", () => {
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
            });
            $("#loginForm").on("submit", () => {
                const email = $("#email").val();
                const password = $("#password").val();
                app_service_1.AppService.emitServer(ServerEvents_enum_1.ServerEvents.LoginUser, [
                    email,
                    password
                ]);
            });
            $("#updateForm").on("submit", () => {
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
                    console.log(userID);
                    app_service_1.AppService.emitServer(ServerEvents_enum_1.ServerEvents.UpdateUser, [userID, key, value]);
                });
            });
        };
        this.login = (userID) => {
            if (!userID)
                return;
            sessionStorage.setItem("userID", userID);
            window.location.href = './main/index.html';
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QjtBQUNuQixzQkFBc0IsbUJBQU8sQ0FBQyw0Q0FBZ0I7QUFDOUMsNEJBQTRCLG1CQUFPLENBQUMsb0VBQTRCO0FBQ2hFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakIsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1COzs7Ozs7O1VDNUVuQjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7Ozs7Ozs7O0FDdEJhO0FBQ2IsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELHFCQUFxQixtQkFBTyxDQUFDLHlDQUFjO0FBQzNDLHNCQUFzQixtQkFBTyxDQUFDLDJDQUFlO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2RpZXRhcHBsaWNhdGlvbl9mcm9udGVuZC8uL2Rldi9hcHAubW9kdWxlLnRzIiwid2VicGFjazovL2RpZXRhcHBsaWNhdGlvbl9mcm9udGVuZC8uL2Rldi9hcHAuc2VydmljZS50cyIsIndlYnBhY2s6Ly9kaWV0YXBwbGljYXRpb25fZnJvbnRlbmQvLi9kZXYvZW51bXMvU2VydmVyRXZlbnRzLmVudW0udHMiLCJ3ZWJwYWNrOi8vZGlldGFwcGxpY2F0aW9uX2Zyb250ZW5kLy4vZGV2L2V4YW1wbGUvZXhhbXBsZS5jb250cm9sbGVyLnRzIiwid2VicGFjazovL2RpZXRhcHBsaWNhdGlvbl9mcm9udGVuZC8uL2Rldi9leGFtcGxlL2V4YW1wbGUubW9kdWxlLnRzIiwid2VicGFjazovL2RpZXRhcHBsaWNhdGlvbl9mcm9udGVuZC8uL2Rldi9leGFtcGxlL2V4YW1wbGUuc2VydmljZS50cyIsIndlYnBhY2s6Ly9kaWV0YXBwbGljYXRpb25fZnJvbnRlbmQvLi9kZXYvdXNlci91c2VyLmNvbnRyb2xsZXIudHMiLCJ3ZWJwYWNrOi8vZGlldGFwcGxpY2F0aW9uX2Zyb250ZW5kLy4vZGV2L3VzZXIvdXNlci5tb2R1bGUudHMiLCJ3ZWJwYWNrOi8vZGlldGFwcGxpY2F0aW9uX2Zyb250ZW5kLy4vZGV2L3VzZXIvdXNlci5zZXJ2aWNlLnRzIiwid2VicGFjazovL2RpZXRhcHBsaWNhdGlvbl9mcm9udGVuZC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9kaWV0YXBwbGljYXRpb25fZnJvbnRlbmQvLi9kZXYvbWFpbi50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuQXBwTW9kdWxlID0gdm9pZCAwO1xuY29uc3QgYXBwX3NlcnZpY2VfMSA9IHJlcXVpcmUoXCIuL2FwcC5zZXJ2aWNlXCIpO1xuY29uc3QgZXhhbXBsZV9tb2R1bGVfMSA9IHJlcXVpcmUoXCIuL2V4YW1wbGUvZXhhbXBsZS5tb2R1bGVcIik7XG5jb25zdCB1c2VyX21vZHVsZV8xID0gcmVxdWlyZShcIi4vdXNlci91c2VyLm1vZHVsZVwiKTtcbi8qXG4gICAgVMWZw61kYSBBcHBNb2R1bGUgLSBqZSB0xZnDrWRhIGhsw6F2bsOtaG8gbW9kdWx1IGFwbGlrYWNlLCBrdGVyw6Egc2UgemFiw712w6Egc3B1xaF0ZW7DrW0gdmVkbGVqxaHDrWNoIG1vZGzFry5cbiovXG5jbGFzcyBBcHBNb2R1bGUge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICAvLyBtZXRvZGEgc3B1xaF0xJtuw60gdmVkbGVqxaHDrWNoIG1vZHVsxa9cbiAgICAgICAgdGhpcy5pbml0TW9kdWxlcyA9ICgpID0+IHtcbiAgICAgICAgICAgIC8vIHZ5dHZvxZnDrSBzZSBwxZnDrWtsYWRvdsO9IG1vZHVsXG4gICAgICAgICAgICBuZXcgZXhhbXBsZV9tb2R1bGVfMS5FeGFtcGxlTW9kdWxlKCk7XG4gICAgICAgICAgICBuZXcgdXNlcl9tb2R1bGVfMS5Vc2VyTW9kdWxlKCk7XG4gICAgICAgIH07XG4gICAgICAgIC8vIHZ5dHZvxZnDrSBzbHXFvmJ1IGFwbGlrYWNlXG4gICAgICAgIG5ldyBhcHBfc2VydmljZV8xLkFwcFNlcnZpY2UoKTtcbiAgICAgICAgLy8gc3B1c3TDrSB2xaFlY2hueSB2ZWRsZWrFocOtIG1vZHVseVxuICAgICAgICB0aGlzLmluaXRNb2R1bGVzKCk7XG4gICAgfVxufVxuZXhwb3J0cy5BcHBNb2R1bGUgPSBBcHBNb2R1bGU7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfYTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuQXBwU2VydmljZSA9IHZvaWQgMDtcbi8qXG4gICAgVMWZw61kYSBBcHBTZXJ2aWNlIC0gamUgaGzDoXZuw60gc2x1xb5iYSBhcGxpa2FjZSwga3RlcsOhIHNlIHphYsO9dsOhIHpwcmFjb3bDoW7DrW0ga29tdW5pa2FjaSBqYWsgdXZuaXTFmSBmcm9udGVuZG92w70gYXBsaWthY2UsXG4gICAgdGFrIGkgdm7Em2rFocOtbWkga29tdW5rYWNlbWkgcyBrbGllbnRvdm91IGFwbGlrYWNpXG4qL1xuY2xhc3MgQXBwU2VydmljZSB7XG59XG5leHBvcnRzLkFwcFNlcnZpY2UgPSBBcHBTZXJ2aWNlO1xuX2EgPSBBcHBTZXJ2aWNlO1xuLy8gb2JqZWt0LCB2ZSBrdGVyw6ltIHNlIHVsb8W+w60gdm7Em2rFocOtIHNlcnZlcm92w6kgdWTDoWxvc3TDrVxuQXBwU2VydmljZS5zZXJ2ZXJFdmVudHMgPSB7fTtcbi8vIG1ldG9kYSByZWdpc3RyYWNlIGxva8OhbG7DrSB1ZMOhbG9zdMOtXG5BcHBTZXJ2aWNlLm9uID0gKGV2ZW50TmFtZSwgZnVuYykgPT4ge1xuICAgIC8vIG5hZGVmZW51amUga2zDrcSNIHYgcG9kb2LEmyBuw6F6dnUgdWTDoWxvc3TDrSBhIGhvZG5vdHUgdiBwb2RiZSBzcHXFoXTEm25vdSBmdW5rY2lcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoX2EuZXZlbnRzLCBldmVudE5hbWUsIHsgdmFsdWU6IGZ1bmMgfSk7XG59O1xuLy8gbWV0b2RhIHZ5dm9sw6Fuw60gbG9rw6FsbsOtIMO6ZGFsb3N0w61cbkFwcFNlcnZpY2UuZW1pdCA9IChldmVudE5hbWUsIGRhdGEpID0+IHtcbiAgICAvLyB6w61za8OhIHbFoWVjaG55IGtsw63EjWUgZXhpc3R1asOtY8OtaG8gb2JqZWt0dSBsb2vDoWxuw61jaCB1ZMOhbG9zdMOtXG4gICAgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoX2EuZXZlbnRzKS5mb3JFYWNoKChjdXJyZW50RXZlbnROYW1lKSA9PiB7XG4gICAgICAgIC8vIHDFmWV2ZWRlIGRvIHR5cHUgZW51bSB6IHTFmcOtZHkgdWTDoWxvc3TDrSBcbiAgICAgICAgY29uc3QgY3VycmVudEV2ZW50ID0gcGFyc2VJbnQoY3VycmVudEV2ZW50TmFtZSk7XG4gICAgICAgIC8vIHBva3VkIGplIHNvdcSNYXNuw70gbsOhemV2IGV2ZW50dSBqZSBzaG9kbsO9IHMgdnl2b2zDoW7DvW0sIHZ5dm9sw6EgcMWZw61zbHXFoW5vdSBmdW5rY2kgcyBwb3NreXRudXTDvW1pIGRhdHlcbiAgICAgICAgaWYgKGN1cnJlbnRFdmVudCAhPT0gZXZlbnROYW1lKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBfYS5ldmVudHNbY3VycmVudEV2ZW50XShkYXRhKTtcbiAgICB9KTtcbn07XG4vLyBtZXRvZGEgcmVnaXN0cmFjZSBzZXJ2ZXJvdsOpIHVkw6Fsb3N0w61cbkFwcFNlcnZpY2Uub25TZXJ2ZXIgPSAoZXZlbnROYW1lLCBmdW5jKSA9PiB7XG4gICAgLy8gbmFkZWZlbnVqZSBrbMOtxI0gdiBwb2RvYsSbIG7DoXp2dSB1ZMOhbG9zdMOtIGEgaG9kbm90dSB2IHBvZGJlIHNwdcWhdMSbbm91IGZ1bmtjaVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShfYS5zZXJ2ZXJFdmVudHMsIGV2ZW50TmFtZSwgeyB2YWx1ZTogZnVuYyB9KTtcbn07XG4vLyBtZXRvZGEgdnl2b2zDoW7DrSDDumRhbG9zdMOtIHplIHNlcnZlcnVcbkFwcFNlcnZpY2UuZW1pdENsaWVudCA9IChldmVudE5hbWUsIGRhdGEpID0+IHtcbiAgICAvLyB6w61za8OhIHbFoWVjaG55IGtsw63EjWUgZXhpc3R1asOtY8OtaG8gb2JqZWt0dSBzZXJ2ZXJvdsO9Y2ggdWTDoWxvc3TDrVxuICAgIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKF9hLnNlcnZlckV2ZW50cykuZm9yRWFjaCgoY3VycmVudFNlcnZlckV2ZW50TmFtZSkgPT4ge1xuICAgICAgICAvLyBwb2t1ZCBqZSBzb3XEjWFzbsO9IG7DoXpldiBldmVudHUgamUgc2hvZG7DvSBzIHZ5dm9sw6Fuw71tLCB2eXZvbMOhIHDFmcOtc2x1xaFub3UgZnVua2NpIHMgcG9za3l0bnV0w71taSBkYXR5XG4gICAgICAgIGNvbnNvbGUubG9nKGN1cnJlbnRTZXJ2ZXJFdmVudE5hbWUsIGV2ZW50TmFtZSwgZGF0YSk7XG4gICAgICAgIGlmIChjdXJyZW50U2VydmVyRXZlbnROYW1lICE9PSBldmVudE5hbWUpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIF9hLnNlcnZlckV2ZW50c1tjdXJyZW50U2VydmVyRXZlbnROYW1lXShkYXRhKTtcbiAgICB9KTtcbn07XG4vLyBtZXRvZGEgcHJvIHBvc8OtbGFuw60gZXZlbnR1IG5hIHNlcnZlclxuQXBwU2VydmljZS5lbWl0U2VydmVyID0gKGV2ZW50TmFtZSwgZGF0YSkgPT4ge1xuICAgIC8vIHphYmFsw60gcG9za3l0bnV0w6EgZGF0YSBkbyBudXRuw6kgcG9kb2J5XG4gICAgY29uc3QgZXZlbnREYXRhID0ge1xuICAgICAgICBkYXRhOiBkYXRhLFxuICAgIH07XG4gICAgLy8gdnl2b2zDoSB2IHBvc2t5dG51dMOpbSBLb3RsaW5vdm91IGFwbGlrYWPDrSBvYmpla3R1IChtb3N0xJspIG1ldG9kdSBwcm8gcG9zw61sw6Fuw60gZGF0IG5hIHNlcnZlclxuICAgIC8vIHDFmWV2ZWRlIHZ5dHZvxZllbsO9IG9iamVrdCB2IMWZw6FkZWsgdHlwdSBKU09OXG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIEFuZHJvaWRJbnRlcmZhY2UuZW1pdFNlcnZlcihldmVudE5hbWUsIEpTT04uc3RyaW5naWZ5KGV2ZW50RGF0YSkpO1xufTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5TZXJ2ZXJFdmVudHMgPSB2b2lkIDA7XG4vLyBvYmpla3Qgb2JzYWh1asOtY8OtIHVkw6Fsb3N0aSBwcm8ga29tdW5pa2FjaSBzZSBzZXJ2ZXJlbVxudmFyIFNlcnZlckV2ZW50cztcbihmdW5jdGlvbiAoU2VydmVyRXZlbnRzKSB7XG4gICAgU2VydmVyRXZlbnRzW1wiU2VuZEFnZVwiXSA9IFwidXNlci9zZW5kQWdlXCI7XG4gICAgU2VydmVyRXZlbnRzW1wiUmVnaXN0ZXJVc2VyXCJdID0gXCJ1c2VyL3NpZ251cFwiO1xuICAgIFNlcnZlckV2ZW50c1tcIkxvZ2luVXNlclwiXSA9IFwidXNlci9sb2dpblwiO1xuICAgIFNlcnZlckV2ZW50c1tcIlVwZGF0ZVVzZXJcIl0gPSBcInVzZXIvdXBkYXRlXCI7XG59KShTZXJ2ZXJFdmVudHMgfHwgKGV4cG9ydHMuU2VydmVyRXZlbnRzID0gU2VydmVyRXZlbnRzID0ge30pKTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5FeGFtcGxlQ29udHJvbGxlciA9IHZvaWQgMDtcbmNvbnN0IGFwcF9zZXJ2aWNlXzEgPSByZXF1aXJlKFwiLi4vYXBwLnNlcnZpY2VcIik7XG5jb25zdCBTZXJ2ZXJFdmVudHNfZW51bV8xID0gcmVxdWlyZShcIi4uL2VudW1zL1NlcnZlckV2ZW50cy5lbnVtXCIpO1xuLypcbiAgICBUxZnDrWRhIEV4YW1wbGVTZXJ2aWNlIC0gamUgc2x1xb5iYSBwxZnDrWtsYWR1LCBrdGVyw6Egc2UgemFiw712w6EgenByYWNvdsOhbsOtbSB6w6FrbGFkbsOtIGxvZ2lreSBwxZnDrWtsYWR1XG4qL1xuY2xhc3MgRXhhbXBsZUNvbnRyb2xsZXIge1xuICAgIGNvbnN0cnVjdG9yKGV4YW1wbGVTZXJ2aWNlKSB7XG4gICAgICAgIC8vIHByb23Em25uw6EgdmUga3RlcsOpIGplIHVsb8W+ZW7DoSBzbHXFvmJhIHDFmcOta2xhZG92w6lobyBiYWzDrcSNa3VcbiAgICAgICAgdGhpcy5leGFtcGxlU2VydmljZSA9IGV4YW1wbGVTZXJ2aWNlO1xuICAgICAgICAvLyB6YXJlZ2VzdHJ1amUgcG9zbHVoYcSNIHVkw6Fsb3N0w60gemUgc2VydmVydS4gXG4gICAgICAgIGFwcF9zZXJ2aWNlXzEuQXBwU2VydmljZS5vblNlcnZlcihTZXJ2ZXJFdmVudHNfZW51bV8xLlNlcnZlckV2ZW50cy5TZW5kQWdlLCAoYWdlKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmV4YW1wbGVTZXJ2aWNlLnNldEFnZShhZ2UpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5leHBvcnRzLkV4YW1wbGVDb250cm9sbGVyID0gRXhhbXBsZUNvbnRyb2xsZXI7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuRXhhbXBsZU1vZHVsZSA9IHZvaWQgMDtcbmNvbnN0IGV4YW1wbGVfY29udHJvbGxlcl8xID0gcmVxdWlyZShcIi4vZXhhbXBsZS5jb250cm9sbGVyXCIpO1xuY29uc3QgZXhhbXBsZV9zZXJ2aWNlXzEgPSByZXF1aXJlKFwiLi9leGFtcGxlLnNlcnZpY2VcIik7XG4vKlxuICAgIFTFmcOtZGEgRXhhbXBsZU1vZHVsZSAtIGplIHTFmcOtZGEgbW9kdWx1IHDFmcOta2xhZHUsIGt0ZXLDoSBzZSB6YWLDvXbDoSB2eXR2YcWZZW7DrW0gc2x1xb5ieSBhIHNwcsOhdmNlLlxuKi9cbmNsYXNzIEV4YW1wbGVNb2R1bGUge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICAvLyB2eXR2b8WZw60gbm92b3Ugc2x1xb5idSBwcm8gcMWZw61rbGFkXG4gICAgICAgIGNvbnN0IGV4YW1wbGVTZXJ2aWNlID0gbmV3IGV4YW1wbGVfc2VydmljZV8xLkV4YW1wbGVTZXJ2aWNlKCk7XG4gICAgICAgIC8vIHZ5dHZvxZnDrSBub3bDqWhvIHNwcsOhdmNlIHDFmcOta2xhZG92w6kgc2x1xb5ieVxuICAgICAgICBuZXcgZXhhbXBsZV9jb250cm9sbGVyXzEuRXhhbXBsZUNvbnRyb2xsZXIoZXhhbXBsZVNlcnZpY2UpO1xuICAgIH1cbn1cbmV4cG9ydHMuRXhhbXBsZU1vZHVsZSA9IEV4YW1wbGVNb2R1bGU7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuRXhhbXBsZVNlcnZpY2UgPSB2b2lkIDA7XG5jb25zdCBhcHBfc2VydmljZV8xID0gcmVxdWlyZShcIi4uL2FwcC5zZXJ2aWNlXCIpO1xuY29uc3QgU2VydmVyRXZlbnRzX2VudW1fMSA9IHJlcXVpcmUoXCIuLi9lbnVtcy9TZXJ2ZXJFdmVudHMuZW51bVwiKTtcbi8qXG4gICAgVMWZw61kYSBFeGFtcGxlU2VydmljZSAtIGplIHNsdcW+YmEgcMWZw61rbGFkdSwga3RlcsOhIHNlIHphYsO9dsOhIHpwcmFjb3bDoW7DrW0gesOha2xhZG7DrSBsb2dpa3kgcMWZw61rbGFkdVxuKi9cbmNsYXNzIEV4YW1wbGVTZXJ2aWNlIHtcbiAgICAvLyBtZXRvZGEgbmFzdGF2w60gcG9zbG91aGHEjSB1ZMOhbG9zdMOtIHDFmWkga2xpa251dMOtIHRsYcSNaXRrYVxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICAvLyBtZXRvZGEgbmFzdGF2w60gdsSbayBuYSBvYnJhem92Y2VcbiAgICAgICAgdGhpcy5zZXRBZ2UgPSAoYWdlKSA9PiB7XG4gICAgICAgICAgICAvLyBuYXN0YXbDrSB2IGVsZW1lbnR1IHMgaWQgXCJhZ2VcIiwgdGV4dG92w70gxZnDoWRlayB6w61za2Fuw6kgaG9kbm90eVxuICAgICAgICAgICAgJCgnI2FnZScpLnRleHQoYWdlKTtcbiAgICAgICAgfTtcbiAgICAgICAgLy8gbmFzdGF2ZW7DrSBwb3Nsb3VoYcSNZSB1ZMOhbG9zdMOtIGtsaWtudXTDrSBuYSB0bGHEjWl0a28gcyBpZCBcInN1Ym1pdFwiXG4gICAgICAgICQoXCIjc3VibWl0XCIpLmNsaWNrKCgpID0+IHtcbiAgICAgICAgICAgIC8vIHBvIGtsaWtudXTDrSB6w61za8OhIHogZWxlbWVudHUgcyBpZCBcImFnZUlucHV0XCIgaG9kbm90dVxuICAgICAgICAgICAgY29uc3QgeWVhck9mQmlydGggPSAkKFwiI2FnZUlucHV0XCIpLnZhbCgpO1xuICAgICAgICAgICAgLy8gdnl2b2zDoSBldmVudCBwb3PDrWzDoW7DrSBkYXQgbmEgc2VydmVyLiBQcm8gcMWZw61rbGFkIHBvc8OtbMOhIHNlIHBvbGUgcyBkdsSbbWEgaG9kbm90eVxuICAgICAgICAgICAgYXBwX3NlcnZpY2VfMS5BcHBTZXJ2aWNlLmVtaXRTZXJ2ZXIoU2VydmVyRXZlbnRzX2VudW1fMS5TZXJ2ZXJFdmVudHMuU2VuZEFnZSwgW3llYXJPZkJpcnRoLCB5ZWFyT2ZCaXJ0aF0pO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5leHBvcnRzLkV4YW1wbGVTZXJ2aWNlID0gRXhhbXBsZVNlcnZpY2U7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuVXNlckNvbnRyb2xsZXIgPSB2b2lkIDA7XG5jb25zdCBhcHBfc2VydmljZV8xID0gcmVxdWlyZShcIi4uL2FwcC5zZXJ2aWNlXCIpO1xuY29uc3QgU2VydmVyRXZlbnRzX2VudW1fMSA9IHJlcXVpcmUoXCIuLi9lbnVtcy9TZXJ2ZXJFdmVudHMuZW51bVwiKTtcbmNsYXNzIFVzZXJDb250cm9sbGVyIHtcbiAgICBjb25zdHJ1Y3Rvcih1c2VyU2VydmljZSkge1xuICAgICAgICB0aGlzLnVzZXJTZXJ2aWNlID0gdXNlclNlcnZpY2U7XG4gICAgICAgIGFwcF9zZXJ2aWNlXzEuQXBwU2VydmljZS5vblNlcnZlcihTZXJ2ZXJFdmVudHNfZW51bV8xLlNlcnZlckV2ZW50cy5Mb2dpblVzZXIsICh1c2VySUQpID0+IHtcbiAgICAgICAgICAgIHRoaXMudXNlclNlcnZpY2UubG9naW4odXNlcklEKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuZXhwb3J0cy5Vc2VyQ29udHJvbGxlciA9IFVzZXJDb250cm9sbGVyO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLlVzZXJNb2R1bGUgPSB2b2lkIDA7XG5jb25zdCB1c2VyX2NvbnRyb2xsZXJfMSA9IHJlcXVpcmUoXCIuL3VzZXIuY29udHJvbGxlclwiKTtcbmNvbnN0IHVzZXJfc2VydmljZV8xID0gcmVxdWlyZShcIi4vdXNlci5zZXJ2aWNlXCIpO1xuY2xhc3MgVXNlck1vZHVsZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIGNvbnN0IHVzZXJTZXJ2aWNlID0gbmV3IHVzZXJfc2VydmljZV8xLlVzZXJTZXJ2aWNlKCk7XG4gICAgICAgIG5ldyB1c2VyX2NvbnRyb2xsZXJfMS5Vc2VyQ29udHJvbGxlcih1c2VyU2VydmljZSk7XG4gICAgfVxufVxuZXhwb3J0cy5Vc2VyTW9kdWxlID0gVXNlck1vZHVsZTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5Vc2VyU2VydmljZSA9IHZvaWQgMDtcbmNvbnN0IGFwcF9zZXJ2aWNlXzEgPSByZXF1aXJlKFwiLi4vYXBwLnNlcnZpY2VcIik7XG5jb25zdCBTZXJ2ZXJFdmVudHNfZW51bV8xID0gcmVxdWlyZShcIi4uL2VudW1zL1NlcnZlckV2ZW50cy5lbnVtXCIpO1xuLypcbiAgICBUxZnDrWRhIFVzZXJTZXJ2aWNlIC0gamUgc2x1xb5iYSB1xb5pdmF0ZWzFrywga3RlcsOhIHNlIHphYsO9dsOhIHpwcmFjb3bDoW7DrW0gbG9naWt5IHXFvml2YXRlbMWvXG4qL1xuY2xhc3MgVXNlclNlcnZpY2Uge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLndhdGNoID0gKCkgPT4ge1xuICAgICAgICAgICAgJChcIiNyZWdpc3RlckZvcm1cIikub24oXCJzdWJtaXRcIiwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGVtYWlsID0gJChcIiNuZXdFbWFpbFwiKS52YWwoKTtcbiAgICAgICAgICAgICAgICBjb25zdCBwYXNzd29yZCA9ICQoXCIjbmV3UGFzc3dvcmRcIikudmFsKCk7XG4gICAgICAgICAgICAgICAgY29uc3QgdXNlckRhdGEgPSB7XG4gICAgICAgICAgICAgICAgICAgIGVtYWlsOiBlbWFpbCxcbiAgICAgICAgICAgICAgICAgICAgcGFzc3dvcmQ6IHBhc3N3b3JkLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShcInVzZXJEYXRhXCIsIEpTT04uc3RyaW5naWZ5KHVzZXJEYXRhKSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICQoXCIjcmVnaXN0ZXJGb3JtMlwiKS5vbihcInN1Ym1pdFwiLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgdXNlckRhdGFTdHJpbmcgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFwidXNlckRhdGFcIik7XG4gICAgICAgICAgICAgICAgaWYgKCF1c2VyRGF0YVN0cmluZylcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIGNvbnN0IHVzZXJEYXRhID0gSlNPTi5wYXJzZSh1c2VyRGF0YVN0cmluZyk7XG4gICAgICAgICAgICAgICAgY29uc3QgZ2VuZGVyID0gJChcIiNnZW5kZXJcIikudmFsKCk7XG4gICAgICAgICAgICAgICAgY29uc3QgaGVpZ2h0ID0gJChcIiNoZWlnaHRcIikudmFsKCk7XG4gICAgICAgICAgICAgICAgY29uc3Qgd2VpZ2h0ID0gJChcIiN3ZWlnaHRcIikudmFsKCk7XG4gICAgICAgICAgICAgICAgY29uc3QgZGF0ZU9mQmlydGggPSAkKFwiI2RhdGVPZkJpcnRoXCIpLnZhbCgpO1xuICAgICAgICAgICAgICAgIGFwcF9zZXJ2aWNlXzEuQXBwU2VydmljZS5lbWl0U2VydmVyKFNlcnZlckV2ZW50c19lbnVtXzEuU2VydmVyRXZlbnRzLlJlZ2lzdGVyVXNlciwgW1xuICAgICAgICAgICAgICAgICAgICB1c2VyRGF0YS5lbWFpbCxcbiAgICAgICAgICAgICAgICAgICAgdXNlckRhdGEucGFzc3dvcmQsXG4gICAgICAgICAgICAgICAgICAgIGdlbmRlcixcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0LFxuICAgICAgICAgICAgICAgICAgICB3ZWlnaHQsXG4gICAgICAgICAgICAgICAgICAgIGRhdGVPZkJpcnRoXG4gICAgICAgICAgICAgICAgXSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICQoXCIjbG9naW5Gb3JtXCIpLm9uKFwic3VibWl0XCIsICgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBlbWFpbCA9ICQoXCIjZW1haWxcIikudmFsKCk7XG4gICAgICAgICAgICAgICAgY29uc3QgcGFzc3dvcmQgPSAkKFwiI3Bhc3N3b3JkXCIpLnZhbCgpO1xuICAgICAgICAgICAgICAgIGFwcF9zZXJ2aWNlXzEuQXBwU2VydmljZS5lbWl0U2VydmVyKFNlcnZlckV2ZW50c19lbnVtXzEuU2VydmVyRXZlbnRzLkxvZ2luVXNlciwgW1xuICAgICAgICAgICAgICAgICAgICBlbWFpbCxcbiAgICAgICAgICAgICAgICAgICAgcGFzc3dvcmRcbiAgICAgICAgICAgICAgICBdKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgJChcIiN1cGRhdGVGb3JtXCIpLm9uKFwic3VibWl0XCIsICgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCB0b1VwZGF0ZSA9IHtcbiAgICAgICAgICAgICAgICAgICAgXCJnZW5kZXJcIjogJChcIiNnZW5kZXJcIikudmFsKCkgfHwgdW5kZWZpbmVkLFxuICAgICAgICAgICAgICAgICAgICBcImhlaWdodFwiOiAkKFwiI2hlaWdodFwiKS52YWwoKSB8fCB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgICAgIFwid2VpZ2h0XCI6ICQoXCIjd2VpZ2h0XCIpLnZhbCgpIHx8IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICAgICAgXCJkYXRlXCI6ICQoXCIjZGF0ZVwiKS52YWwoKSB8fCB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgICAgIFwiYWxlcmdpZXNcIjogJChcIiNhbGVyZ2llc1wiKS52YWwoKSB8fCB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBPYmplY3QuZW50cmllcyh0b1VwZGF0ZSkuZm9yRWFjaCgoZW50cnkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qga2V5ID0gZW50cnlbMF07XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gZW50cnlbMV07XG4gICAgICAgICAgICAgICAgICAgIGlmICghdmFsdWUpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHVzZXJJRCA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJ1c2VySURcIik7XG4gICAgICAgICAgICAgICAgICAgIGlmICghdXNlcklEKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh1c2VySUQpO1xuICAgICAgICAgICAgICAgICAgICBhcHBfc2VydmljZV8xLkFwcFNlcnZpY2UuZW1pdFNlcnZlcihTZXJ2ZXJFdmVudHNfZW51bV8xLlNlcnZlckV2ZW50cy5VcGRhdGVVc2VyLCBbdXNlcklELCBrZXksIHZhbHVlXSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5sb2dpbiA9ICh1c2VySUQpID0+IHtcbiAgICAgICAgICAgIGlmICghdXNlcklEKVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oXCJ1c2VySURcIiwgdXNlcklEKTtcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJy4vbWFpbi9pbmRleC5odG1sJztcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy53YXRjaCgpO1xuICAgIH1cbn1cbmV4cG9ydHMuVXNlclNlcnZpY2UgPSBVc2VyU2VydmljZTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGFwcF9tb2R1bGVfMSA9IHJlcXVpcmUoXCIuL2FwcC5tb2R1bGVcIik7XG5jb25zdCBhcHBfc2VydmljZV8xID0gcmVxdWlyZShcIi4vYXBwLnNlcnZpY2VcIik7XG4vKiBKZWxpa2/FviBtaW5pZmlrdWplbWUgdsWhZWNoZW4ganMga8OzZCwgdsSNZXRuxJsgbsOhenbFryBwcm9txJtubsO9Y2ggayBuZXBvem5hbsOtLFxuKiBwb3TFmWVidWplbWUgcHJvIGtvbXVuaWtvdsOhbsOtIHMgS290bGluZW0sIHJlc3AuIHBybyB6w61za2Fuw60geiBuxJtobyBkYXQsXG4qIG7Em2pha291IHDFmWVkZW0gbmFzdGF2ZW5vdSBnbG9iw6FsbsOtIG1ldG9kdSBzIGtvbnN0YW50bsOtbSBuw6F6dmVtLiBQcmF2xJsgcHJvdG9cbiogZG8gZ2xvYsOhbG7DrWhvIG9iamVrdHUgd2luZG93LCBrdGVyw70gamUgc291xI1hc3TDrSBqYWvDqWhva29saXYgcHJvaGzDrcW+ZcSNZSBqZSxcbiogamUgbmFzdGF2ZW7DoSB0YXRvIG1ldG9kYSwga3RlcsOhIG5ldWTEm2zDoSBuaWMgamluw6lobywgbmXFviBwxZllZMOhIGRhdGEgayB6cHJhY292bsOhbsOtIGFwbGlrYWNpXG4qL1xuLy8gQHRzLWlnbm9yZVxud2luZG93LmdldERhdGEgPSAoZXZlbnROYW1lLCBkYXRhKSA9PiB7XG4gICAgYXBwX3NlcnZpY2VfMS5BcHBTZXJ2aWNlLmVtaXRDbGllbnQoZXZlbnROYW1lLCBkYXRhKTtcbn07XG4vLyBzcHXFoXTEm27DrSBobMOhdm7DrWhvIG1vZHVsdSBhcGxpa2FjZVxubmV3IGFwcF9tb2R1bGVfMS5BcHBNb2R1bGUoKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==