"use strict";
(() => {
var exports = {};
exports.id = 221;
exports.ids = [221,274];
exports.modules = {

/***/ 1185:
/***/ ((module) => {

module.exports = require("mongoose");

/***/ }),

/***/ 9442:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1185);
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);

const ProductSchema = new (mongoose__WEBPACK_IMPORTED_MODULE_0___default().Schema)({
    img: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
        maxlength: 60
    },
    price: {
        type: [
            Number
        ],
        required: true
    },
    desc: {
        type: String,
        required: true,
        maxlength: 200
    },
    offer: {
        type: Boolean,
        default: false
    },
    extraOptions: {
        type: [
            {
                id: {
                    type: String
                },
                text: {
                    type: String
                },
                price: {
                    type: Number
                }
            }
        ],
        default: []
    }
}, {
    timestamps: true
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((mongoose__WEBPACK_IMPORTED_MODULE_0___default().models.Product) || mongoose__WEBPACK_IMPORTED_MODULE_0___default().model("Product", ProductSchema));


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

/***/ 6056:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ handler)
/* harmony export */ });
/* harmony import */ var _util_mongo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7597);
/* harmony import */ var _models_Product__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9442);
/* harmony import */ var _models_User__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6274);



async function handler(req, res) {
    const { method , cookies  } = req;
    const token = cookies.token;
    if (method === "GET") {
        try {
            await (0,_util_mongo__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z)();
            const products = await _models_Product__WEBPACK_IMPORTED_MODULE_1__["default"].find();
            res.status(200).json(products);
        } catch (err) {
            console.error("GET /api/products error:", err.message || err);
            res.status(500).json({
                error: err.message || "Internal Server Error"
            });
        }
        return;
    }
    if (method === "POST") {
        try {
            // Allow creation if token matches env admin token OR token belongs to a user with role 'admin'
            if (!token) return res.status(401).json({
                message: "Not authenticated"
            });
            await (0,_util_mongo__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z)();
            let allowed = false;
            if (token === process.env.TOKEN) {
                allowed = true;
            } else {
                // token is a user id in development flow
                const user = await _models_User__WEBPACK_IMPORTED_MODULE_2__["default"].findById(token).select("role");
                if (user && user.role === "admin") allowed = true;
            }
            if (!allowed) return res.status(403).json({
                message: "Forbidden"
            });
            const product = await _models_Product__WEBPACK_IMPORTED_MODULE_1__["default"].create(req.body);
            res.status(201).json(product);
        } catch (err1) {
            console.error("POST /api/products error:", err1.message || err1);
            res.status(500).json({
                error: err1.message || "Internal Server Error"
            });
        }
        return;
    }
}


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [597], () => (__webpack_exec__(6056)));
module.exports = __webpack_exports__;

})();