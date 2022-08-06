"use strict";
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.FolderTreeItemWrapper = void 0;
var clsx_1 = require("clsx");
var react_1 = require("react");
var FolderTreeItemWrapper_module_css_1 = require("./FolderTreeItemWrapper.module.css");
function flattenParents(parent) {
    if (!parent)
        return [];
    return __spreadArray(__spreadArray([], flattenParents(parent.parent), true), [parent], false);
}
exports.FolderTreeItemWrapper = 
// eslint-disable-next-line react/display-name
(0, react_1.forwardRef)(function (props, ref) {
    var clone = props.clone, depth = props.depth, disableSelection = props.disableSelection, disableInteraction = props.disableInteraction, ghost = props.ghost, handleProps = props.handleProps, indentationWidth = props.indentationWidth, indicator = props.indicator, collapsed = props.collapsed, onCollapse = props.onCollapse, onRemove = props.onRemove, item = props.item, wrapperRef = props.wrapperRef, style = props.style, isLast = props.isLast, parent = props.parent, rest = __rest(props, ["clone", "depth", "disableSelection", "disableInteraction", "ghost", "handleProps", "indentationWidth", "indicator", "collapsed", "onCollapse", "onRemove", "item", "wrapperRef", "style", "isLast", "parent"]);
    var flattenedParents = flattenParents(parent);
    return (<li className={(0, clsx_1["default"])(FolderTreeItemWrapper_module_css_1["default"]['dnd-sortable-tree_folder_wrapper'], clone && FolderTreeItemWrapper_module_css_1["default"]['dnd-sortable-tree_folder_clone'], ghost && FolderTreeItemWrapper_module_css_1["default"]['dnd-sortable-tree_folder_ghost'], disableSelection && FolderTreeItemWrapper_module_css_1["default"]['dnd-sortable-tree_folder_disable-selection'], disableInteraction && FolderTreeItemWrapper_module_css_1["default"]['dnd-sortable-tree_folder_disable-interaction'])} ref={wrapperRef} {...rest} style={style}>
				{flattenedParents.map(function (item, index) { return (<div key={item.id} className={item.isLast
                ? FolderTreeItemWrapper_module_css_1["default"]['dnd-sortable-tree_folder_line-last']
                : FolderTreeItemWrapper_module_css_1["default"]['dnd-sortable-tree_folder_line']}/>); })}
				<div className={isLast
            ? FolderTreeItemWrapper_module_css_1["default"]['dnd-sortable-tree_folder_line-to_self-last']
            : FolderTreeItemWrapper_module_css_1["default"]['dnd-sortable-tree_folder_line-to_self']}/>
				{props.manualDrag && props.showDragHandle && !props.disableSorting && (<div className={FolderTreeItemWrapper_module_css_1["default"]['dnd-sortable-tree_folder_handle']} {...handleProps}/>)}
				{!props.manualDrag &&
            !props.hideCollapseButton &&
            !!onCollapse &&
            !!props.childCount && (<button onClick={function (e) {
                e.preventDefault();
                onCollapse === null || onCollapse === void 0 ? void 0 : onCollapse();
            }} className={(0, clsx_1["default"])(FolderTreeItemWrapper_module_css_1["default"]['dnd-sortable-tree_folder_tree-item-collapse_button'], collapsed &&
                FolderTreeItemWrapper_module_css_1["default"]['dnd-sortable-tree_folder_tree-item-collapse_button-collapsed'])}/>)}
				<div className={FolderTreeItemWrapper_module_css_1["default"]['dnd-sortable-tree_folder_tree-item']} ref={ref} {...(props.manualDrag ? undefined : handleProps)} onClick={props.disableCollapseOnItemClick ? undefined : props.onCollapse}>
					{props.children}
				</div>
			</li>);
});
