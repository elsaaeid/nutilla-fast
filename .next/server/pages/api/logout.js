"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/api/logout";
exports.ids = ["pages/api/logout"];
exports.modules = {

/***/ "cookie":
/*!*************************!*\
  !*** external "cookie" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("cookie");

/***/ }),

/***/ "(api)/./pages/api/logout.js":
/*!*****************************!*\
  !*** ./pages/api/logout.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ handler)\n/* harmony export */ });\n/* harmony import */ var cookie__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cookie */ \"cookie\");\n/* harmony import */ var cookie__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(cookie__WEBPACK_IMPORTED_MODULE_0__);\n\nfunction handler(req, res) {\n    // Accept GET or POST to logout\n    const cookie = (0,cookie__WEBPACK_IMPORTED_MODULE_0__.serialize)(\"token\", \"\", {\n        httpOnly: true,\n        path: \"/\",\n        maxAge: 0\n    });\n    res.setHeader(\"Set-Cookie\", cookie);\n    res.status(200).json({\n        ok: true\n    });\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9wYWdlcy9hcGkvbG9nb3V0LmpzLmpzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUFrQztBQUVuQixTQUFTQyxRQUFRQyxHQUFHLEVBQUVDLEdBQUcsRUFBRTtJQUN4QywrQkFBK0I7SUFDL0IsTUFBTUMsU0FBU0osaURBQVNBLENBQUMsU0FBUyxJQUFJO1FBQ3BDSyxVQUFVLElBQUk7UUFDZEMsTUFBTTtRQUNOQyxRQUFRO0lBQ1Y7SUFFQUosSUFBSUssU0FBUyxDQUFDLGNBQWNKO0lBQzVCRCxJQUFJTSxNQUFNLENBQUMsS0FBS0MsSUFBSSxDQUFDO1FBQUVDLElBQUksSUFBSTtJQUFDO0FBQ2xDLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9udXRpbGxhLWZhc3QvLi9wYWdlcy9hcGkvbG9nb3V0LmpzPzM2NDAiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgc2VyaWFsaXplIH0gZnJvbSAnY29va2llJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaGFuZGxlcihyZXEsIHJlcykge1xyXG4gIC8vIEFjY2VwdCBHRVQgb3IgUE9TVCB0byBsb2dvdXRcclxuICBjb25zdCBjb29raWUgPSBzZXJpYWxpemUoJ3Rva2VuJywgJycsIHtcclxuICAgIGh0dHBPbmx5OiB0cnVlLFxyXG4gICAgcGF0aDogJy8nLFxyXG4gICAgbWF4QWdlOiAwLFxyXG4gIH0pXHJcblxyXG4gIHJlcy5zZXRIZWFkZXIoJ1NldC1Db29raWUnLCBjb29raWUpXHJcbiAgcmVzLnN0YXR1cygyMDApLmpzb24oeyBvazogdHJ1ZSB9KVxyXG59XHJcbiJdLCJuYW1lcyI6WyJzZXJpYWxpemUiLCJoYW5kbGVyIiwicmVxIiwicmVzIiwiY29va2llIiwiaHR0cE9ubHkiLCJwYXRoIiwibWF4QWdlIiwic2V0SGVhZGVyIiwic3RhdHVzIiwianNvbiIsIm9rIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(api)/./pages/api/logout.js\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(api)/./pages/api/logout.js"));
module.exports = __webpack_exports__;

})();