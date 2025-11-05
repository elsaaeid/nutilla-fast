exports.id = 490;
exports.ids = [490];
exports.modules = {

/***/ 7564:
/***/ ((module) => {

// Exports
module.exports = {
	"container": "Order_container__MlAs7",
	"left": "Order_left__T7fnj",
	"right": "Order_right__f0LLE",
	"table": "Order_table___IhSD",
	"row": "Order_row__icbZr",
	"status": "Order_status__O10qm",
	"done": "Order_done__Zw6JT",
	"inProgress": "Order_inProgress__AzXXJ",
	"undone": "Order_undone__qmHnC",
	"checkedIcon": "Order_checkedIcon__JDEAS",
	"wrapper": "Order_wrapper__h4Unr",
	"totalTextTitle": "Order_totalTextTitle__tvjTc",
	"button": "Order_button__ktKAN",
	"trTitle": "Order_trTitle__CD_yN",
	"tr": "Order_tr__e_VTn",
	"id": "Order_id__QJL52",
	"name": "Order_name__1nb_I",
	"address": "Order_address__m7hWm",
	"total": "Order_total__A3tQl"
};


/***/ }),

/***/ 7490:
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
/* harmony import */ var _styles_Order_module_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7564);
/* harmony import */ var _styles_Order_module_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_styles_Order_module_css__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5675);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_image__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9648);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([axios__WEBPACK_IMPORTED_MODULE_2__]);
axios__WEBPACK_IMPORTED_MODULE_2__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];




