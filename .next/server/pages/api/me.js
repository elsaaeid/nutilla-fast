"use strict";
(() => {
var exports = {};
exports.id = 161;
exports.ids = [161,274];
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

/***/ 8743:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ handler)
/* harmony export */ });
/* harmony import */ var cookie__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4802);
/* harmony import */ var cookie__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(cookie__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _util_mongo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7597);
/* harmony import */ var _models_User__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6274);
/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8432);
/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(bcryptjs__WEBPACK_IMPORTED_MODULE_3__);




async function handler(req, res) {
    try {
        const cookies = req.headers.cookie;
        // If there are no cookies or no token, return 200 with null body so client code
        // can treat this as "no user" without a network error in devtools.
        if (!cookies) return res.status(200).json(null);
        const parsed = (0,cookie__WEBPACK_IMPORTED_MODULE_0__.parse)(cookies || "");
        const token = parsed.token;
        if (!token) return res.status(200).json(null);
        // admin token
        if (token === process.env.TOKEN) {
            // GET: return admin hint; PUT: not allowed
            if (req.method === "PUT") return res.status(403).json({
                message: "Cannot modify admin via this endpoint"
            });
            return res.status(200).json({
                role: "admin",
                email: process.env.ADMIN_USERNAME
            });
        }
        // otherwise token is user id (dev behavior)
        await (0,_util_mongo__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z)();
        // Handle update (PUT)
        if (req.method === "PUT") {
            const { name , phone , password  } = req.body || {};
            const updates = {};
            if (name) updates.name = name;
            if (phone) updates.phone = phone;
            if (password) {
                const salt = await bcryptjs__WEBPACK_IMPORTED_MODULE_3___default().genSalt(10);
                updates.password = await bcryptjs__WEBPACK_IMPORTED_MODULE_3___default().hash(password, salt);
            }
            const updated = await _models_User__WEBPACK_IMPORTED_MODULE_2__["default"].findByIdAndUpdate(token, updates, {
                new: true
            }).select("-password");
            if (!updated) return res.status(404).json({
                message: "User not found"
            });
            return res.status(200).json(updated);
        }
        const user = await _models_User__WEBPACK_IMPORTED_MODULE_2__["default"].findById(token).select("-password");
        if (!user) return res.status(200).json(null);
        return res.status(200).json(user);
    } catch (err) {
        console.error("api/me error:", err);
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
var __webpack_exports__ = __webpack_require__.X(0, [597], () => (__webpack_exec__(8743)));
module.exports = __webpack_exports__;

})();