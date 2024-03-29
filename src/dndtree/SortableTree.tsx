import React, {
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';
import { createPortal } from 'react-dom';
import {
	Announcements,
	closestCenter,
	defaultDropAnimation,
	DndContext,
	DragEndEvent,
	DragMoveEvent,
	DragOverEvent,
	DragOverlay,
	DragStartEvent,
	// KeyboardSensor,
	Modifier,
	PointerSensor,
	PointerSensorOptions,
	UniqueIdentifier,
	useSensor,
	useSensors,
} from '@dnd-kit/core';
import {
	arrayMove,
	SortableContext,
	verticalListSortingStrategy,
} from '@dnd-kit/sortable';

import {
	buildTree,
	flattenTree,
	getChildCount,
	getProjection,
	removeChildrenOf,
	removeItem,
	setProperty,
} from './utilities';
import type {
	FlattenedItem,
	SensorContext,
	TreeItemComponentType,
	TreeItems,
} from './types';
// import { sortableTreeKeyboardCoordinates } from './keyboardCoordinates';
import { SortableTreeItem } from './SortableTreeItem';

// const measuring = {
//   droppable: {
//     strategy: MeasuringStrategy.Always,
//   },
// };

const deepClone = ( obj: any ) => JSON.parse( JSON.stringify( obj ) );

const dropAnimation = {
	...defaultDropAnimation,
};

export type SortableTreeProps<TData, TElement extends HTMLElement> = {
	items: TreeItems<TData>;
	TreeItemComponent: TreeItemComponentType<TData, TElement>;
	indentationWidth?: number;
	indicator?: boolean;
	pointerSensorOptions?: PointerSensorOptions;
	disableSorting?: boolean;

	maxDepth?: number;
	onItemsChanged ( items: TreeItems<TData> ): void;
	onBeforeDrop?( active: TData, over: TData, newDepth: number ): boolean;
};
const defaultPointerSensorOptions: PointerSensorOptions = {
	activationConstraint: {
		distance: 10,
	},
};
export function SortableTree<
	TreeItemData,
	TElement extends HTMLElement = HTMLDivElement
> ( {
	items,
	indicator,
	indentationWidth = 50,
	pointerSensorOptions,
	disableSorting,
	maxDepth,
	TreeItemComponent,

	onItemsChanged,
	onBeforeDrop,
	...rest
}: SortableTreeProps<TreeItemData, TElement> ) {
	const [ activeId, setActiveId ] = useState<UniqueIdentifier | null>( null );
	const [ overId, setOverId ] = useState<UniqueIdentifier | null>( null );
	const [ offsetLeft, setOffsetLeft ] = useState( 0 );
	const [ currentPosition, setCurrentPosition ] = useState<{
		parentId: UniqueIdentifier | null;
		overId: UniqueIdentifier;
	} | null>( null );
	const [ itemsById, setItemsById ] = useState<Record<UniqueIdentifier, TreeItemData>>( {} );

	const flattenedItems = useMemo( () => {
		const flattenedTree = flattenTree( items );
		const collapsedItems = flattenedTree.reduce<UniqueIdentifier[]>(
			( acc, { children, collapsed, id } ) =>
				collapsed && children?.length ? [ ...acc, id ] : acc,
			[]
		);

		const result = removeChildrenOf(
			flattenedTree,
			activeId ? [ activeId, ...collapsedItems ] : collapsedItems
		);
		return result;
	}, [ activeId, items ] );

	// this effect is fired when items change
	// to create a new itemsById map
	useEffect( () => {
		const _itemsById: Record<UniqueIdentifier, TreeItemData> = {};

		const _recursive = ( subItems: TreeItems<TreeItemData> ) => {
			subItems.forEach( ( item ) => {
				_itemsById[ item.id ] = deepClone( item );
				item.children && _recursive( item.children );
			}
			);
		};
		_recursive( items );

		setItemsById( _itemsById );
	}, [ items ] );

	const projected = getProjection(
		flattenedItems,
		activeId,
		overId,
		offsetLeft,
		indentationWidth
	);
	const sensorContext: SensorContext<TreeItemData> = useRef( {
		items: flattenedItems,
		offset: offsetLeft,
	} );

	// const [coordinateGetter] = useState(() =>
	//   sortableTreeKeyboardCoordinates(sensorContext, indentationWidth)
	// );
	const sensors = useSensors(
		useSensor(
			PointerSensor,
			pointerSensorOptions ?? defaultPointerSensorOptions
		)
		// useSensor(KeyboardSensor, {
		//   coordinateGetter,
		// })
	);

	const sortedIds = useMemo( () => flattenedItems.map( ( { id } ) => id ), [ flattenedItems ] );

	const activeItem = activeId
		? flattenedItems.find( ( { id } ) => id === activeId )
		: null;

	useEffect( () => {
		sensorContext.current = {
			items: flattenedItems,
			offset: offsetLeft,
		};
	}, [ flattenedItems, offsetLeft ] );

	const itemsRef = useRef( items );
	itemsRef.current = items;

	const handleRemove = useCallback( ( id: string ) => {
		onItemsChanged( removeItem( itemsRef.current, id ) );
	}, [ onItemsChanged ] );

	const handleCollapse = useCallback( ( id: string ) => {
		onItemsChanged(
			setProperty( itemsRef.current, id, 'collapsed', ( ( value: boolean ) => {
				return !value;
			} ) as any )
		);
	}, [ onItemsChanged ] );

	/*
	const announcements: Announcements = useMemo( () => ( {
		onDragStart ( { active } ) { return `Picked up ${ active.id }.`; },
		onDragMove ( { active, over } ) { return getMovementAnnouncement( 'onDragMove', active.id, over?.id ); },
		onDragOver ( { active, over } ) { return getMovementAnnouncement( 'onDragOver', active.id, over?.id ); },
		onDragEnd ( { active, over } ) { return getMovementAnnouncement( 'onDragEnd', active.id, over?.id ); },
		onDragCancel ( { active } ) { return `Moving was cancelled. ${ active.id } was dropped in its original position.`; },
	} ), [ getMovementAnnouncement ] );
	*/

	return (
		<DndContext
			// accessibility={{ announcements }}
			sensors={disableSorting ? undefined : sensors}
			modifiers={indicator ? modifiersArray : undefined}
			collisionDetection={closestCenter}
			// measuring={measuring}
			onDragStart={disableSorting ? undefined : handleDragStart}
			onDragMove={disableSorting ? undefined : handleDragMove}
			onDragOver={disableSorting ? undefined : handleDragOver}
			onDragEnd={disableSorting ? undefined : handleDragEnd}
			onDragCancel={disableSorting ? undefined : handleDragCancel}
		>
			<SortableContext
				items={sortedIds}
				strategy={disableSorting ? undefined : verticalListSortingStrategy}
			>
				<>
					{flattenedItems.map( ( item ) => {
						return (
							<SortableTreeItem
								{...rest}
								key={item.id}
								id={item.id as any}
								item={item}
								childCount={item.children?.length}
								depth={
									item.id === activeId && projected
										? projected.depth
										: item.depth
								}
								indentationWidth={indentationWidth}
								indicator={indicator}
								collapsed={Boolean( item.collapsed && item.children?.length )}
								onCollapse={item.children?.length ? handleCollapse : undefined}
								onRemove={handleRemove}
								isLast={
									item.id === activeId && projected
										? projected.isLast
										: item.isLast
								}
								parent={
									item.id === activeId && projected
										? projected.parent
										: item.parent
								}
								TreeItemComponent={TreeItemComponent}
								disableSorting={disableSorting}
							/>
						);
					} )}
					{createPortal(
						<DragOverlay dropAnimation={dropAnimation}>
							{activeId && activeItem ? (
								<TreeItemComponent
									{...rest}
									item={activeItem}
									// children={[]}
									depth={activeItem.depth}
									clone
									childCount={getChildCount( items, activeId ) + 1}
									indentationWidth={indentationWidth}
									isLast={false}
									parent={activeItem.parent}
								></TreeItemComponent>
							) : null}
						</DragOverlay>,
						typeof ( document ) != 'undefined' ? document.body : <div /> as any
					)}
				</>
			</SortableContext>
		</DndContext>
	);
	// { typeof ( document ) != 'undefined' ? document.body : null }

	function handleDragStart ( { active: { id: activeId } }: DragStartEvent ) {
		setActiveId( activeId );
		setOverId( activeId );

		const activeItem = flattenedItems.find( ( { id } ) => id === activeId );

		if ( activeItem ) {
			setCurrentPosition( {
				parentId: activeItem.parentId,
				overId: activeId,
			} );
		}

		document.body.style.setProperty( 'cursor', 'grabbing' );
	}

	function handleDragMove ( { delta }: DragMoveEvent ) {
		setOffsetLeft( delta.x );
	}

	function handleDragOver ( { over }: DragOverEvent ) {
		setOverId( over?.id ?? null );
	}

	function handleDragEnd ( { active, over }: DragEndEvent ) {
		resetState();

		if ( active.id === over?.id ) return;

		if ( maxDepth && projected && projected?.depth > ( maxDepth - 1 ) ) return;

		if ( onBeforeDrop && onBeforeDrop( itemsById[ active.id ], itemsById[ over?.id! ], projected?.depth || 0 ) === false ) return;

		if ( projected && over ) {
			console.log( "==== DROPPPED", { active, over }, projected.depth );

			const { depth, parentId } = projected;
			const clonedItems: FlattenedItem<TreeItemData>[] = flattenTree( items );
			const overIndex = clonedItems.findIndex( ( { id } ) => id === over.id );
			const activeIndex = clonedItems.findIndex( ( { id } ) => id === active.id );
			const activeTreeItem = clonedItems[ activeIndex ];

			clonedItems[ activeIndex ] = { ...activeTreeItem, depth, parentId };
			const sortedItems = arrayMove( clonedItems, activeIndex, overIndex );
			const newItems = buildTree( sortedItems );
			onItemsChanged( newItems );
		}
	}

	function handleDragCancel () {
		resetState();
	}

	function resetState () {
		setOverId( null );
		setActiveId( null );
		setOffsetLeft( 0 );
		setCurrentPosition( null );

		document.body.style.setProperty( 'cursor', '' );
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

const adjustTranslate: Modifier = ( { transform } ) => {
	return {
		...transform,
		y: transform.y - 25,
	};
};
const modifiersArray = [ adjustTranslate ];
