"use strict";
(() => {
var exports = {};
exports.id = 579;
exports.ids = [579];
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

/***/ 4042:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ handler)
});

// EXTERNAL MODULE: ./util/mongo.js
var mongo = __webpack_require__(7597);
// EXTERNAL MODULE: external "mongoose"
var external_mongoose_ = __webpack_require__(1185);
var external_mongoose_default = /*#__PURE__*/__webpack_require__.n(external_mongoose_);
;// CONCATENATED MODULE: ./models/Cart.js

const ExtraSchema = new (external_mongoose_default()).Schema({
    text: {
        type: String
    },
    price: {
        type: Number
    }
}, {
    _id: false
});
const CartItemSchema = new (external_mongoose_default()).Schema({
    // productId may be absent for anonymous/temporary items; keep it optional
    productId: {
        type: (external_mongoose_default()).Schema.Types.ObjectId,
        ref: "Product",
        required: false
    },
    title: {
        type: String
    },
    img: {
        type: String
    },
    price: {
        type: Number,
        required: true
    },
    // keep whether this item was an offer (discounted) and optionally the original price
    offer: {
        type: Boolean,
        default: false
    },
    originalPrice: {
        type: Number,
        required: false
    },
    quantity: {
        type: Number,
        default: 1
    },
    extras: {
        type: [
            ExtraSchema
        ],
        default: []
    }
}, {
    _id: false
});
const CartSchema = new (external_mongoose_default()).Schema({
    user: {
        type: (external_mongoose_default()).Schema.Types.ObjectId,
        ref: "User",
        required: false
    },
    items: {
        type: [
            CartItemSchema
        ],
        default: []
    },
    subtotal: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});
// Keep model re-use across hot-reloads in dev
/* harmony default export */ const Cart = ((external_mongoose_default()).models.Cart || external_mongoose_default().model("Cart", CartSchema));

;// CONCATENATED MODULE: ./pages/api/cart/index.js



