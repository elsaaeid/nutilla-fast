(() => {
var exports = {};
exports.id = 405;
exports.ids = [405,441];
exports.modules = {

/***/ 4004:
/***/ ((module) => {

// Exports
module.exports = {
	"mainAddButton": "Add_mainAddButton__jwM2b",
	"container": "Add_container__nehfK",
	"wrapper": "Add_wrapper__JHSck",
	"close": "Add_close__1Bqhj",
	"item": "Add_item__pgcYA",
	"label": "Add_label__jItnq",
	"input": "Add_input__EuiD8",
	"priceContainer": "Add_priceContainer__WuGaE",
	"inputSm": "Add_inputSm__dPDFU",
	"extra": "Add_extra__3fi1Q",
	"extraItems": "Add_extraItems__GWk48",
	"extraItem": "Add_extraItem__9Z9sH",
	"addButton": "Add_addButton__6OqWh"
};


/***/ }),

/***/ 2454:
/***/ ((module) => {

// Exports
module.exports = {
	"container": "Featured_container__djdhp",
	"wrapper": "Featured_wrapper__Up3ZO",
	"imgContainer": "Featured_imgContainer__bP_Gp",
	"productImg": "Featured_productImg___iJSk",
	"overlay": "Featured_overlay__pQE_z",
	"title": "Featured_title__t3bt3",
	"arrowContainer": "Featured_arrowContainer__eRP7q",
	"left": "Featured_left__Iw4AH",
	"right": "Featured_right___1zmk"
};


/***/ }),

/***/ 340:
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
/* harmony import */ var _styles_Add_module_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(4004);
/* harmony import */ var _styles_Add_module_css__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_styles_Add_module_css__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9648);
/* harmony import */ var _protect_AuthGate__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1532);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([axios__WEBPACK_IMPORTED_MODULE_2__]);
axios__WEBPACK_IMPORTED_MODULE_2__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];





