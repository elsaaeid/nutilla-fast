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
exports.id = "pages/api/products";
exports.ids = ["pages/api/products"];
exports.modules = {

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("mongoose");

/***/ }),

/***/ "(api)/./models/Product.js":
/*!***************************!*\
  !*** ./models/Product.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n\nconst ProductSchema = new (mongoose__WEBPACK_IMPORTED_MODULE_0___default().Schema)({\n    img: {\n        type: String,\n        required: true\n    },\n    title: {\n        type: String,\n        required: true,\n        maxlength: 60\n    },\n    price: {\n        type: [\n            Number\n        ],\n        required: true\n    },\n    desc: {\n        type: String,\n        required: true,\n        maxlength: 200\n    }\n}, {\n    timestamps: true\n});\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((mongoose__WEBPACK_IMPORTED_MODULE_0___default().models.Product) || mongoose__WEBPACK_IMPORTED_MODULE_0___default().model(\"Product\", ProductSchema));\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9tb2RlbHMvUHJvZHVjdC5qcy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBZ0M7QUFFaEMsTUFBTUMsZ0JBQWdCLElBQUlELHdEQUFlLENBQ3ZDO0lBQ0VHLEtBQUs7UUFDSEMsTUFBTUM7UUFDTkMsVUFBVSxJQUFJO0lBQ2hCO0lBQ0FDLE9BQU87UUFDTEgsTUFBTUM7UUFDTkMsVUFBVSxJQUFJO1FBQ2RFLFdBQVc7SUFDYjtJQUNBQyxPQUFPO1FBQ0xMLE1BQU07WUFBQ007U0FBTztRQUNkSixVQUFVLElBQUk7SUFDaEI7SUFDQUssTUFBTTtRQUNKUCxNQUFNQztRQUNOQyxVQUFVLElBQUk7UUFDZEUsV0FBVztJQUNiO0FBQ0YsR0FDQTtJQUFFSSxZQUFZLElBQUk7QUFBQztBQUdyQixpRUFBZVosZ0VBQXVCLElBQ3BDQSxxREFBYyxDQUFDLFdBQVdDLGNBQWNBLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9udXRpbGxhLWZhc3QvLi9tb2RlbHMvUHJvZHVjdC5qcz8wOWM2Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBtb25nb29zZSBmcm9tIFwibW9uZ29vc2VcIjtcclxuXHJcbmNvbnN0IFByb2R1Y3RTY2hlbWEgPSBuZXcgbW9uZ29vc2UuU2NoZW1hKFxyXG4gIHtcclxuICAgIGltZzoge1xyXG4gICAgICB0eXBlOiBTdHJpbmcsXHJcbiAgICAgIHJlcXVpcmVkOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIHRpdGxlOiB7XHJcbiAgICAgIHR5cGU6IFN0cmluZyxcclxuICAgICAgcmVxdWlyZWQ6IHRydWUsXHJcbiAgICAgIG1heGxlbmd0aDogNjAsXHJcbiAgICB9LFxyXG4gICAgcHJpY2U6IHtcclxuICAgICAgdHlwZTogW051bWJlcl0sXHJcbiAgICAgIHJlcXVpcmVkOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIGRlc2M6IHtcclxuICAgICAgdHlwZTogU3RyaW5nLFxyXG4gICAgICByZXF1aXJlZDogdHJ1ZSxcclxuICAgICAgbWF4bGVuZ3RoOiAyMDAsXHJcbiAgICB9XHJcbiAgfSxcclxuICB7IHRpbWVzdGFtcHM6IHRydWUgfVxyXG4pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgbW9uZ29vc2UubW9kZWxzLlByb2R1Y3QgfHxcclxuICBtb25nb29zZS5tb2RlbChcIlByb2R1Y3RcIiwgUHJvZHVjdFNjaGVtYSk7Il0sIm5hbWVzIjpbIm1vbmdvb3NlIiwiUHJvZHVjdFNjaGVtYSIsIlNjaGVtYSIsImltZyIsInR5cGUiLCJTdHJpbmciLCJyZXF1aXJlZCIsInRpdGxlIiwibWF4bGVuZ3RoIiwicHJpY2UiLCJOdW1iZXIiLCJkZXNjIiwidGltZXN0YW1wcyIsIm1vZGVscyIsIlByb2R1Y3QiLCJtb2RlbCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(api)/./models/Product.js\n");

/***/ }),

