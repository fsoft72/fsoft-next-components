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
exports.SortableTreeItem = void 0;
var react_1 = require("react");
var sortable_1 = require("@dnd-kit/sortable");
var utilities_1 = require("@dnd-kit/utilities");
var animateLayoutChanges = function (_a) {
    var isSorting = _a.isSorting, isDragging = _a.isDragging;
    return (isSorting || isDragging ? false : true);
};
var SortableTreeItemNotMemoized = function SortableTreeItem(_a) {
    var id = _a.id, depth = _a.depth, isLast = _a.isLast, TreeItemComponent = _a.TreeItemComponent, parent = _a.parent, disableSorting = _a.disableSorting, props = __rest(_a, ["id", "depth", "isLast", "TreeItemComponent", "parent", "disableSorting"]);
    var _b = (0, sortable_1.useSortable)({
        id: id,
        animateLayoutChanges: animateLayoutChanges,
        disabled: disableSorting
    }), attributes = _b.attributes, isDragging = _b.isDragging, isSorting = _b.isSorting, listeners = _b.listeners, setDraggableNodeRef = _b.setDraggableNodeRef, setDroppableNodeRef = _b.setDroppableNodeRef, transform = _b.transform, transition = _b.transition;
    var style = {
        transform: utilities_1.CSS.Translate.toString(transform),
        transition: transition !== null && transition !== void 0 ? transition : undefined
    };
    var localCollapse = (0, react_1.useMemo)(function () {
        if (!props.onCollapse)
            return undefined;
        return function () { var _a; return (_a = props.onCollapse) === null || _a === void 0 ? void 0 : _a.call(props, props.item.id); };
    }, [props]);
    var localRemove = (0, react_1.useMemo)(function () {
        if (!props.onRemove)
            return undefined;
        return function () { var _a; return (_a = props.onRemove) === null || _a === void 0 ? void 0 : _a.call(props, props.item.id); };
    }, [props]);
    return (<TreeItemComponent {...props} ref={setDraggableNodeRef} wrapperRef={setDroppableNodeRef} style={style} depth={depth} ghost={isDragging} disableInteraction={isSorting} isLast={isLast} parent={parent} handleProps={__assign(__assign({}, attributes), listeners)} onCollapse={localCollapse} onRemove={localRemove} disableSorting={disableSorting}/>);
};
exports.SortableTreeItem = react_1["default"].memo(SortableTreeItemNotMemoized);
