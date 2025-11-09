"use strict";
(() => {
var exports = {};
exports.id = 553;
exports.ids = [553,274];
exports.modules = {

/***/ 8432:
/***/ ((module) => {

module.exports = require("bcryptjs");

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

/***/ 3348:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ handler)
/* harmony export */ });
/* harmony import */ var _util_mongo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7597);
/* harmony import */ var _models_User__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6274);
/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8432);
/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(bcryptjs__WEBPACK_IMPORTED_MODULE_2__);



// DB-backed registration API
async function handler(req, res) {
    if (req.method !== "POST") {
        res.setHeader("Allow", [
            "POST"
        ]);
        return res.status(405).json({
            message: `Method ${req.method} Not Allowed`
        });
    }
    const { name , email , phone , password  } = req.body || {};
    if (!name || !email || !phone || !password) {
        return res.status(400).json({
            message: "Missing required fields"
        });
    }
    try {
        await (0,_util_mongo__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z)();
        // check existing user
        const existing = await _models_User__WEBPACK_IMPORTED_MODULE_1__["default"].findOne({
            email: email.toLowerCase()
        });
        if (existing) {
            return res.status(409).json({
                message: "Email already registered"
            });
        }
        // hash password
        const salt = await bcryptjs__WEBPACK_IMPORTED_MODULE_2___default().genSalt(10);
        const hashed = await bcryptjs__WEBPACK_IMPORTED_MODULE_2___default().hash(password, salt);
        const user = new _models_User__WEBPACK_IMPORTED_MODULE_1__["default"]({
            name,
            email: email.toLowerCase(),
            phone,
            password: hashed,
            isVerified: false
        });
        await user.save();
        // In a full implementation you would send a verification email here.
        return res.status(201).json({
            message: "User created",
            email: user.email
        });
    } catch (err) {
        console.error("register error:", err);
        return res.status(500).json({
            message: "Server error"
        });
    }
}


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [597], () => (__webpack_exec__(3348)));
module.exports = __webpack_exports__;

})();