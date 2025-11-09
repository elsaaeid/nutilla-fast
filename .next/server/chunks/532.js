"use strict";
exports.id = 532;
exports.ids = [532];
exports.modules = {

/***/ 1532:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ER": () => (/* binding */ ShowOnLogout),
/* harmony export */   "P8": () => (/* binding */ AdminAuthorLink),
/* harmony export */   "bo": () => (/* binding */ WithRole),
/* harmony export */   "hF": () => (/* binding */ ShowOnLogin),
/* harmony export */   "xJ": () => (/* binding */ useCurrentUser)
/* harmony export */ });
/* unused harmony exports AgentSellerLink, UnVerifiedUserLink, RequireAuth */
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_2__);



// Lightweight client-side auth helpers that call /api/me to determine current user.
// This avoids relying on a Redux auth slice which is not present in this repo.
// _authCache: undefined = unknown/loading, null = not authenticated, object = user
let _authCache = undefined;
async function fetchCurrentUser() {
    if (true) return undefined;
    if (_authCache !== undefined) return _authCache;
    try {
        const res = await fetch("/api/me");
        if (!res.ok) {
            // treat non-ok as unauthenticated, cache null
            _authCache = null;
            return null;
        }
        const json = await res.json();
        // API returns either null (no user), a user object, or a small admin hint object
        _authCache = json || null;
        return _authCache;
    } catch (err) {
        _authCache = null;
        return null;
    }
}
function useCurrentUser() {
    const [user, setUser] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(_authCache);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        let mounted = true;
        if (_authCache) {
            setUser(_authCache);
            return;
        }
        // fetchCurrentUser returns undefined on server; on client it will resolve to user|null
        fetchCurrentUser().then((u)=>{
            if (mounted) setUser(u);
        });
        return ()=>{
            mounted = false;
        };
    }, []);
    return user;
}
const ShowOnLogin = ({ children  })=>{
    const user = useCurrentUser();
    if (!user) return null;
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: children
    });
};
const ShowOnLogout = ({ children  })=>{
    const user = useCurrentUser();
    if (user) return null;
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: children
    });
};
const AdminAuthorLink = ({ children  })=>{
    const user = useCurrentUser();
    const role = user?.role;
    if (user && (role === "admin" || role === "superadmin" || role === "author")) return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: children
    });
    return null;
};
const AgentSellerLink = ({ children  })=>{
    const user = useCurrentUser();
    const role = user?.role;
    if (user && (role === "agent" || role === "seller")) return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: children
    });
    return null;
};
const UnVerifiedUserLink = ({ children  })=>{
    const user = useCurrentUser();
    if (user && !user.isVerified) return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: children
    });
    return null;
};
const RequireAuth = ({ children , redirectTo ="/admin/login"  })=>{
    const user = useCurrentUser();
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_2__.useRouter)();
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (false) {}
    }, [
        user,
        router,
        redirectTo
    ]);
    if (!user) return null;
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: children
    });
};
const WithRole = ({ roles =[] , children  })=>{
    const user = useCurrentUser();
    if (!user) return null;
    if (!roles || roles.length === 0) return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: children
    });
    return roles.includes(user.role) ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: children
    }) : null;
};
/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = ({
    ShowOnLogin,
    ShowOnLogout,
    AdminAuthorLink,
    AgentSellerLink,
    UnVerifiedUserLink,
    RequireAuth,
    WithRole
});



/***/ })

};
;