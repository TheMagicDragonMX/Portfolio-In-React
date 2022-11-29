import React, { useRef } from "react"
import "./MapDraggableArea.scss"

import { Map } from "../Map"

export interface Coord {
	x: number
	y: number
}

interface DragPoint {
	mouse: Coord
	area: Coord
}

const MapDraggableArea : React.FC = () => {

	/**
	 * Keeps track of the draggable area container
	 */
	const area = useRef<HTMLDivElement>(null)
	
	/**
	 * Keeps track of the position of the mouse when
	 * the user started to drag the area
	 */
	const draggingPoint = useRef<DragPoint>({
		mouse: { x: 0, y: 0 },
		area: { x: 0, y: 0 }
	})

	/**
	 * Sets the starting point to know how much the
	 * user is moving its mouse, and the mouse events 
	 * so the user can drag the container
	 */
	function enableDragging (mouse: React.MouseEvent) {
		if (!area.current) return // Prevent null warning

		draggingPoint.current = { 
			mouse: { x: mouse.clientX, y: mouse.clientY }, 
			area: { x: area.current.scrollLeft, y: area.current.scrollTop } 
		}

		document.addEventListener("mousemove", drag)
		document.addEventListener("mouseup", stopMapDragging)
	}

	/**
	 * Updates the scroll position of the container
	 * depending on the mouse position 
	 */
	function drag (mouse: MouseEvent) {
		if (!area.current) return // Prevent null warning

		const xDisplacement = mouse.clientX - draggingPoint.current.mouse.x
		const yDisplacement = mouse.clientY - draggingPoint.current.mouse.y

		area.current.scrollTo({
			top: draggingPoint.current.area.y - yDisplacement,
			left: draggingPoint.current.area.x - xDisplacement
		})
	}

	/**
	 * Disables area dragging once the user stops
	 * clicking a mouse button
	 */
	function stopMapDragging () {
		document.removeEventListener("mousemove", drag)
		document.removeEventListener("mouseup", stopMapDragging)
	}

	return <>
		<div
			ref={ area } 
			className="area"
			onMouseDown={ e => enableDragging(e) } >
			
			<Map />
		</div>
	</>
}

export default MapDraggableArea
