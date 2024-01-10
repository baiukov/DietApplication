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
/*
    Třída AppModule - je třída hlávního modulu aplikace, která se zabývá spuštením vedlejších modlů.
*/
class AppModule {
    constructor() {
        // metoda spuštění vedlejších modulů
        this.initModules = () => {
            // vytvoří se příkladový modul
            new example_module_1.ExampleModule();
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
    ServerEvents["SENDAGE"] = "user/sendAge";
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
            app_service_1.AppService.emitServer(ServerEvents_enum_1.ServerEvents.SENDAGE, [yearOfBirth, yearOfBirth]);
        });
    }
}
exports.ExampleService = ExampleService;


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBYTtBQUNiLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCxpQkFBaUI7QUFDakIsc0JBQXNCLG1CQUFPLENBQUMsMkNBQWU7QUFDN0MseUJBQXlCLG1CQUFPLENBQUMsaUVBQTBCO0FBQzNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCOzs7Ozs7Ozs7OztBQ3JCSjtBQUNiO0FBQ0EsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtEQUFrRCxhQUFhO0FBQy9EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3REFBd0QsYUFBYTtBQUNyRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQzFEYTtBQUNiLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCxvQkFBb0I7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLG1CQUFtQixvQkFBb0Isb0JBQW9COzs7Ozs7Ozs7OztBQ1AvQztBQUNiLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCx5QkFBeUI7QUFDekIsc0JBQXNCLG1CQUFPLENBQUMsNENBQWdCO0FBQzlDLDRCQUE0QixtQkFBTyxDQUFDLG9FQUE0QjtBQUNoRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EseUJBQXlCOzs7Ozs7Ozs7OztBQ2xCWjtBQUNiLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCxxQkFBcUI7QUFDckIsNkJBQTZCLG1CQUFPLENBQUMsaUVBQXNCO0FBQzNELDBCQUEwQixtQkFBTyxDQUFDLDJEQUFtQjtBQUNyRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCOzs7Ozs7Ozs7OztBQ2hCUjtBQUNiLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCxzQkFBc0I7QUFDdEIsc0JBQXNCLG1CQUFPLENBQUMsNENBQWdCO0FBQzlDLDRCQUE0QixtQkFBTyxDQUFDLG9FQUE0QjtBQUNoRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxzQkFBc0I7Ozs7Ozs7VUN6QnRCO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7Ozs7Ozs7QUN0QmE7QUFDYiw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0QscUJBQXFCLG1CQUFPLENBQUMseUNBQWM7QUFDM0Msc0JBQXNCLG1CQUFPLENBQUMsMkNBQWU7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZGlldGFwcGxpY2F0aW9uX2Zyb250ZW5kLy4vZGV2L2FwcC5tb2R1bGUudHMiLCJ3ZWJwYWNrOi8vZGlldGFwcGxpY2F0aW9uX2Zyb250ZW5kLy4vZGV2L2FwcC5zZXJ2aWNlLnRzIiwid2VicGFjazovL2RpZXRhcHBsaWNhdGlvbl9mcm9udGVuZC8uL2Rldi9lbnVtcy9TZXJ2ZXJFdmVudHMuZW51bS50cyIsIndlYnBhY2s6Ly9kaWV0YXBwbGljYXRpb25fZnJvbnRlbmQvLi9kZXYvZXhhbXBsZS9leGFtcGxlLmNvbnRyb2xsZXIudHMiLCJ3ZWJwYWNrOi8vZGlldGFwcGxpY2F0aW9uX2Zyb250ZW5kLy4vZGV2L2V4YW1wbGUvZXhhbXBsZS5tb2R1bGUudHMiLCJ3ZWJwYWNrOi8vZGlldGFwcGxpY2F0aW9uX2Zyb250ZW5kLy4vZGV2L2V4YW1wbGUvZXhhbXBsZS5zZXJ2aWNlLnRzIiwid2VicGFjazovL2RpZXRhcHBsaWNhdGlvbl9mcm9udGVuZC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9kaWV0YXBwbGljYXRpb25fZnJvbnRlbmQvLi9kZXYvbWFpbi50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuQXBwTW9kdWxlID0gdm9pZCAwO1xuY29uc3QgYXBwX3NlcnZpY2VfMSA9IHJlcXVpcmUoXCIuL2FwcC5zZXJ2aWNlXCIpO1xuY29uc3QgZXhhbXBsZV9tb2R1bGVfMSA9IHJlcXVpcmUoXCIuL2V4YW1wbGUvZXhhbXBsZS5tb2R1bGVcIik7XG4vKlxuICAgIFTFmcOtZGEgQXBwTW9kdWxlIC0gamUgdMWZw61kYSBobMOhdm7DrWhvIG1vZHVsdSBhcGxpa2FjZSwga3RlcsOhIHNlIHphYsO9dsOhIHNwdcWhdGVuw61tIHZlZGxlasWhw61jaCBtb2Rsxa8uXG4qL1xuY2xhc3MgQXBwTW9kdWxlIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgLy8gbWV0b2RhIHNwdcWhdMSbbsOtIHZlZGxlasWhw61jaCBtb2R1bMWvXG4gICAgICAgIHRoaXMuaW5pdE1vZHVsZXMgPSAoKSA9PiB7XG4gICAgICAgICAgICAvLyB2eXR2b8WZw60gc2UgcMWZw61rbGFkb3bDvSBtb2R1bFxuICAgICAgICAgICAgbmV3IGV4YW1wbGVfbW9kdWxlXzEuRXhhbXBsZU1vZHVsZSgpO1xuICAgICAgICB9O1xuICAgICAgICAvLyB2eXR2b8WZw60gc2x1xb5idSBhcGxpa2FjZVxuICAgICAgICBuZXcgYXBwX3NlcnZpY2VfMS5BcHBTZXJ2aWNlKCk7XG4gICAgICAgIC8vIHNwdXN0w60gdsWhZWNobnkgdmVkbGVqxaHDrSBtb2R1bHlcbiAgICAgICAgdGhpcy5pbml0TW9kdWxlcygpO1xuICAgIH1cbn1cbmV4cG9ydHMuQXBwTW9kdWxlID0gQXBwTW9kdWxlO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX2E7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkFwcFNlcnZpY2UgPSB2b2lkIDA7XG4vKlxuICAgIFTFmcOtZGEgQXBwU2VydmljZSAtIGplIGhsw6F2bsOtIHNsdcW+YmEgYXBsaWthY2UsIGt0ZXLDoSBzZSB6YWLDvXbDoSB6cHJhY292w6Fuw61tIGtvbXVuaWthY2kgamFrIHV2bml0xZkgZnJvbnRlbmRvdsO9IGFwbGlrYWNlLFxuICAgIHRhayBpIHZuxJtqxaHDrW1pIGtvbXVua2FjZW1pIHMga2xpZW50b3ZvdSBhcGxpa2FjaVxuKi9cbmNsYXNzIEFwcFNlcnZpY2Uge1xufVxuZXhwb3J0cy5BcHBTZXJ2aWNlID0gQXBwU2VydmljZTtcbl9hID0gQXBwU2VydmljZTtcbi8vIG9iamVrdCwgdmUga3RlcsOpbSBzZSB1bG/FvsOtIHphcmVnaXN0cm92w6Fuw6kgbG9rw6FsbsOtIHVkw6Fsb3N0w60gXG5BcHBTZXJ2aWNlLmV2ZW50cyA9IHt9O1xuLy8gb2JqZWt0LCB2ZSBrdGVyw6ltIHNlIHVsb8W+w60gdm7Em2rFocOtIHNlcnZlcm92w6kgdWTDoWxvc3TDrVxuQXBwU2VydmljZS5zZXJ2ZXJFdmVudHMgPSB7fTtcbi8vIG1ldG9kYSByZWdpc3RyYWNlIGxva8OhbG7DrSB1ZMOhbG9zdMOtXG5BcHBTZXJ2aWNlLm9uID0gKGV2ZW50TmFtZSwgZnVuYykgPT4ge1xuICAgIC8vIG5hZGVmZW51amUga2zDrcSNIHYgcG9kb2LEmyBuw6F6dnUgdWTDoWxvc3TDrSBhIGhvZG5vdHUgdiBwb2RiZSBzcHXFoXTEm25vdSBmdW5rY2lcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoX2EuZXZlbnRzLCBldmVudE5hbWUsIHsgdmFsdWU6IGZ1bmMgfSk7XG59O1xuLy8gbWV0b2RhIHZ5dm9sw6Fuw60gbG9rw6FsbsOtIMO6ZGFsb3N0w61cbkFwcFNlcnZpY2UuZW1pdCA9IChldmVudE5hbWUsIGRhdGEpID0+IHtcbiAgICAvLyB6w61za8OhIHbFoWVjaG55IGtsw63EjWUgZXhpc3R1asOtY8OtaG8gb2JqZWt0dSBsb2vDoWxuw61jaCB1ZMOhbG9zdMOtXG4gICAgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoX2EuZXZlbnRzKS5mb3JFYWNoKChjdXJyZW50RXZlbnROYW1lKSA9PiB7XG4gICAgICAgIC8vIHDFmWV2ZWRlIGRvIHR5cHUgZW51bSB6IHTFmcOtZHkgdWTDoWxvc3TDrSBcbiAgICAgICAgY29uc3QgY3VycmVudEV2ZW50ID0gcGFyc2VJbnQoY3VycmVudEV2ZW50TmFtZSk7XG4gICAgICAgIC8vIHBva3VkIGplIHNvdcSNYXNuw70gbsOhemV2IGV2ZW50dSBqZSBzaG9kbsO9IHMgdnl2b2zDoW7DvW0sIHZ5dm9sw6EgcMWZw61zbHXFoW5vdSBmdW5rY2kgcyBwb3NreXRudXTDvW1pIGRhdHlcbiAgICAgICAgaWYgKGN1cnJlbnRFdmVudCAhPT0gZXZlbnROYW1lKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBfYS5ldmVudHNbY3VycmVudEV2ZW50XShkYXRhKTtcbiAgICB9KTtcbn07XG4vLyBtZXRvZGEgcmVnaXN0cmFjZSBzZXJ2ZXJvdsOpIHVkw6Fsb3N0w61cbkFwcFNlcnZpY2Uub25TZXJ2ZXIgPSAoZXZlbnROYW1lLCBmdW5jKSA9PiB7XG4gICAgLy8gbmFkZWZlbnVqZSBrbMOtxI0gdiBwb2RvYsSbIG7DoXp2dSB1ZMOhbG9zdMOtIGEgaG9kbm90dSB2IHBvZGJlIHNwdcWhdMSbbm91IGZ1bmtjaVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShfYS5zZXJ2ZXJFdmVudHMsIGV2ZW50TmFtZSwgeyB2YWx1ZTogZnVuYyB9KTtcbn07XG4vLyBtZXRvZGEgdnl2b2zDoW7DrSDDumRhbG9zdMOtIHplIHNlcnZlcnVcbkFwcFNlcnZpY2UuZW1pdENsaWVudCA9IChldmVudE5hbWUsIGRhdGEpID0+IHtcbiAgICAvLyB6w61za8OhIHbFoWVjaG55IGtsw63EjWUgZXhpc3R1asOtY8OtaG8gb2JqZWt0dSBzZXJ2ZXJvdsO9Y2ggdWTDoWxvc3TDrVxuICAgIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKF9hLnNlcnZlckV2ZW50cykuZm9yRWFjaCgoY3VycmVudFNlcnZlckV2ZW50TmFtZSkgPT4ge1xuICAgICAgICAvLyBwb2t1ZCBqZSBzb3XEjWFzbsO9IG7DoXpldiBldmVudHUgamUgc2hvZG7DvSBzIHZ5dm9sw6Fuw71tLCB2eXZvbMOhIHDFmcOtc2x1xaFub3UgZnVua2NpIHMgcG9za3l0bnV0w71taSBkYXR5XG4gICAgICAgIGlmIChjdXJyZW50U2VydmVyRXZlbnROYW1lICE9PSBldmVudE5hbWUpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIF9hLnNlcnZlckV2ZW50c1tjdXJyZW50U2VydmVyRXZlbnROYW1lXShkYXRhKTtcbiAgICB9KTtcbn07XG4vLyBtZXRvZGEgcHJvIHBvc8OtbGFuw60gZXZlbnR1IG5hIHNlcnZlclxuQXBwU2VydmljZS5lbWl0U2VydmVyID0gKGV2ZW50TmFtZSwgZGF0YSkgPT4ge1xuICAgIC8vIHphYmFsw60gcG9za3l0bnV0w6EgZGF0YSBkbyBudXRuw6kgcG9kb2J5XG4gICAgY29uc3QgZXZlbnREYXRhID0ge1xuICAgICAgICBkYXRhOiBkYXRhLFxuICAgIH07XG4gICAgLy8gdnl2b2zDoSB2IHBvc2t5dG51dMOpbSBLb3RsaW5vdm91IGFwbGlrYWPDrSBvYmpla3R1IChtb3N0xJspIG1ldG9kdSBwcm8gcG9zw61sw6Fuw60gZGF0IG5hIHNlcnZlclxuICAgIC8vIHDFmWV2ZWRlIHZ5dHZvxZllbsO9IG9iamVrdCB2IMWZw6FkZWsgdHlwdSBKU09OXG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIEFuZHJvaWRJbnRlcmZhY2UuZW1pdFNlcnZlcihldmVudE5hbWUsIEpTT04uc3RyaW5naWZ5KGV2ZW50RGF0YSkpO1xufTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5TZXJ2ZXJFdmVudHMgPSB2b2lkIDA7XG4vLyBvYmpla3Qgb2JzYWh1asOtY8OtIHVkw6Fsb3N0aSBwcm8ga29tdW5pa2FjaSBzZSBzZXJ2ZXJlbVxudmFyIFNlcnZlckV2ZW50cztcbihmdW5jdGlvbiAoU2VydmVyRXZlbnRzKSB7XG4gICAgU2VydmVyRXZlbnRzW1wiU0VOREFHRVwiXSA9IFwidXNlci9zZW5kQWdlXCI7XG59KShTZXJ2ZXJFdmVudHMgfHwgKGV4cG9ydHMuU2VydmVyRXZlbnRzID0gU2VydmVyRXZlbnRzID0ge30pKTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5FeGFtcGxlQ29udHJvbGxlciA9IHZvaWQgMDtcbmNvbnN0IGFwcF9zZXJ2aWNlXzEgPSByZXF1aXJlKFwiLi4vYXBwLnNlcnZpY2VcIik7XG5jb25zdCBTZXJ2ZXJFdmVudHNfZW51bV8xID0gcmVxdWlyZShcIi4uL2VudW1zL1NlcnZlckV2ZW50cy5lbnVtXCIpO1xuLypcbiAgICBUxZnDrWRhIEV4YW1wbGVTZXJ2aWNlIC0gamUgc2x1xb5iYSBwxZnDrWtsYWR1LCBrdGVyw6Egc2UgemFiw712w6EgenByYWNvdsOhbsOtbSB6w6FrbGFkbsOtIGxvZ2lreSBwxZnDrWtsYWR1XG4qL1xuY2xhc3MgRXhhbXBsZUNvbnRyb2xsZXIge1xuICAgIGNvbnN0cnVjdG9yKGV4YW1wbGVTZXJ2aWNlKSB7XG4gICAgICAgIC8vIHByb23Em25uw6EgdmUga3RlcsOpIGplIHVsb8W+ZW7DoSBzbHXFvmJhIHDFmcOta2xhZG92w6lobyBiYWzDrcSNa3VcbiAgICAgICAgdGhpcy5leGFtcGxlU2VydmljZSA9IGV4YW1wbGVTZXJ2aWNlO1xuICAgICAgICAvLyB6YXJlZ2VzdHJ1amUgcG9zbHVoYcSNIHVkw6Fsb3N0w60gemUgc2VydmVydS4gXG4gICAgICAgIGFwcF9zZXJ2aWNlXzEuQXBwU2VydmljZS5vblNlcnZlcihTZXJ2ZXJFdmVudHNfZW51bV8xLlNlcnZlckV2ZW50cy5TRU5EQUdFLCAoYWdlKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmV4YW1wbGVTZXJ2aWNlLnNldEFnZShhZ2UpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5leHBvcnRzLkV4YW1wbGVDb250cm9sbGVyID0gRXhhbXBsZUNvbnRyb2xsZXI7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuRXhhbXBsZU1vZHVsZSA9IHZvaWQgMDtcbmNvbnN0IGV4YW1wbGVfY29udHJvbGxlcl8xID0gcmVxdWlyZShcIi4vZXhhbXBsZS5jb250cm9sbGVyXCIpO1xuY29uc3QgZXhhbXBsZV9zZXJ2aWNlXzEgPSByZXF1aXJlKFwiLi9leGFtcGxlLnNlcnZpY2VcIik7XG4vKlxuICAgIFTFmcOtZGEgRXhhbXBsZU1vZHVsZSAtIGplIHTFmcOtZGEgbW9kdWx1IHDFmcOta2xhZHUsIGt0ZXLDoSBzZSB6YWLDvXbDoSB2eXR2YcWZZW7DrW0gc2x1xb5ieSBhIHNwcsOhdmNlLlxuKi9cbmNsYXNzIEV4YW1wbGVNb2R1bGUge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICAvLyB2eXR2b8WZw60gbm92b3Ugc2x1xb5idSBwcm8gcMWZw61rbGFkXG4gICAgICAgIGNvbnN0IGV4YW1wbGVTZXJ2aWNlID0gbmV3IGV4YW1wbGVfc2VydmljZV8xLkV4YW1wbGVTZXJ2aWNlKCk7XG4gICAgICAgIC8vIHZ5dHZvxZnDrSBub3bDqWhvIHNwcsOhdmNlIHDFmcOta2xhZG92w6kgc2x1xb5ieVxuICAgICAgICBuZXcgZXhhbXBsZV9jb250cm9sbGVyXzEuRXhhbXBsZUNvbnRyb2xsZXIoZXhhbXBsZVNlcnZpY2UpO1xuICAgIH1cbn1cbmV4cG9ydHMuRXhhbXBsZU1vZHVsZSA9IEV4YW1wbGVNb2R1bGU7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuRXhhbXBsZVNlcnZpY2UgPSB2b2lkIDA7XG5jb25zdCBhcHBfc2VydmljZV8xID0gcmVxdWlyZShcIi4uL2FwcC5zZXJ2aWNlXCIpO1xuY29uc3QgU2VydmVyRXZlbnRzX2VudW1fMSA9IHJlcXVpcmUoXCIuLi9lbnVtcy9TZXJ2ZXJFdmVudHMuZW51bVwiKTtcbi8qXG4gICAgVMWZw61kYSBFeGFtcGxlU2VydmljZSAtIGplIHNsdcW+YmEgcMWZw61rbGFkdSwga3RlcsOhIHNlIHphYsO9dsOhIHpwcmFjb3bDoW7DrW0gesOha2xhZG7DrSBsb2dpa3kgcMWZw61rbGFkdVxuKi9cbmNsYXNzIEV4YW1wbGVTZXJ2aWNlIHtcbiAgICAvLyBtZXRvZGEgbmFzdGF2w60gcG9zbG91aGHEjSB1ZMOhbG9zdMOtIHDFmWkga2xpa251dMOtIHRsYcSNaXRrYVxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICAvLyBtZXRvZGEgbmFzdGF2w60gdsSbayBuYSBvYnJhem92Y2VcbiAgICAgICAgdGhpcy5zZXRBZ2UgPSAoYWdlKSA9PiB7XG4gICAgICAgICAgICAvLyBuYXN0YXbDrSB2IGVsZW1lbnR1IHMgaWQgXCJhZ2VcIiwgdGV4dG92w70gxZnDoWRlayB6w61za2Fuw6kgaG9kbm90eVxuICAgICAgICAgICAgJCgnI2FnZScpLnRleHQoYWdlKTtcbiAgICAgICAgfTtcbiAgICAgICAgLy8gbmFzdGF2ZW7DrSBwb3Nsb3VoYcSNZSB1ZMOhbG9zdMOtIGtsaWtudXTDrSBuYSB0bGHEjWl0a28gcyBpZCBcInN1Ym1pdFwiXG4gICAgICAgICQoXCIjc3VibWl0XCIpLmNsaWNrKCgpID0+IHtcbiAgICAgICAgICAgIC8vIHBvIGtsaWtudXTDrSB6w61za8OhIHogZWxlbWVudHUgcyBpZCBcImFnZUlucHV0XCIgaG9kbm90dVxuICAgICAgICAgICAgY29uc3QgeWVhck9mQmlydGggPSAkKFwiI2FnZUlucHV0XCIpLnZhbCgpO1xuICAgICAgICAgICAgLy8gdnl2b2zDoSBldmVudCBwb3PDrWzDoW7DrSBkYXQgbmEgc2VydmVyLiBQcm8gcMWZw61rbGFkIHBvc8OtbMOhIHNlIHBvbGUgcyBkdsSbbWEgaG9kbm90eVxuICAgICAgICAgICAgYXBwX3NlcnZpY2VfMS5BcHBTZXJ2aWNlLmVtaXRTZXJ2ZXIoU2VydmVyRXZlbnRzX2VudW1fMS5TZXJ2ZXJFdmVudHMuU0VOREFHRSwgW3llYXJPZkJpcnRoLCB5ZWFyT2ZCaXJ0aF0pO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5leHBvcnRzLkV4YW1wbGVTZXJ2aWNlID0gRXhhbXBsZVNlcnZpY2U7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBhcHBfbW9kdWxlXzEgPSByZXF1aXJlKFwiLi9hcHAubW9kdWxlXCIpO1xuY29uc3QgYXBwX3NlcnZpY2VfMSA9IHJlcXVpcmUoXCIuL2FwcC5zZXJ2aWNlXCIpO1xuLyogSmVsaWtvxb4gbWluaWZpa3VqZW1lIHbFoWVjaGVuIGpzIGvDs2QsIHbEjWV0bsSbIG7DoXp2xa8gcHJvbcSbbm7DvWNoIGsgbmVwb3puYW7DrSxcbiogcG90xZllYnVqZW1lIHBybyBrb211bmlrb3bDoW7DrSBzIEtvdGxpbmVtLCByZXNwLiBwcm8gesOtc2thbsOtIHogbsSbaG8gZGF0LFxuKiBuxJtqYWtvdSBwxZllZGVtIG5hc3RhdmVub3UgZ2xvYsOhbG7DrSBtZXRvZHUgcyBrb25zdGFudG7DrW0gbsOhenZlbS4gUHJhdsSbIHByb3RvXG4qIGRvIGdsb2LDoWxuw61obyBvYmpla3R1IHdpbmRvdywga3RlcsO9IGplIHNvdcSNYXN0w60gamFrw6lob2tvbGl2IHByb2hsw63FvmXEjWUgamUsXG4qIGplIG5hc3RhdmVuw6EgdGF0byBtZXRvZGEsIGt0ZXLDoSBuZXVkxJtsw6EgbmljIGppbsOpaG8sIG5lxb4gcMWZZWTDoSBkYXRhIGsgenByYWNvdm7DoW7DrSBhcGxpa2FjaVxuKi9cbi8vIEB0cy1pZ25vcmVcbndpbmRvdy5nZXREYXRhID0gKGV2ZW50TmFtZSwgZGF0YSkgPT4ge1xuICAgIGFwcF9zZXJ2aWNlXzEuQXBwU2VydmljZS5lbWl0Q2xpZW50KGV2ZW50TmFtZSwgZGF0YSk7XG59O1xuLy8gc3B1xaF0xJtuw60gaGzDoXZuw61obyBtb2R1bHUgYXBsaWthY2Vcbm5ldyBhcHBfbW9kdWxlXzEuQXBwTW9kdWxlKCk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=