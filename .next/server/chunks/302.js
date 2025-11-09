exports.id = 302;
exports.ids = [302];
exports.modules = {

/***/ 437:
/***/ ((module) => {

// Exports
module.exports = {
	"button": "global_button__WAIH6",
	"linkContainer": "global_linkContainer__bQ_cW"
};


/***/ }),

/***/ 1877:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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


/***/ })

};
;