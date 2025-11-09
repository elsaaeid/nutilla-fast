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
	"infoCard": "Order_infoCard__VC_Bf",
	"infoRow": "Order_infoRow__Umq_I",
	"infoField": "Order_infoField__8Kg05",
	"infoLabel": "Order_infoLabel__9Pqaa",
	"trTitle": "Order_trTitle__CD_yN",
	"tr": "Order_tr__e_VTn",
	"row": "Order_row__icbZr",
	"status": "Order_status__O10qm",
	"done": "Order_done__Zw6JT",
	"inProgress": "Order_inProgress__AzXXJ",
	"undone": "Order_undone__qmHnC",
	"checkedIcon": "Order_checkedIcon__JDEAS",
	"wrapper": "Order_wrapper__h4Unr",
	"totalTextTitle": "Order_totalTextTitle__tvjTc",
	"orderLabel": "Order_orderLabel__ha4jx",
	"button": "Order_button__ktKAN"
};


/***/ }),

/***/ 9751:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1185);
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);

const OrderSchema = new (mongoose__WEBPACK_IMPORTED_MODULE_0___default().Schema)({
    customer: {
        type: String,
        required: true,
        maxlength: 60
    },
    address: {
        type: String,
        required: true,
        maxlength: 200
    },
    total: {
        type: Number,
        required: true
    },
    status: {
        type: Number,
        default: 0
    },
    method: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((mongoose__WEBPACK_IMPORTED_MODULE_0___default().models.Order) || mongoose__WEBPACK_IMPORTED_MODULE_0___default().model("Order", OrderSchema));


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
/* harmony import */ var _styles_Order_module_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7564);
/* harmony import */ var _styles_Order_module_css__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_styles_Order_module_css__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5675);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_image__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9648);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _protect_AuthGate__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1532);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([axios__WEBPACK_IMPORTED_MODULE_2__]);
axios__WEBPACK_IMPORTED_MODULE_2__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];






