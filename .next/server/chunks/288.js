exports.id = 288;
exports.ids = [288];
exports.modules = {

/***/ 9399:
/***/ ((module) => {

// Exports
module.exports = {

};


/***/ }),

/***/ 7049:
/***/ ((module) => {

// Exports
module.exports = {
	"container": "NutillaList_container____6QH",
	"desc": "NutillaList_desc__HQAUS",
	"wrapper": "NutillaList_wrapper__0_0cO",
	"title": "NutillaList_title__6Uo_k"
};


/***/ }),

/***/ 1317:
/***/ ((module) => {

// Exports
module.exports = {
	"container": "ProductCard_container__Ktlg9",
	"actions": "ProductCard_actions__iQwOO",
	"imgContainer": "ProductCard_imgContainer__CzTNV",
	"image": "ProductCard_image__w5wT_",
	"content": "ProductCard_content__cjdKv",
	"title": "ProductCard_title__9tE40",
	"price": "ProductCard_price__yk40a",
	"desc": "ProductCard_desc__B14VP"
};


/***/ }),

/***/ 8788:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _styles_ProductCard_module_css__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(1317);
/* harmony import */ var _styles_ProductCard_module_css__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_styles_ProductCard_module_css__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _styles_global_module_css__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(437);
/* harmony import */ var _styles_global_module_css__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_styles_global_module_css__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5675);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_image__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1664);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6022);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _redux_cartSlice__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(9235);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(9648);
/* harmony import */ var react_icons_fi__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(2750);
/* harmony import */ var react_icons_fi__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react_icons_fi__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _protect_AuthGate__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(1532);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([axios__WEBPACK_IMPORTED_MODULE_6__]);
axios__WEBPACK_IMPORTED_MODULE_6__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];












const ProductCard = ({ product  })=>{
    const dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_4__.useDispatch)();
    const cart = (0,react_redux__WEBPACK_IMPORTED_MODULE_4__.useSelector)((state)=>state.cart);
    const handleAddToCart = ()=>{
        const price = Array.isArray(product.price) ? product.price[0] : product.price;
        const item = {
            ...product,
            price: Number(price) || 0,
            quantity: 1,
            extras: []
        };
        // optimistic update to redux
        dispatch((0,_redux_cartSlice__WEBPACK_IMPORTED_MODULE_5__/* .addProduct */ .gK)(item));
        // persist cart (best-effort): post new array including this item
        try {
            const existing = cart && Array.isArray(cart.products) ? cart.products : [];
            const newProducts = [
                ...existing,
                item
            ];
            const subtotal = newProducts.reduce((s, p)=>s + (Number(p.price) || 0) * (Number(p.quantity) || 1), 0);
            const cartId =  false ? 0 : null;
            axios__WEBPACK_IMPORTED_MODULE_6__["default"].post("/api/cart", {
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
            // in case selector can't be used here synchronously, fall back to posting single item
            const cartId1 =  false ? 0 : null;
            axios__WEBPACK_IMPORTED_MODULE_6__["default"].post("/api/cart", {
                items: item,
                cartId: cartId1
            }).then((res)=>{
                if (res?.data && res.data._id) {
                    try {
                        localStorage.setItem("cartId", res.data._id);
                    } catch (e) {}
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
        className: (_styles_ProductCard_module_css__WEBPACK_IMPORTED_MODULE_9___default().container),
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: (_styles_ProductCard_module_css__WEBPACK_IMPORTED_MODULE_9___default().imgContainer),
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_image__WEBPACK_IMPORTED_MODULE_2___default()), {
                    src: product.img,
                    alt: product.title,
                    width: 200,
                    height: 200,
                    className: (_styles_ProductCard_module_css__WEBPACK_IMPORTED_MODULE_9___default().image)
                })
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: (_styles_ProductCard_module_css__WEBPACK_IMPORTED_MODULE_9___default().content),
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h2", {
                        className: (_styles_ProductCard_module_css__WEBPACK_IMPORTED_MODULE_9___default().title),
                        children: product.title
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                        className: (_styles_ProductCard_module_css__WEBPACK_IMPORTED_MODULE_9___default().price),
                        children: [
                            "$",
                            Array.isArray(product.price) ? product.price[0] : product.price
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: (_styles_ProductCard_module_css__WEBPACK_IMPORTED_MODULE_9___default().actions),
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_3___default()), {
                                className: (_styles_global_module_css__WEBPACK_IMPORTED_MODULE_10___default().linkContainer),
                                href: `/product/${product._id}`,
                                passHref: true,
                                children: "View Details"
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_protect_AuthGate__WEBPACK_IMPORTED_MODULE_8__/* .AdminAuthorLink */ .P8, {
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_3___default()), {
                                    href: `/admin/edit-product/${product._id}`,
                                    className: (_styles_global_module_css__WEBPACK_IMPORTED_MODULE_10___default().button),
                                    title: "Edit product",
                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_icons_fi__WEBPACK_IMPORTED_MODULE_7__.FiEdit, {
                                        size: 16
                                    })
                                })
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                className: (_styles_global_module_css__WEBPACK_IMPORTED_MODULE_10___default().button),
                                onClick: handleAddToCart,
                                "aria-label": `Add ${product.title} to cart`,
                                title: "Add to cart",
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_icons_fi__WEBPACK_IMPORTED_MODULE_7__.FiShoppingCart, {
                                    size: 18
                                })
                            })
                        ]
                    })
                ]
            })
        ]
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ProductCard);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 5641:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _styles_NutillaList_module_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7049);
/* harmony import */ var _styles_NutillaList_module_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_styles_NutillaList_module_css__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ProductCard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8788);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_ProductCard__WEBPACK_IMPORTED_MODULE_2__]);
_ProductCard__WEBPACK_IMPORTED_MODULE_2__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];




const ProductsList = ({ productsList =[]  })=>{
    // Defensive rendering and helpful debug output when no products are present.
    const hasProducts = Array.isArray(productsList) && productsList.length > 0;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: (_styles_NutillaList_module_css__WEBPACK_IMPORTED_MODULE_3___default().container),
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h1", {
                className: (_styles_NutillaList_module_css__WEBPACK_IMPORTED_MODULE_3___default().title),
                children: "Half Moon"
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                className: (_styles_NutillaList_module_css__WEBPACK_IMPORTED_MODULE_3___default().desc),
                children: "Rounded waffle with nutella sauce"
            }),
            !hasProducts ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                style: {
                    padding: 24
                },
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("strong", {
                        children: "No products to show."
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        style: {
                            marginTop: 12
                        },
                        children: "This usually means the server did not return product data. For debugging, here is what the component received:"
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("pre", {
                        style: {
                            whiteSpace: "pre-wrap",
                            marginTop: 12,
                            background: "#f6f6f6",
                            padding: 12
                        },
                        children: JSON.stringify(productsList, null, 2)
                    })
                ]
            }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: (_styles_NutillaList_module_css__WEBPACK_IMPORTED_MODULE_3___default().wrapper),
                children: productsList.map((product)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_ProductCard__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z, {
                        product: product
                    }, product._id))
            })
        ]
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ProductsList);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;