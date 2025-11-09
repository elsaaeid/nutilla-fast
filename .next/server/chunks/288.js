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
	"oldPrice": "ProductCard_oldPrice__oBc1N",
	"discountPrice": "ProductCard_discountPrice__CvWM8",
	"badge": "ProductCard_badge__guO_O",
	"qtyControlsInline": "ProductCard_qtyControlsInline__TQrm5",
	"qtyBtn": "ProductCard_qtyBtn__dXxwJ",
	"removeBtn": "ProductCard_removeBtn__sK5Cl",
	"quantity": "ProductCard_quantity__37_YS",
	"disabledLink": "ProductCard_disabledLink__gaQsi",
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
/* harmony import */ var _styles_ProductCard_module_css__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(1317);
/* harmony import */ var _styles_ProductCard_module_css__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_styles_ProductCard_module_css__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _styles_global_module_css__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(437);
/* harmony import */ var _styles_global_module_css__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_styles_global_module_css__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5675);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_image__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1664);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6022);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _redux_cartSlice__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(9235);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(9648);
/* harmony import */ var _util_cartHelpers__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(1714);
/* harmony import */ var react_icons_fi__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(2750);
/* harmony import */ var react_icons_fi__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react_icons_fi__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _QtyControls__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(8940);
/* harmony import */ var _protect_AuthGate__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(1532);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([axios__WEBPACK_IMPORTED_MODULE_6__]);
axios__WEBPACK_IMPORTED_MODULE_6__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];














