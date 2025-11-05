(() => {
var exports = {};
exports.id = 360;
exports.ids = [360,441];
exports.modules = {

/***/ 1103:
/***/ ((module) => {

// Exports
module.exports = {
	"container": "Product_container__fK9cn",
	"left": "Product_left__t1_qe",
	"imgContainer": "Product_imgContainer__3gh7N",
	"right": "Product_right__2w1I_",
	"title": "Product_title__1JLOK",
	"price": "Product_price__8ZgaT",
	"desc": "Product_desc__8u3sB",
	"choose": "Product_choose__tndSX",
	"ingredients": "Product_ingredients__oDfGg",
	"option": "Product_option__w3fvy",
	"checkbox": "Product_checkbox__aPxwX",
	"add": "Product_add__xxCqs",
	"quantity": "Product_quantity__TGWXW",
	"button": "Product_button__O4U5w"
};


/***/ }),

/***/ 7848:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "getServerSideProps": () => (/* binding */ getServerSideProps)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _styles_Product_module_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(1103);
/* harmony import */ var _styles_Product_module_css__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_styles_Product_module_css__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _styles_global_module_css__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(437);
/* harmony import */ var _styles_global_module_css__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_styles_global_module_css__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5675);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_image__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6022);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _redux_cartSlice__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9235);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(9648);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([axios__WEBPACK_IMPORTED_MODULE_5__]);
axios__WEBPACK_IMPORTED_MODULE_5__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];








