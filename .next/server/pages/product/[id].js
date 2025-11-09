(() => {
var exports = {};
exports.id = 360;
exports.ids = [360];
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
	"oldPrice": "Product_oldPrice__653e_",
	"discountPrice": "Product_discountPrice__zWJ_S",
	"badge": "Product_badge__qDzYv",
	"desc": "Product_desc__8u3sB",
	"choose": "Product_choose__tndSX",
	"ingredients": "Product_ingredients__oDfGg",
	"option": "Product_option__w3fvy",
	"checkbox": "Product_checkbox__aPxwX",
	"add": "Product_add__xxCqs",
	"quantity": "Product_quantity__TGWXW",
	"qtyControlsInline": "Product_qtyControlsInline__JkSfc",
	"qtyBtn": "Product_qtyBtn__wVvuL",
	"removeBtn": "Product_removeBtn__wS_7w",
	"qtyNumber": "Product_qtyNumber__l3l6H",
	"disabledLink": "Product_disabledLink__qMm0A",
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
/* harmony import */ var _styles_Product_module_css__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(1103);
/* harmony import */ var _styles_Product_module_css__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_styles_Product_module_css__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _styles_global_module_css__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(437);
/* harmony import */ var _styles_global_module_css__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_styles_global_module_css__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5675);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_image__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6022);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _redux_cartSlice__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9235);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(9648);
/* harmony import */ var _util_cartHelpers__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(1714);
/* harmony import */ var react_icons_fi__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(2750);
/* harmony import */ var react_icons_fi__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_icons_fi__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _components_QtyControls__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(8940);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([axios__WEBPACK_IMPORTED_MODULE_5__]);
axios__WEBPACK_IMPORTED_MODULE_5__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];