const ProductCard = ({ product  })=>{
    const dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_4__.useDispatch)();
    const cart = (0,react_redux__WEBPACK_IMPORTED_MODULE_4__.useSelector)((state)=>state.cart);
    // helper to build a deterministic key that matches cartSlice logic
    const makeKey = (p)=>{
        if (!p) return "";
        const id = p._id || p.productId || "";
        // normalize extras: missing extras should be treated the same as an empty array
        const extrasArr = Array.isArray(p.extras) ? p.extras : [];
        const extras = JSON.stringify(extrasArr);
        return `${String(id)}|${extras}`;
    };
    const findIndexInCart = (prod)=>{
        const key = makeKey(prod);
        return cart && Array.isArray(cart.products) ? cart.products.findIndex((p)=>makeKey(p) === key) : -1;
    };
    // derive in-cart status at render time from Redux and localStorage so
    // the UI always reflects the latest cart state (no stale local state)
    const isInCartRedux = findIndexInCart(product) !== -1;
    // prefer Redux as the source of truth for UI state; localStorage can lag
    const inCart = isInCartRedux;
    const handleAddToCart = ()=>{
        const rawPrice = Array.isArray(product.price) ? product.price[0] : product.price;
        const basePrice = Number(rawPrice) || 0;
        const isOffer = !!product?.offer;
        const priceForCart = isOffer ? Math.round(basePrice * 0.75 * 100) / 100 : basePrice;
        const item = {
            ...product,
            price: Number(priceForCart) || 0,
            originalPrice: basePrice || null,
            offer: isOffer,
            quantity: 1,
            extras: []
        };
        // decide whether item already exists in cart (same id + extras)
        try {
            const existing = cart && Array.isArray(cart.products) ? [
                ...cart.products
            ] : [];
            const key = makeKey(item);
            const existingIndex = existing.findIndex((p)=>makeKey(p) === key);
            if (existingIndex >= 0) {
                // increase quantity via reducer for correct merging behaviour
                dispatch((0,_redux_cartSlice__WEBPACK_IMPORTED_MODULE_5__/* .updateQuantity */ .$R)({
                    index: existingIndex,
                    amount: 1
                }));
                // persist updated products
                let newProducts = existing.map((p, i)=>i === existingIndex ? {
                        ...p,
                        quantity: (Number(p.quantity) || 0) + 1
                    } : p);
                newProducts = (0,_util_cartHelpers__WEBPACK_IMPORTED_MODULE_10__/* .normalizeCartItems */ .D)(newProducts);
                const subtotal = (0,_util_cartHelpers__WEBPACK_IMPORTED_MODULE_10__/* .computeSubtotal */ .c)(newProducts);
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
                    if (false) {}
                    localStorage.setItem("cartItems", JSON.stringify(newProducts));
                } catch (e) {}
            } else {
                // add new item - normalize first so Redux receives the same shape we persist
                const [normalizedItem] = (0,_util_cartHelpers__WEBPACK_IMPORTED_MODULE_10__/* .normalizeCartItems */ .D)([
                    item
                ]);
                dispatch((0,_redux_cartSlice__WEBPACK_IMPORTED_MODULE_5__/* .addProduct */ .gK)(normalizedItem));
                let newProducts1 = [
                    ...existing,
                    normalizedItem
                ];
                newProducts1 = (0,_util_cartHelpers__WEBPACK_IMPORTED_MODULE_10__/* .normalizeCartItems */ .D)(newProducts1);
                const subtotal1 = (0,_util_cartHelpers__WEBPACK_IMPORTED_MODULE_10__/* .computeSubtotal */ .c)(newProducts1);
                const cartId1 =  false ? 0 : null;
                axios__WEBPACK_IMPORTED_MODULE_6__["default"].post("/api/cart", {
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
                    localStorage.setItem("cartItems", JSON.stringify(newProducts1));
                } catch (e1) {}
            }
        } catch (e2) {
            // fallback: normalize then dispatch addProduct and store single-item cart
            const [normalizedItem1] = (0,_util_cartHelpers__WEBPACK_IMPORTED_MODULE_10__/* .normalizeCartItems */ .D)([
                item
            ]);
            dispatch((0,_redux_cartSlice__WEBPACK_IMPORTED_MODULE_5__/* .addProduct */ .gK)(normalizedItem1));
            try {
                const cartId2 =  false ? 0 : null;
                axios__WEBPACK_IMPORTED_MODULE_6__["default"].post("/api/cart", {
                    items: normalizedItem1,
                    cartId: cartId2
                });
            } catch (err) {}
        }
    };
    const handleIncrease = async (index)=>{
        const amount = 1;
        dispatch((0,_redux_cartSlice__WEBPACK_IMPORTED_MODULE_5__/* .updateQuantity */ .$R)({
            index,
            amount
        }));
        try {
            let newProducts = cart.products.map((p, i)=>i === index ? {
                    ...p,
                    quantity: (Number(p.quantity) || 0) + amount
                } : p);
            newProducts = (0,_util_cartHelpers__WEBPACK_IMPORTED_MODULE_10__/* .normalizeCartItems */ .D)(newProducts);
            const subtotal = (0,_util_cartHelpers__WEBPACK_IMPORTED_MODULE_10__/* .computeSubtotal */ .c)(newProducts);
            const cartId =  false ? 0 : null;
            const res = await axios__WEBPACK_IMPORTED_MODULE_6__["default"].post("/api/cart", {
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
            console.warn("Failed to persist cart qty change:", e1?.message || e1);
        }
    };
    const handleDecrease = async (index)=>{
        const amount = -1;
        dispatch((0,_redux_cartSlice__WEBPACK_IMPORTED_MODULE_5__/* .updateQuantity */ .$R)({
            index,
            amount
        }));
        try {
            let newProducts = cart.products.map((p, i)=>i === index ? {
                    ...p,
                    quantity: Math.max(0, (Number(p.quantity) || 0) + amount)
                } : p).filter((p)=>(Number(p.quantity) || 0) > 0);
            newProducts = (0,_util_cartHelpers__WEBPACK_IMPORTED_MODULE_10__/* .normalizeCartItems */ .D)(newProducts);
            const subtotal = (0,_util_cartHelpers__WEBPACK_IMPORTED_MODULE_10__/* .computeSubtotal */ .c)(newProducts);
            const cartId =  false ? 0 : null;
            const res = await axios__WEBPACK_IMPORTED_MODULE_6__["default"].post("/api/cart", {
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
            console.warn("Failed to persist cart qty change:", e1?.message || e1);
        }
    };
    const handleRemoveFromCart = async (index)=>{
        dispatch((0,_redux_cartSlice__WEBPACK_IMPORTED_MODULE_5__/* .removeProduct */ .kh)(index));
        try {
            const newProducts = cart.products.filter((_, i)=>i !== index);
            const subtotal = newProducts.reduce((s, p)=>s + (Number(p.price) || 0) * (Number(p.quantity) || 1), 0);
            const cartId =  false ? 0 : null;
            const res = await axios__WEBPACK_IMPORTED_MODULE_6__["default"].post("/api/cart", {
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
            const toSave = (0,_util_cartHelpers__WEBPACK_IMPORTED_MODULE_10__/* .normalizeCartItems */ .D)(cart.products.filter((_, i)=>i !== index));
            if (false) {}
            localStorage.setItem("cartItems", JSON.stringify(toSave));
        } catch (e2) {}
    };
    // remove an item that exists only in localStorage (anonymous cart)
    const removeFromLocal = async (prod)=>{
        if (true) return;
        try {
            const raw = localStorage.getItem("cartItems");
            const items = raw ? JSON.parse(raw) : [];
            const key = makeKey(prod);
            const newItems = (Array.isArray(items) ? items : []).filter((p)=>makeKey(p) !== key);
            const normalized = (0,_util_cartHelpers__WEBPACK_IMPORTED_MODULE_10__/* .normalizeCartItems */ .D)(newItems);
            // update Redux immediately so UI reflects removal
            const subtotal = (0,_util_cartHelpers__WEBPACK_IMPORTED_MODULE_10__/* .computeSubtotal */ .c)(normalized);
            dispatch((0,_redux_cartSlice__WEBPACK_IMPORTED_MODULE_5__/* .setCart */ .RV)({
                items: normalized,
                subtotal
            }));
            try {
                if (false) {}
                localStorage.setItem("cartItems", JSON.stringify(normalized));
            } catch (e) {}
            const cartId = localStorage.getItem("cartId");
            try {
                const res = await axios__WEBPACK_IMPORTED_MODULE_6__["default"].post("/api/cart", {
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
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: (_styles_ProductCard_module_css__WEBPACK_IMPORTED_MODULE_11___default().container),
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: (_styles_ProductCard_module_css__WEBPACK_IMPORTED_MODULE_11___default().imgContainer),
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_image__WEBPACK_IMPORTED_MODULE_2___default()), {
                    src: product.img,
                    alt: product.title,
                    width: 200,
                    height: 200,
                    className: (_styles_ProductCard_module_css__WEBPACK_IMPORTED_MODULE_11___default().image)
                })
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: (_styles_ProductCard_module_css__WEBPACK_IMPORTED_MODULE_11___default().content),
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h2", {
                        className: (_styles_ProductCard_module_css__WEBPACK_IMPORTED_MODULE_11___default().title),
                        children: product.title
                    }),
                    product?.offer ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                className: (_styles_ProductCard_module_css__WEBPACK_IMPORTED_MODULE_11___default().oldPrice),
                                children: [
                                    "$",
                                    (Number(Array.isArray(product.price) ? product.price[0] : product.price) || 0).toFixed(2)
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                className: (_styles_ProductCard_module_css__WEBPACK_IMPORTED_MODULE_11___default().discountPrice),
                                children: [
                                    "$",
                                    (Math.round((Number(Array.isArray(product.price) ? product.price[0] : product.price) || 0) * 0.75 * 100) / 100).toFixed(2)
                                ]
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                className: (_styles_ProductCard_module_css__WEBPACK_IMPORTED_MODULE_11___default().badge),
                                children: "25% OFF"
                            })
                        ]
                    }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                        className: (_styles_ProductCard_module_css__WEBPACK_IMPORTED_MODULE_11___default().price),
                        children: [
                            "$",
                            (Number(Array.isArray(product.price) ? product.price[0] : product.price) || 0).toFixed(2)
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: (_styles_ProductCard_module_css__WEBPACK_IMPORTED_MODULE_11___default().actions),
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_3___default()), {
                                        className: (_styles_global_module_css__WEBPACK_IMPORTED_MODULE_12___default().linkContainer),
                                        href: `/product/${product._id}`,
                                        passHref: true,
                                        children: "View Details"
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_protect_AuthGate__WEBPACK_IMPORTED_MODULE_9__/* .AdminAuthorLink */ .P8, {
                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_3___default()), {
                                            href: `/admin/edit-product/${product._id}`,
                                            className: (_styles_global_module_css__WEBPACK_IMPORTED_MODULE_12___default().button),
                                            title: "Edit product",
                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_icons_fi__WEBPACK_IMPORTED_MODULE_7__.FiEdit, {
                                                size: 16
                                            })
                                        })
                                    })
                                ]
                            }),
                            (()=>{
                                const isInCart = inCart;
                                if (!isInCart) {
                                    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                        className: (_styles_global_module_css__WEBPACK_IMPORTED_MODULE_12___default().button),
                                        onClick: handleAddToCart,
                                        "aria-label": `Add ${product.title} to cart`,
                                        title: "Add to cart",
                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_icons_fi__WEBPACK_IMPORTED_MODULE_7__.FiShoppingCart, {
                                            size: 18
                                        })
                                    });
                                }
                                const idx = findIndexInCart(product);
                                const cartItem = idx === -1 ? {
                                    quantity: 1
                                } : cart.products[idx];
                                const q = Number(cartItem.quantity) || 1;
                                return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_QtyControls__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .Z, {
                                    quantity: q,
                                    onIncrease: ()=>idx === -1 ? null : handleIncrease(idx),
                                    onDecrease: ()=>idx === -1 ? null : handleDecrease(idx),
                                    onRemove: ()=>idx === -1 ? removeFromLocal(product) : handleRemoveFromCart(idx),
                                    styles: (_styles_ProductCard_module_css__WEBPACK_IMPORTED_MODULE_11___default())
                                });
                            })()
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




const ProductsList = ({ productsList =[] , productTitle , productDesc  })=>{
    // Defensive rendering and helpful debug output when no products are present.
    const hasProducts = Array.isArray(productsList) && productsList.length > 0;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: (_styles_NutillaList_module_css__WEBPACK_IMPORTED_MODULE_3___default().container),
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h1", {
                className: (_styles_NutillaList_module_css__WEBPACK_IMPORTED_MODULE_3___default().title),
                children: productTitle
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                className: (_styles_NutillaList_module_css__WEBPACK_IMPORTED_MODULE_3___default().desc),
                children: productDesc
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