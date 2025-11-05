(() => {
var exports = {};
exports.id = 888;
exports.ids = [888];
exports.modules = {

/***/ 4608:
/***/ ((module) => {

// Exports
module.exports = {
	"container": "Announcement_container__ShIcN",
	"item": "Announcement_item__unp86",
	"phoneIcon": "Announcement_phoneIcon__Wcl3W",
	"phoneLink": "Announcement_phoneLink__0BxIf",
	"text": "Announcement_text__RAa1e"
};


/***/ }),

/***/ 4852:
/***/ ((module) => {

// Exports
module.exports = {
	"container": "Footer_container__iN3aW",
	"image": "Footer_image__fkpae",
	"cardContainer": "Footer_cardContainer__Alk_Z",
	"title": "Footer_title__ZStl1",
	"text": "Footer_text__TFiKo",
	"nutilla": "Footer_nutilla__bO29V",
	"item": "Footer_item__ikrg0"
};


/***/ }),

/***/ 5392:
/***/ ((module) => {

// Exports
module.exports = {
	"container": "Navbar_container__rxFeS",
	"list": "Navbar_list__h0uMs",
	"logo": "Navbar_logo__E_Sw_",
	"listItem": "Navbar_listItem__twU0F",
	"active": "Navbar_active__8GnRs",
	"cart": "Navbar_cart__SbQah",
	"account": "Navbar_account__BL5Bk",
	"accountIcon": "Navbar_accountIcon__doD6v",
	"accountName": "Navbar_accountName__vGvEg",
	"cartIcon": "Navbar_cartIcon__P8P0_",
	"counter": "Navbar_counter__GLebN",
	"hamburger": "Navbar_hamburger__i8zx1",
	"icon": "Navbar_icon__u7wX_",
	"open": "Navbar_open__TzCF6"
};


/***/ }),

/***/ 1812:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ _app)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: ./styles/Navbar.module.css
var Navbar_module = __webpack_require__(5392);
var Navbar_module_default = /*#__PURE__*/__webpack_require__.n(Navbar_module);
// EXTERNAL MODULE: ./node_modules/next/image.js
var next_image = __webpack_require__(5675);
var image_default = /*#__PURE__*/__webpack_require__.n(next_image);
// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__(1664);
var link_default = /*#__PURE__*/__webpack_require__.n(next_link);
// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__(1853);
// EXTERNAL MODULE: external "react-icons/fi"
var fi_ = __webpack_require__(2750);
// EXTERNAL MODULE: external "react-redux"
var external_react_redux_ = __webpack_require__(6022);
// EXTERNAL MODULE: ./protect/AuthGate.jsx
var AuthGate = __webpack_require__(1532);
;// CONCATENATED MODULE: ./components/Navbar.jsx










const Navbar = ()=>{
    const [open, setOpen] = (0,external_react_.useState)(false);
    const handleToggle = ()=>setOpen((s)=>!s);
    const quantity = (0,external_react_redux_.useSelector)((state)=>state.cart.quantity);
    const user = (0,AuthGate/* useCurrentUser */.xJ)();
    const router = (0,router_.useRouter)();
    const isActive = (href)=>{
        try {
            const path = router?.pathname || router?.asPath || "";
            if (href === "/") return path === "/" || path === "";
            return path.startsWith(href);
        } catch (e) {
            return false;
        }
    };
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        className: (Navbar_module_default()).container,
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                className: (Navbar_module_default()).logo,
                children: /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                    href: "/",
                    passHref: true,
                    children: /*#__PURE__*/ jsx_runtime_.jsx((image_default()), {
                        src: "/img/logo.png",
                        alt: "logo",
                        width: "150",
                        height: "150"
                    })
                })
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("button", {
                className: (Navbar_module_default()).hamburger,
                "aria-label": "Toggle menu",
                "aria-expanded": open,
                onClick: handleToggle,
                children: open ? /*#__PURE__*/ jsx_runtime_.jsx(fi_.FiX, {
                    className: (Navbar_module_default()).icon
                }) : /*#__PURE__*/ jsx_runtime_.jsx(fi_.FiMenu, {
                    className: (Navbar_module_default()).icon
                })
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("ul", {
                className: `${(Navbar_module_default()).list} ${open ? (Navbar_module_default()).open : ""}`,
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("li", {
                        className: `${(Navbar_module_default()).listItem} ${isActive("/") ? (Navbar_module_default()).active : ""}`,
                        onClick: ()=>setOpen(false),
                        children: /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                            href: "/",
                            children: "Home"
                        })
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("li", {
                        className: `${(Navbar_module_default()).listItem} ${isActive("/products") ? (Navbar_module_default()).active : ""}`,
                        onClick: ()=>setOpen(false),
                        children: /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                            href: "/products",
                            children: "Products"
                        })
                    }),
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)(AuthGate/* ShowOnLogout */.ER, {
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx("li", {
                                className: `${(Navbar_module_default()).listItem} ${isActive("/admin/login") ? (Navbar_module_default()).active : ""}`,
                                onClick: ()=>setOpen(false),
                                children: /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                                    href: "/admin/login",
                                    children: "Login"
                                })
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("li", {
                                className: `${(Navbar_module_default()).listItem} ${isActive("/admin/register") ? (Navbar_module_default()).active : ""}`,
                                onClick: ()=>setOpen(false),
                                children: /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                                    href: "/admin/register",
                                    children: "Register"
                                })
                            })
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ jsx_runtime_.jsx(AuthGate/* ShowOnLogin */.hF, {
                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)((link_default()), {
                    href: "/profile",
                    className: (Navbar_module_default()).account,
                    "aria-label": "Account",
                    children: [
                        /*#__PURE__*/ jsx_runtime_.jsx(fi_.FiUser, {
                            className: (Navbar_module_default()).accountIcon
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx("span", {
                            className: (Navbar_module_default()).accountName,
                            children: user?.name ? user.name.split(" ")[0] : user?.email?.split("@")[0]
                        })
                    ]
                })
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)((link_default()), {
                href: "/cart",
                className: (Navbar_module_default()).cart,
                "aria-label": "View cart",
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx(fi_.FiShoppingCart, {
                        className: (Navbar_module_default()).cartIcon
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        className: (Navbar_module_default()).counter,
                        children: quantity
                    })
                ]
            })
        ]
    });
};
/* harmony default export */ const components_Navbar = (Navbar);

