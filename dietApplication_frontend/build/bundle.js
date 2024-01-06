/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./dev/app.controller.ts":
/*!*******************************!*\
  !*** ./dev/app.controller.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppController = void 0;
const app_service_1 = __webpack_require__(/*! ./app.service */ "./dev/app.service.ts");
const ClientEvents_enum_1 = __webpack_require__(/*! ./enums/ClientEvents.enum */ "./dev/enums/ClientEvents.enum.ts");
const serverEvents_enum_1 = __webpack_require__(/*! ./enums/serverEvents.enum */ "./dev/enums/serverEvents.enum.ts");
class AppController {
    constructor(appService) {
        this.appService = appService;
        app_service_1.AppService.onServer(serverEvents_enum_1.ServerEvents.TEST, (data) => {
            app_service_1.AppService.emitServer(ClientEvents_enum_1.ClientEvents.TEST, "123");
        });
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
class AppModule {
    constructor() {
        this.initModules = () => {
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
    console.log(_a.serverEvents, func);
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
    // @ts-ignore
    AndroidInterface.emitServer(eventName, data);
};


/***/ }),

/***/ "./dev/enums/ClientEvents.enum.ts":
/*!****************************************!*\
  !*** ./dev/enums/ClientEvents.enum.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ClientEvents = void 0;
var ClientEvents;
(function (ClientEvents) {
    ClientEvents[ClientEvents["TEST"] = 0] = "TEST";
})(ClientEvents || (exports.ClientEvents = ClientEvents = {}));


/***/ }),