const Product = ({ product  })=>{
    const [price, setPrice] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(Array.isArray(product?.price) ? product.price[0] : product?.price || 0);
    const [quantity, setQuantity] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(1);
    const [extras, setExtras] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)([]);
    const dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_3__.useDispatch)();
    const cart = (0,react_redux__WEBPACK_IMPORTED_MODULE_3__.useSelector)((state)=>state.cart);
    const changePrice = (number)=>{
        const n = Number(number) || 0;
        setPrice((p)=>(Number(p) || 0) + n);
    };
    const handleChange = (e, option)=>{
        const checked = e.target.checked;
        const key = option.id || option.text;
        if (checked) {
            changePrice(option.price);
            setExtras((prev)=>[
                    ...prev,
                    {
                        ...option,
                        id: key
                    }
                ]);
        } else {
            changePrice(-option.price);
            setExtras((prev)=>prev.filter((extra)=>(extra.id || extra.text) !== key));
        }
    };
    const handleClick = ()=>{
        const item = {
            ...product,
            extras,
            price: Number(price) || 0,
            quantity: Number(quantity) || 1
        };
        dispatch((0,_redux_cartSlice__WEBPACK_IMPORTED_MODULE_4__/* .addProduct */ .gK)(item));
        // persist updated cart (best-effort)
        try {
            const existing = cart && Array.isArray(cart.products) ? cart.products : [];
            const newProducts = [
                ...existing,
                item
            ];
            const subtotal = newProducts.reduce((s, p)=>s + (Number(p.price) || 0) * (Number(p.quantity) || 1), 0);
            const cartId =  false ? 0 : null;
            axios__WEBPACK_IMPORTED_MODULE_5__["default"].post("/api/cart", {
                items: newProducts,
                subtotal,
                cartId
            }).then((res)=>{
                if (res?.data && res.data._id) {
                    try {
                        localStorage.setItem("cartId", res.data._id);
                    } catch (e) {}
                }
            }).catch((e)=>console.warn("persist cart fail", e?.message || e));
            try {
                localStorage.setItem("cartItems", JSON.stringify(newProducts));
            } catch (e) {}
        } catch (e1) {
            const cartId1 =  false ? 0 : null;
            axios__WEBPACK_IMPORTED_MODULE_5__["default"].post("/api/cart", {
                items: item,
                cartId: cartId1
            }).then((res)=>{
                if (res?.data && res.data._id) {
                    try {
                        localStorage.setItem("cartId", res.data._id);
                    } catch (err) {}
                }
            }).catch((err)=>console.warn("persist cart fail", err?.message || err));
            try {
                const existing1 = cart && Array.isArray(cart.products) ? cart.products : [];
                const newItems = [
                    ...existing1,
                    item
                ];
                localStorage.setItem("cartItems", JSON.stringify(newItems));
            } catch (err) {}
        }
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: (_styles_Product_module_css__WEBPACK_IMPORTED_MODULE_6___default().container),
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: (_styles_Product_module_css__WEBPACK_IMPORTED_MODULE_6___default().left),
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                    className: (_styles_Product_module_css__WEBPACK_IMPORTED_MODULE_6___default().imgContainer),
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_image__WEBPACK_IMPORTED_MODULE_1___default()), {
                        src: product.img,
                        alt: "",
                        width: 600,
                        height: 600
                    })
                })
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: (_styles_Product_module_css__WEBPACK_IMPORTED_MODULE_6___default().right),
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h1", {
                        className: (_styles_Product_module_css__WEBPACK_IMPORTED_MODULE_6___default().title),
                        children: product.title
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                        className: (_styles_Product_module_css__WEBPACK_IMPORTED_MODULE_6___default().price),
                        children: [
                            "$",
                            Array.isArray(product.price) ? product.price[0] : product.price
                        ]
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                        className: (_styles_Product_module_css__WEBPACK_IMPORTED_MODULE_6___default().desc),
                        children: product.desc
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h3", {
                        className: (_styles_Product_module_css__WEBPACK_IMPORTED_MODULE_6___default().choose),
                        children: "Choose additional ingredients"
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        className: (_styles_Product_module_css__WEBPACK_IMPORTED_MODULE_6___default().ingredients),
                        children: (product?.extraOptions && product.extraOptions.length > 0 ? product.extraOptions : [
                            {
                                id: "ice",
                                text: "ice cream ingredients",
                                price: 1
                            },
                            {
                                id: "fruits",
                                text: "fruits ingredients",
                                price: 1.5
                            },
                            {
                                id: "drinks",
                                text: "drinks ingredients",
                                price: 2
                            }
                        ]).map((option)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: (_styles_Product_module_css__WEBPACK_IMPORTED_MODULE_6___default().option),
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                                        type: "checkbox",
                                        id: option.id || option.text,
                                        name: option.id || option.text,
                                        className: (_styles_Product_module_css__WEBPACK_IMPORTED_MODULE_6___default().checkbox),
                                        onChange: (e)=>handleChange(e, option)
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                                        htmlFor: option.id || option.text,
                                        children: option.text
                                    })
                                ]
                            }, option.id || option.text))
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: (_styles_Product_module_css__WEBPACK_IMPORTED_MODULE_6___default().add),
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                                onChange: (e)=>setQuantity(e.target.value),
                                type: "number",
                                defaultValue: 1,
                                className: (_styles_Product_module_css__WEBPACK_IMPORTED_MODULE_6___default().quantity)
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                className: (_styles_global_module_css__WEBPACK_IMPORTED_MODULE_7___default().button),
                                onClick: handleClick,
                                children: "Add to Cart"
                            })
                        ]
                    })
                ]
            })
        ]
    });
};
const getServerSideProps = async ({ params  })=>{
    try {
        const dbConnect = (__webpack_require__(2642)["default"]) || __webpack_require__(2642);
        const Product = (__webpack_require__(1877)["default"]) || __webpack_require__(1877);
        await dbConnect();
        const product = await Product.findById(params.id).lean();
        if (!product) return {
            notFound: true
        };
        // serialize _id
        const serialized = {
            ...product,
            _id: String(product._id),
            createdAt: product.createdAt ? product.createdAt.toISOString() : null,
            updatedAt: product.updatedAt ? product.updatedAt.toISOString() : null
        };
        return {
            props: {
                product: serialized
            }
        };
    } catch (err) {
        console.error("Error in product getServerSideProps:", err.message || err);
        return {
            props: {
                product: null
            }
        };
    }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Product);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 5184:
/***/ ((module) => {

"use strict";
module.exports = require("@reduxjs/toolkit");

/***/ }),

/***/ 1185:
/***/ ((module) => {

"use strict";
module.exports = require("mongoose");

/***/ }),

/***/ 4957:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/head.js");

/***/ }),

/***/ 4486:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/image-blur-svg.js");

/***/ }),

/***/ 744:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/image-config-context.js");

/***/ }),

/***/ 5843:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/image-config.js");

/***/ }),

/***/ 9552:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/image-loader");

/***/ }),

/***/ 9232:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/utils.js");

/***/ }),

/***/ 6689:
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ 6022:
/***/ ((module) => {

"use strict";
module.exports = require("react-redux");

/***/ }),

/***/ 997:
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-runtime");

/***/ }),

/***/ 9648:
/***/ ((module) => {

"use strict";
module.exports = import("axios");;

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [398,675,235,868], () => (__webpack_exec__(7848)));
module.exports = __webpack_exports__;

})();