import React, { useEffect, useRef } from "react"
import "./Home.scss"

import { MapBackground, SparkEnvironment } from "./components"

interface Coord {
	x: number
	y: number
}

const SCROLLING_SPEED = 0.05
const MOUSE_DRAG_SPEED = 1
const TOUCH_DRAG_SPEED = 1

const Home : React.FC = () => {
	
	const map = useRef<HTMLDivElement>(null)
	const home = useRef<HTMLDivElement>(null)

	const scrollingLimits = useRef<Coord>({ x: 0, y: 0 })

	const animatedMapPosition = useRef<Coord>({ x: 0, y: 0 })
	const mapPosition = useRef<Coord>({ x: 0, y: 0 })
	
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
	 * When the user starts dragging the map
	 * 
	 * -An draggingStartedAt is set to know where the user started to 
	 * drag, and... 
	 * 
	 * - Another draggingStartedAt is set to know the position of the map
	 * when the drag started, so calculations can be made
	 */
	function enableMapDragging (startPosition: Coord): void {
		isDragging.current = true
		
		draggingStartedAt.current = startPosition
		mapPositionWasAt.current = mapPosition.current
	}

	/**
	 * When the user drags the map, the map offset gets changed
	 * depending on the total displacement of the mouse
	 */
	function moveMap (mousePosition: Coord, draggingSpeed: number) {
		if (!isDragging.current) return
		
		const displacement: Coord = {
			x: draggingStartedAt.current.x - mousePosition.x,
			y: draggingStartedAt.current.y - mousePosition.y
		}

		mapPosition.current = getCoordInsideScrollingLimits({
			x: mapPositionWasAt.current.x + (displacement.x * draggingSpeed),
			y: mapPositionWasAt.current.y + (displacement.y * draggingSpeed)
		})
	}

	function disableMapDragging () {
		isDragging.current = true
	}

	/**
	 * Allows user to move through the map with their
	 * mouse wheel
	 */
	function setupMapMovementWithMouseWheel () {
		home.current?.addEventListener("wheel", (wheel) => {

			const limitedCoord = getCoordInsideScrollingLimits({
				x: mapPosition.current.x + wheel.deltaY,
				y: mapPosition.current.y + wheel.deltaY
			})

			if (wheel.shiftKey)
				mapPosition.current.x = limitedCoord.x  
			
			else
				mapPosition.current.y = limitedCoord.y  
		})
	}

	/**
	 * Allows user to move through the map by dragging
	 * it with the mouse 
	 */
	function setupMapMovementByMouseDragging () {
		home.current?.addEventListener("mousedown", (mouse) => enableMapDragging({ x: mouse.clientX, y: mouse.clientY }))

		window.addEventListener("mousemove", (mouse) => moveMap({ x: mouse.clientX, y: mouse.clientY }, MOUSE_DRAG_SPEED))
		window.addEventListener("mouseup", () => disableMapDragging())
	}

	/**
	 * Allows user to move through the map by dragging
	 * it with their touchscreen
	 */
	function setupMapMovementByTouchDragging () {
		home.current?.addEventListener("touchstart", (finger) => {
			finger.preventDefault()
			enableMapDragging({ x: finger.touches[0].clientX, y: finger.touches[0].clientY })
		})
		
		window.addEventListener("touchmove", (finger) => moveMap({ x: finger.touches[0].clientX, y: finger.touches[0].clientY }, TOUCH_DRAG_SPEED))
		window.addEventListener("touchend", () => disableMapDragging())
	}

	/**
	 * Keeps track of the offset value, and smoothly moves
	 * the map to fit it's position
	 */
	function doMomentumScrolling() {
		animatedMapPosition.current.x += (mapPosition.current.x - animatedMapPosition.current.x) * SCROLLING_SPEED
		animatedMapPosition.current.y += (mapPosition.current.y - animatedMapPosition.current.y) * SCROLLING_SPEED
  
		const translation = `-${ animatedMapPosition.current.x }px -${ animatedMapPosition.current.y }px`
		map.current?.style.setProperty("translate", translation)
	
		requestAnimationFrame(doMomentumScrolling)
	}

	useEffect(() => {
		setupScrollingLimits()
		
		setupMapMovementWithMouseWheel()
		setupMapMovementByMouseDragging()
		setupMapMovementByTouchDragging()

		doMomentumScrolling()
	}, [])

	return <>
		<div ref={ home } className="home">
			<div ref={ map } className="map">
				<MapBackground />
				<SparkEnvironment />
			</div>
		</div>		
	</>
}

export default Home
