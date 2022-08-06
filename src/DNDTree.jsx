"use strict";
exports.__esModule = true;
var react_1 = require("react");
var dndtree_1 = require("./dndtree");
var NonSSR_1 = require("./NonSSR");
// eslint-disable-next-line react/display-name
var MinimalTreeItemComponent = (0, react_1.forwardRef)(function (props, ref) { return (
/* you could also use FolderTreeItemWrapper if you want to show vertical lines.  */
<dndtree_1.SimpleTreeItemWrapper {...props} ref={ref}>
		<div>
			{props.item.label}

			<button onClick={function (e) { e.preventDefault(); e.stopPropagation(); console.log(props.item.id); }}>Click me</button>
		</div>
	</dndtree_1.SimpleTreeItemWrapper>); });
var DNDTree = function (_a) {
    var tree = _a.tree;
    var _b = (0, react_1.useState)(tree), items = _b[0], setItems = _b[1];
    var onBeforeDrop = function (active, over, newDepth) {
        console.log('onBeforeDrop', active, newDepth);
        if (active.isFolder && newDepth === 0)
            return true;
        if (active.isFolder && newDepth !== 0)
            return false;
        if (active.isFolder == false && newDepth === 0)
            return false;
        return true;
    };
    return (<NonSSR_1.default>
			<dndtree_1.SortableTree items={items} TreeItemComponent={MinimalTreeItemComponent} maxDepth={2} onItemsChanged={setItems} onBeforeDrop={onBeforeDrop}/>

			<pre>{JSON.stringify(items, null, 4)}</pre>
		</NonSSR_1.default>);
};
exports["default"] = DNDTree;