const Add = ({ setClose  })=>{
    const [file, setFile] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [title, setTitle] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [desc, setDesc] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [prices, setPrices] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const [extraOptions, setExtraOptions] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const [extra, setExtra] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [offer, setOffer] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const changePrice = (e, index)=>{
        const currentPrices = [
            ...prices
        ];
        currentPrices[index] = Number(e.target.value);
        setPrices(currentPrices);
    };
    const handleExtraInput = (e)=>{
        setExtra({
            ...extra,
            [e.target.name]: e.target.value
        });
    };
    const handleExtra = (e)=>{
        setExtraOptions((prev)=>[
                ...prev,
                extra
            ]);
    };
    const handleCreate = async ()=>{
        if (!file) {
            alert("Please choose a file before creating the product.");
            return;
        }
        const data = new FormData();
        data.append("file", file);
        // cloud name and preset provided by user
        data.append("cloud_name", "dzbi59kmu.");
        data.append("upload_preset", "jwukjk1g");
        try {
            const uploadRes = await axios__WEBPACK_IMPORTED_MODULE_2__["default"].post(`https://api.cloudinary.com/v1_1/${"dzbi59kmu."}/image/upload`, data);
            const { url  } = uploadRes.data;
            const newProduct = {
                title,
                desc,
                // Product schema expects `price` (array). Send the collected prices as `price`.
                price: prices,
                // extraOptions is not part of the minimal Product schema; include it anyway
                // but server's schema may ignore unknown fields. Keep it for future schema updates.
                extraOptions,
                img: url,
                offer
            };
            // use a relative path so the browser will include same-origin cookies
            // (absolute URLs can be treated as cross-origin and won't send cookies by default)
            await axios__WEBPACK_IMPORTED_MODULE_2__["default"].post("/api/products", newProduct);
            setClose(true);
        } catch (err) {
            // Show more useful error details to help diagnose a 400 from Cloudinary
            console.error("Upload error:", err);
            if (err.response && err.response.data) {
                console.error("Cloudinary response data:", err.response.data);
                alert(`Upload failed: ${err.response.data.error?.message || JSON.stringify(err.response.data)}`);
            } else {
                alert(`Upload failed: ${err.message}`);
            }
        }
    };
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_protect_AuthGate__WEBPACK_IMPORTED_MODULE_3__/* .WithRole */ .bo, {
        roles: [
            "admin"
        ],
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
            className: (_styles_Add_module_css__WEBPACK_IMPORTED_MODULE_4___default().container),
            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: (_styles_Add_module_css__WEBPACK_IMPORTED_MODULE_4___default().wrapper),
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                        onClick: ()=>setClose(true),
                        className: (_styles_Add_module_css__WEBPACK_IMPORTED_MODULE_4___default().close),
                        children: "X"
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h1", {
                        children: "Add a new nutella"
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: (_styles_Add_module_css__WEBPACK_IMPORTED_MODULE_4___default().item),
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                                className: (_styles_Add_module_css__WEBPACK_IMPORTED_MODULE_4___default().label),
                                children: "Choose an image"
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                                type: "file",
                                onChange: (e)=>setFile(e.target.files[0])
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: (_styles_Add_module_css__WEBPACK_IMPORTED_MODULE_4___default().item),
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                                className: (_styles_Add_module_css__WEBPACK_IMPORTED_MODULE_4___default().label),
                                children: "Title"
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                                className: (_styles_Add_module_css__WEBPACK_IMPORTED_MODULE_4___default().input),
                                type: "text",
                                onChange: (e)=>setTitle(e.target.value)
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: (_styles_Add_module_css__WEBPACK_IMPORTED_MODULE_4___default().item),
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                                className: (_styles_Add_module_css__WEBPACK_IMPORTED_MODULE_4___default().label),
                                children: "Desc"
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("textarea", {
                                rows: 4,
                                type: "text",
                                onChange: (e)=>setDesc(e.target.value)
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: (_styles_Add_module_css__WEBPACK_IMPORTED_MODULE_4___default().item),
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                                className: (_styles_Add_module_css__WEBPACK_IMPORTED_MODULE_4___default().label),
                                children: "Prices"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: (_styles_Add_module_css__WEBPACK_IMPORTED_MODULE_4___default().priceContainer),
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                                        className: `${(_styles_Add_module_css__WEBPACK_IMPORTED_MODULE_4___default().input)} ${(_styles_Add_module_css__WEBPACK_IMPORTED_MODULE_4___default().inputSm)}`,
                                        type: "number",
                                        placeholder: "Small",
                                        onChange: (e)=>changePrice(e, 0)
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                                        className: `${(_styles_Add_module_css__WEBPACK_IMPORTED_MODULE_4___default().input)} ${(_styles_Add_module_css__WEBPACK_IMPORTED_MODULE_4___default().inputSm)}`,
                                        type: "number",
                                        placeholder: "Medium",
                                        onChange: (e)=>changePrice(e, 1)
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                                        className: `${(_styles_Add_module_css__WEBPACK_IMPORTED_MODULE_4___default().input)} ${(_styles_Add_module_css__WEBPACK_IMPORTED_MODULE_4___default().inputSm)}`,
                                        type: "number",
                                        placeholder: "Large",
                                        onChange: (e)=>changePrice(e, 2)
                                    })
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: (_styles_Add_module_css__WEBPACK_IMPORTED_MODULE_4___default().item),
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                                className: (_styles_Add_module_css__WEBPACK_IMPORTED_MODULE_4___default().label),
                                children: "Extra"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: (_styles_Add_module_css__WEBPACK_IMPORTED_MODULE_4___default().extra),
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                                        className: `${(_styles_Add_module_css__WEBPACK_IMPORTED_MODULE_4___default().input)} ${(_styles_Add_module_css__WEBPACK_IMPORTED_MODULE_4___default().inputSm)}`,
                                        type: "text",
                                        placeholder: "Item",
                                        name: "text",
                                        onChange: handleExtraInput
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                                        className: `${(_styles_Add_module_css__WEBPACK_IMPORTED_MODULE_4___default().input)} ${(_styles_Add_module_css__WEBPACK_IMPORTED_MODULE_4___default().inputSm)}`,
                                        type: "number",
                                        placeholder: "Price",
                                        name: "price",
                                        onChange: handleExtraInput
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                        className: (_styles_Add_module_css__WEBPACK_IMPORTED_MODULE_4___default().extraButton),
                                        onClick: handleExtra,
                                        children: "Add"
                                    })
                                ]
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                className: (_styles_Add_module_css__WEBPACK_IMPORTED_MODULE_4___default().extraItems),
                                children: extraOptions.map((option, idx)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                        className: (_styles_Add_module_css__WEBPACK_IMPORTED_MODULE_4___default().extraItem),
                                        children: option.text
                                    }, option?.text ? `${option.text.replaceAll(" ", "_")}-${idx}` : `extra-${idx}`))
                            })
                        ]
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        className: (_styles_Add_module_css__WEBPACK_IMPORTED_MODULE_4___default().item),
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("label", {
                            className: (_styles_Add_module_css__WEBPACK_IMPORTED_MODULE_4___default().label),
                            style: {
                                display: "flex",
                                alignItems: "center",
                                gap: 8
                            },
                            children: [
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                                    type: "checkbox",
                                    checked: offer,
                                    onChange: (e)=>setOffer(e.target.checked)
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                    style: {
                                        marginLeft: 6
                                    },
                                    children: "Mark as offer"
                                })
                            ]
                        })
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                        className: (_styles_Add_module_css__WEBPACK_IMPORTED_MODULE_4___default().addButton),
                        onClick: handleCreate,
                        children: "Create"
                    })
                ]
            })
        })
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Add);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 3682:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _styles_Add_module_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4004);
/* harmony import */ var _styles_Add_module_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_styles_Add_module_css__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _protect_AuthGate__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1532);



