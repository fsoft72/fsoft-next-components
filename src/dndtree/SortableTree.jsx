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
exports.SortableTree = void 0;
var react_1 = require("react");
var react_dom_1 = require("react-dom");
var core_1 = require("@dnd-kit/core");
var sortable_1 = require("@dnd-kit/sortable");
var utilities_1 = require("./utilities");
// import { sortableTreeKeyboardCoordinates } from './keyboardCoordinates';
var SortableTreeItem_1 = require("./SortableTreeItem");
// const measuring = {
//   droppable: {
//     strategy: MeasuringStrategy.Always,
//   },
// };
var deepClone = function (obj) { return JSON.parse(JSON.stringify(obj)); };
var dropAnimation = __assign({}, core_1.defaultDropAnimation);
var defaultPointerSensorOptions = {
    activationConstraint: {
        distance: 10
    }
};
function SortableTree(_a) {
    var items = _a.items, indicator = _a.indicator, _b = _a.indentationWidth, indentationWidth = _b === void 0 ? 50 : _b, pointerSensorOptions = _a.pointerSensorOptions, disableSorting = _a.disableSorting, maxDepth = _a.maxDepth, TreeItemComponent = _a.TreeItemComponent, onItemsChanged = _a.onItemsChanged, onBeforeDrop = _a.onBeforeDrop, rest = __rest(_a, ["items", "indicator", "indentationWidth", "pointerSensorOptions", "disableSorting", "maxDepth", "TreeItemComponent", "onItemsChanged", "onBeforeDrop"]);
    var _c = (0, react_1.useState)(null), activeId = _c[0], setActiveId = _c[1];
    var _d = (0, react_1.useState)(null), overId = _d[0], setOverId = _d[1];
    var _e = (0, react_1.useState)(0), offsetLeft = _e[0], setOffsetLeft = _e[1];
    var _f = (0, react_1.useState)(null), currentPosition = _f[0], setCurrentPosition = _f[1];
    var _g = (0, react_1.useState)({}), itemsById = _g[0], setItemsById = _g[1];
    var flattenedItems = (0, react_1.useMemo)(function () {
        var flattenedTree = (0, utilities_1.flattenTree)(items);
        var collapsedItems = flattenedTree.reduce(function (acc, _a) {
            var children = _a.children, collapsed = _a.collapsed, id = _a.id;
            return collapsed && (children === null || children === void 0 ? void 0 : children.length) ? __spreadArray(__spreadArray([], acc, true), [id], false) : acc;
        }, []);
        var result = (0, utilities_1.removeChildrenOf)(flattenedTree, activeId ? __spreadArray([activeId], collapsedItems, true) : collapsedItems);
        return result;
    }, [activeId, items]);
    // this effect is fired when items change
    // to create a new itemsById map
    (0, react_1.useEffect)(function () {
        var _itemsById = {};
        var _recursive = function (subItems) {
            subItems.forEach(function (item) {
                _itemsById[item.id] = deepClone(item);
                item.children && _recursive(item.children);
            });
        };
        _recursive(items);
        setItemsById(_itemsById);
    }, [items]);
    var projected = (0, utilities_1.getProjection)(flattenedItems, activeId, overId, offsetLeft, indentationWidth);
    var sensorContext = (0, react_1.useRef)({
        items: flattenedItems,
        offset: offsetLeft
    });
    // const [coordinateGetter] = useState(() =>
    //   sortableTreeKeyboardCoordinates(sensorContext, indentationWidth)
    // );
    var sensors = (0, core_1.useSensors)((0, core_1.useSensor)(core_1.PointerSensor, pointerSensorOptions !== null && pointerSensorOptions !== void 0 ? pointerSensorOptions : defaultPointerSensorOptions)
    // useSensor(KeyboardSensor, {
    //   coordinateGetter,
    // })
    );
    var sortedIds = (0, react_1.useMemo)(function () { return flattenedItems.map(function (_a) {
        var id = _a.id;
        return id;
    }); }, [flattenedItems]);
    var activeItem = activeId
        ? flattenedItems.find(function (_a) {
            var id = _a.id;
            return id === activeId;
        })
        : null;
    (0, react_1.useEffect)(function () {
        sensorContext.current = {
            items: flattenedItems,
            offset: offsetLeft
        };
    }, [flattenedItems, offsetLeft]);
    var itemsRef = (0, react_1.useRef)(items);
    itemsRef.current = items;
    var handleRemove = (0, react_1.useCallback)(function (id) {
        onItemsChanged((0, utilities_1.removeItem)(itemsRef.current, id));
    }, [onItemsChanged]);
    var handleCollapse = (0, react_1.useCallback)(function (id) {
        onItemsChanged((0, utilities_1.setProperty)(itemsRef.current, id, 'collapsed', (function (value) {
            return !value;
        })));
    }, [onItemsChanged]);
    /*
    const announcements: Announcements = useMemo( () => ( {
        onDragStart ( { active } ) { return `Picked up ${ active.id }.`; },
        onDragMove ( { active, over } ) { return getMovementAnnouncement( 'onDragMove', active.id, over?.id ); },
        onDragOver ( { active, over } ) { return getMovementAnnouncement( 'onDragOver', active.id, over?.id ); },
        onDragEnd ( { active, over } ) { return getMovementAnnouncement( 'onDragEnd', active.id, over?.id ); },
        onDragCancel ( { active } ) { return `Moving was cancelled. ${ active.id } was dropped in its original position.`; },
    } ), [ getMovementAnnouncement ] );
    */
    return (<core_1.DndContext 
    // accessibility={{ announcements }}
    sensors={disableSorting ? undefined : sensors} modifiers={indicator ? modifiersArray : undefined} collisionDetection={core_1.closestCenter} 
    // measuring={measuring}
    onDragStart={disableSorting ? undefined : handleDragStart} onDragMove={disableSorting ? undefined : handleDragMove} onDragOver={disableSorting ? undefined : handleDragOver} onDragEnd={disableSorting ? undefined : handleDragEnd} onDragCancel={disableSorting ? undefined : handleDragCancel}>
			<sortable_1.SortableContext items={sortedIds} strategy={disableSorting ? undefined : sortable_1.verticalListSortingStrategy}>
				<>
					{flattenedItems.map(function (item) {
            var _a, _b, _c;
            return (<SortableTreeItem_1.SortableTreeItem {...rest} key={item.id} id={item.id} item={item} childCount={(_a = item.children) === null || _a === void 0 ? void 0 : _a.length} depth={item.id === activeId && projected
                    ? projected.depth
                    : item.depth} indentationWidth={indentationWidth} indicator={indicator} collapsed={Boolean(item.collapsed && ((_b = item.children) === null || _b === void 0 ? void 0 : _b.length))} onCollapse={((_c = item.children) === null || _c === void 0 ? void 0 : _c.length) ? handleCollapse : undefined} onRemove={handleRemove} isLast={item.id === activeId && projected
                    ? projected.isLast
                    : item.isLast} parent={item.id === activeId && projected
                    ? projected.parent
                    : item.parent} TreeItemComponent={TreeItemComponent} disableSorting={disableSorting}/>);
        })}
					{(0, react_dom_1.createPortal)(<core_1.DragOverlay dropAnimation={dropAnimation}>
							{activeId && activeItem ? (<TreeItemComponent {...rest} item={activeItem} 
            // children={[]}
            depth={activeItem.depth} clone childCount={(0, utilities_1.getChildCount)(items, activeId) + 1} indentationWidth={indentationWidth} isLast={false} parent={activeItem.parent}></TreeItemComponent>) : null}
						</core_1.DragOverlay>, typeof (document) != 'undefined' ? document.body : <div />)}
				</>
			</sortable_1.SortableContext>
		</core_1.DndContext>);
    // { typeof ( document ) != 'undefined' ? document.body : null }
    function handleDragStart(_a) {
        var activeId = _a.active.id;
        setActiveId(activeId);
        setOverId(activeId);
        var activeItem = flattenedItems.find(function (_a) {
            var id = _a.id;
            return id === activeId;
        });
        if (activeItem) {
            setCurrentPosition({
                parentId: activeItem.parentId,
                overId: activeId
            });
        }
        document.body.style.setProperty('cursor', 'grabbing');
    }
    function handleDragMove(_a) {
        var delta = _a.delta;
        setOffsetLeft(delta.x);
    }
    function handleDragOver(_a) {
        var _b;
        var over = _a.over;
        setOverId((_b = over === null || over === void 0 ? void 0 : over.id) !== null && _b !== void 0 ? _b : null);
    }
    function handleDragEnd(_a) {
        var active = _a.active, over = _a.over;
        resetState();
        if (active.id === (over === null || over === void 0 ? void 0 : over.id))
            return;
        if (maxDepth && projected && (projected === null || projected === void 0 ? void 0 : projected.depth) > (maxDepth - 1))
            return;
        if (onBeforeDrop && onBeforeDrop(itemsById[active.id], itemsById[over === null || over === void 0 ? void 0 : over.id], (projected === null || projected === void 0 ? void 0 : projected.depth) || 0) === false)
            return;
        if (projected && over) {
            console.log("==== DROPPPED", { active: active, over: over }, projected.depth);
            var depth = projected.depth, parentId = projected.parentId;
            var clonedItems = (0, utilities_1.flattenTree)(items);
            var overIndex = clonedItems.findIndex(function (_a) {
                var id = _a.id;
                return id === over.id;
            });
            var activeIndex = clonedItems.findIndex(function (_a) {
                var id = _a.id;
                return id === active.id;
            });
            var activeTreeItem = clonedItems[activeIndex];
            clonedItems[activeIndex] = __assign(__assign({}, activeTreeItem), { depth: depth, parentId: parentId });
            var sortedItems = (0, sortable_1.arrayMove)(clonedItems, activeIndex, overIndex);
            var newItems = (0, utilities_1.buildTree)(sortedItems);
            onItemsChanged(newItems);
        }
    }
    function handleDragCancel() {
        resetState();
    }
    function resetState() {
        setOverId(null);
        setActiveId(null);
        setOffsetLeft(0);
        setCurrentPosition(null);
        document.body.style.setProperty('cursor', '');
    }
    /*
    function getMovementAnnouncement (
        eventName: string,
        activeId: UniqueIdentifier,
        overId?: UniqueIdentifier
    ) {
        if ( overId && projected ) {
            if ( eventName !== 'onDragEnd' ) {
                if (
                    currentPosition &&
                    projected.parentId === currentPosition.parentId &&
                    overId === currentPosition.overId
                ) {
                    return;
                } else {
                    setCurrentPosition( {
                        parentId: projected.parentId,
                        overId,
                    } );
                }
            }

            const clonedItems: FlattenedItem<TreeItemData>[] = flattenTree( items );
            const overIndex = clonedItems.findIndex( ( { id } ) => id === overId );
            const activeIndex = clonedItems.findIndex( ( { id } ) => id === activeId );
            const sortedItems = arrayMove( clonedItems, activeIndex, overIndex );

            const previousItem = sortedItems[ overIndex - 1 ];

            let announcement;
            const movedVerb = eventName === 'onDragEnd' ? 'dropped' : 'moved';
            const nestedVerb = eventName === 'onDragEnd' ? 'dropped' : 'nested';

            if ( !previousItem ) {
                const nextItem = sortedItems[ overIndex + 1 ];
                announcement = `${ activeId } was ${ movedVerb } before ${ nextItem.id }.`;
            } else {
                if ( projected.depth > previousItem.depth ) {
                    announcement = `${ activeId } was ${ nestedVerb } under ${ previousItem.id }.`;
                } else {
                    let previousSibling: FlattenedItem<TreeItemData> | undefined =
                        previousItem;
                    while ( previousSibling && projected.depth < previousSibling.depth ) {
                        const parentId: UniqueIdentifier | null = previousSibling.parentId;
                        previousSibling = sortedItems.find( ( { id } ) => id === parentId );
                    }

                    if ( previousSibling ) {
                        announcement = `${ activeId } was ${ movedVerb } after ${ previousSibling.id }.`;
                    }
                }
            }

            return announcement;
        }

        return;
    }
    */
}
exports.SortableTree = SortableTree;
var adjustTranslate = function (_a) {
    var transform = _a.transform;
    return __assign(__assign({}, transform), { y: transform.y - 25 });
};
var modifiersArray = [adjustTranslate];
