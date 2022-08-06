import clsx from 'clsx';
import React, { forwardRef } from 'react';
import type {
	TreeItemComponentProps,
	FlattenedItem,
	TreeItemComponentType,
} from '../../types';
import styles from './FolderTreeItemWrapper.module.css';

function flattenParents<T> (
	parent: FlattenedItem<T> | null
): FlattenedItem<T>[] {
	if ( !parent ) return [];
	return [ ...flattenParents( parent.parent ), parent ];
}

export const FolderTreeItemWrapper: TreeItemComponentType<{}, HTMLDivElement> =
	// eslint-disable-next-line react/display-name
	forwardRef<
		HTMLDivElement,
		React.PropsWithChildren<TreeItemComponentProps<{}>>
	>( ( props, ref ) => {
		const {
			clone,
			depth,
			disableSelection,
			disableInteraction,
			ghost,
			handleProps,
			indentationWidth,
			indicator,
			collapsed,
			onCollapse,
			onRemove,
			item,
			wrapperRef,
			style,
			isLast,
			parent,
			...rest
		} = props;

		const flattenedParents = flattenParents( parent );
		return (
			<li
				className={clsx(
					styles[ 'dnd-sortable-tree_folder_wrapper' ],
					clone && styles[ 'dnd-sortable-tree_folder_clone' ],
					ghost && styles[ 'dnd-sortable-tree_folder_ghost' ],
					disableSelection && styles[ 'dnd-sortable-tree_folder_disable-selection' ],
					disableInteraction && styles[ 'dnd-sortable-tree_folder_disable-interaction' ],
				)}
				ref={wrapperRef}
				{...rest}
				style={style}
			>
				{flattenedParents.map( ( item, index ) => (
					<div
						key={item.id}
						className={
							item.isLast
								? styles[ 'dnd-sortable-tree_folder_line-last' ]
								: styles[ 'dnd-sortable-tree_folder_line' ]
						}
					/>
				) )}
				<div
					className={
						isLast
							? styles[ 'dnd-sortable-tree_folder_line-to_self-last' ]
							: styles[ 'dnd-sortable-tree_folder_line-to_self' ]
					}
				/>
				{props.manualDrag && props.showDragHandle && !props.disableSorting && (
					<div className={styles[ 'dnd-sortable-tree_folder_handle' ]} {...handleProps} />
				)}
				{!props.manualDrag &&
					!props.hideCollapseButton &&
					!!onCollapse &&
					!!props.childCount && (
						<button
							onClick={( e ) => {
								e.preventDefault();
								onCollapse?.();
							}}
							className={clsx(
								styles[ 'dnd-sortable-tree_folder_tree-item-collapse_button' ],
								collapsed &&
								styles[ 'dnd-sortable-tree_folder_tree-item-collapse_button-collapsed' ],
							)}
						/>
					)}
				<div
					className={styles[ 'dnd-sortable-tree_folder_tree-item' ]}
					ref={ref}
					{...( props.manualDrag ? undefined : handleProps )}
					onClick={
						props.disableCollapseOnItemClick ? undefined : props.onCollapse
					}
				>
					{props.children}
				</div>
			</li>
		);
	} );