const Product = ({ product  })=>{
    // determine base price and whether product is on offer (coerce strings/numbers)
    const base = Number(Array.isArray(product?.price) ? product.price[0] : product?.price || 0) || 0;
    const isOffer = (()=>{
        const v = product?.offer;
        if (typeof v === "boolean") return v;
        if (typeof v === "string") return [
            "true",
            "1",
            "yes"
        ].includes(v.toLowerCase().trim());
        if (typeof v === "number") return v === 1;
        return false;
    })();
    const discountedBase = Math.round(base * 0.75 * 100) / 100;
    const [price, setPrice] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(isOffer ? discountedBase : base);
    const [quantity, setQuantity] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(1);
    const [extras, setExtras] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)([]);
    // derive in-cart status on each render from Redux and localStorage
    const dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_3__.useDispatch)();
    const cart = (0,react_redux__WEBPACK_IMPORTED_MODULE_3__.useSelector)((state)=>state.cart);
    // helper to build deterministic key matching cartSlice logic
    const makeKey = (p)=>{
        if (!p) return "";
        const id = p._id || p.productId || "";
        const extrasArr = Array.isArray(p.extras) ? p.extras : [];
        const extrasKey = JSON.stringify(extrasArr);
        return `${String(id)}|${extrasKey}`;
    };
    const findIndexInCart = (prod)=>{
        const key = makeKey(prod);
        return cart && Array.isArray(cart.products) ? cart.products.findIndex((p)=>makeKey(p) === key) : -1;
    };
    const prodForKey = {
        ...product,
        extras
    };
    // use Redux as the single source of truth for in-cart status — localStorage can be stale
    const inCart = findIndexInCart(prodForKey) !== -1;
    // remove an item that exists only in localStorage (anonymous cart)
    const removeFromLocal = async (prod)=>{
        if (true) return;
        try {
            const raw = localStorage.getItem("cartItems");
            const items = raw ? JSON.parse(raw) : [];
            const key = makeKey(prod);
            const newItems = (Array.isArray(items) ? items : []).filter((p)=>makeKey(p) !== key);
            const normalized = (0,_util_cartHelpers__WEBPACK_IMPORTED_MODULE_8__/* .normalizeCartItems */ .D)(newItems);
            const subtotal = (0,_util_cartHelpers__WEBPACK_IMPORTED_MODULE_8__/* .computeSubtotal */ .c)(normalized);
            dispatch((0,_redux_cartSlice__WEBPACK_IMPORTED_MODULE_4__/* .setCart */ .RV)({
                items: normalized,
                subtotal
            }));
            try {
                localStorage.setItem("cartItems", JSON.stringify(normalized));
            } catch (e) {}
            const cartId = localStorage.getItem("cartId");
            try {
                const res = await axios__WEBPACK_IMPORTED_MODULE_5__["default"].post("/api/cart", {
                    items: normalized,
                    subtotal,
                    cartId
                });
                if (res?.data && res.data._id) {
                    try {
                        localStorage.setItem("cartId", res.data._id);
                    } catch (e1) {}
                }
            } catch (e2) {
                console.warn("Failed to persist anonymous cart after remove:", e2?.message || e2);
            }
        } catch (e3) {
            console.warn("Failed to remove item from local cart:", e3?.message || e3);
        }
    };
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
    const handleAddToCart = async ()=>{
        const item = {
            ...product,
            extras,
            price: Number(price) || 0,
            originalPrice: base || null,
            offer: isOffer,
            quantity: Number(quantity) || 1
        };
        try {
            const existing = cart && Array.isArray(cart.products) ? [
                ...cart.products
            ] : [];
            const key = makeKey(item);
            const existingIndex = existing.findIndex((p)=>makeKey(p) === key);
            if (existingIndex >= 0) {
                // increment existing quantity
                dispatch((0,_redux_cartSlice__WEBPACK_IMPORTED_MODULE_4__/* .updateQuantity */ .$R)({
                    index: existingIndex,
                    amount: Number(item.quantity) || 1
                }));
                // persist
                let newProducts = existing.map((p, i)=>i === existingIndex ? {
                        ...p,
                        quantity: (Number(p.quantity) || 0) + (Number(item.quantity) || 1)
                    } : p);
                newProducts = (0,_util_cartHelpers__WEBPACK_IMPORTED_MODULE_8__/* .normalizeCartItems */ .D)(newProducts);
                const subtotal = (0,_util_cartHelpers__WEBPACK_IMPORTED_MODULE_8__/* .computeSubtotal */ .c)(newProducts);
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
            } else {
                const [normalizedItem] = (0,_util_cartHelpers__WEBPACK_IMPORTED_MODULE_8__/* .normalizeCartItems */ .D)([
                    item
                ]);
                dispatch((0,_redux_cartSlice__WEBPACK_IMPORTED_MODULE_4__/* .addProduct */ .gK)(normalizedItem));
                let newProducts1 = [
                    ...existing,
                    normalizedItem
                ];
                newProducts1 = (0,_util_cartHelpers__WEBPACK_IMPORTED_MODULE_8__/* .normalizeCartItems */ .D)(newProducts1);
                const subtotal1 = (0,_util_cartHelpers__WEBPACK_IMPORTED_MODULE_8__/* .computeSubtotal */ .c)(newProducts1);
                const cartId1 =  false ? 0 : null;
                axios__WEBPACK_IMPORTED_MODULE_5__["default"].post("/api/cart", {
                    items: newProducts1,
                    subtotal: subtotal1,
                    cartId: cartId1
                }).then((res)=>{
                    if (res?.data && res.data._id) {
                        try {
                            localStorage.setItem("cartId", res.data._id);
                        } catch (e) {}
                    }
                }).catch((e)=>console.warn("persist cart fail", e?.message || e));
                try {
                    if (false) {}
                    localStorage.setItem("cartItems", JSON.stringify(newProducts1));
                } catch (e1) {}
            }
        // ensure Redux/localStorage are consistent; addProduct already updates Redux
        } catch (err) {
            // fallback simple add
            const [normalizedItem1] = (0,_util_cartHelpers__WEBPACK_IMPORTED_MODULE_8__/* .normalizeCartItems */ .D)([
                item
            ]);
            dispatch((0,_redux_cartSlice__WEBPACK_IMPORTED_MODULE_4__/* .addProduct */ .gK)(normalizedItem1));
            // fallback: rely on Redux/localStorage updates
            try {
                const existing1 = cart && Array.isArray(cart.products) ? cart.products : [];
                const merged = (0,_util_cartHelpers__WEBPACK_IMPORTED_MODULE_8__/* .normalizeCartItems */ .D)([
                    ...existing1,
                    normalizedItem1
                ]);
                localStorage.setItem("cartItems", JSON.stringify(merged));
            } catch (e2) {}
        }
    };
    const handleIncrease = async (index, amount = 1)=>{
        dispatch((0,_redux_cartSlice__WEBPACK_IMPORTED_MODULE_4__/* .updateQuantity */ .$R)({
            index,
            amount
        }));
        try {
            let newProducts = cart.products.map((p, i)=>i === index ? {
                    ...p,
                    quantity: (Number(p.quantity) || 0) + amount
                } : p);
            newProducts = (0,_util_cartHelpers__WEBPACK_IMPORTED_MODULE_8__/* .normalizeCartItems */ .D)(newProducts);
            const subtotal = (0,_util_cartHelpers__WEBPACK_IMPORTED_MODULE_8__/* .computeSubtotal */ .c)(newProducts);
            const cartId =  false ? 0 : null;
            const res = await axios__WEBPACK_IMPORTED_MODULE_5__["default"].post("/api/cart", {
                items: newProducts,
                subtotal,
                cartId
            });
            if (res?.data && res.data._id) {
                try {
                    localStorage.setItem("cartId", res.data._id);
                } catch (e) {}
            }
            try {
                if (false) {}
                localStorage.setItem("cartItems", JSON.stringify(newProducts));
            } catch (e1) {}
        } catch (e2) {
            console.warn("Failed to persist cart qty change:", e2?.message || e2);
        }
    };
    const handleDecrease = async (index, amount = -1)=>{
        dispatch((0,_redux_cartSlice__WEBPACK_IMPORTED_MODULE_4__/* .updateQuantity */ .$R)({
            index,
            amount
        }));
        try {
            let newProducts = cart.products.map((p, i)=>i === index ? {
                    ...p,
                    quantity: Math.max(0, (Number(p.quantity) || 0) + amount)
                } : p).filter((p)=>(Number(p.quantity) || 0) > 0);
            newProducts = (0,_util_cartHelpers__WEBPACK_IMPORTED_MODULE_8__/* .normalizeCartItems */ .D)(newProducts);
            const subtotal = (0,_util_cartHelpers__WEBPACK_IMPORTED_MODULE_8__/* .computeSubtotal */ .c)(newProducts);
            const cartId =  false ? 0 : null;
            const res = await axios__WEBPACK_IMPORTED_MODULE_5__["default"].post("/api/cart", {
                items: newProducts,
                subtotal,
                cartId
            });
            if (res?.data && res.data._1) {
                try {
                    localStorage.setItem("cartId", res.data._id);
                } catch (e) {}
            }
            try {
                if (false) {}
                localStorage.setItem("cartItems", JSON.stringify(newProducts));
            } catch (e1) {}
            if (newProducts.length === 0) {
                const subtotal1 = (0,_util_cartHelpers__WEBPACK_IMPORTED_MODULE_8__/* .computeSubtotal */ .c)(newProducts);
                dispatch((0,_redux_cartSlice__WEBPACK_IMPORTED_MODULE_4__/* .setCart */ .RV)({
                    items: (0,_util_cartHelpers__WEBPACK_IMPORTED_MODULE_8__/* .normalizeCartItems */ .D)(newProducts),
                    subtotal: subtotal1
                }));
            }
        } catch (e2) {
            console.warn("Failed to persist cart qty change:", e2?.message || e2);
        }
    };
    const handleRemoveFromCart = async (index)=>{
        dispatch((0,_redux_cartSlice__WEBPACK_IMPORTED_MODULE_4__/* .removeProduct */ .kh)(index));
        try {
            const newProducts = cart.products.filter((_, i)=>i !== index);
            const subtotal = newProducts.reduce((s, p)=>s + (Number(p.price) || 0) * (Number(p.quantity) || 1), 0);
            const cartId =  false ? 0 : null;
            const res = await axios__WEBPACK_IMPORTED_MODULE_5__["default"].post("/api/cart", {
                items: newProducts,
                subtotal,
                cartId
            });
            if (res?.data && res.data._id) {
                try {
                    localStorage.setItem("cartId", res.data._id);
                } catch (e) {}
            }
        } catch (e1) {
            console.warn("Failed to persist cart after remove:", e1?.message || e1);
        }
        try {
            localStorage.setItem("cartItems", JSON.stringify((0,_util_cartHelpers__WEBPACK_IMPORTED_MODULE_8__/* .normalizeCartItems */ .D)(cart.products.filter((_, i)=>i !== index))));
        } catch (e2) {}
        // update Redux/localStorage to reflect removal
        try {
            const normalized = (0,_util_cartHelpers__WEBPACK_IMPORTED_MODULE_8__/* .normalizeCartItems */ .D)(cart.products.filter((_, i)=>i !== index));
            const subtotal1 = (0,_util_cartHelpers__WEBPACK_IMPORTED_MODULE_8__/* .computeSubtotal */ .c)(normalized);
            dispatch((0,_redux_cartSlice__WEBPACK_IMPORTED_MODULE_4__/* .setCart */ .RV)({
                items: normalized,
                subtotal: subtotal1
            }));
        } catch (e3) {}
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: (_styles_Product_module_css__WEBPACK_IMPORTED_MODULE_9___default().container),
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: (_styles_Product_module_css__WEBPACK_IMPORTED_MODULE_9___default().left),
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                    className: (_styles_Product_module_css__WEBPACK_IMPORTED_MODULE_9___default().imgContainer),
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_image__WEBPACK_IMPORTED_MODULE_1___default()), {
                        src: product.img,
                        alt: "",
                        width: 600,
                        height: 600
                    })
                })
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: (_styles_Product_module_css__WEBPACK_IMPORTED_MODULE_9___default().right),
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h1", {
                        className: (_styles_Product_module_css__WEBPACK_IMPORTED_MODULE_9___default().title),
                        children: product.title
                    }),
                    isOffer ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                className: (_styles_Product_module_css__WEBPACK_IMPORTED_MODULE_9___default().oldPrice),
                                children: [
                                    "$",
                                    base.toFixed(2)
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                className: (_styles_Product_module_css__WEBPACK_IMPORTED_MODULE_9___default().discountPrice),
                                children: [
                                    "$",
                                    discountedBase.toFixed(2)
                                ]
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                className: (_styles_Product_module_css__WEBPACK_IMPORTED_MODULE_9___default().badge),
                                children: "25% OFF"
                            })
                        ]
                    }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                        className: (_styles_Product_module_css__WEBPACK_IMPORTED_MODULE_9___default().price),
                        children: [
                            "$",
                            base.toFixed(2)
                        ]
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                        className: (_styles_Product_module_css__WEBPACK_IMPORTED_MODULE_9___default().desc),
                        children: product.desc
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h3", {
                        className: (_styles_Product_module_css__WEBPACK_IMPORTED_MODULE_9___default().choose),
                        children: "Choose additional ingredients"
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        className: (_styles_Product_module_css__WEBPACK_IMPORTED_MODULE_9___default().ingredients),
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
                                className: (_styles_Product_module_css__WEBPACK_IMPORTED_MODULE_9___default().option),
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                                        type: "checkbox",
                                        id: option.id || option.text,
                                        name: option.id || option.text,
                                        className: (_styles_Product_module_css__WEBPACK_IMPORTED_MODULE_9___default().checkbox),
                                        onChange: (e)=>handleChange(e, option)
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                                        htmlFor: option.id || option.text,
                                        children: option.text
                                    })
                                ]
                            }, option.id || option.text))
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        className: (_styles_Product_module_css__WEBPACK_IMPORTED_MODULE_9___default().add),
                        children: (()=>{
                            const prodForKey = {
                                ...product,
                                extras
                            };
                            const idx = findIndexInCart(prodForKey);
                            const isInCart = inCart;
                            if (!isInCart) {
                                return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                                            onChange: (e)=>setQuantity(Number(e.target.value) || 1),
                                            type: "number",
                                            value: quantity,
                                            min: 1,
                                            className: (_styles_Product_module_css__WEBPACK_IMPORTED_MODULE_9___default().quantity)
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                            className: (_styles_global_module_css__WEBPACK_IMPORTED_MODULE_10___default().button),
                                            onClick: handleAddToCart,
                                            "aria-label": "Add to cart",
                                            children: [
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_icons_fi__WEBPACK_IMPORTED_MODULE_6__.FiShoppingCart, {
                                                    style: {
                                                        verticalAlign: "middle"
                                                    }
                                                }),
                                                " Add to Cart"
                                            ]
                                        })
                                    ]
                                });
                            }
                            // in-cart controls: use shared QtyControls
                            const cartItem = idx === -1 ? {
                                quantity: 1
                            } : cart.products[idx];
                            const q = Number(cartItem.quantity) || 1;
                            return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_QtyControls__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .Z, {
                                quantity: q,
                                onIncrease: ()=>idx === -1 ? null : handleIncrease(idx),
                                onDecrease: ()=>idx === -1 ? null : handleDecrease(idx),
                                onRemove: ()=>idx === -1 ? removeFromLocal(product) : handleRemoveFromCart(idx),
                                styles: (_styles_Product_module_css__WEBPACK_IMPORTED_MODULE_9___default())
                            });
                        })()
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
            updatedAt: product.updatedAt ? product.updatedAt.toISOString() : null,
            offer: (()=>{
                const v = product.offer;
                if (typeof v === "boolean") return v;
                if (typeof v === "string") return [
                    "true",
                    "1",
                    "yes"
                ].includes(v.toLowerCase().trim());
                if (typeof v === "number") return v === 1;
                return false;
            })()
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

/***/ 2750:
/***/ ((module) => {

"use strict";
module.exports = require("react-icons/fi");

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
var __webpack_exports__ = __webpack_require__.X(0, [398,675,714,235,642,940,302], () => (__webpack_exec__(7848)));
module.exports = __webpack_exports__;

})();