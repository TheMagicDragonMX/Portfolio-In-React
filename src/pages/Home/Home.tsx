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
const MOUSE_DRAG_SPEED = 1.5
const TOUCH_DRAG_SPEED = 1

/**
 * Properties that control the maximum and minimum values 
 * for the zoom
 */
const MAX_ZOOM = 3
const MIN_ZOOM = 0.3
const NORMAL_ZOOM = 1

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
	function moveMapWithMouseWheel ({ deltaY: wheelMovement, shiftKey, ctrlKey }: WheelEvent) {
		if (ctrlKey) return // Pressing CTRL activates zoom

		const limitedCoord = getCoordInsideScrollingLimits({
			x: mapPosition.current.x + wheelMovement,
			y: mapPosition.current.y + wheelMovement
		})

		if (shiftKey) // With SHIFT: Moves horizontally, otherwise vertically
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

		// Adjust content container at first render
		const contentContainer = contentArea.current?.parentElement
		if (!contentContainer) return

		contentContainer.style.width = contentArea.current.clientWidth + "px"
		contentContainer.style.height = contentArea.current.clientHeight + "px"
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

		if (!wheel.ctrlKey) return // Activate only if CTRL key is pressed
		if (!contentArea.current) return
		if (!map.current) return
		if (!home.current) return
		
		// Calculate new zoom
		const differential = wheel.deltaY / -800 // -800 lowers the value of deltaY, being negative helps with the intuitive "up" to zoom in, "down" to zoom out
		zoom.current = Number(Math.max( Math.min( zoom.current + differential, MAX_ZOOM ), MIN_ZOOM ).toFixed(2))

		// Calculare new sizes of container
		const newContainerWidth = contentArea.current.clientWidth * zoom.current
		const newContainerHeight = contentArea.current.clientHeight * zoom.current		

		// Update scrolling limits as the container takes a while to adjust its new size (it's animated)
		const previousContentWidth = contentArea.current.getBoundingClientRect().width
		const previousContentHeight = contentArea.current.getBoundingClientRect().height

		scrollingLimits.current = {
			x: (map.current.offsetWidth - previousContentWidth + newContainerWidth) - home.current.clientWidth,
			y: (map.current.offsetHeight - previousContentHeight + newContainerHeight) - home.current.clientHeight
		}

		// Move map in case zooming made it go out of bounds
		mapPosition.current = getCoordInsideScrollingLimits({
			x: mapPosition.current.x,
			y: mapPosition.current.y
		})

		// Apply new changes
		contentArea.current.style.scale = zoom.current + ""

		const contentContainer = contentArea.current.parentElement

		if (!contentContainer) return
		contentContainer.style.width = newContainerWidth + "px"
		contentContainer.style.height = newContainerHeight + "px"
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
