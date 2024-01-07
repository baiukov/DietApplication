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
        const currentEvent = parseInt(currentServerEventName);
        if (currentEvent !== eventName)
            return;
        // @ts-ignore
        _a.serverEvents[currentServerEventName](data);
    });
};
AppService.emitServer = (eventName, data) => {
    const eventData = {
        key: eventName,
        value: data
    };
    // @ts-ignore
    AndroidInterface.emitServer(JSON.stringify(eventData));
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
    ServerEvents[ServerEvents["SENDAGE"] = 0] = "SENDAGE";
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
            app_service_1.AppService.emitServer(ServerEvents_enum_1.ServerEvents.SENDAGE, yearOfBirth);
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
window.getData = (dataType, data) => {
    //$('body').text(dataType + data)
    app_service_1.AppService.emitClient(dataType, data);
};
new app_module_1.AppModule();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBYTtBQUNiLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjs7Ozs7Ozs7Ozs7QUNSUjtBQUNiLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCxpQkFBaUI7QUFDakIseUJBQXlCLG1CQUFPLENBQUMsaURBQWtCO0FBQ25ELHNCQUFzQixtQkFBTyxDQUFDLDJDQUFlO0FBQzdDLHlCQUF5QixtQkFBTyxDQUFDLGlFQUEwQjtBQUMzRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjs7Ozs7Ozs7Ozs7QUNoQko7QUFDYjtBQUNBLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrREFBa0QsYUFBYTtBQUMvRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0Esd0RBQXdELGFBQWE7QUFDckU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDMUNhO0FBQ2IsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELG9CQUFvQjtBQUNwQjtBQUNBO0FBQ0E7QUFDQSxDQUFDLG1CQUFtQixvQkFBb0Isb0JBQW9COzs7Ozs7Ozs7OztBQ04vQztBQUNiLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCx5QkFBeUI7QUFDekIsc0JBQXNCLG1CQUFPLENBQUMsNENBQWdCO0FBQzlDLDRCQUE0QixtQkFBTyxDQUFDLG9FQUE0QjtBQUNoRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSx5QkFBeUI7Ozs7Ozs7Ozs7O0FDYlo7QUFDYiw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0QscUJBQXFCO0FBQ3JCLDZCQUE2QixtQkFBTyxDQUFDLGlFQUFzQjtBQUMzRCwwQkFBMEIsbUJBQU8sQ0FBQywyREFBbUI7QUFDckQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCOzs7Ozs7Ozs7OztBQ1hSO0FBQ2IsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELHNCQUFzQjtBQUN0QixzQkFBc0IsbUJBQU8sQ0FBQyw0Q0FBZ0I7QUFDOUMsNEJBQTRCLG1CQUFPLENBQUMsb0VBQTRCO0FBQ2hFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLHNCQUFzQjs7Ozs7OztVQ2J0QjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7Ozs7Ozs7O0FDdEJhO0FBQ2IsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELHFCQUFxQixtQkFBTyxDQUFDLHlDQUFjO0FBQzNDLHNCQUFzQixtQkFBTyxDQUFDLDJDQUFlO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2RpZXRhcHBsaWNhdGlvbl9mcm9udGVuZC8uL2Rldi9hcHAuY29udHJvbGxlci50cyIsIndlYnBhY2s6Ly9kaWV0YXBwbGljYXRpb25fZnJvbnRlbmQvLi9kZXYvYXBwLm1vZHVsZS50cyIsIndlYnBhY2s6Ly9kaWV0YXBwbGljYXRpb25fZnJvbnRlbmQvLi9kZXYvYXBwLnNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vZGlldGFwcGxpY2F0aW9uX2Zyb250ZW5kLy4vZGV2L2VudW1zL1NlcnZlckV2ZW50cy5lbnVtLnRzIiwid2VicGFjazovL2RpZXRhcHBsaWNhdGlvbl9mcm9udGVuZC8uL2Rldi9leGFtcGxlL2V4YW1wbGUuY29udHJvbGxlci50cyIsIndlYnBhY2s6Ly9kaWV0YXBwbGljYXRpb25fZnJvbnRlbmQvLi9kZXYvZXhhbXBsZS9leGFtcGxlLm1vZHVsZS50cyIsIndlYnBhY2s6Ly9kaWV0YXBwbGljYXRpb25fZnJvbnRlbmQvLi9kZXYvZXhhbXBsZS9leGFtcGxlLnNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vZGlldGFwcGxpY2F0aW9uX2Zyb250ZW5kL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2RpZXRhcHBsaWNhdGlvbl9mcm9udGVuZC8uL2Rldi9tYWluLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5BcHBDb250cm9sbGVyID0gdm9pZCAwO1xuY2xhc3MgQXBwQ29udHJvbGxlciB7XG4gICAgY29uc3RydWN0b3IoYXBwU2VydmljZSkge1xuICAgICAgICB0aGlzLmFwcFNlcnZpY2UgPSBhcHBTZXJ2aWNlO1xuICAgIH1cbn1cbmV4cG9ydHMuQXBwQ29udHJvbGxlciA9IEFwcENvbnRyb2xsZXI7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuQXBwTW9kdWxlID0gdm9pZCAwO1xuY29uc3QgYXBwX2NvbnRyb2xsZXJfMSA9IHJlcXVpcmUoXCIuL2FwcC5jb250cm9sbGVyXCIpO1xuY29uc3QgYXBwX3NlcnZpY2VfMSA9IHJlcXVpcmUoXCIuL2FwcC5zZXJ2aWNlXCIpO1xuY29uc3QgZXhhbXBsZV9tb2R1bGVfMSA9IHJlcXVpcmUoXCIuL2V4YW1wbGUvZXhhbXBsZS5tb2R1bGVcIik7XG5jbGFzcyBBcHBNb2R1bGUge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmluaXRNb2R1bGVzID0gKCkgPT4ge1xuICAgICAgICAgICAgbmV3IGV4YW1wbGVfbW9kdWxlXzEuRXhhbXBsZU1vZHVsZSgpO1xuICAgICAgICB9O1xuICAgICAgICBjb25zdCBhcHBTZXJ2aWNlID0gbmV3IGFwcF9zZXJ2aWNlXzEuQXBwU2VydmljZSgpO1xuICAgICAgICBuZXcgYXBwX2NvbnRyb2xsZXJfMS5BcHBDb250cm9sbGVyKGFwcFNlcnZpY2UpO1xuICAgICAgICB0aGlzLmluaXRNb2R1bGVzKCk7XG4gICAgfVxufVxuZXhwb3J0cy5BcHBNb2R1bGUgPSBBcHBNb2R1bGU7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfYTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuQXBwU2VydmljZSA9IHZvaWQgMDtcbmNsYXNzIEFwcFNlcnZpY2Uge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgIH1cbn1cbmV4cG9ydHMuQXBwU2VydmljZSA9IEFwcFNlcnZpY2U7XG5fYSA9IEFwcFNlcnZpY2U7XG5BcHBTZXJ2aWNlLmV2ZW50cyA9IHt9O1xuQXBwU2VydmljZS5zZXJ2ZXJFdmVudHMgPSB7fTtcbkFwcFNlcnZpY2Uub24gPSAoZXZlbnROYW1lLCBmdW5jKSA9PiB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KF9hLmV2ZW50cywgZXZlbnROYW1lLCB7IHZhbHVlOiBmdW5jIH0pO1xufTtcbkFwcFNlcnZpY2UuZW1pdCA9IChldmVudE5hbWUpID0+IHtcbiAgICBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhfYS5ldmVudHMpLmZvckVhY2goKGN1cnJlbnRFdmVudE5hbWUpID0+IHtcbiAgICAgICAgY29uc3QgY3VycmVudEV2ZW50ID0gcGFyc2VJbnQoY3VycmVudEV2ZW50TmFtZSk7XG4gICAgICAgIGlmIChjdXJyZW50RXZlbnQgIT09IGV2ZW50TmFtZSlcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgX2EuZXZlbnRzW2N1cnJlbnRFdmVudF0oKTtcbiAgICB9KTtcbn07XG5BcHBTZXJ2aWNlLm9uU2VydmVyID0gKGV2ZW50TmFtZSwgZnVuYykgPT4ge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShfYS5zZXJ2ZXJFdmVudHMsIGV2ZW50TmFtZSwgeyB2YWx1ZTogZnVuYyB9KTtcbn07XG5BcHBTZXJ2aWNlLmVtaXRDbGllbnQgPSAoZXZlbnROYW1lLCBkYXRhKSA9PiB7XG4gICAgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoX2Euc2VydmVyRXZlbnRzKS5mb3JFYWNoKChjdXJyZW50U2VydmVyRXZlbnROYW1lKSA9PiB7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRFdmVudCA9IHBhcnNlSW50KGN1cnJlbnRTZXJ2ZXJFdmVudE5hbWUpO1xuICAgICAgICBpZiAoY3VycmVudEV2ZW50ICE9PSBldmVudE5hbWUpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgX2Euc2VydmVyRXZlbnRzW2N1cnJlbnRTZXJ2ZXJFdmVudE5hbWVdKGRhdGEpO1xuICAgIH0pO1xufTtcbkFwcFNlcnZpY2UuZW1pdFNlcnZlciA9IChldmVudE5hbWUsIGRhdGEpID0+IHtcbiAgICBjb25zdCBldmVudERhdGEgPSB7XG4gICAgICAgIGtleTogZXZlbnROYW1lLFxuICAgICAgICB2YWx1ZTogZGF0YVxuICAgIH07XG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIEFuZHJvaWRJbnRlcmZhY2UuZW1pdFNlcnZlcihKU09OLnN0cmluZ2lmeShldmVudERhdGEpKTtcbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuU2VydmVyRXZlbnRzID0gdm9pZCAwO1xudmFyIFNlcnZlckV2ZW50cztcbihmdW5jdGlvbiAoU2VydmVyRXZlbnRzKSB7XG4gICAgU2VydmVyRXZlbnRzW1NlcnZlckV2ZW50c1tcIlNFTkRBR0VcIl0gPSAwXSA9IFwiU0VOREFHRVwiO1xufSkoU2VydmVyRXZlbnRzIHx8IChleHBvcnRzLlNlcnZlckV2ZW50cyA9IFNlcnZlckV2ZW50cyA9IHt9KSk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuRXhhbXBsZUNvbnRyb2xsZXIgPSB2b2lkIDA7XG5jb25zdCBhcHBfc2VydmljZV8xID0gcmVxdWlyZShcIi4uL2FwcC5zZXJ2aWNlXCIpO1xuY29uc3QgU2VydmVyRXZlbnRzX2VudW1fMSA9IHJlcXVpcmUoXCIuLi9lbnVtcy9TZXJ2ZXJFdmVudHMuZW51bVwiKTtcbmNsYXNzIEV4YW1wbGVDb250cm9sbGVyIHtcbiAgICBjb25zdHJ1Y3RvcihleGFtcGxlU2VydmljZSkge1xuICAgICAgICB0aGlzLmV4YW1wbGVTZXJ2aWNlID0gZXhhbXBsZVNlcnZpY2U7XG4gICAgICAgIGFwcF9zZXJ2aWNlXzEuQXBwU2VydmljZS5vblNlcnZlcihTZXJ2ZXJFdmVudHNfZW51bV8xLlNlcnZlckV2ZW50cy5TRU5EQUdFLCAoYWdlKSA9PiB7XG4gICAgICAgICAgICAkKCcjYWdlJykudGV4dChhZ2UpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5leHBvcnRzLkV4YW1wbGVDb250cm9sbGVyID0gRXhhbXBsZUNvbnRyb2xsZXI7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuRXhhbXBsZU1vZHVsZSA9IHZvaWQgMDtcbmNvbnN0IGV4YW1wbGVfY29udHJvbGxlcl8xID0gcmVxdWlyZShcIi4vZXhhbXBsZS5jb250cm9sbGVyXCIpO1xuY29uc3QgZXhhbXBsZV9zZXJ2aWNlXzEgPSByZXF1aXJlKFwiLi9leGFtcGxlLnNlcnZpY2VcIik7XG5jbGFzcyBFeGFtcGxlTW9kdWxlIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgY29uc3QgZXhhbXBsZVNlcnZpY2UgPSBuZXcgZXhhbXBsZV9zZXJ2aWNlXzEuRXhhbXBsZVNlcnZpY2UoKTtcbiAgICAgICAgbmV3IGV4YW1wbGVfY29udHJvbGxlcl8xLkV4YW1wbGVDb250cm9sbGVyKGV4YW1wbGVTZXJ2aWNlKTtcbiAgICB9XG59XG5leHBvcnRzLkV4YW1wbGVNb2R1bGUgPSBFeGFtcGxlTW9kdWxlO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkV4YW1wbGVTZXJ2aWNlID0gdm9pZCAwO1xuY29uc3QgYXBwX3NlcnZpY2VfMSA9IHJlcXVpcmUoXCIuLi9hcHAuc2VydmljZVwiKTtcbmNvbnN0IFNlcnZlckV2ZW50c19lbnVtXzEgPSByZXF1aXJlKFwiLi4vZW51bXMvU2VydmVyRXZlbnRzLmVudW1cIik7XG5jbGFzcyBFeGFtcGxlU2VydmljZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgICQoXCIjc3VibWl0XCIpLmNsaWNrKCgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHllYXJPZkJpcnRoID0gJChcIiNhZ2VJbnB1dFwiKS52YWwoKTtcbiAgICAgICAgICAgIGFwcF9zZXJ2aWNlXzEuQXBwU2VydmljZS5lbWl0U2VydmVyKFNlcnZlckV2ZW50c19lbnVtXzEuU2VydmVyRXZlbnRzLlNFTkRBR0UsIHllYXJPZkJpcnRoKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuZXhwb3J0cy5FeGFtcGxlU2VydmljZSA9IEV4YW1wbGVTZXJ2aWNlO1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgYXBwX21vZHVsZV8xID0gcmVxdWlyZShcIi4vYXBwLm1vZHVsZVwiKTtcbmNvbnN0IGFwcF9zZXJ2aWNlXzEgPSByZXF1aXJlKFwiLi9hcHAuc2VydmljZVwiKTtcbi8vIEB0cy1pZ25vcmVcbndpbmRvdy5nZXREYXRhID0gKGRhdGFUeXBlLCBkYXRhKSA9PiB7XG4gICAgLy8kKCdib2R5JykudGV4dChkYXRhVHlwZSArIGRhdGEpXG4gICAgYXBwX3NlcnZpY2VfMS5BcHBTZXJ2aWNlLmVtaXRDbGllbnQoZGF0YVR5cGUsIGRhdGEpO1xufTtcbm5ldyBhcHBfbW9kdWxlXzEuQXBwTW9kdWxlKCk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=