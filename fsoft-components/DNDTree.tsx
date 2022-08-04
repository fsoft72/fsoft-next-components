import React, { useEffect, useState } from 'react';
import { DndContext, useDraggable, useDroppable } from '@dnd-kit/core';

const mkid = () => Math.random().toString( 36 ).slice( 2, 9 );

function Droppable ( props: any ) {
	const { isOver, setNodeRef } = useDroppable( { id: props.id, } );

	const style = { color: isOver ? 'green' : undefined, };

	return (
		<div ref={setNodeRef} style={style}>
			{props.children}
		</div>
	);
}

function Draggable ( props: any ) {
	const { attributes, listeners, setNodeRef, transform } = useDraggable( { id: props.id, } );

	const style = transform ? {
		transform: `translate3d(${ transform.x }px, ${ transform.y }px, 0)`,
	} : undefined;

	return (
		<div ref={setNodeRef} style={style} {...listeners} {...attributes}>
			{props.children}
		</div>
	);
}

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

const deepCopy = ( obj: any ) => {
	return JSON.parse( JSON.stringify( obj ) );
};


interface DNDTreeProps {
	tree: DNDTreeItem[];
	maxDepth?: number;
}

const DNDTree = ( { tree, maxDepth = 0 }: DNDTreeProps ) => {
	const [ parent, setParent ] = useState( null );
	const [ elements, setElements ] = useState<DNDTreeItem[]>();
	const [ elementsRef, setElementsRef ] = useState<Record<string, DNDTreeItem>>();

	useEffect( () => {
		console.log( "==== Organizing tree", tree );

		const _organize = ( subtree: DNDTreeItem[], parent: DNDTreeItem | null, level: number = 0 ) => {
			const _elements: DNDTreeItem[] = [];

			subtree.forEach( ( _item: DNDTreeItem ) => {
				const item: DNDTreeItem = { ..._item };

				item.level = level;
				item.parent = parent ? parent.id : null;

				if ( item.children ) {
					item.children = _organize( item.children, item, level + 1 );
				}

				if ( item.isFolder && item.level < maxDepth ) item.isDroppable = true;

				_elements.push( item );

			} );
			return _elements;
		};

		const elems = _organize( tree, null );

		console.log( "==== ELEMENTS", elems );

		setElements( elems );
	}, [ tree, maxDepth ] );

	const _mk_refs = ( elems: DNDTreeItem[] ) => {
		// Updating elements refs
		const _elementsRef: Record<string, DNDTreeItem> = {};

		const _recurse = ( subtree: DNDTreeItem[] ) => {
			subtree.forEach( ( item: DNDTreeItem ) => {
				_elementsRef[ item.id ] = item;
				if ( item.children ) _recurse( item.children );
			} );
		};

		_recurse( elems );

		return _elementsRef;
	};

	useEffect( () => {
		if ( !elements ) {
			setElementsRef( {} );
			return;
		}

		setElementsRef( _mk_refs( elements ) );
	}, [ elements ] );

	const handleDragEnd = ( event: any ) => {
		const { active, over } = event;

		console.log( "==== OVER: ", { active, over } );

		_move_element( active, over );

		// If the item is dropped over a container, set it as the parent
		// otherwise reset the parent to `null`
	};

	// This function moves an element to a new parent
	const _move_element = ( _active: any, _over: any ) => {
		let active = elementsRef![ _active.id ];
		let over = elementsRef![ _over.id ];

		if ( active.parent === over.id ) {
			console.log( "=== SAME PARENT" );
			return;
		}

		// Do a deep copy of all elements
		const _elements = deepCopy( elements );
		// Maps the elements refs by id
		const _refs = _mk_refs( _elements );

		// update active and over with the new refs in memory
		active = _refs[ _active.id ];
		over = _refs[ _over.id ];

		// take the original folder
		const activeFolder = active.parent ? _refs[ active.parent ] : null;

		// remove the element by activeFolder children
		if ( activeFolder && activeFolder.children ) {
			const index = activeFolder.children.indexOf( active );
			activeFolder.children.splice( index, 1 );
		}

		// 'over' is the new parent
		if ( !over.children ) over.children = [];
		over.children.push( active );

		// update parent to active element
		active.parent = over.id;

		// update the official elements
		setElements( _elements );
	};

	const _dump_elem = ( item: DNDTreeItem ) => {
		if ( item.isFolder ) {
			return <Droppable key={item.id} id={item.id}>
				FOLDER {item.label}
				{item.children && item.children.map( _dump_elem )}
			</Droppable>;
		}

		return <Draggable key={item.id} id={item.id}>
			ITEM {item.label}
		</Draggable>;
	};

	return (
		<>
			<p>{parent}</p>
			<DndContext onDragEnd={handleDragEnd}>
				{elements && elements.map( ( item: DNDTreeItem ) => _dump_elem( item ) )}
				{/*
				{folders.map( ( id ) => (
					// We updated the Droppable component so it would accept an `id`
					// prop and pass it to `useDroppable`
					<Droppable key={id} id={id}>
						{parent === id ? draggableMarkup : 'Drop here'}
					</Droppable>
				) )}
				*/}
			</DndContext>
		</>
	);
};

export default DNDTree;