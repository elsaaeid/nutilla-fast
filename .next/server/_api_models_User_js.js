"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "_api_models_User_js";
exports.ids = ["_api_models_User_js"];
exports.modules = {

/***/ "(api)/./models/User.js":
/*!************************!*\
  !*** ./models/User.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n\nconst UserSchema = new (mongoose__WEBPACK_IMPORTED_MODULE_0___default().Schema)({\n    name: {\n        type: String,\n        required: true\n    },\n    email: {\n        type: String,\n        required: true,\n        unique: true\n    },\n    phone: {\n        type: String\n    },\n    role: {\n        type: String,\n        default: \"buyer\"\n    },\n    password: {\n        type: String,\n        required: true\n    },\n    isVerified: {\n        type: Boolean,\n        default: false\n    }\n}, {\n    timestamps: true\n});\n// Avoid model overwrite issues in dev/hot-reload\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((mongoose__WEBPACK_IMPORTED_MODULE_0___default().models.User) || mongoose__WEBPACK_IMPORTED_MODULE_0___default().model(\"User\", UserSchema));\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9tb2RlbHMvVXNlci5qcy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBK0I7QUFFL0IsTUFBTUMsYUFBYSxJQUFJRCx3REFBZSxDQUFDO0lBQ3JDRyxNQUFNO1FBQUVDLE1BQU1DO1FBQVFDLFVBQVUsSUFBSTtJQUFDO0lBQ3JDQyxPQUFPO1FBQUVILE1BQU1DO1FBQVFDLFVBQVUsSUFBSTtRQUFFRSxRQUFRLElBQUk7SUFBQztJQUNwREMsT0FBTztRQUFFTCxNQUFNQztJQUFPO0lBQ3RCSyxNQUFNO1FBQUVOLE1BQU1DO1FBQVFNLFNBQVM7SUFBUTtJQUN2Q0MsVUFBVTtRQUFFUixNQUFNQztRQUFRQyxVQUFVLElBQUk7SUFBQztJQUN6Q08sWUFBWTtRQUFFVCxNQUFNVTtRQUFTSCxTQUFTLEtBQUs7SUFBQztBQUM5QyxHQUFHO0lBQUVJLFlBQVksSUFBSTtBQUFDO0FBRXRCLGlEQUFpRDtBQUNqRCxpRUFBZWYsNkRBQW9CLElBQUlBLHFEQUFjLENBQUMsUUFBUUMsV0FBV0EsRUFBQSIsInNvdXJjZXMiOlsid2VicGFjazovL251dGlsbGEtZmFzdC8uL21vZGVscy9Vc2VyLmpzPzczNjciXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG1vbmdvb3NlIGZyb20gJ21vbmdvb3NlJ1xyXG5cclxuY29uc3QgVXNlclNjaGVtYSA9IG5ldyBtb25nb29zZS5TY2hlbWEoe1xyXG4gIG5hbWU6IHsgdHlwZTogU3RyaW5nLCByZXF1aXJlZDogdHJ1ZSB9LFxyXG4gIGVtYWlsOiB7IHR5cGU6IFN0cmluZywgcmVxdWlyZWQ6IHRydWUsIHVuaXF1ZTogdHJ1ZSB9LFxyXG4gIHBob25lOiB7IHR5cGU6IFN0cmluZyB9LFxyXG4gIHJvbGU6IHsgdHlwZTogU3RyaW5nLCBkZWZhdWx0OiAnYnV5ZXInIH0sXHJcbiAgcGFzc3dvcmQ6IHsgdHlwZTogU3RyaW5nLCByZXF1aXJlZDogdHJ1ZSB9LFxyXG4gIGlzVmVyaWZpZWQ6IHsgdHlwZTogQm9vbGVhbiwgZGVmYXVsdDogZmFsc2UgfSxcclxufSwgeyB0aW1lc3RhbXBzOiB0cnVlIH0pXHJcblxyXG4vLyBBdm9pZCBtb2RlbCBvdmVyd3JpdGUgaXNzdWVzIGluIGRldi9ob3QtcmVsb2FkXHJcbmV4cG9ydCBkZWZhdWx0IG1vbmdvb3NlLm1vZGVscy5Vc2VyIHx8IG1vbmdvb3NlLm1vZGVsKCdVc2VyJywgVXNlclNjaGVtYSlcclxuIl0sIm5hbWVzIjpbIm1vbmdvb3NlIiwiVXNlclNjaGVtYSIsIlNjaGVtYSIsIm5hbWUiLCJ0eXBlIiwiU3RyaW5nIiwicmVxdWlyZWQiLCJlbWFpbCIsInVuaXF1ZSIsInBob25lIiwicm9sZSIsImRlZmF1bHQiLCJwYXNzd29yZCIsImlzVmVyaWZpZWQiLCJCb29sZWFuIiwidGltZXN0YW1wcyIsIm1vZGVscyIsIlVzZXIiLCJtb2RlbCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(api)/./models/User.js\n");

/***/ })

};
;