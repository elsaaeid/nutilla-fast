"use strict";
exports.id = 946;
exports.ids = [946];
exports.modules = {

/***/ 7946:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ZP": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "pm": () => (/* binding */ useToast)
/* harmony export */ });
/* unused harmony export ToastProvider */
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6405);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_2__);



const ToastContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)(null);
function ToastProvider({ children  }) {
    const [toasts, setToasts] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const showToast = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)((message, opts = {})=>{
        const id = Date.now() + Math.random();
        const duration = typeof opts.duration === "number" ? opts.duration : 3000;
        setToasts((t)=>[
                ...t,
                {
                    id,
                    message
                }
            ]);
        setTimeout(()=>{
            setToasts((t)=>t.filter((x)=>x.id !== id));
        }, duration);
    }, []);
    const value = {
        showToast
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(ToastContext.Provider, {
        value: value,
        children: [
            children,
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(ToastPortal, {
                toasts: toasts,
                remove: (id)=>setToasts((t)=>t.filter((x)=>x.id !== id))
            })
        ]
    });
}
function useToast() {
    const ctx = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(ToastContext);
    if (!ctx) throw new Error("useToast must be used within ToastProvider");
    return ctx;
}
function ToastPortal({ toasts , remove  }) {
    const [mounted, setMounted] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>setMounted(true), []);
    if (!mounted) return null;
    return /*#__PURE__*/ (0,react_dom__WEBPACK_IMPORTED_MODULE_2__.createPortal)(/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
        style: containerStyle,
        "aria-live": "polite",
        children: toasts.map((t)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                style: toastStyle,
                onClick: ()=>remove(t.id),
                children: t.message
            }, t.id))
    }), document.body);
}
const containerStyle = {
    position: "fixed",
    bottom: 20,
    left: 20,
    zIndex: 9999,
    display: "flex",
    flexDirection: "column",
    gap: 8
};
const toastStyle = {
    background: "rgba(0,0,0,0.85)",
    color: "white",
    padding: "10px 14px",
    borderRadius: 8,
    boxShadow: "0 6px 18px rgba(0,0,0,0.25)",
    maxWidth: 420,
    cursor: "pointer"
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ToastProvider);


/***/ })

};
;