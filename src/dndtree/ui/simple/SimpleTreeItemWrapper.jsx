"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
exports.__esModule = true;
exports.SimpleTreeItemWrapper = void 0;
var clsx_1 = require("clsx");
var react_1 = require("react");
var SimpleTreeItemWrapper_module_css_1 = require("./SimpleTreeItemWrapper.module.css");
exports.SimpleTreeItemWrapper = 
// eslint-disable-next-line react/display-name
(0, react_1.forwardRef)(function (props, ref) {
    var clone = props.clone, depth = props.depth, disableSelection = props.disableSelection, disableInteraction = props.disableInteraction, ghost = props.ghost, handleProps = props.handleProps, indentationWidth = props.indentationWidth, indicator = props.indicator, collapsed = props.collapsed, onCollapse = props.onCollapse, onRemove = props.onRemove, item = props.item, wrapperRef = props.wrapperRef, style = props.style, rest = __rest(props, ["clone", "depth", "disableSelection", "disableInteraction", "ghost", "handleProps", "indentationWidth", "indicator", "collapsed", "onCollapse", "onRemove", "item", "wrapperRef", "style"]);
    var disableCollapseOnItemClick = !!props.disableCollapseOnItemClick;
    return (<li className={(0, clsx_1["default"])(SimpleTreeItemWrapper_module_css_1["default"]['dnd-sortable-tree_simple_wrapper'], clone && SimpleTreeItemWrapper_module_css_1["default"]['dnd-sortable-tree_simple_clone'], ghost && SimpleTreeItemWrapper_module_css_1["default"]['dnd-sortable-tree_simple_ghost'], disableSelection && SimpleTreeItemWrapper_module_css_1["default"]['dnd-sortable-tree_simple_disable-selection'], disableInteraction && SimpleTreeItemWrapper_module_css_1["default"]['dnd-sortable-tree_simple_disable-interaction'])} ref={wrapperRef} {...rest} style={__assign(__assign({}, style), { paddingLeft: clone ? indentationWidth : indentationWidth * depth })}>
				<div className={SimpleTreeItemWrapper_module_css_1["default"]['dnd-sortable-tree_simple_tree-item']} ref={ref} {...(props.manualDrag ? undefined : handleProps)} onClick={disableCollapseOnItemClick ? undefined : props.onCollapse}>
					{!props.disableSorting && props.showDragHandle !== false && (<div className={SimpleTreeItemWrapper_module_css_1["default"]['dnd-sortable-tree_simple_handle']} {...handleProps}/>)}
					{!props.manualDrag &&
            !props.hideCollapseButton &&
            !!onCollapse &&
            !!props.childCount && (<button onClick={function (e) {
                if (!disableCollapseOnItemClick) {
                    return;
                }
                e.preventDefault();
                onCollapse === null || onCollapse === void 0 ? void 0 : onCollapse();
            }} className={(0, clsx_1["default"])(SimpleTreeItemWrapper_module_css_1["default"]['dnd-sortable-tree_simple_tree-item-collapse_button'], collapsed &&
                SimpleTreeItemWrapper_module_css_1["default"]['dnd-sortable-tree_folder_simple-item-collapse_button-collapsed'])}/>)}
					{props.children}
				</div>
			</li>);
});
