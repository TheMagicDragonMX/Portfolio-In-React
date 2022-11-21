import React, { useRef } from "react"
import "./Map.scss"

export interface MapInterface {
	children?: React.ReactNode
}

interface Coord {
	x: number
	y: number
}

interface DragPoint {
	mouse: Coord
	map: Coord
}

const Map : React.FC<MapInterface> = ({ children }) => {

	/**
	 * Keeps track of the draggable map container
	 */
	const map = useRef<HTMLDivElement>(null)
	
	/**
	 * Keeps track of the position of the mouse when
	 * the user started to drag the map
	 */
	const draggingPoint = useRef<DragPoint>({
		mouse: { x: 0, y: 0 },
		map: { x: 0, y: 0 }
	})

	/**
	 * Sets the starting point to know how much the
	 * user is moving its mouse, and the mouse events 
	 * so the user can drag the container
	 */
	function enableDragging (mouse: React.MouseEvent) {
		if (!map.current) return // Prevent null warning

		draggingPoint.current = { 
			mouse: { x: mouse.clientX, y: mouse.clientY }, 
			map: { x: map.current.scrollLeft, y: map.current.scrollTop } 
		}

		document.addEventListener("mousemove", drag)
		document.addEventListener("mouseup", stopMapDragging)
	}

	/**
	 * Updates the scroll position of the container
	 * depending on the mouse position 
	 */
	function drag (mouse: MouseEvent) {
		if (!map.current) return // Prevent null warning

		const xDisplacement = mouse.clientX - draggingPoint.current.mouse.x
		const yDisplacement = mouse.clientY - draggingPoint.current.mouse.y

		map.current.scrollTo({
			top: draggingPoint.current.map.y - yDisplacement,
			left: draggingPoint.current.map.x - xDisplacement
		})
	}

	/**
	 * Disables map dragging once the user stops
	 * clicking a mouse button
	 */
	function stopMapDragging () {
		document.removeEventListener("mousemove", drag)
		document.removeEventListener("mouseup", stopMapDragging)
	}

	return <>
		<div
			ref={ map } 
			className="map"
			onMouseDown={ e => enableDragging(e) } >
				
			{ children }
		</div>
	</>
}

export default Map
