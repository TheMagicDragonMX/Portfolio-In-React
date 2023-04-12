import React, { useEffect, useRef } from "react"
import "./Home.scss"

import { MapContent, MapBackground, SparkEnvironment } from "./components"

interface Coord {
	x: number
	y: number
}

/**
 * Properties that control the behavior of the map
 * movement
 * 
 * MOMENTUM_SCROLLING_SPEED:
 * How much it will take for the map to get to
 * the established position
 * 
 * MOUSE_DRAG_SPEED & TOUCH_DRAG_SPEED:
 * Both control how fast the user can drag the map
 * with the mouse or with a touchscreen
 */
const MOMENTUM_SCROLLING_SPEED = 0.05
const MOUSE_DRAG_SPEED = 1
const TOUCH_DRAG_SPEED = 1

const Home : React.FC = () => {
	
	/**
	 * Keeps track of the HTML element for the container of the map
	 */
	const home = useRef<HTMLDivElement>(null)

	/**
	 * Keeps track of the HTML element for the map, which moves
	 */
	const map = useRef<HTMLDivElement>(null)

	/**
	 * Keeps track of the HTML element for the content of the map, 
	 * this ref will be forwarded 
	 */
	const contentArea = useRef<HTMLDivElement>(null)

	/**
	 * Control the maximum and minimum values 
	 * for the zoom
	 */
	const MAX_ZOOM = 2
	const MIN_ZOOM = 0.5
	const NORMAL_ZOOM = 1
	
	/**
	 * Keeps track of the amount of zoom that
	 * the user currently has
	 */
	const zoom = useRef(NORMAL_ZOOM)

	/**
	 * The map moves by modifying it's translate property,
	 * this keeps the limits of it (in both axis) to prevent 
	 * infinite translation
	 */
	const scrollingLimits = useRef<Coord>({ x: 0, y: 0 })

	/**
	 * Both keep track of the map's position.
	 * 
	 * "mapPosition" is the objective, "animatedMapPosition" slowly
	 * approaches to it
	 */
	const animatedMapPosition = useRef<Coord>({ x: 0, y: 0 })
	const mapPosition = useRef<Coord>({ x: 0, y: 0 })
	
	/**
	 * These help controlling how the map moves when being dragged
	 * 
	 * - "isDragging" tells if the user is or isn't dragging the map
	 * 
	 * The other two keep track of the coords where the user started 
	 * to drag:
	 * 
	 * "draggingStartedAt" determines where the mouse || finger || pen was
	 *  "mapPositionWasAt" tells where the map was 
	 */
	const isDragging = useRef(false)
	const draggingStartedAt = useRef<Coord>({ x: 0, y: 0 })
	const mapPositionWasAt = useRef<Coord>({ x: 0, y: 0 })
	
	/**
	 * Establishes when the map div should stop moving
	 * 
	 * The map container moves by changing it's "translate"
	 * property, which must have a limit, otherwise the div
	 * could move outside the window
	 */
	function setupScrollingLimits (): void {
		if (!map.current) return // Prevent null warning
		if (!home.current) return // Prevent null warning

		scrollingLimits.current = {
			x: map.current.offsetWidth - home.current.clientWidth,
			y: map.current.offsetHeight - home.current.clientHeight
		}
	}

	/**
	 * Returns a coord that is limited by the calculated scrolling
	 * limits, x and y values will be coerced if they exceed them
	 */
	function getCoordInsideScrollingLimits (coord: Coord): Coord {
		return { 
			x: Math.max( Math.min(coord.x, scrollingLimits.current.x), 0 ),
			y: Math.max( Math.min(coord.y, scrollingLimits.current.y), 0 ),
		}
	}

	/**
	 * When the user starts dragging the map, saves the positions 
	 * of the map and the mouse
	 * 
	 * In touchscreens, we prevent the page to start scrolling
	 */
	function savePositionsAndEnableDragging (event: TouchEvent | MouseEvent): void {
		if (window.TouchEvent && (event instanceof TouchEvent)) // Prevent scrolling page on touchscreens
			event.preventDefault()

		// Getting the mouse position varies depending on wether the mouse or a touchscreen triggered the event
		const startPoint: Coord = (event instanceof MouseEvent)
			? { x: event.clientX, y: event.clientY }
			: { x: event.touches[0].clientX, y: event.touches[0].clientY }
		
		draggingStartedAt.current = startPoint
		mapPositionWasAt.current = mapPosition.current
		
		isDragging.current = true
	}

	/**
	 * When the user drags the map, the map's position gets changed
	 * depending on the total displacement of the mouse
	 */
	function moveMap (event: TouchEvent | MouseEvent): void {
		if (!isDragging.current) return // Map only moves when it is actually being dragged
		
		const mouseCurrentPosition: Coord = (event instanceof MouseEvent)
			? { x: event.clientX, y: event.clientY }
			: { x: event.touches[0].clientX, y: event.touches[0].clientY }

		const draggingSpeed = (event instanceof MouseEvent) ? MOUSE_DRAG_SPEED : TOUCH_DRAG_SPEED

		const mouseDisplacement: Coord = {
			x: draggingStartedAt.current.x - mouseCurrentPosition.x,
			y: draggingStartedAt.current.y - mouseCurrentPosition.y
		}

		mapPosition.current = getCoordInsideScrollingLimits({
			x: mapPositionWasAt.current.x + (mouseDisplacement.x * draggingSpeed),
			y: mapPositionWasAt.current.y + (mouseDisplacement.y * draggingSpeed)
		})
	}

	/**
	 * The map stops moving as soon as the user releases the mouse
	 */
	function disableMapDragging (): void {
		isDragging.current = false
	}

	/**
	 * When the user rotates the mouse wheel, the map moves vertically
	 * or horizontally if the shift key was pressed
	 */
	function moveMapWithMouseWheel ({ deltaY: wheelMovement, shiftKey }: WheelEvent) {
		const limitedCoord = getCoordInsideScrollingLimits({
			x: mapPosition.current.x + wheelMovement,
			y: mapPosition.current.y + wheelMovement
		})

		if (shiftKey)
			mapPosition.current.x = limitedCoord.x  
		
		else
			mapPosition.current.y = limitedCoord.y  
	}

	/**
	 * Allows user to move through the map with their
	 * mouse wheel
	 */
	function setupMapMovementWithMouseWheel (): void {
		home.current?.addEventListener("wheel", moveMapWithMouseWheel)
	}

	/**
	 * Allows user to move through the map by dragging
	 * it with the mouse 
	 */
	function setupMapMovementByMouseDragging (): void {
		home.current?.addEventListener("mousedown", savePositionsAndEnableDragging)
		window.addEventListener("mousemove", moveMap)
		window.addEventListener("mouseup", disableMapDragging)
	}

	/**
	 * Allows user to move through the map by dragging
	 * it with their touchscreen
	 */
	function setupMapMovementByTouchDragging (): void {
		home.current?.addEventListener("touchstart", savePositionsAndEnableDragging)
		window.addEventListener("touchmove", moveMap)
		window.addEventListener("touchend", disableMapDragging)
	}

	/**
	 * Allows user to zoom in and out the map
	 */
	function setupMapZooming (): void {
		home.current?.addEventListener("wheel", changeZoom, { passive: false })
	}

	/**
	 * Keeps track of the offset value, and smoothly moves
	 * the map to fit it's position
	 */
	function doMomentumScrolling (): void {
		animatedMapPosition.current.x += (mapPosition.current.x - animatedMapPosition.current.x) * MOMENTUM_SCROLLING_SPEED
		animatedMapPosition.current.y += (mapPosition.current.y - animatedMapPosition.current.y) * MOMENTUM_SCROLLING_SPEED
  
		const translation = `-${ animatedMapPosition.current.x }px -${ animatedMapPosition.current.y }px`
		map.current?.style.setProperty("translate", translation)
	
		requestAnimationFrame(doMomentumScrolling)
	}

	/**
	 * Depending on the amount of distance that the wheel
	 * moved, scales the map accordingly.
	 * 
	 * Wheel down to zoom out
	 * Wheel up to zoom in
	 */
	function changeZoom (this: HTMLDivElement, wheel: WheelEvent) {
		wheel.preventDefault() // Prevent scrolling map with wheel

		if (!contentArea.current) return
		if (!map.current) return
		if (!home.current) return
		
		// Calculate and apply the new zoom
		const differential = wheel.deltaY / -800
		zoom.current = Number(Math.max( Math.min( zoom.current + differential, MAX_ZOOM ), MIN_ZOOM ).toFixed(2))
		contentArea.current.style.scale = zoom.current + ""

		// Change map sizes to fit the new zoomed (scaled) element
		// If content is fully viewable, a set size for the map is set
		const newWidth = contentArea.current.clientWidth * zoom.current
		const newHeight = contentArea.current.clientHeight * zoom.current

		map.current.style.width = newWidth + "px"
		map.current.style.height = newHeight + "px"

		if (home.current.clientWidth > newWidth)
			map.current.style.width = "1300px"
		
		if (home.current.clientHeight > newHeight)
			map.current.style.height = "750px"		

		setupScrollingLimits()
	}

	/**
	 * Once the element renders, enables map movement, dragging and
	 * momentum scrolling
	 */
	useEffect(() => {

		// Initializing limits for map dragging
		setupScrollingLimits()
		window.onresize = setupScrollingLimits
		
		// Initializing map dragging in multiple ways
		setupMapMovementWithMouseWheel()
		setupMapMovementByMouseDragging()
		setupMapMovementByTouchDragging()

		// Starts momentum scrolling
		doMomentumScrolling()

		// Initializing zoom event
		setupMapZooming()

		return removeEventListeners
	}, [])

	/**
	 * When the user leaves, event listeners that were used to
	 * move and drag the map are removed 
	 */
	function removeEventListeners (): void {
		home.current?.removeEventListener("wheel", moveMapWithMouseWheel)

		home.current?.removeEventListener("mousedown", savePositionsAndEnableDragging)
		window.removeEventListener("mousemove", moveMap)
		window.removeEventListener("mouseup", disableMapDragging)

		home.current?.removeEventListener("touchstart", savePositionsAndEnableDragging)
		window.removeEventListener("touchmove", moveMap)
		window.removeEventListener("touchend", disableMapDragging)

		home.current?.removeEventListener("wheel", changeZoom)
	}

	return <>
		<div ref={ home } className="home">
			<div ref={ map } className="map">
				{/* <MapBackground /> */}
				{/* <SparkEnvironment /> */}
				
				<MapContent ref={ contentArea } />
			</div>
		</div>		
	</>
}

export default Home