/***/ "(api)/./pages/api/products/index.js":
/*!*************************************!*\
  !*** ./pages/api/products/index.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ handler)\n/* harmony export */ });\n/* harmony import */ var _util_mongo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../util/mongo */ \"(api)/./util/mongo.js\");\n/* harmony import */ var _models_Product__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../models/Product */ \"(api)/./models/Product.js\");\n\n\nasync function handler(req, res) {\n    const { method , cookies  } = req;\n    const token = cookies.token;\n    (0,_util_mongo__WEBPACK_IMPORTED_MODULE_0__[\"default\"])();\n    if (method === \"GET\") {\n        try {\n            const products = await _models_Product__WEBPACK_IMPORTED_MODULE_1__[\"default\"].find();\n            res.status(200).json(products);\n        } catch (err) {\n            res.status(500).json(err);\n        }\n    }\n    if (method === \"POST\") {\n        if (!token || token !== process.env.token) {\n            return res.status(401).json(\"Not authenticated!\");\n        }\n        try {\n            const product = await _models_Product__WEBPACK_IMPORTED_MODULE_1__[\"default\"].create(req.body);\n            res.status(201).json(product);\n        } catch (err1) {\n            res.status(500).json(err1);\n        }\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9wYWdlcy9hcGkvcHJvZHVjdHMvaW5kZXguanMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQTRDO0FBQ0U7QUFFL0IsZUFBZUUsUUFBUUMsR0FBRyxFQUFFQyxHQUFHLEVBQUU7SUFDOUMsTUFBTSxFQUFFQyxPQUFNLEVBQUVDLFFBQU8sRUFBRSxHQUFHSDtJQUU1QixNQUFNSSxRQUFRRCxRQUFRQyxLQUFLO0lBRTNCUCx1REFBU0E7SUFFVCxJQUFJSyxXQUFXLE9BQU87UUFDcEIsSUFBSTtZQUNGLE1BQU1HLFdBQVcsTUFBTVAsNERBQVk7WUFDbkNHLElBQUlNLE1BQU0sQ0FBQyxLQUFLQyxJQUFJLENBQUNIO1FBQ3ZCLEVBQUUsT0FBT0ksS0FBSztZQUNaUixJQUFJTSxNQUFNLENBQUMsS0FBS0MsSUFBSSxDQUFDQztRQUN2QjtJQUNGLENBQUM7SUFFRCxJQUFJUCxXQUFXLFFBQVE7UUFDckIsSUFBRyxDQUFDRSxTQUFTQSxVQUFVTSxRQUFRQyxHQUFHLENBQUNQLEtBQUssRUFBQztZQUN2QyxPQUFPSCxJQUFJTSxNQUFNLENBQUMsS0FBS0MsSUFBSSxDQUFDO1FBQzlCLENBQUM7UUFDRCxJQUFJO1lBQ0YsTUFBTUksVUFBVSxNQUFNZCw4REFBYyxDQUFDRSxJQUFJYyxJQUFJO1lBQzdDYixJQUFJTSxNQUFNLENBQUMsS0FBS0MsSUFBSSxDQUFDSTtRQUN2QixFQUFFLE9BQU9ILE1BQUs7WUFDWlIsSUFBSU0sTUFBTSxDQUFDLEtBQUtDLElBQUksQ0FBQ0M7UUFDdkI7SUFDRixDQUFDO0FBQ0gsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL251dGlsbGEtZmFzdC8uL3BhZ2VzL2FwaS9wcm9kdWN0cy9pbmRleC5qcz81OTczIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBkYkNvbm5lY3QgZnJvbSBcIi4uLy4uLy4uL3V0aWwvbW9uZ29cIjtcclxuaW1wb3J0IFByb2R1Y3QgZnJvbSBcIi4uLy4uLy4uL21vZGVscy9Qcm9kdWN0XCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBhc3luYyBmdW5jdGlvbiBoYW5kbGVyKHJlcSwgcmVzKSB7XHJcbiAgY29uc3QgeyBtZXRob2QsIGNvb2tpZXMgfSA9IHJlcTtcclxuXHJcbiAgY29uc3QgdG9rZW4gPSBjb29raWVzLnRva2VuXHJcblxyXG4gIGRiQ29ubmVjdCgpO1xyXG5cclxuICBpZiAobWV0aG9kID09PSBcIkdFVFwiKSB7XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCBwcm9kdWN0cyA9IGF3YWl0IFByb2R1Y3QuZmluZCgpO1xyXG4gICAgICByZXMuc3RhdHVzKDIwMCkuanNvbihwcm9kdWN0cyk7XHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgcmVzLnN0YXR1cyg1MDApLmpzb24oZXJyKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGlmIChtZXRob2QgPT09IFwiUE9TVFwiKSB7XHJcbiAgICBpZighdG9rZW4gfHwgdG9rZW4gIT09IHByb2Nlc3MuZW52LnRva2VuKXtcclxuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAxKS5qc29uKFwiTm90IGF1dGhlbnRpY2F0ZWQhXCIpXHJcbiAgICB9XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCBwcm9kdWN0ID0gYXdhaXQgUHJvZHVjdC5jcmVhdGUocmVxLmJvZHkpO1xyXG4gICAgICByZXMuc3RhdHVzKDIwMSkuanNvbihwcm9kdWN0KTtcclxuICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICByZXMuc3RhdHVzKDUwMCkuanNvbihlcnIpO1xyXG4gICAgfVxyXG4gIH1cclxufSJdLCJuYW1lcyI6WyJkYkNvbm5lY3QiLCJQcm9kdWN0IiwiaGFuZGxlciIsInJlcSIsInJlcyIsIm1ldGhvZCIsImNvb2tpZXMiLCJ0b2tlbiIsInByb2R1Y3RzIiwiZmluZCIsInN0YXR1cyIsImpzb24iLCJlcnIiLCJwcm9jZXNzIiwiZW52IiwicHJvZHVjdCIsImNyZWF0ZSIsImJvZHkiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(api)/./pages/api/products/index.js\n");

