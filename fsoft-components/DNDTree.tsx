import React, { useState } from 'react';
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

const DNDTree = () => {
	const [ parent, setParent ] = useState( null );
	const folders = [ 'A', 'B', 'C' ];
	const draggableMarkup = (
		<Draggable id="draggable">Drag me</Draggable>
	);

	const handleDragEnd = ( event: any ) => {
		const { over } = event;

		console.log( "==== OVER: ", over );

		// If the item is dropped over a container, set it as the parent
		// otherwise reset the parent to `null`
		setParent( over ? over.id : null );
	};

	return (
		<>
			<p>{parent}</p>
			<DndContext onDragEnd={handleDragEnd}>
				{parent === null ? draggableMarkup : 'Drop here'}

				{folders.map( ( id ) => (
					// We updated the Droppable component so it would accept an `id`
					// prop and pass it to `useDroppable`
					<Droppable key={id} id={id}>
						{parent === id ? draggableMarkup : 'Drop here'}
					</Droppable>
				) )}
			</DndContext>
		</>
	);
};

export default DNDTree;