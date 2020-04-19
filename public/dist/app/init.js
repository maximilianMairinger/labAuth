(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["init"],{

/***/ "./app/global.ts":
/*!***********************!*\
  !*** ./app/global.ts ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/* harmony import */ var extended_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! extended-dom */ "./node_modules/extended-dom/app/dist/edom.js");
/* harmony import */ var xrray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! xrray */ "./node_modules/xrray/xrray.js");
/* harmony import */ var xrray__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(xrray__WEBPACK_IMPORTED_MODULE_1__);


/* harmony default export */ __webpack_exports__["default"] = (async function () {
    await Object(extended_dom__WEBPACK_IMPORTED_MODULE_0__["default"])();
    //@ts-ignore
    global.log = console.log;
    //@ts-ignore
    global.ce = document.createElement.bind(document);
});

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./app/init.ts":
/*!*********************!*\
  !*** ./app/init.ts ***!
  \*********************/
/*! exports provided: init */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "init", function() { return init; });
/* harmony import */ var _global__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./global */ "./app/global.ts");

async function init() {
    await Object(_global__WEBPACK_IMPORTED_MODULE_0__["default"])();
    const main = (await Promise.all(/*! import() */[__webpack_require__.e(0), __webpack_require__.e(1)]).then(__webpack_require__.bind(null, /*! ./main */ "./app/main.ts"))).default;
    main();
    if ("serviceWorker" in navigator) {
        if (navigator.serviceWorker.controller) {
            console.log("[SW - LabAuth] Found Service worker");
        }
        else {
            await navigator.serviceWorker.register("./serviceworker.js", { scope: "./" }).then(function (reg) {
                console.log("[SW - LabAuth] Service worker installed with scope: " + reg.scope);
            });
        }
    }
    else {
        console.warn("[SW - LabAuth] Unable to install Service worker. Not supported.");
    }
}


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hcHAvZ2xvYmFsLnRzIiwid2VicGFjazovLy8uL2FwcC9pbml0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFtQztBQUNyQjtBQUdDLG9FQUFLO0lBQ2xCLE1BQU0sNERBQVEsRUFBRTtJQUNoQixZQUFZO0lBQ1osTUFBTSxDQUFDLEdBQUcsR0FBRyxPQUFPLENBQUMsR0FBRztJQUN4QixZQUFZO0lBQ1osTUFBTSxDQUFDLEVBQUUsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7QUFDbkQsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7QUNWRDtBQUFBO0FBQUE7QUFBNkI7QUFLdEIsS0FBSyxVQUFVLElBQUk7SUFDeEIsTUFBTSx1REFBTSxFQUFFO0lBRWQsTUFBTSxJQUFJLEdBQUcsQ0FBQyxNQUFNLG9KQUFnQixDQUFDLENBQUMsT0FBTztJQUM3QyxJQUFJLEVBQUU7SUFHTixJQUFJLGVBQWUsSUFBSSxTQUFTLEVBQUU7UUFDaEMsSUFBSSxTQUFTLENBQUMsYUFBYSxDQUFDLFVBQVUsRUFBRTtZQUN0QyxPQUFPLENBQUMsR0FBRyxDQUFDLHFDQUFxQyxDQUFDO1NBQ25EO2FBQU07WUFDTCxNQUFNLFNBQVMsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLG9CQUFvQixFQUFFLEVBQUMsS0FBSyxFQUFFLElBQUksRUFBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVMsR0FBRztnQkFDM0YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxzREFBc0QsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDO1lBQ2pGLENBQUMsQ0FBQztTQUNIO0tBQ0Y7U0FDSTtRQUNILE9BQU8sQ0FBQyxJQUFJLENBQUMsaUVBQWlFLENBQUMsQ0FBQztLQUNqRjtBQUNILENBQUMiLCJmaWxlIjoicHVibGljL2Rpc3QvYXBwL2luaXQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgcG9seWZpbGwgZnJvbSBcImV4dGVuZGVkLWRvbVwiXG5pbXBvcnQgXCJ4cnJheVwiXG5cblxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgZnVuY3Rpb24oKSB7XG4gIGF3YWl0IHBvbHlmaWxsKClcbiAgLy9AdHMtaWdub3JlXG4gIGdsb2JhbC5sb2cgPSBjb25zb2xlLmxvZ1xuICAvL0B0cy1pZ25vcmVcbiAgZ2xvYmFsLmNlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudC5iaW5kKGRvY3VtZW50KVxufVxuIiwiaW1wb3J0IGdsb2JhbCBmcm9tIFwiLi9nbG9iYWxcIlxuXG5cblxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gaW5pdCgpIHtcbiAgYXdhaXQgZ2xvYmFsKClcbiAgXG4gIGNvbnN0IG1haW4gPSAoYXdhaXQgaW1wb3J0KFwiLi9tYWluXCIpKS5kZWZhdWx0XG4gIG1haW4oKVxuXG5cbiAgaWYgKFwic2VydmljZVdvcmtlclwiIGluIG5hdmlnYXRvcikge1xuICAgIGlmIChuYXZpZ2F0b3Iuc2VydmljZVdvcmtlci5jb250cm9sbGVyKSB7XG4gICAgICBjb25zb2xlLmxvZyhcIltTVyAtIExhYkF1dGhdIEZvdW5kIFNlcnZpY2Ugd29ya2VyXCIpXG4gICAgfSBlbHNlIHtcbiAgICAgIGF3YWl0IG5hdmlnYXRvci5zZXJ2aWNlV29ya2VyLnJlZ2lzdGVyKFwiLi9zZXJ2aWNld29ya2VyLmpzXCIsIHtzY29wZTogXCIuL1wifSkudGhlbihmdW5jdGlvbihyZWcpe1xuICAgICAgICBjb25zb2xlLmxvZyhcIltTVyAtIExhYkF1dGhdIFNlcnZpY2Ugd29ya2VyIGluc3RhbGxlZCB3aXRoIHNjb3BlOiBcIiArIHJlZy5zY29wZSlcbiAgICAgIH0pXG4gICAgfVxuICB9XG4gIGVsc2Uge1xuICAgIGNvbnNvbGUud2FybihcIltTVyAtIExhYkF1dGhdIFVuYWJsZSB0byBpbnN0YWxsIFNlcnZpY2Ugd29ya2VyLiBOb3Qgc3VwcG9ydGVkLlwiKTtcbiAgfVxufVxuICBcbiAgXG5cblxuIl0sInNvdXJjZVJvb3QiOiIifQ==