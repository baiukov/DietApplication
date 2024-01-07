/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./dev/app.controller.ts":
/*!*******************************!*\
  !*** ./dev/app.controller.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppController = void 0;
class AppController {
    constructor(appService) {
        this.appService = appService;
    }
}
exports.AppController = AppController;


/***/ }),

/***/ "./dev/app.module.ts":
/*!***************************!*\
  !*** ./dev/app.module.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const app_controller_1 = __webpack_require__(/*! ./app.controller */ "./dev/app.controller.ts");
const app_service_1 = __webpack_require__(/*! ./app.service */ "./dev/app.service.ts");
const example_module_1 = __webpack_require__(/*! ./example/example.module */ "./dev/example/example.module.ts");
class AppModule {
    constructor() {
        this.initModules = () => {
            new example_module_1.ExampleModule();
        };
        const appService = new app_service_1.AppService();
        new app_controller_1.AppController(appService);
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
class AppService {
}
exports.AppService = AppService;
_a = AppService;
AppService.events = {};
AppService.serverEvents = {};
AppService.on = (eventName, func) => {
    Object.defineProperty(_a.events, eventName, { value: func });
};
AppService.emit = (eventName) => {
    Object.getOwnPropertyNames(_a.events).forEach((currentEventName) => {
        const currentEvent = parseInt(currentEventName);
        if (currentEvent !== eventName)
            return;
        _a.events[currentEvent]();
    });
};
AppService.onServer = (eventName, func) => {
    Object.defineProperty(_a.serverEvents, eventName, { value: func });
};
AppService.emitClient = (eventName, data) => {
    Object.getOwnPropertyNames(_a.serverEvents).forEach((currentServerEventName) => {
        if (currentServerEventName !== eventName)
            return;
        // @ts-ignore
        _a.serverEvents[currentServerEventName](data);
    });
};
AppService.emitServer = (eventName, data) => {
    const eventData = {
        data: data,
    };
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
        this.exampleService = exampleService;
        // zare
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
class ExampleModule {
    constructor() {
        const exampleService = new example_service_1.ExampleService();
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
            $('#age').text(age);
        };
        $("#submit").click(() => {
            const yearOfBirth = $("#ageInput").val();
            // vyvolá event posílání dat na server
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
// @ts-ignore
window.getData = (eventName, data) => {
    app_service_1.AppService.emitClient(eventName, data);
};
new app_module_1.AppModule();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBYTtBQUNiLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjs7Ozs7Ozs7Ozs7QUNSUjtBQUNiLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCxpQkFBaUI7QUFDakIseUJBQXlCLG1CQUFPLENBQUMsaURBQWtCO0FBQ25ELHNCQUFzQixtQkFBTyxDQUFDLDJDQUFlO0FBQzdDLHlCQUF5QixtQkFBTyxDQUFDLGlFQUEwQjtBQUMzRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjs7Ozs7Ozs7Ozs7QUNoQko7QUFDYjtBQUNBLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtEQUFrRCxhQUFhO0FBQy9EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSx3REFBd0QsYUFBYTtBQUNyRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQ3RDYTtBQUNiLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCxvQkFBb0I7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLG1CQUFtQixvQkFBb0Isb0JBQW9COzs7Ozs7Ozs7OztBQ1AvQztBQUNiLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCx5QkFBeUI7QUFDekIsc0JBQXNCLG1CQUFPLENBQUMsNENBQWdCO0FBQzlDLDRCQUE0QixtQkFBTyxDQUFDLG9FQUE0QjtBQUNoRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLHlCQUF5Qjs7Ozs7Ozs7Ozs7QUNqQlo7QUFDYiw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0QscUJBQXFCO0FBQ3JCLDZCQUE2QixtQkFBTyxDQUFDLGlFQUFzQjtBQUMzRCwwQkFBMEIsbUJBQU8sQ0FBQywyREFBbUI7QUFDckQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCOzs7Ozs7Ozs7OztBQ1hSO0FBQ2IsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELHNCQUFzQjtBQUN0QixzQkFBc0IsbUJBQU8sQ0FBQyw0Q0FBZ0I7QUFDOUMsNEJBQTRCLG1CQUFPLENBQUMsb0VBQTRCO0FBQ2hFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLHNCQUFzQjs7Ozs7OztVQ3RCdEI7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7Ozs7OztBQ3RCYTtBQUNiLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCxxQkFBcUIsbUJBQU8sQ0FBQyx5Q0FBYztBQUMzQyxzQkFBc0IsbUJBQU8sQ0FBQywyQ0FBZTtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZGlldGFwcGxpY2F0aW9uX2Zyb250ZW5kLy4vZGV2L2FwcC5jb250cm9sbGVyLnRzIiwid2VicGFjazovL2RpZXRhcHBsaWNhdGlvbl9mcm9udGVuZC8uL2Rldi9hcHAubW9kdWxlLnRzIiwid2VicGFjazovL2RpZXRhcHBsaWNhdGlvbl9mcm9udGVuZC8uL2Rldi9hcHAuc2VydmljZS50cyIsIndlYnBhY2s6Ly9kaWV0YXBwbGljYXRpb25fZnJvbnRlbmQvLi9kZXYvZW51bXMvU2VydmVyRXZlbnRzLmVudW0udHMiLCJ3ZWJwYWNrOi8vZGlldGFwcGxpY2F0aW9uX2Zyb250ZW5kLy4vZGV2L2V4YW1wbGUvZXhhbXBsZS5jb250cm9sbGVyLnRzIiwid2VicGFjazovL2RpZXRhcHBsaWNhdGlvbl9mcm9udGVuZC8uL2Rldi9leGFtcGxlL2V4YW1wbGUubW9kdWxlLnRzIiwid2VicGFjazovL2RpZXRhcHBsaWNhdGlvbl9mcm9udGVuZC8uL2Rldi9leGFtcGxlL2V4YW1wbGUuc2VydmljZS50cyIsIndlYnBhY2s6Ly9kaWV0YXBwbGljYXRpb25fZnJvbnRlbmQvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vZGlldGFwcGxpY2F0aW9uX2Zyb250ZW5kLy4vZGV2L21haW4udHMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkFwcENvbnRyb2xsZXIgPSB2b2lkIDA7XG5jbGFzcyBBcHBDb250cm9sbGVyIHtcbiAgICBjb25zdHJ1Y3RvcihhcHBTZXJ2aWNlKSB7XG4gICAgICAgIHRoaXMuYXBwU2VydmljZSA9IGFwcFNlcnZpY2U7XG4gICAgfVxufVxuZXhwb3J0cy5BcHBDb250cm9sbGVyID0gQXBwQ29udHJvbGxlcjtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5BcHBNb2R1bGUgPSB2b2lkIDA7XG5jb25zdCBhcHBfY29udHJvbGxlcl8xID0gcmVxdWlyZShcIi4vYXBwLmNvbnRyb2xsZXJcIik7XG5jb25zdCBhcHBfc2VydmljZV8xID0gcmVxdWlyZShcIi4vYXBwLnNlcnZpY2VcIik7XG5jb25zdCBleGFtcGxlX21vZHVsZV8xID0gcmVxdWlyZShcIi4vZXhhbXBsZS9leGFtcGxlLm1vZHVsZVwiKTtcbmNsYXNzIEFwcE1vZHVsZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuaW5pdE1vZHVsZXMgPSAoKSA9PiB7XG4gICAgICAgICAgICBuZXcgZXhhbXBsZV9tb2R1bGVfMS5FeGFtcGxlTW9kdWxlKCk7XG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IGFwcFNlcnZpY2UgPSBuZXcgYXBwX3NlcnZpY2VfMS5BcHBTZXJ2aWNlKCk7XG4gICAgICAgIG5ldyBhcHBfY29udHJvbGxlcl8xLkFwcENvbnRyb2xsZXIoYXBwU2VydmljZSk7XG4gICAgICAgIHRoaXMuaW5pdE1vZHVsZXMoKTtcbiAgICB9XG59XG5leHBvcnRzLkFwcE1vZHVsZSA9IEFwcE1vZHVsZTtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9hO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5BcHBTZXJ2aWNlID0gdm9pZCAwO1xuY2xhc3MgQXBwU2VydmljZSB7XG59XG5leHBvcnRzLkFwcFNlcnZpY2UgPSBBcHBTZXJ2aWNlO1xuX2EgPSBBcHBTZXJ2aWNlO1xuQXBwU2VydmljZS5ldmVudHMgPSB7fTtcbkFwcFNlcnZpY2Uuc2VydmVyRXZlbnRzID0ge307XG5BcHBTZXJ2aWNlLm9uID0gKGV2ZW50TmFtZSwgZnVuYykgPT4ge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShfYS5ldmVudHMsIGV2ZW50TmFtZSwgeyB2YWx1ZTogZnVuYyB9KTtcbn07XG5BcHBTZXJ2aWNlLmVtaXQgPSAoZXZlbnROYW1lKSA9PiB7XG4gICAgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoX2EuZXZlbnRzKS5mb3JFYWNoKChjdXJyZW50RXZlbnROYW1lKSA9PiB7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRFdmVudCA9IHBhcnNlSW50KGN1cnJlbnRFdmVudE5hbWUpO1xuICAgICAgICBpZiAoY3VycmVudEV2ZW50ICE9PSBldmVudE5hbWUpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIF9hLmV2ZW50c1tjdXJyZW50RXZlbnRdKCk7XG4gICAgfSk7XG59O1xuQXBwU2VydmljZS5vblNlcnZlciA9IChldmVudE5hbWUsIGZ1bmMpID0+IHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoX2Euc2VydmVyRXZlbnRzLCBldmVudE5hbWUsIHsgdmFsdWU6IGZ1bmMgfSk7XG59O1xuQXBwU2VydmljZS5lbWl0Q2xpZW50ID0gKGV2ZW50TmFtZSwgZGF0YSkgPT4ge1xuICAgIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKF9hLnNlcnZlckV2ZW50cykuZm9yRWFjaCgoY3VycmVudFNlcnZlckV2ZW50TmFtZSkgPT4ge1xuICAgICAgICBpZiAoY3VycmVudFNlcnZlckV2ZW50TmFtZSAhPT0gZXZlbnROYW1lKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIF9hLnNlcnZlckV2ZW50c1tjdXJyZW50U2VydmVyRXZlbnROYW1lXShkYXRhKTtcbiAgICB9KTtcbn07XG5BcHBTZXJ2aWNlLmVtaXRTZXJ2ZXIgPSAoZXZlbnROYW1lLCBkYXRhKSA9PiB7XG4gICAgY29uc3QgZXZlbnREYXRhID0ge1xuICAgICAgICBkYXRhOiBkYXRhLFxuICAgIH07XG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIEFuZHJvaWRJbnRlcmZhY2UuZW1pdFNlcnZlcihldmVudE5hbWUsIEpTT04uc3RyaW5naWZ5KGV2ZW50RGF0YSkpO1xufTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5TZXJ2ZXJFdmVudHMgPSB2b2lkIDA7XG4vLyBvYmpla3Qgb2JzYWh1asOtY8OtIHVkw6Fsb3N0aSBwcm8ga29tdW5pa2FjaSBzZSBzZXJ2ZXJlbVxudmFyIFNlcnZlckV2ZW50cztcbihmdW5jdGlvbiAoU2VydmVyRXZlbnRzKSB7XG4gICAgU2VydmVyRXZlbnRzW1wiU0VOREFHRVwiXSA9IFwidXNlci9zZW5kQWdlXCI7XG59KShTZXJ2ZXJFdmVudHMgfHwgKGV4cG9ydHMuU2VydmVyRXZlbnRzID0gU2VydmVyRXZlbnRzID0ge30pKTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5FeGFtcGxlQ29udHJvbGxlciA9IHZvaWQgMDtcbmNvbnN0IGFwcF9zZXJ2aWNlXzEgPSByZXF1aXJlKFwiLi4vYXBwLnNlcnZpY2VcIik7XG5jb25zdCBTZXJ2ZXJFdmVudHNfZW51bV8xID0gcmVxdWlyZShcIi4uL2VudW1zL1NlcnZlckV2ZW50cy5lbnVtXCIpO1xuLypcbiAgICBUxZnDrWRhIEV4YW1wbGVTZXJ2aWNlIC0gamUgc2x1xb5iYSBwxZnDrWtsYWR1LCBrdGVyw6Egc2UgemFiw712w6EgenByYWNvdsOhbsOtbSB6w6FrbGFkbsOtIGxvZ2lreSBwxZnDrWtsYWR1XG4qL1xuY2xhc3MgRXhhbXBsZUNvbnRyb2xsZXIge1xuICAgIGNvbnN0cnVjdG9yKGV4YW1wbGVTZXJ2aWNlKSB7XG4gICAgICAgIHRoaXMuZXhhbXBsZVNlcnZpY2UgPSBleGFtcGxlU2VydmljZTtcbiAgICAgICAgLy8gemFyZVxuICAgICAgICBhcHBfc2VydmljZV8xLkFwcFNlcnZpY2Uub25TZXJ2ZXIoU2VydmVyRXZlbnRzX2VudW1fMS5TZXJ2ZXJFdmVudHMuU0VOREFHRSwgKGFnZSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5leGFtcGxlU2VydmljZS5zZXRBZ2UoYWdlKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuZXhwb3J0cy5FeGFtcGxlQ29udHJvbGxlciA9IEV4YW1wbGVDb250cm9sbGVyO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkV4YW1wbGVNb2R1bGUgPSB2b2lkIDA7XG5jb25zdCBleGFtcGxlX2NvbnRyb2xsZXJfMSA9IHJlcXVpcmUoXCIuL2V4YW1wbGUuY29udHJvbGxlclwiKTtcbmNvbnN0IGV4YW1wbGVfc2VydmljZV8xID0gcmVxdWlyZShcIi4vZXhhbXBsZS5zZXJ2aWNlXCIpO1xuY2xhc3MgRXhhbXBsZU1vZHVsZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIGNvbnN0IGV4YW1wbGVTZXJ2aWNlID0gbmV3IGV4YW1wbGVfc2VydmljZV8xLkV4YW1wbGVTZXJ2aWNlKCk7XG4gICAgICAgIG5ldyBleGFtcGxlX2NvbnRyb2xsZXJfMS5FeGFtcGxlQ29udHJvbGxlcihleGFtcGxlU2VydmljZSk7XG4gICAgfVxufVxuZXhwb3J0cy5FeGFtcGxlTW9kdWxlID0gRXhhbXBsZU1vZHVsZTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5FeGFtcGxlU2VydmljZSA9IHZvaWQgMDtcbmNvbnN0IGFwcF9zZXJ2aWNlXzEgPSByZXF1aXJlKFwiLi4vYXBwLnNlcnZpY2VcIik7XG5jb25zdCBTZXJ2ZXJFdmVudHNfZW51bV8xID0gcmVxdWlyZShcIi4uL2VudW1zL1NlcnZlckV2ZW50cy5lbnVtXCIpO1xuLypcbiAgICBUxZnDrWRhIEV4YW1wbGVTZXJ2aWNlIC0gamUgc2x1xb5iYSBwxZnDrWtsYWR1LCBrdGVyw6Egc2UgemFiw712w6EgenByYWNvdsOhbsOtbSB6w6FrbGFkbsOtIGxvZ2lreSBwxZnDrWtsYWR1XG4qL1xuY2xhc3MgRXhhbXBsZVNlcnZpY2Uge1xuICAgIC8vIG1ldG9kYSBuYXN0YXbDrSBwb3Nsb3VoYcSNIHVkw6Fsb3N0w60gcMWZaSBrbGlrbnV0w60gdGxhxI1pdGthXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIC8vIG1ldG9kYSBuYXN0YXbDrSB2xJtrIG5hIG9icmF6b3ZjZVxuICAgICAgICB0aGlzLnNldEFnZSA9IChhZ2UpID0+IHtcbiAgICAgICAgICAgICQoJyNhZ2UnKS50ZXh0KGFnZSk7XG4gICAgICAgIH07XG4gICAgICAgICQoXCIjc3VibWl0XCIpLmNsaWNrKCgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHllYXJPZkJpcnRoID0gJChcIiNhZ2VJbnB1dFwiKS52YWwoKTtcbiAgICAgICAgICAgIC8vIHZ5dm9sw6EgZXZlbnQgcG9zw61sw6Fuw60gZGF0IG5hIHNlcnZlclxuICAgICAgICAgICAgYXBwX3NlcnZpY2VfMS5BcHBTZXJ2aWNlLmVtaXRTZXJ2ZXIoU2VydmVyRXZlbnRzX2VudW1fMS5TZXJ2ZXJFdmVudHMuU0VOREFHRSwgW3llYXJPZkJpcnRoLCB5ZWFyT2ZCaXJ0aF0pO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5leHBvcnRzLkV4YW1wbGVTZXJ2aWNlID0gRXhhbXBsZVNlcnZpY2U7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBhcHBfbW9kdWxlXzEgPSByZXF1aXJlKFwiLi9hcHAubW9kdWxlXCIpO1xuY29uc3QgYXBwX3NlcnZpY2VfMSA9IHJlcXVpcmUoXCIuL2FwcC5zZXJ2aWNlXCIpO1xuLy8gQHRzLWlnbm9yZVxud2luZG93LmdldERhdGEgPSAoZXZlbnROYW1lLCBkYXRhKSA9PiB7XG4gICAgYXBwX3NlcnZpY2VfMS5BcHBTZXJ2aWNlLmVtaXRDbGllbnQoZXZlbnROYW1lLCBkYXRhKTtcbn07XG5uZXcgYXBwX21vZHVsZV8xLkFwcE1vZHVsZSgpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9