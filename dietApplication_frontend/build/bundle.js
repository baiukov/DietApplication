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
    constructor() {
    }
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
        console.log(eventName == currentServerEventName);
        if (currentServerEventName !== eventName)
            return;
        // @ts-ignore
        _a.serverEvents[currentServerEventName](data);
    });
};
AppService.emitServer = (event, data) => {
    const elements = event.split(":");
    const module = elements[0];
    const eventName = elements[1];
    const eventData = {
        data: data,
    };
    // @ts-ignore
    AndroidInterface.emitServer(module, eventName, JSON.stringify(eventData));
};


/***/ }),

/***/ "./dev/enums/ServerEvents.enum.ts":
/*!****************************************!*\
  !*** ./dev/enums/ServerEvents.enum.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ServerEvents = void 0;
var ServerEvents;
(function (ServerEvents) {
    ServerEvents["SENDAGE"] = "user:SendAge";
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
class ExampleController {
    constructor(exampleService) {
        this.exampleService = exampleService;
        app_service_1.AppService.onServer(ServerEvents_enum_1.ServerEvents.SENDAGE, (age) => {
            $('#age').text(age);
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
class ExampleService {
    constructor() {
        $("#submit").click(() => {
            const yearOfBirth = $("#ageInput").val();
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
    console.log(eventName, data);
    app_service_1.AppService.emitClient(eventName, data);
};
new app_module_1.AppModule();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBYTtBQUNiLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjs7Ozs7Ozs7Ozs7QUNSUjtBQUNiLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCxpQkFBaUI7QUFDakIseUJBQXlCLG1CQUFPLENBQUMsaURBQWtCO0FBQ25ELHNCQUFzQixtQkFBTyxDQUFDLDJDQUFlO0FBQzdDLHlCQUF5QixtQkFBTyxDQUFDLGlFQUEwQjtBQUMzRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjs7Ozs7Ozs7Ozs7QUNoQko7QUFDYjtBQUNBLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrREFBa0QsYUFBYTtBQUMvRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0Esd0RBQXdELGFBQWE7QUFDckU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQzVDYTtBQUNiLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCxvQkFBb0I7QUFDcEI7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxtQkFBbUIsb0JBQW9CLG9CQUFvQjs7Ozs7Ozs7Ozs7QUNOL0M7QUFDYiw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0QseUJBQXlCO0FBQ3pCLHNCQUFzQixtQkFBTyxDQUFDLDRDQUFnQjtBQUM5Qyw0QkFBNEIsbUJBQU8sQ0FBQyxvRUFBNEI7QUFDaEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EseUJBQXlCOzs7Ozs7Ozs7OztBQ2JaO0FBQ2IsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELHFCQUFxQjtBQUNyQiw2QkFBNkIsbUJBQU8sQ0FBQyxpRUFBc0I7QUFDM0QsMEJBQTBCLG1CQUFPLENBQUMsMkRBQW1CO0FBQ3JEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjs7Ozs7Ozs7Ozs7QUNYUjtBQUNiLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCxzQkFBc0I7QUFDdEIsc0JBQXNCLG1CQUFPLENBQUMsNENBQWdCO0FBQzlDLDRCQUE0QixtQkFBTyxDQUFDLG9FQUE0QjtBQUNoRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxzQkFBc0I7Ozs7Ozs7VUNidEI7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7Ozs7OztBQ3RCYTtBQUNiLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCxxQkFBcUIsbUJBQU8sQ0FBQyx5Q0FBYztBQUMzQyxzQkFBc0IsbUJBQU8sQ0FBQywyQ0FBZTtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kaWV0YXBwbGljYXRpb25fZnJvbnRlbmQvLi9kZXYvYXBwLmNvbnRyb2xsZXIudHMiLCJ3ZWJwYWNrOi8vZGlldGFwcGxpY2F0aW9uX2Zyb250ZW5kLy4vZGV2L2FwcC5tb2R1bGUudHMiLCJ3ZWJwYWNrOi8vZGlldGFwcGxpY2F0aW9uX2Zyb250ZW5kLy4vZGV2L2FwcC5zZXJ2aWNlLnRzIiwid2VicGFjazovL2RpZXRhcHBsaWNhdGlvbl9mcm9udGVuZC8uL2Rldi9lbnVtcy9TZXJ2ZXJFdmVudHMuZW51bS50cyIsIndlYnBhY2s6Ly9kaWV0YXBwbGljYXRpb25fZnJvbnRlbmQvLi9kZXYvZXhhbXBsZS9leGFtcGxlLmNvbnRyb2xsZXIudHMiLCJ3ZWJwYWNrOi8vZGlldGFwcGxpY2F0aW9uX2Zyb250ZW5kLy4vZGV2L2V4YW1wbGUvZXhhbXBsZS5tb2R1bGUudHMiLCJ3ZWJwYWNrOi8vZGlldGFwcGxpY2F0aW9uX2Zyb250ZW5kLy4vZGV2L2V4YW1wbGUvZXhhbXBsZS5zZXJ2aWNlLnRzIiwid2VicGFjazovL2RpZXRhcHBsaWNhdGlvbl9mcm9udGVuZC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9kaWV0YXBwbGljYXRpb25fZnJvbnRlbmQvLi9kZXYvbWFpbi50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuQXBwQ29udHJvbGxlciA9IHZvaWQgMDtcbmNsYXNzIEFwcENvbnRyb2xsZXIge1xuICAgIGNvbnN0cnVjdG9yKGFwcFNlcnZpY2UpIHtcbiAgICAgICAgdGhpcy5hcHBTZXJ2aWNlID0gYXBwU2VydmljZTtcbiAgICB9XG59XG5leHBvcnRzLkFwcENvbnRyb2xsZXIgPSBBcHBDb250cm9sbGVyO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkFwcE1vZHVsZSA9IHZvaWQgMDtcbmNvbnN0IGFwcF9jb250cm9sbGVyXzEgPSByZXF1aXJlKFwiLi9hcHAuY29udHJvbGxlclwiKTtcbmNvbnN0IGFwcF9zZXJ2aWNlXzEgPSByZXF1aXJlKFwiLi9hcHAuc2VydmljZVwiKTtcbmNvbnN0IGV4YW1wbGVfbW9kdWxlXzEgPSByZXF1aXJlKFwiLi9leGFtcGxlL2V4YW1wbGUubW9kdWxlXCIpO1xuY2xhc3MgQXBwTW9kdWxlIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5pbml0TW9kdWxlcyA9ICgpID0+IHtcbiAgICAgICAgICAgIG5ldyBleGFtcGxlX21vZHVsZV8xLkV4YW1wbGVNb2R1bGUoKTtcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgYXBwU2VydmljZSA9IG5ldyBhcHBfc2VydmljZV8xLkFwcFNlcnZpY2UoKTtcbiAgICAgICAgbmV3IGFwcF9jb250cm9sbGVyXzEuQXBwQ29udHJvbGxlcihhcHBTZXJ2aWNlKTtcbiAgICAgICAgdGhpcy5pbml0TW9kdWxlcygpO1xuICAgIH1cbn1cbmV4cG9ydHMuQXBwTW9kdWxlID0gQXBwTW9kdWxlO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX2E7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkFwcFNlcnZpY2UgPSB2b2lkIDA7XG5jbGFzcyBBcHBTZXJ2aWNlIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICB9XG59XG5leHBvcnRzLkFwcFNlcnZpY2UgPSBBcHBTZXJ2aWNlO1xuX2EgPSBBcHBTZXJ2aWNlO1xuQXBwU2VydmljZS5ldmVudHMgPSB7fTtcbkFwcFNlcnZpY2Uuc2VydmVyRXZlbnRzID0ge307XG5BcHBTZXJ2aWNlLm9uID0gKGV2ZW50TmFtZSwgZnVuYykgPT4ge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShfYS5ldmVudHMsIGV2ZW50TmFtZSwgeyB2YWx1ZTogZnVuYyB9KTtcbn07XG5BcHBTZXJ2aWNlLmVtaXQgPSAoZXZlbnROYW1lKSA9PiB7XG4gICAgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoX2EuZXZlbnRzKS5mb3JFYWNoKChjdXJyZW50RXZlbnROYW1lKSA9PiB7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRFdmVudCA9IHBhcnNlSW50KGN1cnJlbnRFdmVudE5hbWUpO1xuICAgICAgICBpZiAoY3VycmVudEV2ZW50ICE9PSBldmVudE5hbWUpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIF9hLmV2ZW50c1tjdXJyZW50RXZlbnRdKCk7XG4gICAgfSk7XG59O1xuQXBwU2VydmljZS5vblNlcnZlciA9IChldmVudE5hbWUsIGZ1bmMpID0+IHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoX2Euc2VydmVyRXZlbnRzLCBldmVudE5hbWUsIHsgdmFsdWU6IGZ1bmMgfSk7XG59O1xuQXBwU2VydmljZS5lbWl0Q2xpZW50ID0gKGV2ZW50TmFtZSwgZGF0YSkgPT4ge1xuICAgIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKF9hLnNlcnZlckV2ZW50cykuZm9yRWFjaCgoY3VycmVudFNlcnZlckV2ZW50TmFtZSkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhldmVudE5hbWUgPT0gY3VycmVudFNlcnZlckV2ZW50TmFtZSk7XG4gICAgICAgIGlmIChjdXJyZW50U2VydmVyRXZlbnROYW1lICE9PSBldmVudE5hbWUpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgX2Euc2VydmVyRXZlbnRzW2N1cnJlbnRTZXJ2ZXJFdmVudE5hbWVdKGRhdGEpO1xuICAgIH0pO1xufTtcbkFwcFNlcnZpY2UuZW1pdFNlcnZlciA9IChldmVudCwgZGF0YSkgPT4ge1xuICAgIGNvbnN0IGVsZW1lbnRzID0gZXZlbnQuc3BsaXQoXCI6XCIpO1xuICAgIGNvbnN0IG1vZHVsZSA9IGVsZW1lbnRzWzBdO1xuICAgIGNvbnN0IGV2ZW50TmFtZSA9IGVsZW1lbnRzWzFdO1xuICAgIGNvbnN0IGV2ZW50RGF0YSA9IHtcbiAgICAgICAgZGF0YTogZGF0YSxcbiAgICB9O1xuICAgIC8vIEB0cy1pZ25vcmVcbiAgICBBbmRyb2lkSW50ZXJmYWNlLmVtaXRTZXJ2ZXIobW9kdWxlLCBldmVudE5hbWUsIEpTT04uc3RyaW5naWZ5KGV2ZW50RGF0YSkpO1xufTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5TZXJ2ZXJFdmVudHMgPSB2b2lkIDA7XG52YXIgU2VydmVyRXZlbnRzO1xuKGZ1bmN0aW9uIChTZXJ2ZXJFdmVudHMpIHtcbiAgICBTZXJ2ZXJFdmVudHNbXCJTRU5EQUdFXCJdID0gXCJ1c2VyOlNlbmRBZ2VcIjtcbn0pKFNlcnZlckV2ZW50cyB8fCAoZXhwb3J0cy5TZXJ2ZXJFdmVudHMgPSBTZXJ2ZXJFdmVudHMgPSB7fSkpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkV4YW1wbGVDb250cm9sbGVyID0gdm9pZCAwO1xuY29uc3QgYXBwX3NlcnZpY2VfMSA9IHJlcXVpcmUoXCIuLi9hcHAuc2VydmljZVwiKTtcbmNvbnN0IFNlcnZlckV2ZW50c19lbnVtXzEgPSByZXF1aXJlKFwiLi4vZW51bXMvU2VydmVyRXZlbnRzLmVudW1cIik7XG5jbGFzcyBFeGFtcGxlQ29udHJvbGxlciB7XG4gICAgY29uc3RydWN0b3IoZXhhbXBsZVNlcnZpY2UpIHtcbiAgICAgICAgdGhpcy5leGFtcGxlU2VydmljZSA9IGV4YW1wbGVTZXJ2aWNlO1xuICAgICAgICBhcHBfc2VydmljZV8xLkFwcFNlcnZpY2Uub25TZXJ2ZXIoU2VydmVyRXZlbnRzX2VudW1fMS5TZXJ2ZXJFdmVudHMuU0VOREFHRSwgKGFnZSkgPT4ge1xuICAgICAgICAgICAgJCgnI2FnZScpLnRleHQoYWdlKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuZXhwb3J0cy5FeGFtcGxlQ29udHJvbGxlciA9IEV4YW1wbGVDb250cm9sbGVyO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkV4YW1wbGVNb2R1bGUgPSB2b2lkIDA7XG5jb25zdCBleGFtcGxlX2NvbnRyb2xsZXJfMSA9IHJlcXVpcmUoXCIuL2V4YW1wbGUuY29udHJvbGxlclwiKTtcbmNvbnN0IGV4YW1wbGVfc2VydmljZV8xID0gcmVxdWlyZShcIi4vZXhhbXBsZS5zZXJ2aWNlXCIpO1xuY2xhc3MgRXhhbXBsZU1vZHVsZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIGNvbnN0IGV4YW1wbGVTZXJ2aWNlID0gbmV3IGV4YW1wbGVfc2VydmljZV8xLkV4YW1wbGVTZXJ2aWNlKCk7XG4gICAgICAgIG5ldyBleGFtcGxlX2NvbnRyb2xsZXJfMS5FeGFtcGxlQ29udHJvbGxlcihleGFtcGxlU2VydmljZSk7XG4gICAgfVxufVxuZXhwb3J0cy5FeGFtcGxlTW9kdWxlID0gRXhhbXBsZU1vZHVsZTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5FeGFtcGxlU2VydmljZSA9IHZvaWQgMDtcbmNvbnN0IGFwcF9zZXJ2aWNlXzEgPSByZXF1aXJlKFwiLi4vYXBwLnNlcnZpY2VcIik7XG5jb25zdCBTZXJ2ZXJFdmVudHNfZW51bV8xID0gcmVxdWlyZShcIi4uL2VudW1zL1NlcnZlckV2ZW50cy5lbnVtXCIpO1xuY2xhc3MgRXhhbXBsZVNlcnZpY2Uge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICAkKFwiI3N1Ym1pdFwiKS5jbGljaygoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCB5ZWFyT2ZCaXJ0aCA9ICQoXCIjYWdlSW5wdXRcIikudmFsKCk7XG4gICAgICAgICAgICBhcHBfc2VydmljZV8xLkFwcFNlcnZpY2UuZW1pdFNlcnZlcihTZXJ2ZXJFdmVudHNfZW51bV8xLlNlcnZlckV2ZW50cy5TRU5EQUdFLCBbeWVhck9mQmlydGgsIHllYXJPZkJpcnRoXSk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbmV4cG9ydHMuRXhhbXBsZVNlcnZpY2UgPSBFeGFtcGxlU2VydmljZTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGFwcF9tb2R1bGVfMSA9IHJlcXVpcmUoXCIuL2FwcC5tb2R1bGVcIik7XG5jb25zdCBhcHBfc2VydmljZV8xID0gcmVxdWlyZShcIi4vYXBwLnNlcnZpY2VcIik7XG4vLyBAdHMtaWdub3JlXG53aW5kb3cuZ2V0RGF0YSA9IChldmVudE5hbWUsIGRhdGEpID0+IHtcbiAgICBjb25zb2xlLmxvZyhldmVudE5hbWUsIGRhdGEpO1xuICAgIGFwcF9zZXJ2aWNlXzEuQXBwU2VydmljZS5lbWl0Q2xpZW50KGV2ZW50TmFtZSwgZGF0YSk7XG59O1xubmV3IGFwcF9tb2R1bGVfMS5BcHBNb2R1bGUoKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==