/***/ "./dev/enums/serverEvents.enum.ts":
/*!****************************************!*\
  !*** ./dev/enums/serverEvents.enum.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ServerEvents = void 0;
var ServerEvents;
(function (ServerEvents) {
    ServerEvents[ServerEvents["TEST"] = 0] = "TEST";
})(ServerEvents || (exports.ServerEvents = ServerEvents = {}));


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
    app_service_1.AppService.emitClient(dataType, data);
};
// @ts-ignore
window.sendData = (dataType, data) => {
    // @ts-ignore
    AndroidInterface.sendDataToAndroid(dataType, data);
};
new app_module_1.AppModule();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBYTtBQUNiLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCxxQkFBcUI7QUFDckIsc0JBQXNCLG1CQUFPLENBQUMsMkNBQWU7QUFDN0MsNEJBQTRCLG1CQUFPLENBQUMsbUVBQTJCO0FBQy9ELDRCQUE0QixtQkFBTyxDQUFDLG1FQUEyQjtBQUMvRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxxQkFBcUI7Ozs7Ozs7Ozs7O0FDZFI7QUFDYiw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0QsaUJBQWlCO0FBQ2pCLHlCQUF5QixtQkFBTyxDQUFDLGlEQUFrQjtBQUNuRCxzQkFBc0IsbUJBQU8sQ0FBQywyQ0FBZTtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7Ozs7Ozs7Ozs7O0FDZEo7QUFDYjtBQUNBLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrREFBa0QsYUFBYTtBQUMvRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0Esd0RBQXdELGFBQWE7QUFDckU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDdkNhO0FBQ2IsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELG9CQUFvQjtBQUNwQjtBQUNBO0FBQ0E7QUFDQSxDQUFDLG1CQUFtQixvQkFBb0Isb0JBQW9COzs7Ozs7Ozs7OztBQ04vQztBQUNiLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCxvQkFBb0I7QUFDcEI7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxtQkFBbUIsb0JBQW9CLG9CQUFvQjs7Ozs7OztVQ041RDtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7Ozs7Ozs7O0FDdEJhO0FBQ2IsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELHFCQUFxQixtQkFBTyxDQUFDLHlDQUFjO0FBQzNDLHNCQUFzQixtQkFBTyxDQUFDLDJDQUFlO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZGlldGFwcGxpY2F0aW9uX2Zyb250ZW5kLy4vZGV2L2FwcC5jb250cm9sbGVyLnRzIiwid2VicGFjazovL2RpZXRhcHBsaWNhdGlvbl9mcm9udGVuZC8uL2Rldi9hcHAubW9kdWxlLnRzIiwid2VicGFjazovL2RpZXRhcHBsaWNhdGlvbl9mcm9udGVuZC8uL2Rldi9hcHAuc2VydmljZS50cyIsIndlYnBhY2s6Ly9kaWV0YXBwbGljYXRpb25fZnJvbnRlbmQvLi9kZXYvZW51bXMvQ2xpZW50RXZlbnRzLmVudW0udHMiLCJ3ZWJwYWNrOi8vZGlldGFwcGxpY2F0aW9uX2Zyb250ZW5kLy4vZGV2L2VudW1zL3NlcnZlckV2ZW50cy5lbnVtLnRzIiwid2VicGFjazovL2RpZXRhcHBsaWNhdGlvbl9mcm9udGVuZC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9kaWV0YXBwbGljYXRpb25fZnJvbnRlbmQvLi9kZXYvbWFpbi50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuQXBwQ29udHJvbGxlciA9IHZvaWQgMDtcbmNvbnN0IGFwcF9zZXJ2aWNlXzEgPSByZXF1aXJlKFwiLi9hcHAuc2VydmljZVwiKTtcbmNvbnN0IENsaWVudEV2ZW50c19lbnVtXzEgPSByZXF1aXJlKFwiLi9lbnVtcy9DbGllbnRFdmVudHMuZW51bVwiKTtcbmNvbnN0IHNlcnZlckV2ZW50c19lbnVtXzEgPSByZXF1aXJlKFwiLi9lbnVtcy9zZXJ2ZXJFdmVudHMuZW51bVwiKTtcbmNsYXNzIEFwcENvbnRyb2xsZXIge1xuICAgIGNvbnN0cnVjdG9yKGFwcFNlcnZpY2UpIHtcbiAgICAgICAgdGhpcy5hcHBTZXJ2aWNlID0gYXBwU2VydmljZTtcbiAgICAgICAgYXBwX3NlcnZpY2VfMS5BcHBTZXJ2aWNlLm9uU2VydmVyKHNlcnZlckV2ZW50c19lbnVtXzEuU2VydmVyRXZlbnRzLlRFU1QsIChkYXRhKSA9PiB7XG4gICAgICAgICAgICBhcHBfc2VydmljZV8xLkFwcFNlcnZpY2UuZW1pdFNlcnZlcihDbGllbnRFdmVudHNfZW51bV8xLkNsaWVudEV2ZW50cy5URVNULCBcIjEyM1wiKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuZXhwb3J0cy5BcHBDb250cm9sbGVyID0gQXBwQ29udHJvbGxlcjtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5BcHBNb2R1bGUgPSB2b2lkIDA7XG5jb25zdCBhcHBfY29udHJvbGxlcl8xID0gcmVxdWlyZShcIi4vYXBwLmNvbnRyb2xsZXJcIik7XG5jb25zdCBhcHBfc2VydmljZV8xID0gcmVxdWlyZShcIi4vYXBwLnNlcnZpY2VcIik7XG5jbGFzcyBBcHBNb2R1bGUge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmluaXRNb2R1bGVzID0gKCkgPT4ge1xuICAgICAgICB9O1xuICAgICAgICBjb25zdCBhcHBTZXJ2aWNlID0gbmV3IGFwcF9zZXJ2aWNlXzEuQXBwU2VydmljZSgpO1xuICAgICAgICBuZXcgYXBwX2NvbnRyb2xsZXJfMS5BcHBDb250cm9sbGVyKGFwcFNlcnZpY2UpO1xuICAgICAgICB0aGlzLmluaXRNb2R1bGVzKCk7XG4gICAgfVxufVxuZXhwb3J0cy5BcHBNb2R1bGUgPSBBcHBNb2R1bGU7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfYTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuQXBwU2VydmljZSA9IHZvaWQgMDtcbmNsYXNzIEFwcFNlcnZpY2Uge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgIH1cbn1cbmV4cG9ydHMuQXBwU2VydmljZSA9IEFwcFNlcnZpY2U7XG5fYSA9IEFwcFNlcnZpY2U7XG5BcHBTZXJ2aWNlLmV2ZW50cyA9IHt9O1xuQXBwU2VydmljZS5zZXJ2ZXJFdmVudHMgPSB7fTtcbkFwcFNlcnZpY2Uub24gPSAoZXZlbnROYW1lLCBmdW5jKSA9PiB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KF9hLmV2ZW50cywgZXZlbnROYW1lLCB7IHZhbHVlOiBmdW5jIH0pO1xufTtcbkFwcFNlcnZpY2UuZW1pdCA9IChldmVudE5hbWUpID0+IHtcbiAgICBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhfYS5ldmVudHMpLmZvckVhY2goKGN1cnJlbnRFdmVudE5hbWUpID0+IHtcbiAgICAgICAgY29uc3QgY3VycmVudEV2ZW50ID0gcGFyc2VJbnQoY3VycmVudEV2ZW50TmFtZSk7XG4gICAgICAgIGlmIChjdXJyZW50RXZlbnQgIT09IGV2ZW50TmFtZSlcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgX2EuZXZlbnRzW2N1cnJlbnRFdmVudF0oKTtcbiAgICB9KTtcbn07XG5BcHBTZXJ2aWNlLm9uU2VydmVyID0gKGV2ZW50TmFtZSwgZnVuYykgPT4ge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShfYS5zZXJ2ZXJFdmVudHMsIGV2ZW50TmFtZSwgeyB2YWx1ZTogZnVuYyB9KTtcbiAgICBjb25zb2xlLmxvZyhfYS5zZXJ2ZXJFdmVudHMsIGZ1bmMpO1xufTtcbkFwcFNlcnZpY2UuZW1pdENsaWVudCA9IChldmVudE5hbWUsIGRhdGEpID0+IHtcbiAgICBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhfYS5zZXJ2ZXJFdmVudHMpLmZvckVhY2goKGN1cnJlbnRTZXJ2ZXJFdmVudE5hbWUpID0+IHtcbiAgICAgICAgY29uc3QgY3VycmVudEV2ZW50ID0gcGFyc2VJbnQoY3VycmVudFNlcnZlckV2ZW50TmFtZSk7XG4gICAgICAgIGlmIChjdXJyZW50RXZlbnQgIT09IGV2ZW50TmFtZSlcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICBfYS5zZXJ2ZXJFdmVudHNbY3VycmVudFNlcnZlckV2ZW50TmFtZV0oZGF0YSk7XG4gICAgfSk7XG59O1xuQXBwU2VydmljZS5lbWl0U2VydmVyID0gKGV2ZW50TmFtZSwgZGF0YSkgPT4ge1xuICAgIC8vIEB0cy1pZ25vcmVcbiAgICBBbmRyb2lkSW50ZXJmYWNlLmVtaXRTZXJ2ZXIoZXZlbnROYW1lLCBkYXRhKTtcbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuQ2xpZW50RXZlbnRzID0gdm9pZCAwO1xudmFyIENsaWVudEV2ZW50cztcbihmdW5jdGlvbiAoQ2xpZW50RXZlbnRzKSB7XG4gICAgQ2xpZW50RXZlbnRzW0NsaWVudEV2ZW50c1tcIlRFU1RcIl0gPSAwXSA9IFwiVEVTVFwiO1xufSkoQ2xpZW50RXZlbnRzIHx8IChleHBvcnRzLkNsaWVudEV2ZW50cyA9IENsaWVudEV2ZW50cyA9IHt9KSk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuU2VydmVyRXZlbnRzID0gdm9pZCAwO1xudmFyIFNlcnZlckV2ZW50cztcbihmdW5jdGlvbiAoU2VydmVyRXZlbnRzKSB7XG4gICAgU2VydmVyRXZlbnRzW1NlcnZlckV2ZW50c1tcIlRFU1RcIl0gPSAwXSA9IFwiVEVTVFwiO1xufSkoU2VydmVyRXZlbnRzIHx8IChleHBvcnRzLlNlcnZlckV2ZW50cyA9IFNlcnZlckV2ZW50cyA9IHt9KSk7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBhcHBfbW9kdWxlXzEgPSByZXF1aXJlKFwiLi9hcHAubW9kdWxlXCIpO1xuY29uc3QgYXBwX3NlcnZpY2VfMSA9IHJlcXVpcmUoXCIuL2FwcC5zZXJ2aWNlXCIpO1xuLy8gQHRzLWlnbm9yZVxud2luZG93LmdldERhdGEgPSAoZGF0YVR5cGUsIGRhdGEpID0+IHtcbiAgICBhcHBfc2VydmljZV8xLkFwcFNlcnZpY2UuZW1pdENsaWVudChkYXRhVHlwZSwgZGF0YSk7XG59O1xuLy8gQHRzLWlnbm9yZVxud2luZG93LnNlbmREYXRhID0gKGRhdGFUeXBlLCBkYXRhKSA9PiB7XG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIEFuZHJvaWRJbnRlcmZhY2Uuc2VuZERhdGFUb0FuZHJvaWQoZGF0YVR5cGUsIGRhdGEpO1xufTtcbm5ldyBhcHBfbW9kdWxlXzEuQXBwTW9kdWxlKCk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=