/***/ }),

/***/ "(api)/./util/mongo.js":
/*!***********************!*\
  !*** ./util/mongo.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n\nconst MONGO_URL = process.env.MONGO_URL;\nif (!MONGO_URL) {\n    throw new Error(\"Please define the MONGO_URL environment variable inside .env.local\");\n}\n/**\r\n * Global is used here to maintain a cached connection across hot reloads\r\n * in development. This prevents connections growing exponentially\r\n * during API Route usage.\r\n */ let cached = global.mongoose;\nif (!cached) {\n    cached = global.mongoose = {\n        conn: null,\n        promise: null\n    };\n}\nasync function dbConnect() {\n    if (cached.conn) {\n        return cached.conn;\n    }\n    if (!cached.promise) {\n        const opts = {\n            bufferCommands: false\n        };\n        cached.promise = mongoose__WEBPACK_IMPORTED_MODULE_0___default().connect(MONGO_URL, opts).then((mongoose)=>{\n            return mongoose;\n        });\n    }\n    try {\n        cached.conn = await cached.promise;\n    } catch (e) {\n        cached.promise = null;\n        throw e;\n    }\n    return cached.conn;\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (dbConnect);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi91dGlsL21vbmdvLmpzLmpzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUErQjtBQUUvQixNQUFNQyxZQUFZQyxRQUFRQyxHQUFHLENBQUNGLFNBQVM7QUFFdkMsSUFBSSxDQUFDQSxXQUFXO0lBQ2QsTUFBTSxJQUFJRyxNQUNSLHNFQUNEO0FBQ0gsQ0FBQztBQUVEO0FBT0EsSUFBSSxDQUFDQyxRQUFRO0lBQ1hBLFNBQVNDLE9BQU9OLFFBQVEsR0FBRztRQUFFTyxNQUFNLElBQUk7UUFBRUMsU0FBUyxJQUFJO0lBQUM7QUFDekQsQ0FBQztBQUVELGVBQWVDO0lBQ2IsSUFBSUosT0FBT0UsSUFBSSxFQUFFOzs7SUFJakIsSUFBSSxDQUFDRixPQUFPRyxPQUFPLEVBQUU7UUFDbkIsTUFBTUUsT0FBTztZQUNYQzs7UUFHRk4sT0FBT0csT0FBTyxHQUFHUjtZQUNmLE9BQU9BO1FBQ1Q7SUFDRixDQUFDO0lBRUQsSUFBSTtRQUNGSyxPQUFPRSxJQUFJLEdBQUcsTUFBTUY7SUFDdEIsRUFBRTs7UUFFQTtJQUNGO0lBRUEsT0FBT0E7QUFDVDtBQUVBLGVBQWVJIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbnV0aWxsYS1mYXN0Ly4vdXRpbC9tb25nby5qcz9jMGE3Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBtb25nb29zZSBmcm9tICdtb25nb29zZSdcclxuXHJcbmNvbnN0IE1PTkdPX1VSTCA9IHByb2Nlc3MuZW52Lk1PTkdPX1VSTFxyXG5cclxuaWYgKCFNT05HT19VUkwpIHtcclxuICB0aHJvdyBuZXcgRXJyb3IoXHJcbiAgICAnUGxlYXNlIGRlZmluZSB0aGUgTU9OR09fVVJMIGVudmlyb25tZW50IHZhcmlhYmxlIGluc2lkZSAuZW52LmxvY2FsJ1xyXG4gIClcclxufVxyXG5cclxuLyoqXHJcbiAqIEdsb2JhbCBpcyB1c2VkIGhlcmUgdG8gbWFpbnRhaW4gYSBjYWNoZWQgY29ubmVjdGlvbiBhY3Jvc3MgaG90IHJlbG9hZHNcclxuICogaW4gZGV2ZWxvcG1lbnQuIFRoaXMgcHJldmVudHMgY29ubmVjdGlvbnMgZ3Jvd2luZyBleHBvbmVudGlhbGx5XHJcbiAqIGR1cmluZyBBUEkgUm91dGUgdXNhZ2UuXHJcbiAqL1xyXG5sZXQgY2FjaGVkID0gZ2xvYmFsLm1vbmdvb3NlXHJcblxyXG5pZiAoIWNhY2hlZCkge1xyXG4gIGNhY2hlZCA9IGdsb2JhbC5tb25nb29zZSA9IHsgY29ubjogbnVsbCwgcHJvbWlzZTogbnVsbCB9XHJcbn1cclxuXHJcbmFzeW5jIGZ1bmN0aW9uIGRiQ29ubmVjdCgpIHtcclxuICBpZiAoY2FjaGVkLmNvbm4pIHtcclxuICAgIHJldHVybiBjYWNoZWQuY29ublxyXG4gIH1cclxuXHJcbiAgaWYgKCFjYWNoZWQucHJvbWlzZSkge1xyXG4gICAgY29uc3Qgb3B0cyA9IHtcclxuICAgICAgYnVmZmVyQ29tbWFuZHM6IGZhbHNlLFxyXG4gICAgfVxyXG5cclxuICAgIGNhY2hlZC5wcm9taXNlID0gbW9uZ29vc2UuY29ubmVjdChNT05HT19VUkwsIG9wdHMpLnRoZW4oKG1vbmdvb3NlKSA9PiB7XHJcbiAgICAgIHJldHVybiBtb25nb29zZVxyXG4gICAgfSlcclxuICB9XHJcblxyXG4gIHRyeSB7XHJcbiAgICBjYWNoZWQuY29ubiA9IGF3YWl0IGNhY2hlZC5wcm9taXNlXHJcbiAgfSBjYXRjaCAoZSkge1xyXG4gICAgY2FjaGVkLnByb21pc2UgPSBudWxsXHJcbiAgICB0aHJvdyBlXHJcbiAgfVxyXG5cclxuICByZXR1cm4gY2FjaGVkLmNvbm5cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZGJDb25uZWN0Il0sIm5hbWVzIjpbIm1vbmdvb3NlIiwiTU9OR09fVVJMIiwicHJvY2VzcyIsImVudiIsIkVycm9yIiwiY2FjaGVkIiwiZ2xvYmFsIiwiY29ubiIsInByb21pc2UiLCJkYkNvbm5lY3QiLCJvcHRzIiwiYnVmZmVyQ29tbWFuZHMiLCJjb25uZWN0IiwidGhlbiIsImUiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(api)/./util/mongo.js\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(api)/./pages/api/products/index.js"));
module.exports = __webpack_exports__;

})();