const AddButton = ({ setClose  })=>{
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_protect_AuthGate__WEBPACK_IMPORTED_MODULE_1__/* .WithRole */ .bo, {
        roles: [
            "admin"
        ],
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
            onClick: ()=>setClose(false),
            className: (_styles_Add_module_css__WEBPACK_IMPORTED_MODULE_2___default().mainAddButton),
            children: "Add New nutella"
        })
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AddButton);


/***/ }),

/***/ 8510:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _styles_Featured_module_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(2454);
/* harmony import */ var _styles_Featured_module_css__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_styles_Featured_module_css__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_icons_fi__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2750);
/* harmony import */ var react_icons_fi__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_icons_fi__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5675);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_image__WEBPACK_IMPORTED_MODULE_3__);





const Featured = ()=>{
    const [currentIndex, setCurrentIndex] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
    const images = [
        {
            src: "/img/product1.png",
            title: "Molten Chocolate Cake",
            subtitle: "Warm, gooey center"
        },
        {
            src: "/img/product2.png",
            title: "Half Moon Waffle",
            subtitle: "Rounded waffle with nutella"
        },
        {
            src: "/img/product3.png",
            title: "Strawberry Delight",
            subtitle: "Fresh strawberries & cream"
        }
    ];
    const handlePrev = ()=>setCurrentIndex((prev)=>prev === 0 ? images.length - 1 : prev - 1);
    const handleNext = ()=>setCurrentIndex((prev)=>prev === images.length - 1 ? 0 : prev + 1);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: (_styles_Featured_module_css__WEBPACK_IMPORTED_MODULE_4___default().container),
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                className: `${(_styles_Featured_module_css__WEBPACK_IMPORTED_MODULE_4___default().arrowContainer)} ${(_styles_Featured_module_css__WEBPACK_IMPORTED_MODULE_4___default().left)}`,
                "aria-label": "Previous slide",
                onClick: handlePrev,
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_icons_fi__WEBPACK_IMPORTED_MODULE_2__.FiChevronLeft, {
                    size: 28
                })
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: (_styles_Featured_module_css__WEBPACK_IMPORTED_MODULE_4___default().wrapper),
                style: {
                    transform: `translateX(${-100 * currentIndex}%)`
                },
                children: images.map((item, id)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: (_styles_Featured_module_css__WEBPACK_IMPORTED_MODULE_4___default().imgContainer),
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_image__WEBPACK_IMPORTED_MODULE_3___default()), {
                                src: item.src,
                                alt: item.title || `product-${id}`,
                                fill: true,
                                className: (_styles_Featured_module_css__WEBPACK_IMPORTED_MODULE_4___default().productImg),
                                sizes: "(max-width: 768px) 100vw, 50vw"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: (_styles_Featured_module_css__WEBPACK_IMPORTED_MODULE_4___default().overlay),
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h2", {
                                        className: (_styles_Featured_module_css__WEBPACK_IMPORTED_MODULE_4___default().title),
                                        children: item.title
                                    }),
                                    item.subtitle && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                        className: (_styles_Featured_module_css__WEBPACK_IMPORTED_MODULE_4___default().subtitle),
                                        children: item.subtitle
                                    })
                                ]
                            })
                        ]
                    }, id))
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                className: `${(_styles_Featured_module_css__WEBPACK_IMPORTED_MODULE_4___default().arrowContainer)} ${(_styles_Featured_module_css__WEBPACK_IMPORTED_MODULE_4___default().right)}`,
                "aria-label": "Next slide",
                onClick: handleNext,
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_icons_fi__WEBPACK_IMPORTED_MODULE_2__.FiChevronRight, {
                    size: 28
                })
            })
        ]
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Featured);


