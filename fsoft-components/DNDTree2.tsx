import { forwardRef, useState } from 'react';
import { SimpleTreeItemWrapper, SortableTree, TreeItemComponentProps } from './dndtree';
import NonSSR from './NonSSR';

export type DNDTreeItem = {
	id: string;
	label: string;

	isFolder?: boolean;

	children?: DNDTreeItem[];

	level?: number;
	parent?: string | null;
	isDroppable?: boolean;
	isDraggable?: boolean;
};

// eslint-disable-next-line react/display-name
const MinimalTreeItemComponent = forwardRef<
	HTMLDivElement,
	TreeItemComponentProps<DNDTreeItem>
>( ( props: any, ref: any ) => (
	/* you could also use FolderTreeItemWrapper if you want to show vertical lines.  */
	<SimpleTreeItemWrapper {...props} ref={ref}>
		<div>
			{props.item.label}

			<button onClick={( e ) => { e.preventDefault(); e.stopPropagation(); console.log( props.item.id ); }}>Click me</button>
		</div>
	</SimpleTreeItemWrapper>
) );

interface DNDTreeProps {
	tree: DNDTreeItem[];
}

const DNDTree = ( { tree }: DNDTreeProps ) => {
	const [ items, setItems ] = useState( tree );

	const onBeforeDrop = ( active: any, over: any, newDepth: number ): boolean => {
		console.log( 'onBeforeDrop', active, newDepth );

		if ( active.isFolder && newDepth === 0 ) return true;
		if ( active.isFolder && newDepth !== 0 ) return false;
		if ( active.isFolder == false && newDepth === 0 ) return false;

		return true;
	};

	return (
		<NonSSR>
			<SortableTree
				items={items}
				TreeItemComponent={MinimalTreeItemComponent}
				maxDepth={2}

				onItemsChanged={setItems}
				onBeforeDrop={onBeforeDrop}
			/>

			<pre>{JSON.stringify( items, null, 4 )}</pre>
		</NonSSR>
	);

};

export default DNDTree;