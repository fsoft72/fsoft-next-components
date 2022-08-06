"use strict";
exports.__esModule = true;
var dynamic_1 = require("next/dynamic");
var react_1 = require("react");
var NonSSRWrapper = function (props) { return (<react_1["default"].Fragment>{props.children}</react_1["default"].Fragment>); };
exports["default"] = (0, dynamic_1["default"])(function () { return Promise.resolve(NonSSRWrapper); }, { ssr: false });