/***/ }),

/***/ 4369:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Home),
/* harmony export */   "getServerSideProps": () => (/* binding */ getServerSideProps)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(968);
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _components_Add__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(340);
/* harmony import */ var _components_AddButton__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(3682);
/* harmony import */ var _components_Featured__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(8510);
/* harmony import */ var _components_ProductsList__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(5641);
/* harmony import */ var _styles_Home_module_css__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(9399);
/* harmony import */ var _styles_Home_module_css__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_styles_Home_module_css__WEBPACK_IMPORTED_MODULE_7__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_components_Add__WEBPACK_IMPORTED_MODULE_3__, _components_ProductsList__WEBPACK_IMPORTED_MODULE_6__]);
([_components_Add__WEBPACK_IMPORTED_MODULE_3__, _components_ProductsList__WEBPACK_IMPORTED_MODULE_6__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);








function Home({ productsList  }) {
    const [close, setClose] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(true);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: (_styles_Home_module_css__WEBPACK_IMPORTED_MODULE_7___default().container),
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)((next_head__WEBPACK_IMPORTED_MODULE_1___default()), {
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("title", {
                        children: "Nutilla Fast"
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("meta", {
                        name: "description",
                        content: "Best nutella shop in town"
                    })
                ]
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_Featured__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z, {}),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_AddButton__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z, {
                setClose: setClose
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ProductsList__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z, {
                productsList: productsList && productsList.filter((p)=>p.offer) || [],
                productTitle: "Special Offers",
                productDesc: "Products currently on offer — available for a limited time."
            }),
            !close && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_Add__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z, {
                setClose: setClose
            })
        ]
    });
}
const getServerSideProps = async (ctx)=>{
    const myCookie = ctx.req?.cookies || "";
    let admin = false;
    if (myCookie.token === process.env.TOKEN) {
        admin = true;
    }
    try {
        // Query the database directly on the server to avoid making an HTTP request
        const dbConnect = (__webpack_require__(2642)["default"]) || __webpack_require__(2642);
        const Product = (__webpack_require__(1877)["default"]) || __webpack_require__(1877);
        await dbConnect();
        const products = await Product.find().lean();
        // Make sure documents are JSON-serializable (convert ObjectId and Date fields)
        const productsList = products.map((p)=>{
            return {
                ...p,
                _id: String(p._id),
                createdAt: p.createdAt ? p.createdAt.toISOString() : null,
                updatedAt: p.updatedAt ? p.updatedAt.toISOString() : null,
                // Coerce legacy or incorrectly-typed `offer` values to boolean.
                offer: (()=>{
                    if (typeof p.offer === "boolean") return p.offer;
                    if (typeof p.offer === "string") {
                        const v = p.offer.toLowerCase().trim();
                        return v === "true" || v === "1" || v === "yes";
                    }
                    if (typeof p.offer === "number") return p.offer === 1;
                    return false;
                })()
            };
        });
        return {
            props: {
                productsList
            }
        };
    } catch (error) {
        console.error("Error fetching products in getServerSideProps:", error.message || error);
        return {
            props: {
                productsList: []
            }
        };
    }
};

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

/***/ 968:
/***/ ((module) => {

"use strict";
module.exports = require("next/head");

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

/***/ }),

/***/ 9648:
/***/ ((module) => {

"use strict";
module.exports = import("axios");;

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [398,675,676,664,532,714,235,642,940,302,288], () => (__webpack_exec__(4369)));
module.exports = __webpack_exports__;

})();