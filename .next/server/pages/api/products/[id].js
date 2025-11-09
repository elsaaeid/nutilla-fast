"use strict";
(() => {
var exports = {};
exports.id = 480;
exports.ids = [480];
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

/***/ 2110:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ handler)
/* harmony export */ });
/* harmony import */ var _util_mongo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7597);
/* harmony import */ var _models_Product__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9442);


async function handler(req, res) {
    const { method , query: { id  } , cookies  } = req;
    const token = cookies.token;
    (0,_util_mongo__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z)();
    if (method === "GET") {
        try {
            const product = await _models_Product__WEBPACK_IMPORTED_MODULE_1__["default"].findById(id);
            res.status(200).json(product);
        } catch (err) {
            res.status(500).json(err);
        }
    }
    if (method === "PUT") {
        try {
            // Allow update if token matches env admin token OR token belongs to a user with role 'admin'
            if (!token) return res.status(401).json({
                message: "Not authenticated"
            });
            await (0,_util_mongo__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z)();
            let allowed = false;
            if (token === process.env.TOKEN) {
                allowed = true;
            } else {
                const User = await __webpack_require__.e(/* import() */ 274).then(__webpack_require__.bind(__webpack_require__, 6274)).then((m)=>m.default);
                const user = await User.findById(token).select("role");
                if (user && user.role === "admin") allowed = true;
            }
            if (!allowed) return res.status(403).json({
                message: "Forbidden"
            });
            const product1 = await _models_Product__WEBPACK_IMPORTED_MODULE_1__["default"].findByIdAndUpdate(id, req.body, {
                new: true
            });
            res.status(200).json(product1);
        } catch (err1) {
            res.status(500).json(err1);
        }
    }
    if (method === "DELETE") {
        try {
            // Allow delete if token matches env admin token OR token belongs to a user with role 'admin'
            if (!token) return res.status(401).json({
                message: "Not authenticated"
            });
            await (0,_util_mongo__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z)();
            let allowed1 = false;
            if (token === process.env.TOKEN) {
                allowed1 = true;
            } else {
                const User1 = await __webpack_require__.e(/* import() */ 274).then(__webpack_require__.bind(__webpack_require__, 6274)).then((m)=>m.default);
                const user1 = await User1.findById(token).select("role");
                if (user1 && user1.role === "admin") allowed1 = true;
            }
            if (!allowed1) return res.status(403).json({
                message: "Forbidden"
            });
            await _models_Product__WEBPACK_IMPORTED_MODULE_1__["default"].findByIdAndDelete(id);
            res.status(200).json("The product has been deleted!");
        } catch (err2) {
            res.status(500).json(err2);
        }
    }
}


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [597], () => (__webpack_exec__(2110)));
module.exports = __webpack_exports__;

})();