// Dev/Prod: simple cart persistence APIs
async function handler(req, res) {
    const { method  } = req;
    const token = req.cookies?.token;
    try {
        await (0,mongo/* default */.Z)();
        // resolve user id from token (dev: token === userId, admin token is env TOKEN)
        let userId = null;
        if (token && token !== process.env.TOKEN) userId = token;
        if (method === "GET") {
            // allow fetching by cartId (anonymous carts) or by logged-in user
            const { cartId  } = req.query || {};
            if (cartId) {
                if (!external_mongoose_default().Types.ObjectId.isValid(cartId)) return res.status(400).json({
                    message: "invalid cartId"
                });
                const cart = await Cart.findById(cartId).lean();
                if (!cart) return res.status(200).json({
                    items: [],
                    subtotal: 0
                });
                const serialized = {
                    ...cart,
                    _id: String(cart._id),
                    user: cart.user ? String(cart.user) : null,
                    createdAt: cart.createdAt ? cart.createdAt.toISOString() : null,
                    updatedAt: cart.updatedAt ? cart.updatedAt.toISOString() : null
                };
                // If stored items lack offer/originalPrice, try to enrich them from Product collection
                try {
                    const Product = __webpack_require__(9442);
                    if (Array.isArray(serialized.items) && serialized.items.length > 0) {
                        for(let i = 0; i < serialized.items.length; i++){
                            const it = serialized.items[i];
                            if (it && it.productId && (!("offer" in it) || !("originalPrice" in it))) {
                                try {
                                    const prod = await Product.findById(it.productId).lean();
                                    if (prod) {
                                        // derive original price from product price field
                                        const base = Array.isArray(prod.price) ? prod.price[0] : prod.price;
                                        serialized.items[i].offer = (()=>{
                                            const v = prod.offer;
                                            if (typeof v === "boolean") return v;
                                            if (typeof v === "string") return [
                                                "true",
                                                "1",
                                                "yes"
                                            ].includes(v.toLowerCase().trim());
                                            if (typeof v === "number") return v === 1;
                                            return false;
                                        })();
                                        serialized.items[i].originalPrice = typeof base !== "undefined" && base !== null ? Number(base) || null : null;
                                    }
                                } catch (e) {
                                /* ignore per-item enrich errors */ }
                            }
                        }
                    }
                } catch (e1) {
                /* ignore enrichment errors */ }
                try {
                    console.log("/api/cart GET by cartId:", cartId, "items:", (serialized.items || []).length);
                } catch (e2) {}
                return res.status(200).json(serialized);
            }
            if (!userId) return res.status(200).json({
                items: [],
                subtotal: 0
            });
            const cart1 = await Cart.findOne({
                user: userId
            }).lean();
            if (!cart1) {
                try {
                    console.log("/api/cart GET for userId:", userId, "no cart found");
                } catch (e3) {}
                return res.status(200).json({
                    items: [],
                    subtotal: 0
                });
            }
            // serialize
            const serialized1 = {
                ...cart1,
                _id: String(cart1._id),
                user: cart1.user ? String(cart1.user) : null,
                createdAt: cart1.createdAt ? cart1.createdAt.toISOString() : null,
                updatedAt: cart1.updatedAt ? cart1.updatedAt.toISOString() : null
            };
            // Enrich items missing offer/originalPrice from Product collection when possible
            try {
                const Product1 = __webpack_require__(9442);
                if (Array.isArray(serialized1.items) && serialized1.items.length > 0) {
                    for(let i1 = 0; i1 < serialized1.items.length; i1++){
                        const it1 = serialized1.items[i1];
                        if (it1 && it1.productId && (!("offer" in it1) || !("originalPrice" in it1))) {
                            try {
                                const prod1 = await Product1.findById(it1.productId).lean();
                                if (prod1) {
                                    const base1 = Array.isArray(prod1.price) ? prod1.price[0] : prod1.price;
                                    serialized1.items[i1].offer = (()=>{
                                        const v = prod1.offer;
                                        if (typeof v === "boolean") return v;
                                        if (typeof v === "string") return [
                                            "true",
                                            "1",
                                            "yes"
                                        ].includes(v.toLowerCase().trim());
                                        if (typeof v === "number") return v === 1;
                                        return false;
                                    })();
                                    serialized1.items[i1].originalPrice = typeof base1 !== "undefined" && base1 !== null ? Number(base1) || null : null;
                                }
                            } catch (e4) {
                            /* ignore per-item enrich errors */ }
                        }
                    }
                }
            } catch (e5) {
            /* ignore enrichment errors */ }
            try {
                console.log("/api/cart GET for userId:", userId, "items:", (serialized1.items || []).length);
            } catch (e6) {}
            return res.status(200).json(serialized1);
        }
        if (method === "POST") {
            let { items , subtotal  } = req.body || {};
            // Debug: log token/userId and incoming payload size to help diagnose merge-on-login
            try {
                const incomingCount = Array.isArray(items) ? items.length : items ? 1 : 0;
                console.log("/api/cart POST token:", token, "userId:", userId, "incoming items:", incomingCount);
            } catch (e7) {
            /* ignore logging errors */ }
            // accept a non-array (single item) by coercing to array; keep empty array allowed
            if (!Array.isArray(items) && items != null) {
                items = [
                    items
                ];
            }
            if (items != null && !Array.isArray(items)) {
                return res.status(400).json({
                    message: "items must be an array or null"
                });
            }
            // helper: normalize extras (ensure predictable order) and items
            const normalizeExtras = (rawExtras)=>{
                const arr = Array.isArray(rawExtras) ? rawExtras : [];
                const cleaned = arr.map((e)=>({
                        text: (e?.text || e?.name || "").trim(),
                        price: Number(e?.price) || 0
                    }));
                // sort to make equality order-insensitive
                cleaned.sort((a, b)=>a.text.localeCompare(b.text) || a.price - b.price);
                return cleaned;
            };
            const parseOffer = (v)=>{
                if (typeof v === "boolean") return v;
                if (typeof v === "string") return [
                    "true",
                    "1",
                    "yes"
                ].includes(v.toLowerCase().trim());
                if (typeof v === "number") return v === 1;
                return false;
            };
            const normalized = Array.isArray(items) ? items.map((it)=>{
                const extras = normalizeExtras(it.extras);
                // productId: prefer _id or productId, only keep if valid ObjectId-like string
                let productId = it._id || it.productId || null;
                if (productId && typeof productId === "string" && external_mongoose_default().Types.ObjectId.isValid(productId)) {
                    productId = external_mongoose_default().Types.ObjectId(productId);
                } else {
                    productId = null;
                }
                return {
                    productId,
                    title: (it.title || it.name || "").trim(),
                    img: it.img || it.image || "",
                    price: Number(it.price) || 0,
                    quantity: Number(it.quantity) || 1,
                    extras,
                    // preserve whether client flagged this as an offer and original price if provided
                    offer: parseOffer(it.offer),
                    originalPrice: typeof it.originalPrice !== "undefined" ? Number(it.originalPrice) || null : null
                };
            }) : [];
            // If subtotal not provided, compute it from normalized items
            subtotal = Number(subtotal) || normalized.reduce((s, p)=>s + (Number(p.price) || 0) * (Number(p.quantity) || 1), 0);
            // Find or create cart
            let cart2;
            try {
                const { cartId: cartId1  } = req.body || {};
                if (cartId1 && external_mongoose_default().Types.ObjectId.isValid(cartId1)) {
                    // update existing anonymous cart by id
                    cart2 = await Cart.findById(cartId1);
                    if (!cart2) {
                        cart2 = new Cart({
                            items: normalized,
                            subtotal
                        });
                    } else {
                        cart2.items = normalized;
                        cart2.subtotal = subtotal;
                        cart2.updatedAt = new Date();
                    }
                } else if (userId) {
                    cart2 = await Cart.findOne({
                        user: userId
                    });
                    if (!cart2) {
                        // no existing user cart: create one from normalized items
                        cart2 = new Cart({
                            user: userId,
                            items: normalized,
                            subtotal
                        });
                    } else {
                        // merge semantics: instead of overwriting, merge incoming normalized items into existing cart
                        if (Array.isArray(normalized) && normalized.length > 0) {
                            // build a map of existing items by a stable key
                            const itemKey = (it)=>{
                                const pid = it.productId ? String(it.productId) : null;
                                const extrasKey = Array.isArray(it.extras) ? JSON.stringify(it.extras) : "[]";
                                if (pid) return `pid:${pid}`;
                                return `anon:${it.title || ""}|${Number(it.price) || 0}|${extrasKey}`;
                            };
                            const existing = Array.isArray(cart2.items) ? cart2.items.slice() : [];
                            const map = new Map();
                            existing.forEach((ex)=>{
                                const key = itemKey(ex);
                                map.set(key, {
                                    ...ex
                                });
                            });
                            normalized.forEach((inc)=>{
                                const key = itemKey(inc);
                                const found = map.get(key);
                                if (found) {
                                    // sum quantities and prefer incoming price/title/img
                                    found.quantity = (Number(found.quantity) || 0) + (Number(inc.quantity) || 0);
                                    found.price = Number(inc.price) || Number(found.price) || 0;
                                    // preserve offer/originalPrice where incoming provides it
                                    found.offer = typeof inc.offer !== "undefined" ? !!inc.offer : !!found.offer;
                                    found.originalPrice = typeof inc.originalPrice !== "undefined" ? inc.originalPrice || found.originalPrice : found.originalPrice;
                                    found.title = inc.title || found.title;
                                    found.img = inc.img || found.img;
                                    found.extras = inc.extras || found.extras;
                                    map.set(key, found);
                                } else {
                                    map.set(key, {
                                        ...inc
                                    });
                                }
                            });
                            // replace cart.items with merged array
                            cart2.items = Array.from(map.values());
                        } else {
                            // if incoming items empty array, interpret as clearing the cart
                            cart2.items = [];
                        }
                        // recompute subtotal from resulting items
                        cart2.subtotal = Array.isArray(cart2.items) ? cart2.items.reduce((s, p)=>s + (Number(p.price) || 0) * (Number(p.quantity) || 1), 0) : 0;
                        cart2.updatedAt = new Date();
                    }
                } else {
                    // anonymous cart: create one-off cart record (no user)
                    cart2 = new Cart({
                        items: normalized,
                        subtotal
                    });
                }
                const saved = await cart2.save();
                const out = {
                    ...saved.toObject(),
                    _id: String(saved._id),
                    user: saved.user ? String(saved.user) : null,
                    createdAt: saved.createdAt ? saved.createdAt.toISOString() : null,
                    updatedAt: saved.updatedAt ? saved.updatedAt.toISOString() : null
                };
                return res.status(201).json(out);
            } catch (saveErr) {
                console.error("/api/cart save error:", saveErr);
                // Return validation details if available
                if (saveErr && saveErr.errors) {
                    const details = Object.keys(saveErr.errors).reduce((acc, k)=>{
                        acc[k] = saveErr.errors[k].message;
                        return acc;
                    }, {});
                    return res.status(400).json({
                        message: "Validation failed",
                        details
                    });
                }
                return res.status(500).json({
                    message: saveErr.message || String(saveErr)
                });
            }
        }
        res.setHeader("Allow", [
            "GET",
            "POST"
        ]);
        return res.status(405).end(`Method ${method} Not Allowed`);
    } catch (err) {
        console.error("/api/cart error:", err);
        return res.status(500).json({
            message: err.message || String(err)
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
var __webpack_exports__ = __webpack_require__.X(0, [597], () => (__webpack_exec__(4042)));
module.exports = __webpack_exports__;

})();