// EXTERNAL MODULE: ./styles/Footer.module.css
var Footer_module = __webpack_require__(4852);
var Footer_module_default = /*#__PURE__*/__webpack_require__.n(Footer_module);
;// CONCATENATED MODULE: ./components/Footer.jsx




const Footer = ()=>{
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        className: (Footer_module_default()).container,
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                className: (Footer_module_default()).image,
                children: /*#__PURE__*/ jsx_runtime_.jsx((image_default()), {
                    src: "/img/product9.png",
                    width: "500",
                    height: "500",
                    layout: "fill",
                    alt: ""
                })
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: (Footer_module_default()).item,
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        className: (Footer_module_default()).card,
                        children: /*#__PURE__*/ jsx_runtime_.jsx("h2", {
                            className: (Footer_module_default()).nutilla,
                            children: "OH YES, WE DID. NUTILLA CHEFS, WELL HOT READY NUTILLA FROM NUTILLA FAST."
                        })
                    }),
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                        className: (Footer_module_default()).cardContainer,
                        children: [
                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                className: (Footer_module_default()).card,
                                children: [
                                    /*#__PURE__*/ jsx_runtime_.jsx("h1", {
                                        className: (Footer_module_default()).title,
                                        children: "FIND OUR RESTAURANTS"
                                    }),
                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("p", {
                                        className: (Footer_module_default()).text,
                                        children: [
                                            "Al-Teraa Street",
                                            /*#__PURE__*/ jsx_runtime_.jsx("br", {}),
                                            " in front of Toshka Gate",
                                            /*#__PURE__*/ jsx_runtime_.jsx("br", {}),
                                            "University neighborhood"
                                        ]
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                className: (Footer_module_default()).card,
                                children: [
                                    /*#__PURE__*/ jsx_runtime_.jsx("h1", {
                                        className: (Footer_module_default()).title,
                                        children: "WORKING HOURS"
                                    }),
                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("p", {
                                        className: (Footer_module_default()).text,
                                        children: [
                                            "ALL DAYS OF THE WEEK",
                                            /*#__PURE__*/ jsx_runtime_.jsx("br", {}),
                                            " 11:00 PM - 12:00 AM"
                                        ]
                                    })
                                ]
                            })
                        ]
                    })
                ]
            })
        ]
    });
};
/* harmony default export */ const components_Footer = (Footer);

// EXTERNAL MODULE: ./styles/Announcement.module.css
var Announcement_module = __webpack_require__(4608);
var Announcement_module_default = /*#__PURE__*/__webpack_require__.n(Announcement_module);
;// CONCATENATED MODULE: ./components/Announcement.jsx