const Order = ({ order  })=>{
    // keep a local copy so the UI updates after admin actions
    const [orderState, setOrderState] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(order);
    const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(false);
    const user = (0,_protect_AuthGate__WEBPACK_IMPORTED_MODULE_4__/* .useCurrentUser */ .xJ)();
    const role = user?.role;
    const isAdmin = !!user && (role === "admin" || role === "superadmin" || role === "author");
    const status = orderState.status;
    const statusClass = (index)=>{
        if (index - status < 1) return (_styles_Order_module_css__WEBPACK_IMPORTED_MODULE_5___default().done);
        if (index - status === 1) return (_styles_Order_module_css__WEBPACK_IMPORTED_MODULE_5___default().inProgress);
        if (index - status > 1) return (_styles_Order_module_css__WEBPACK_IMPORTED_MODULE_5___default().undone);
    };
    // simple feedback for already-delivered orders
    const succefullDeliveredToast = ()=>{
        if (false) {}
    };
    // feedback for cash-on-delivery customers
    const succefullCODToast = ()=>{
        if (false) {}
    };
    const handleStatus = async ()=>{
        if (!isAdmin) return;
        if (orderState.status >= 3) return;
        try {
            setLoading(true);
            const res = await axios__WEBPACK_IMPORTED_MODULE_2__["default"].put(`/api/orders/${orderState._id}`, {
                status: orderState.status + 1
            });
            // API returns the updated order
            setOrderState(res.data);
        } catch (err) {
            console.error("Failed to update order status", err);
        // Optionally show a toast or inline error (not added here)
        } finally{
            setLoading(false);
        }
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: (_styles_Order_module_css__WEBPACK_IMPORTED_MODULE_5___default().container),
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: (_styles_Order_module_css__WEBPACK_IMPORTED_MODULE_5___default().left),
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        className: (_styles_Order_module_css__WEBPACK_IMPORTED_MODULE_5___default().row),
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: (_styles_Order_module_css__WEBPACK_IMPORTED_MODULE_5___default().infoCard),
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: (_styles_Order_module_css__WEBPACK_IMPORTED_MODULE_5___default().infoRow),
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: (_styles_Order_module_css__WEBPACK_IMPORTED_MODULE_5___default().infoField),
                                            children: [
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                    className: (_styles_Order_module_css__WEBPACK_IMPORTED_MODULE_5___default().infoLabel),
                                                    children: "Order ID:"
                                                }),
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                    className: (_styles_Order_module_css__WEBPACK_IMPORTED_MODULE_5___default().id),
                                                    children: orderState._id
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: (_styles_Order_module_css__WEBPACK_IMPORTED_MODULE_5___default().infoField),
                                            children: [
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                    className: (_styles_Order_module_css__WEBPACK_IMPORTED_MODULE_5___default().infoLabel),
                                                    children: "Customer:"
                                                }),
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                    className: (_styles_Order_module_css__WEBPACK_IMPORTED_MODULE_5___default().name),
                                                    children: orderState.customer
                                                })
                                            ]
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: (_styles_Order_module_css__WEBPACK_IMPORTED_MODULE_5___default().infoRow),
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: (_styles_Order_module_css__WEBPACK_IMPORTED_MODULE_5___default().infoField),
                                            children: [
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                    className: (_styles_Order_module_css__WEBPACK_IMPORTED_MODULE_5___default().infoLabel),
                                                    children: "Address:"
                                                }),
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                    className: (_styles_Order_module_css__WEBPACK_IMPORTED_MODULE_5___default().address),
                                                    children: orderState.address
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: (_styles_Order_module_css__WEBPACK_IMPORTED_MODULE_5___default().infoField),
                                            children: [
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                    className: (_styles_Order_module_css__WEBPACK_IMPORTED_MODULE_5___default().infoLabel),
                                                    children: "Total:"
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                    className: (_styles_Order_module_css__WEBPACK_IMPORTED_MODULE_5___default().total),
                                                    children: [
                                                        "$",
                                                        orderState.total
                                                    ]
                                                })
                                            ]
                                        })
                                    ]
                                })
                            ]
                        })
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: (_styles_Order_module_css__WEBPACK_IMPORTED_MODULE_5___default().row),
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: statusClass(0),
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_image__WEBPACK_IMPORTED_MODULE_1___default()), {
                                        src: "/img/paid.png",
                                        width: 30,
                                        height: 30,
                                        alt: "",
                                        unoptimized: true
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                        children: "Payment"
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                        className: (_styles_Order_module_css__WEBPACK_IMPORTED_MODULE_5___default().checkedIcon),
                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_image__WEBPACK_IMPORTED_MODULE_1___default()), {
                                            className: (_styles_Order_module_css__WEBPACK_IMPORTED_MODULE_5___default().checkedIcon),
                                            src: "/img/checked.png",
                                            width: 20,
                                            height: 20,
                                            alt: "",
                                            unoptimized: true
                                        })
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: statusClass(1),
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_image__WEBPACK_IMPORTED_MODULE_1___default()), {
                                        src: "/img/halfwaffel.png",
                                        width: 30,
                                        height: 30,
                                        alt: "",
                                        unoptimized: true
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                        children: "Preparing"
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                        className: (_styles_Order_module_css__WEBPACK_IMPORTED_MODULE_5___default().checkedIcon),
                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_image__WEBPACK_IMPORTED_MODULE_1___default()), {
                                            className: (_styles_Order_module_css__WEBPACK_IMPORTED_MODULE_5___default().checkedIcon),
                                            src: "/img/checked.png",
                                            width: 20,
                                            height: 20,
                                            alt: "",
                                            unoptimized: true
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
                                        alt: "",
                                        unoptimized: true
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                        children: "On the way"
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                        className: (_styles_Order_module_css__WEBPACK_IMPORTED_MODULE_5___default().checkedIcon),
                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_image__WEBPACK_IMPORTED_MODULE_1___default()), {
                                            className: (_styles_Order_module_css__WEBPACK_IMPORTED_MODULE_5___default().checkedIcon),
                                            src: "/img/checked.png",
                                            width: 20,
                                            height: 20,
                                            alt: "",
                                            unoptimized: true
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
                                        alt: "",
                                        unoptimized: true
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                        children: "Delivered"
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                        className: (_styles_Order_module_css__WEBPACK_IMPORTED_MODULE_5___default().checkedIcon),
                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_image__WEBPACK_IMPORTED_MODULE_1___default()), {
                                            className: (_styles_Order_module_css__WEBPACK_IMPORTED_MODULE_5___default().checkedIcon),
                                            src: "/img/checked.png",
                                            width: 20,
                                            height: 20,
                                            alt: "",
                                            unoptimized: true
                                        })
                                    })
                                ]
                            })
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: (_styles_Order_module_css__WEBPACK_IMPORTED_MODULE_5___default().right),
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: (_styles_Order_module_css__WEBPACK_IMPORTED_MODULE_5___default().wrapper),
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h2", {
                            className: (_styles_Order_module_css__WEBPACK_IMPORTED_MODULE_5___default().title),
                            children: "CART TOTAL"
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: (_styles_Order_module_css__WEBPACK_IMPORTED_MODULE_5___default().totalText),
                            children: [
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("b", {
                                    className: (_styles_Order_module_css__WEBPACK_IMPORTED_MODULE_5___default().totalTextTitle),
                                    children: "Subtotal:"
                                }),
                                "$",
                                orderState.total
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: (_styles_Order_module_css__WEBPACK_IMPORTED_MODULE_5___default().totalText),
                            children: [
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("b", {
                                    className: (_styles_Order_module_css__WEBPACK_IMPORTED_MODULE_5___default().totalTextTitle),
                                    children: "Discount:"
                                }),
                                "$0.00"
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: (_styles_Order_module_css__WEBPACK_IMPORTED_MODULE_5___default().totalText),
                            children: [
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("b", {
                                    className: (_styles_Order_module_css__WEBPACK_IMPORTED_MODULE_5___default().totalTextTitle),
                                    children: "Total:"
                                }),
                                "$",
                                orderState.total
                            ]
                        }),
                        isAdmin ? orderState.status < 3 ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                            onClick: handleStatus,
                            className: (_styles_Order_module_css__WEBPACK_IMPORTED_MODULE_5___default().button),
                            disabled: loading,
                            children: loading ? "Updating..." : "Mark as Delivered"
                        }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                            onClick: succefullDeliveredToast,
                            className: (_styles_Order_module_css__WEBPACK_IMPORTED_MODULE_5___default().button),
                            children: "DELIVERED"
                        }) : orderState.method === 1 ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                            disabled: true,
                            className: (_styles_Order_module_css__WEBPACK_IMPORTED_MODULE_5___default().button),
                            children: "PAID"
                        }) : orderState.method === 0 ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                            onClick: succefullCODToast,
                            className: (_styles_Order_module_css__WEBPACK_IMPORTED_MODULE_5___default().button),
                            children: "CASH ON DELIVERY"
                        }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                            disabled: true,
                            className: (_styles_Order_module_css__WEBPACK_IMPORTED_MODULE_5___default().button),
                            children: "PAID"
                        })
                    ]
                })
            })
        ]
    });
};
const getServerSideProps = async ({ params  })=>{
    try {
        const dbConnect = (__webpack_require__(2642)["default"]) || __webpack_require__(2642);
        const Order = (__webpack_require__(9751)["default"]) || __webpack_require__(9751);
        await dbConnect();
        const order = await Order.findById(params.id).lean();
        if (!order) return {
            notFound: true
        };
        const serialized = {
            ...order,
            _id: String(order._id),
            createdAt: order.createdAt ? order.createdAt.toISOString() : null,
            updatedAt: order.updatedAt ? order.updatedAt.toISOString() : null
        };
        return {
            props: {
                order: serialized
            }
        };
    } catch (err) {
        console.error("Error fetching order in getServerSideProps:", err?.message || err);
        return {
            props: {
                order: null
            }
        };
    }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Order);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;