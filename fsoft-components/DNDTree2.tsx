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
		<div>{props.item.label}</div>
	</SimpleTreeItemWrapper>
) );

interface DNDTreeProps {
	tree: DNDTreeItem[];
}

const DNDTree = ( { tree }: DNDTreeProps ) => {
	const [ items, setItems ] = useState( tree );
	return (
		<NonSSR>
			<SortableTree
				items={items}
				onItemsChanged={setItems}
				TreeItemComponent={MinimalTreeItemComponent}
			/>
		</NonSSR>
	);

};

export default DNDTree;