const Announcement = ()=>{
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        className: (Announcement_module_default()).container,
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx("span", {
                children: "Super deal!"
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                className: (Announcement_module_default()).item,
                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("a", {
                    className: (Announcement_module_default()).phoneLink,
                    href: `tel:${phone}`,
                    children: [
                        /*#__PURE__*/ jsx_runtime_.jsx(fi_.FiPhone, {
                            className: (Announcement_module_default()).phoneIcon,
                            "aria-hidden": "true"
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx("span", {
                            className: (Announcement_module_default()).text,
                            children: phone
                        })
                    ]
                })
            })
        ]
    });
};
const phone = "+1 (234) 567-8901";
/* harmony default export */ const components_Announcement = (Announcement);

;// CONCATENATED MODULE: ./components/Layout.js





const Layout = ({ children  })=>{
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx(components_Announcement, {}),
            /*#__PURE__*/ jsx_runtime_.jsx(components_Navbar, {}),
            children,
            /*#__PURE__*/ jsx_runtime_.jsx(components_Footer, {})
        ]
    });
};
/* harmony default export */ const components_Layout = (Layout);

// EXTERNAL MODULE: ./components/ToastContext.jsx
var ToastContext = __webpack_require__(7946);
// EXTERNAL MODULE: ./styles/globals.css
var globals = __webpack_require__(6764);
// EXTERNAL MODULE: external "@reduxjs/toolkit"
var toolkit_ = __webpack_require__(5184);
// EXTERNAL MODULE: ./redux/cartSlice.js
var cartSlice = __webpack_require__(9235);
;// CONCATENATED MODULE: ./redux/store.js


/* harmony default export */ const store = ((0,toolkit_.configureStore)({
    reducer: {
        cart: cartSlice/* default */.ZP
    }
}));

;// CONCATENATED MODULE: ./pages/_app.js






function MyApp({ Component , pageProps  }) {
    return /*#__PURE__*/ jsx_runtime_.jsx(external_react_redux_.Provider, {
        store: store,
        children: /*#__PURE__*/ jsx_runtime_.jsx(ToastContext/* default */.ZP, {
            children: /*#__PURE__*/ jsx_runtime_.jsx(components_Layout, {
                children: /*#__PURE__*/ jsx_runtime_.jsx(Component, {
                    ...pageProps
                })
            })
        })
    });
}
/* harmony default export */ const _app = (MyApp);


/***/ }),

/***/ 6764:
/***/ (() => {



/***/ }),

/***/ 5184:
/***/ ((module) => {

"use strict";
module.exports = require("@reduxjs/toolkit");

/***/ }),

/***/ 3280:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/app-router-context.js");

/***/ }),

/***/ 2796:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/head-manager-context.js");

/***/ }),

/***/ 4957:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/head.js");

/***/ }),

/***/ 4014:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/i18n/normalize-locale-path.js");

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

/***/ 8524:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/is-plain-object.js");

/***/ }),

/***/ 8020:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/mitt.js");

/***/ }),

/***/ 4406:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/page-path/denormalize-page-path.js");

/***/ }),

/***/ 4964:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router-context.js");

/***/ }),

/***/ 1751:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/add-path-prefix.js");

/***/ }),

/***/ 6220:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/compare-states.js");

/***/ }),

/***/ 299:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/format-next-pathname-info.js");

/***/ }),

/***/ 3938:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/format-url.js");

/***/ }),

/***/ 9565:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/get-asset-path-from-route.js");

/***/ }),

/***/ 5789:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/get-next-pathname-info.js");

/***/ }),

/***/ 1897:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/is-bot.js");

/***/ }),

/***/ 1428:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/is-dynamic.js");

/***/ }),

/***/ 8854:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/parse-path.js");

/***/ }),

/***/ 1292:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/parse-relative-url.js");

/***/ }),

/***/ 4567:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/path-has-prefix.js");

/***/ }),

/***/ 979:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/querystring.js");

/***/ }),

/***/ 3297:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/remove-trailing-slash.js");

/***/ }),

/***/ 6052:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/resolve-rewrites.js");

/***/ }),

/***/ 4226:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/route-matcher.js");

/***/ }),

/***/ 5052:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/route-regex.js");

/***/ }),

/***/ 9232:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/utils.js");

/***/ }),

/***/ 1853:
/***/ ((module) => {

"use strict";
module.exports = require("next/router");

/***/ }),

/***/ 6689:
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ 6405:
/***/ ((module) => {

"use strict";
module.exports = require("react-dom");

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

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [398,675,676,664,235,946,532], () => (__webpack_exec__(1812)));
module.exports = __webpack_exports__;

})();