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
        app_service_1.AppService.onServer(ServerEvents_enum_1.ServerEvents.SENDAGE, (age) => {
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
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserController = void 0;
class UserController {
    constructor(userService) {
        this.userService = userService;
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
        this.userData = {};
        this.watch = () => {
            $("#registerForm").on("submit", () => {
                this.userData.email = $("#newEmail").val();
                this.userData.password = $("#newPassword").val();
            });
            $("#registerForm2").on("submit", () => {
                if (!this.userData.email)
                    return;
                const gender = $("#gender").val();
                const height = $("#height").val();
                const weight = $("#weight").val();
                const dateOfBirth = $("#dateOfBirth").val();
                app_service_1.AppService.emitServer(ServerEvents_enum_1.ServerEvents.RegisterUser, [
                    this.userData.email,
                    this.userData.password,
                    gender,
                    height,
                    weight,
                    dateOfBirth
                ]);
            });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQjs7Ozs7OztVQ3BDbkI7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7Ozs7OztBQ3RCYTtBQUNiLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCxxQkFBcUIsbUJBQU8sQ0FBQyx5Q0FBYztBQUMzQyxzQkFBc0IsbUJBQU8sQ0FBQywyQ0FBZTtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kaWV0YXBwbGljYXRpb25fZnJvbnRlbmQvLi9kZXYvYXBwLm1vZHVsZS50cyIsIndlYnBhY2s6Ly9kaWV0YXBwbGljYXRpb25fZnJvbnRlbmQvLi9kZXYvYXBwLnNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vZGlldGFwcGxpY2F0aW9uX2Zyb250ZW5kLy4vZGV2L2VudW1zL1NlcnZlckV2ZW50cy5lbnVtLnRzIiwid2VicGFjazovL2RpZXRhcHBsaWNhdGlvbl9mcm9udGVuZC8uL2Rldi9leGFtcGxlL2V4YW1wbGUuY29udHJvbGxlci50cyIsIndlYnBhY2s6Ly9kaWV0YXBwbGljYXRpb25fZnJvbnRlbmQvLi9kZXYvZXhhbXBsZS9leGFtcGxlLm1vZHVsZS50cyIsIndlYnBhY2s6Ly9kaWV0YXBwbGljYXRpb25fZnJvbnRlbmQvLi9kZXYvZXhhbXBsZS9leGFtcGxlLnNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vZGlldGFwcGxpY2F0aW9uX2Zyb250ZW5kLy4vZGV2L3VzZXIvdXNlci5jb250cm9sbGVyLnRzIiwid2VicGFjazovL2RpZXRhcHBsaWNhdGlvbl9mcm9udGVuZC8uL2Rldi91c2VyL3VzZXIubW9kdWxlLnRzIiwid2VicGFjazovL2RpZXRhcHBsaWNhdGlvbl9mcm9udGVuZC8uL2Rldi91c2VyL3VzZXIuc2VydmljZS50cyIsIndlYnBhY2s6Ly9kaWV0YXBwbGljYXRpb25fZnJvbnRlbmQvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vZGlldGFwcGxpY2F0aW9uX2Zyb250ZW5kLy4vZGV2L21haW4udHMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkFwcE1vZHVsZSA9IHZvaWQgMDtcbmNvbnN0IGFwcF9zZXJ2aWNlXzEgPSByZXF1aXJlKFwiLi9hcHAuc2VydmljZVwiKTtcbmNvbnN0IGV4YW1wbGVfbW9kdWxlXzEgPSByZXF1aXJlKFwiLi9leGFtcGxlL2V4YW1wbGUubW9kdWxlXCIpO1xuY29uc3QgdXNlcl9tb2R1bGVfMSA9IHJlcXVpcmUoXCIuL3VzZXIvdXNlci5tb2R1bGVcIik7XG4vKlxuICAgIFTFmcOtZGEgQXBwTW9kdWxlIC0gamUgdMWZw61kYSBobMOhdm7DrWhvIG1vZHVsdSBhcGxpa2FjZSwga3RlcsOhIHNlIHphYsO9dsOhIHNwdcWhdGVuw61tIHZlZGxlasWhw61jaCBtb2Rsxa8uXG4qL1xuY2xhc3MgQXBwTW9kdWxlIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgLy8gbWV0b2RhIHNwdcWhdMSbbsOtIHZlZGxlasWhw61jaCBtb2R1bMWvXG4gICAgICAgIHRoaXMuaW5pdE1vZHVsZXMgPSAoKSA9PiB7XG4gICAgICAgICAgICAvLyB2eXR2b8WZw60gc2UgcMWZw61rbGFkb3bDvSBtb2R1bFxuICAgICAgICAgICAgbmV3IGV4YW1wbGVfbW9kdWxlXzEuRXhhbXBsZU1vZHVsZSgpO1xuICAgICAgICAgICAgbmV3IHVzZXJfbW9kdWxlXzEuVXNlck1vZHVsZSgpO1xuICAgICAgICB9O1xuICAgICAgICAvLyB2eXR2b8WZw60gc2x1xb5idSBhcGxpa2FjZVxuICAgICAgICBuZXcgYXBwX3NlcnZpY2VfMS5BcHBTZXJ2aWNlKCk7XG4gICAgICAgIC8vIHNwdXN0w60gdsWhZWNobnkgdmVkbGVqxaHDrSBtb2R1bHlcbiAgICAgICAgdGhpcy5pbml0TW9kdWxlcygpO1xuICAgIH1cbn1cbmV4cG9ydHMuQXBwTW9kdWxlID0gQXBwTW9kdWxlO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX2E7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkFwcFNlcnZpY2UgPSB2b2lkIDA7XG4vKlxuICAgIFTFmcOtZGEgQXBwU2VydmljZSAtIGplIGhsw6F2bsOtIHNsdcW+YmEgYXBsaWthY2UsIGt0ZXLDoSBzZSB6YWLDvXbDoSB6cHJhY292w6Fuw61tIGtvbXVuaWthY2kgamFrIHV2bml0xZkgZnJvbnRlbmRvdsO9IGFwbGlrYWNlLFxuICAgIHRhayBpIHZuxJtqxaHDrW1pIGtvbXVua2FjZW1pIHMga2xpZW50b3ZvdSBhcGxpa2FjaVxuKi9cbmNsYXNzIEFwcFNlcnZpY2Uge1xufVxuZXhwb3J0cy5BcHBTZXJ2aWNlID0gQXBwU2VydmljZTtcbl9hID0gQXBwU2VydmljZTtcbi8vIG9iamVrdCwgdmUga3RlcsOpbSBzZSB1bG/FvsOtIHphcmVnaXN0cm92w6Fuw6kgbG9rw6FsbsOtIHVkw6Fsb3N0w60gXG5BcHBTZXJ2aWNlLmV2ZW50cyA9IHt9O1xuLy8gb2JqZWt0LCB2ZSBrdGVyw6ltIHNlIHVsb8W+w60gdm7Em2rFocOtIHNlcnZlcm92w6kgdWTDoWxvc3TDrVxuQXBwU2VydmljZS5zZXJ2ZXJFdmVudHMgPSB7fTtcbi8vIG1ldG9kYSByZWdpc3RyYWNlIGxva8OhbG7DrSB1ZMOhbG9zdMOtXG5BcHBTZXJ2aWNlLm9uID0gKGV2ZW50TmFtZSwgZnVuYykgPT4ge1xuICAgIC8vIG5hZGVmZW51amUga2zDrcSNIHYgcG9kb2LEmyBuw6F6dnUgdWTDoWxvc3TDrSBhIGhvZG5vdHUgdiBwb2RiZSBzcHXFoXTEm25vdSBmdW5rY2lcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoX2EuZXZlbnRzLCBldmVudE5hbWUsIHsgdmFsdWU6IGZ1bmMgfSk7XG59O1xuLy8gbWV0b2RhIHZ5dm9sw6Fuw60gbG9rw6FsbsOtIMO6ZGFsb3N0w61cbkFwcFNlcnZpY2UuZW1pdCA9IChldmVudE5hbWUsIGRhdGEpID0+IHtcbiAgICAvLyB6w61za8OhIHbFoWVjaG55IGtsw63EjWUgZXhpc3R1asOtY8OtaG8gb2JqZWt0dSBsb2vDoWxuw61jaCB1ZMOhbG9zdMOtXG4gICAgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoX2EuZXZlbnRzKS5mb3JFYWNoKChjdXJyZW50RXZlbnROYW1lKSA9PiB7XG4gICAgICAgIC8vIHDFmWV2ZWRlIGRvIHR5cHUgZW51bSB6IHTFmcOtZHkgdWTDoWxvc3TDrSBcbiAgICAgICAgY29uc3QgY3VycmVudEV2ZW50ID0gcGFyc2VJbnQoY3VycmVudEV2ZW50TmFtZSk7XG4gICAgICAgIC8vIHBva3VkIGplIHNvdcSNYXNuw70gbsOhemV2IGV2ZW50dSBqZSBzaG9kbsO9IHMgdnl2b2zDoW7DvW0sIHZ5dm9sw6EgcMWZw61zbHXFoW5vdSBmdW5rY2kgcyBwb3NreXRudXTDvW1pIGRhdHlcbiAgICAgICAgaWYgKGN1cnJlbnRFdmVudCAhPT0gZXZlbnROYW1lKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBfYS5ldmVudHNbY3VycmVudEV2ZW50XShkYXRhKTtcbiAgICB9KTtcbn07XG4vLyBtZXRvZGEgcmVnaXN0cmFjZSBzZXJ2ZXJvdsOpIHVkw6Fsb3N0w61cbkFwcFNlcnZpY2Uub25TZXJ2ZXIgPSAoZXZlbnROYW1lLCBmdW5jKSA9PiB7XG4gICAgLy8gbmFkZWZlbnVqZSBrbMOtxI0gdiBwb2RvYsSbIG7DoXp2dSB1ZMOhbG9zdMOtIGEgaG9kbm90dSB2IHBvZGJlIHNwdcWhdMSbbm91IGZ1bmtjaVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShfYS5zZXJ2ZXJFdmVudHMsIGV2ZW50TmFtZSwgeyB2YWx1ZTogZnVuYyB9KTtcbn07XG4vLyBtZXRvZGEgdnl2b2zDoW7DrSDDumRhbG9zdMOtIHplIHNlcnZlcnVcbkFwcFNlcnZpY2UuZW1pdENsaWVudCA9IChldmVudE5hbWUsIGRhdGEpID0+IHtcbiAgICAvLyB6w61za8OhIHbFoWVjaG55IGtsw63EjWUgZXhpc3R1asOtY8OtaG8gb2JqZWt0dSBzZXJ2ZXJvdsO9Y2ggdWTDoWxvc3TDrVxuICAgIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKF9hLnNlcnZlckV2ZW50cykuZm9yRWFjaCgoY3VycmVudFNlcnZlckV2ZW50TmFtZSkgPT4ge1xuICAgICAgICAvLyBwb2t1ZCBqZSBzb3XEjWFzbsO9IG7DoXpldiBldmVudHUgamUgc2hvZG7DvSBzIHZ5dm9sw6Fuw71tLCB2eXZvbMOhIHDFmcOtc2x1xaFub3UgZnVua2NpIHMgcG9za3l0bnV0w71taSBkYXR5XG4gICAgICAgIGlmIChjdXJyZW50U2VydmVyRXZlbnROYW1lICE9PSBldmVudE5hbWUpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIF9hLnNlcnZlckV2ZW50c1tjdXJyZW50U2VydmVyRXZlbnROYW1lXShkYXRhKTtcbiAgICB9KTtcbn07XG4vLyBtZXRvZGEgcHJvIHBvc8OtbGFuw60gZXZlbnR1IG5hIHNlcnZlclxuQXBwU2VydmljZS5lbWl0U2VydmVyID0gKGV2ZW50TmFtZSwgZGF0YSkgPT4ge1xuICAgIC8vIHphYmFsw60gcG9za3l0bnV0w6EgZGF0YSBkbyBudXRuw6kgcG9kb2J5XG4gICAgY29uc3QgZXZlbnREYXRhID0ge1xuICAgICAgICBkYXRhOiBkYXRhLFxuICAgIH07XG4gICAgLy8gdnl2b2zDoSB2IHBvc2t5dG51dMOpbSBLb3RsaW5vdm91IGFwbGlrYWPDrSBvYmpla3R1IChtb3N0xJspIG1ldG9kdSBwcm8gcG9zw61sw6Fuw60gZGF0IG5hIHNlcnZlclxuICAgIC8vIHDFmWV2ZWRlIHZ5dHZvxZllbsO9IG9iamVrdCB2IMWZw6FkZWsgdHlwdSBKU09OXG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIEFuZHJvaWRJbnRlcmZhY2UuZW1pdFNlcnZlcihldmVudE5hbWUsIEpTT04uc3RyaW5naWZ5KGV2ZW50RGF0YSkpO1xufTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5TZXJ2ZXJFdmVudHMgPSB2b2lkIDA7XG4vLyBvYmpla3Qgb2JzYWh1asOtY8OtIHVkw6Fsb3N0aSBwcm8ga29tdW5pa2FjaSBzZSBzZXJ2ZXJlbVxudmFyIFNlcnZlckV2ZW50cztcbihmdW5jdGlvbiAoU2VydmVyRXZlbnRzKSB7XG4gICAgU2VydmVyRXZlbnRzW1wiU2VuZEFnZVwiXSA9IFwidXNlci9zZW5kQWdlXCI7XG4gICAgU2VydmVyRXZlbnRzW1wiUmVnaXN0ZXJVc2VyXCJdID0gXCJ1c2VyL3NpZ251cFwiO1xufSkoU2VydmVyRXZlbnRzIHx8IChleHBvcnRzLlNlcnZlckV2ZW50cyA9IFNlcnZlckV2ZW50cyA9IHt9KSk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuRXhhbXBsZUNvbnRyb2xsZXIgPSB2b2lkIDA7XG5jb25zdCBhcHBfc2VydmljZV8xID0gcmVxdWlyZShcIi4uL2FwcC5zZXJ2aWNlXCIpO1xuY29uc3QgU2VydmVyRXZlbnRzX2VudW1fMSA9IHJlcXVpcmUoXCIuLi9lbnVtcy9TZXJ2ZXJFdmVudHMuZW51bVwiKTtcbi8qXG4gICAgVMWZw61kYSBFeGFtcGxlU2VydmljZSAtIGplIHNsdcW+YmEgcMWZw61rbGFkdSwga3RlcsOhIHNlIHphYsO9dsOhIHpwcmFjb3bDoW7DrW0gesOha2xhZG7DrSBsb2dpa3kgcMWZw61rbGFkdVxuKi9cbmNsYXNzIEV4YW1wbGVDb250cm9sbGVyIHtcbiAgICBjb25zdHJ1Y3RvcihleGFtcGxlU2VydmljZSkge1xuICAgICAgICAvLyBwcm9txJtubsOhIHZlIGt0ZXLDqSBqZSB1bG/FvmVuw6Egc2x1xb5iYSBwxZnDrWtsYWRvdsOpaG8gYmFsw63EjWt1XG4gICAgICAgIHRoaXMuZXhhbXBsZVNlcnZpY2UgPSBleGFtcGxlU2VydmljZTtcbiAgICAgICAgLy8gemFyZWdlc3RydWplIHBvc2x1aGHEjSB1ZMOhbG9zdMOtIHplIHNlcnZlcnUuIFxuICAgICAgICBhcHBfc2VydmljZV8xLkFwcFNlcnZpY2Uub25TZXJ2ZXIoU2VydmVyRXZlbnRzX2VudW1fMS5TZXJ2ZXJFdmVudHMuU0VOREFHRSwgKGFnZSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5leGFtcGxlU2VydmljZS5zZXRBZ2UoYWdlKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuZXhwb3J0cy5FeGFtcGxlQ29udHJvbGxlciA9IEV4YW1wbGVDb250cm9sbGVyO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkV4YW1wbGVNb2R1bGUgPSB2b2lkIDA7XG5jb25zdCBleGFtcGxlX2NvbnRyb2xsZXJfMSA9IHJlcXVpcmUoXCIuL2V4YW1wbGUuY29udHJvbGxlclwiKTtcbmNvbnN0IGV4YW1wbGVfc2VydmljZV8xID0gcmVxdWlyZShcIi4vZXhhbXBsZS5zZXJ2aWNlXCIpO1xuLypcbiAgICBUxZnDrWRhIEV4YW1wbGVNb2R1bGUgLSBqZSB0xZnDrWRhIG1vZHVsdSBwxZnDrWtsYWR1LCBrdGVyw6Egc2UgemFiw712w6Egdnl0dmHFmWVuw61tIHNsdcW+YnkgYSBzcHLDoXZjZS5cbiovXG5jbGFzcyBFeGFtcGxlTW9kdWxlIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgLy8gdnl0dm/FmcOtIG5vdm91IHNsdcW+YnUgcHJvIHDFmcOta2xhZFxuICAgICAgICBjb25zdCBleGFtcGxlU2VydmljZSA9IG5ldyBleGFtcGxlX3NlcnZpY2VfMS5FeGFtcGxlU2VydmljZSgpO1xuICAgICAgICAvLyB2eXR2b8WZw60gbm92w6lobyBzcHLDoXZjZSBwxZnDrWtsYWRvdsOpIHNsdcW+YnlcbiAgICAgICAgbmV3IGV4YW1wbGVfY29udHJvbGxlcl8xLkV4YW1wbGVDb250cm9sbGVyKGV4YW1wbGVTZXJ2aWNlKTtcbiAgICB9XG59XG5leHBvcnRzLkV4YW1wbGVNb2R1bGUgPSBFeGFtcGxlTW9kdWxlO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkV4YW1wbGVTZXJ2aWNlID0gdm9pZCAwO1xuY29uc3QgYXBwX3NlcnZpY2VfMSA9IHJlcXVpcmUoXCIuLi9hcHAuc2VydmljZVwiKTtcbmNvbnN0IFNlcnZlckV2ZW50c19lbnVtXzEgPSByZXF1aXJlKFwiLi4vZW51bXMvU2VydmVyRXZlbnRzLmVudW1cIik7XG4vKlxuICAgIFTFmcOtZGEgRXhhbXBsZVNlcnZpY2UgLSBqZSBzbHXFvmJhIHDFmcOta2xhZHUsIGt0ZXLDoSBzZSB6YWLDvXbDoSB6cHJhY292w6Fuw61tIHrDoWtsYWRuw60gbG9naWt5IHDFmcOta2xhZHVcbiovXG5jbGFzcyBFeGFtcGxlU2VydmljZSB7XG4gICAgLy8gbWV0b2RhIG5hc3RhdsOtIHBvc2xvdWhhxI0gdWTDoWxvc3TDrSBwxZlpIGtsaWtudXTDrSB0bGHEjWl0a2FcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgLy8gbWV0b2RhIG5hc3RhdsOtIHbEm2sgbmEgb2JyYXpvdmNlXG4gICAgICAgIHRoaXMuc2V0QWdlID0gKGFnZSkgPT4ge1xuICAgICAgICAgICAgLy8gbmFzdGF2w60gdiBlbGVtZW50dSBzIGlkIFwiYWdlXCIsIHRleHRvdsO9IMWZw6FkZWsgesOtc2thbsOpIGhvZG5vdHlcbiAgICAgICAgICAgICQoJyNhZ2UnKS50ZXh0KGFnZSk7XG4gICAgICAgIH07XG4gICAgICAgIC8vIG5hc3RhdmVuw60gcG9zbG91aGHEjWUgdWTDoWxvc3TDrSBrbGlrbnV0w60gbmEgdGxhxI1pdGtvIHMgaWQgXCJzdWJtaXRcIlxuICAgICAgICAkKFwiI3N1Ym1pdFwiKS5jbGljaygoKSA9PiB7XG4gICAgICAgICAgICAvLyBwbyBrbGlrbnV0w60gesOtc2vDoSB6IGVsZW1lbnR1IHMgaWQgXCJhZ2VJbnB1dFwiIGhvZG5vdHVcbiAgICAgICAgICAgIGNvbnN0IHllYXJPZkJpcnRoID0gJChcIiNhZ2VJbnB1dFwiKS52YWwoKTtcbiAgICAgICAgICAgIC8vIHZ5dm9sw6EgZXZlbnQgcG9zw61sw6Fuw60gZGF0IG5hIHNlcnZlci4gUHJvIHDFmcOta2xhZCBwb3PDrWzDoSBzZSBwb2xlIHMgZHbEm21hIGhvZG5vdHlcbiAgICAgICAgICAgIGFwcF9zZXJ2aWNlXzEuQXBwU2VydmljZS5lbWl0U2VydmVyKFNlcnZlckV2ZW50c19lbnVtXzEuU2VydmVyRXZlbnRzLlNlbmRBZ2UsIFt5ZWFyT2ZCaXJ0aCwgeWVhck9mQmlydGhdKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuZXhwb3J0cy5FeGFtcGxlU2VydmljZSA9IEV4YW1wbGVTZXJ2aWNlO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLlVzZXJDb250cm9sbGVyID0gdm9pZCAwO1xuY2xhc3MgVXNlckNvbnRyb2xsZXIge1xuICAgIGNvbnN0cnVjdG9yKHVzZXJTZXJ2aWNlKSB7XG4gICAgICAgIHRoaXMudXNlclNlcnZpY2UgPSB1c2VyU2VydmljZTtcbiAgICB9XG59XG5leHBvcnRzLlVzZXJDb250cm9sbGVyID0gVXNlckNvbnRyb2xsZXI7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuVXNlck1vZHVsZSA9IHZvaWQgMDtcbmNvbnN0IHVzZXJfY29udHJvbGxlcl8xID0gcmVxdWlyZShcIi4vdXNlci5jb250cm9sbGVyXCIpO1xuY29uc3QgdXNlcl9zZXJ2aWNlXzEgPSByZXF1aXJlKFwiLi91c2VyLnNlcnZpY2VcIik7XG5jbGFzcyBVc2VyTW9kdWxlIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgY29uc3QgdXNlclNlcnZpY2UgPSBuZXcgdXNlcl9zZXJ2aWNlXzEuVXNlclNlcnZpY2UoKTtcbiAgICAgICAgbmV3IHVzZXJfY29udHJvbGxlcl8xLlVzZXJDb250cm9sbGVyKHVzZXJTZXJ2aWNlKTtcbiAgICB9XG59XG5leHBvcnRzLlVzZXJNb2R1bGUgPSBVc2VyTW9kdWxlO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLlVzZXJTZXJ2aWNlID0gdm9pZCAwO1xuY29uc3QgYXBwX3NlcnZpY2VfMSA9IHJlcXVpcmUoXCIuLi9hcHAuc2VydmljZVwiKTtcbmNvbnN0IFNlcnZlckV2ZW50c19lbnVtXzEgPSByZXF1aXJlKFwiLi4vZW51bXMvU2VydmVyRXZlbnRzLmVudW1cIik7XG4vKlxuICAgIFTFmcOtZGEgVXNlclNlcnZpY2UgLSBqZSBzbHXFvmJhIHXFvml2YXRlbMWvLCBrdGVyw6Egc2UgemFiw712w6EgenByYWNvdsOhbsOtbSBsb2dpa3kgdcW+aXZhdGVsxa9cbiovXG5jbGFzcyBVc2VyU2VydmljZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMudXNlckRhdGEgPSB7fTtcbiAgICAgICAgdGhpcy53YXRjaCA9ICgpID0+IHtcbiAgICAgICAgICAgICQoXCIjcmVnaXN0ZXJGb3JtXCIpLm9uKFwic3VibWl0XCIsICgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnVzZXJEYXRhLmVtYWlsID0gJChcIiNuZXdFbWFpbFwiKS52YWwoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnVzZXJEYXRhLnBhc3N3b3JkID0gJChcIiNuZXdQYXNzd29yZFwiKS52YWwoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgJChcIiNyZWdpc3RlckZvcm0yXCIpLm9uKFwic3VibWl0XCIsICgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMudXNlckRhdGEuZW1haWwpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICBjb25zdCBnZW5kZXIgPSAkKFwiI2dlbmRlclwiKS52YWwoKTtcbiAgICAgICAgICAgICAgICBjb25zdCBoZWlnaHQgPSAkKFwiI2hlaWdodFwiKS52YWwoKTtcbiAgICAgICAgICAgICAgICBjb25zdCB3ZWlnaHQgPSAkKFwiI3dlaWdodFwiKS52YWwoKTtcbiAgICAgICAgICAgICAgICBjb25zdCBkYXRlT2ZCaXJ0aCA9ICQoXCIjZGF0ZU9mQmlydGhcIikudmFsKCk7XG4gICAgICAgICAgICAgICAgYXBwX3NlcnZpY2VfMS5BcHBTZXJ2aWNlLmVtaXRTZXJ2ZXIoU2VydmVyRXZlbnRzX2VudW1fMS5TZXJ2ZXJFdmVudHMuUmVnaXN0ZXJVc2VyLCBbXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXNlckRhdGEuZW1haWwsXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXNlckRhdGEucGFzc3dvcmQsXG4gICAgICAgICAgICAgICAgICAgIGdlbmRlcixcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0LFxuICAgICAgICAgICAgICAgICAgICB3ZWlnaHQsXG4gICAgICAgICAgICAgICAgICAgIGRhdGVPZkJpcnRoXG4gICAgICAgICAgICAgICAgXSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy53YXRjaCgpO1xuICAgIH1cbn1cbmV4cG9ydHMuVXNlclNlcnZpY2UgPSBVc2VyU2VydmljZTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGFwcF9tb2R1bGVfMSA9IHJlcXVpcmUoXCIuL2FwcC5tb2R1bGVcIik7XG5jb25zdCBhcHBfc2VydmljZV8xID0gcmVxdWlyZShcIi4vYXBwLnNlcnZpY2VcIik7XG4vKiBKZWxpa2/FviBtaW5pZmlrdWplbWUgdsWhZWNoZW4ganMga8OzZCwgdsSNZXRuxJsgbsOhenbFryBwcm9txJtubsO9Y2ggayBuZXBvem5hbsOtLFxuKiBwb3TFmWVidWplbWUgcHJvIGtvbXVuaWtvdsOhbsOtIHMgS290bGluZW0sIHJlc3AuIHBybyB6w61za2Fuw60geiBuxJtobyBkYXQsXG4qIG7Em2pha291IHDFmWVkZW0gbmFzdGF2ZW5vdSBnbG9iw6FsbsOtIG1ldG9kdSBzIGtvbnN0YW50bsOtbSBuw6F6dmVtLiBQcmF2xJsgcHJvdG9cbiogZG8gZ2xvYsOhbG7DrWhvIG9iamVrdHUgd2luZG93LCBrdGVyw70gamUgc291xI1hc3TDrSBqYWvDqWhva29saXYgcHJvaGzDrcW+ZcSNZSBqZSxcbiogamUgbmFzdGF2ZW7DoSB0YXRvIG1ldG9kYSwga3RlcsOhIG5ldWTEm2zDoSBuaWMgamluw6lobywgbmXFviBwxZllZMOhIGRhdGEgayB6cHJhY292bsOhbsOtIGFwbGlrYWNpXG4qL1xuLy8gQHRzLWlnbm9yZVxud2luZG93LmdldERhdGEgPSAoZXZlbnROYW1lLCBkYXRhKSA9PiB7XG4gICAgYXBwX3NlcnZpY2VfMS5BcHBTZXJ2aWNlLmVtaXRDbGllbnQoZXZlbnROYW1lLCBkYXRhKTtcbn07XG4vLyBzcHXFoXTEm27DrSBobMOhdm7DrWhvIG1vZHVsdSBhcGxpa2FjZVxubmV3IGFwcF9tb2R1bGVfMS5BcHBNb2R1bGUoKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==