const Order = ({ order  })=>{
    const status = order.status;
    const statusClass = (index)=>{
        if (index - status < 1) return (_styles_Order_module_css__WEBPACK_IMPORTED_MODULE_3___default().done);
        if (index - status === 1) return (_styles_Order_module_css__WEBPACK_IMPORTED_MODULE_3___default().inProgress);
        if (index - status > 1) return (_styles_Order_module_css__WEBPACK_IMPORTED_MODULE_3___default().undone);
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: (_styles_Order_module_css__WEBPACK_IMPORTED_MODULE_3___default().container),
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: (_styles_Order_module_css__WEBPACK_IMPORTED_MODULE_3___default().left),
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        className: (_styles_Order_module_css__WEBPACK_IMPORTED_MODULE_3___default().row),
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("table", {
                            className: (_styles_Order_module_css__WEBPACK_IMPORTED_MODULE_3___default().table),
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("tr", {
                                    className: (_styles_Order_module_css__WEBPACK_IMPORTED_MODULE_3___default().trTitle),
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("th", {
                                            children: "Order ID"
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("th", {
                                            children: "Customer"
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("th", {
                                            children: "Address"
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("th", {
                                            children: "Total"
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("tr", {
                                    className: (_styles_Order_module_css__WEBPACK_IMPORTED_MODULE_3___default().tr),
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("td", {
                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                className: (_styles_Order_module_css__WEBPACK_IMPORTED_MODULE_3___default().id),
                                                children: order._id
                                            })
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("td", {
                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                className: (_styles_Order_module_css__WEBPACK_IMPORTED_MODULE_3___default().name),
                                                children: order.customer
                                            })
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("td", {
                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                className: (_styles_Order_module_css__WEBPACK_IMPORTED_MODULE_3___default().address),
                                                children: order.address
                                            })
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("td", {
                                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                className: (_styles_Order_module_css__WEBPACK_IMPORTED_MODULE_3___default().total),
                                                children: [
                                                    "$",
                                                    order.total
                                                ]
                                            })
                                        })
                                    ]
                                })
                            ]
                        })
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: (_styles_Order_module_css__WEBPACK_IMPORTED_MODULE_3___default().row),
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: statusClass(0),
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_image__WEBPACK_IMPORTED_MODULE_1___default()), {
                                        src: "/img/paid.png",
                                        width: 30,
                                        height: 30,
                                        alt: ""
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                        children: "Payment"
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                        className: (_styles_Order_module_css__WEBPACK_IMPORTED_MODULE_3___default().checkedIcon),
                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_image__WEBPACK_IMPORTED_MODULE_1___default()), {
                                            className: (_styles_Order_module_css__WEBPACK_IMPORTED_MODULE_3___default().checkedIcon),
                                            src: "/img/checked.png",
                                            width: 20,
                                            height: 20,
                                            alt: ""
                                        })
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: statusClass(1),
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_image__WEBPACK_IMPORTED_MODULE_1___default()), {
                                        src: "/img/bake.png",
                                        width: 30,
                                        height: 30,
                                        alt: ""
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                        children: "Preparing"
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                        className: (_styles_Order_module_css__WEBPACK_IMPORTED_MODULE_3___default().checkedIcon),
                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_image__WEBPACK_IMPORTED_MODULE_1___default()), {
                                            className: (_styles_Order_module_css__WEBPACK_IMPORTED_MODULE_3___default().checkedIcon),
                                            src: "/img/checked.png",
                                            width: 20,
                                            height: 20,
                                            alt: ""
                                        })
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: statusClass(2),
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_image__WEBPACK_IMPORTED_MODULE_1___default()), {
                                        src: "/img/bike.png",
                                        width: 30,
                                        height: 30,
                                        alt: ""
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                        children: "On the way"
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                        className: (_styles_Order_module_css__WEBPACK_IMPORTED_MODULE_3___default().checkedIcon),
                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_image__WEBPACK_IMPORTED_MODULE_1___default()), {
                                            className: (_styles_Order_module_css__WEBPACK_IMPORTED_MODULE_3___default().checkedIcon),
                                            src: "/img/checked.png",
                                            width: 20,
                                            height: 20,
                                            alt: ""
                                        })
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: statusClass(3),
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_image__WEBPACK_IMPORTED_MODULE_1___default()), {
                                        src: "/img/delivered.png",
                                        width: 30,
                                        height: 30,
                                        alt: ""
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                        children: "Delivered"
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                        className: (_styles_Order_module_css__WEBPACK_IMPORTED_MODULE_3___default().checkedIcon),
                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_image__WEBPACK_IMPORTED_MODULE_1___default()), {
                                            className: (_styles_Order_module_css__WEBPACK_IMPORTED_MODULE_3___default().checkedIcon),
                                            src: "/img/checked.png",
                                            width: 20,
                                            height: 20,
                                            alt: ""
                                        })
                                    })
                                ]
                            })
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: (_styles_Order_module_css__WEBPACK_IMPORTED_MODULE_3___default().right),
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: (_styles_Order_module_css__WEBPACK_IMPORTED_MODULE_3___default().wrapper),
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h2", {
                            className: (_styles_Order_module_css__WEBPACK_IMPORTED_MODULE_3___default().title),
                            children: "CART TOTAL"
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: (_styles_Order_module_css__WEBPACK_IMPORTED_MODULE_3___default().totalText),
                            children: [
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("b", {
                                    className: (_styles_Order_module_css__WEBPACK_IMPORTED_MODULE_3___default().totalTextTitle),
                                    children: "Subtotal:"
                                }),
                                "$",
                                order.total
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: (_styles_Order_module_css__WEBPACK_IMPORTED_MODULE_3___default().totalText),
                            children: [
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("b", {
                                    className: (_styles_Order_module_css__WEBPACK_IMPORTED_MODULE_3___default().totalTextTitle),
                                    children: "Discount:"
                                }),
                                "$0.00"
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: (_styles_Order_module_css__WEBPACK_IMPORTED_MODULE_3___default().totalText),
                            children: [
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("b", {
                                    className: (_styles_Order_module_css__WEBPACK_IMPORTED_MODULE_3___default().totalTextTitle),
                                    children: "Total:"
                                }),
                                "$",
                                order.total
                            ]
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                            disabled: true,
                            className: (_styles_Order_module_css__WEBPACK_IMPORTED_MODULE_3___default().button),
                            children: "PAID"
                        })
                    ]
                })
            })
        ]
    });
};
const getServerSideProps = async ({ params  })=>{
    const res = await axios__WEBPACK_IMPORTED_MODULE_2__["default"].get(`http://localhost:3000/api/orders/${params.id}`);
    return {
        props: {
            order: res.data
        }
    };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Order);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;