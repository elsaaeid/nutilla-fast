"use strict";
(() => {
var exports = {};
exports.id = 994;
exports.ids = [994,274];
exports.modules = {

/***/ 8432:
/***/ ((module) => {

module.exports = require("bcryptjs");

/***/ }),

/***/ 4802:
/***/ ((module) => {

module.exports = require("cookie");

/***/ }),

/***/ 1185:
/***/ ((module) => {

module.exports = require("mongoose");

/***/ }),

/***/ 6274:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1185);
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);

const UserSchema = new (mongoose__WEBPACK_IMPORTED_MODULE_0___default().Schema)({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String
    },
    role: {
        type: String,
        default: "buyer"
    },
    password: {
        type: String,
        required: true
    },
    isVerified: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});
// Avoid model overwrite issues in dev/hot-reload
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((mongoose__WEBPACK_IMPORTED_MODULE_0___default().models.User) || mongoose__WEBPACK_IMPORTED_MODULE_0___default().model("User", UserSchema));


/***/ }),

/***/ 8420:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var cookie__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4802);
/* harmony import */ var cookie__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(cookie__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _util_mongo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7597);
/* harmony import */ var _models_User__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6274);
/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8432);
/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(bcryptjs__WEBPACK_IMPORTED_MODULE_3__);




const handler = async (req, res)=>{
    if (req.method !== "POST") {
        return res.status(405).json({
            message: "Method Not Allowed"
        });
    }
    const { username , password  } = req.body || {};
    if (!username || !password) return res.status(400).json({
        message: "Missing credentials"
    });
    // Admin quick check using env vars
    if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
        res.setHeader("Set-Cookie", (0,cookie__WEBPACK_IMPORTED_MODULE_0__.serialize)("token", process.env.TOKEN, {
            maxAge: 60 * 60 * 24 * 7,
            httpOnly: true,
            sameSite: "strict",
            path: "/"
        }));
        return res.status(200).json("Successful");
    }
    try {
        await (0,_util_mongo__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z)();
        const user = await _models_User__WEBPACK_IMPORTED_MODULE_2__["default"].findOne({
            email: username.toLowerCase()
        });
        if (!user) return res.status(401).json({
            message: "Invalid credentials"
        });
        const match = await bcryptjs__WEBPACK_IMPORTED_MODULE_3___default().compare(password, user.password);
        if (!match) return res.status(401).json({
            message: "Invalid credentials"
        });
        // Set a simple cookie with the user id as token (development). Replace with JWT/session in production.
        res.setHeader("Set-Cookie", (0,cookie__WEBPACK_IMPORTED_MODULE_0__.serialize)("token", String(user._id), {
            maxAge: 60 * 60 * 24 * 7,
            httpOnly: true,
            sameSite: "strict",
            path: "/"
        }));
        return res.status(200).json({
            message: "Logged in"
        });
    } catch (err) {
        console.error("login error:", err);
        return res.status(500).json({
            message: "Server error"
        });
    }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (handler);


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [597], () => (__webpack_exec__(8420)));
module.exports = __webpack_exports__;

})();