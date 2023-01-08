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

	const mapDisplacement = useRef<Coord>({ x: 0, y: 0 })
	const mapOffset = useRef<Coord>({ x: 0, y: 0 })
	
	const userIsDragging = useRef(false)
	const dragPoint = useRef<Coord>({ x: 0, y: 0 })
	const starterOffset = useRef<Coord>({ x: 0, y: 0 })
	
	/**
	 * Establishes when the map div should stop moving
	 * 
	 * The map container moves by changing it's "translate"
	 * property, which must have a limit, otherwise the div
	 * could move outside the window
	 */
	function setupScrollingLimits () {
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
	function getCoordInsideScrollingLimits (coord: Coord) {
		return { 
			x: Math.max( Math.min(coord.x, scrollingLimits.current.x), 0 ),
			y: Math.max( Math.min(coord.y, scrollingLimits.current.y), 0 ),
		}
	}

	/**
	 * Allows user to move through the map with their
	 * mouse wheel
	 */
	function setupMapMovementWithMouseWheel () {
		home.current?.addEventListener("wheel", (wheel) => {

			const limitedCoord = getCoordInsideScrollingLimits({
				x: mapOffset.current.x + wheel.deltaY,
				y: mapOffset.current.y + wheel.deltaY
			})

			if (wheel.shiftKey)
				mapOffset.current.x = limitedCoord.x  
			
			else
				mapOffset.current.y = limitedCoord.y  
		})
	}

	/**
	 * Allows user to move through the map by dragging
	 * it with the mouse 
	 */
	function setupMapMovementByMouseDragging () {
		home.current?.addEventListener("mousedown", (mouse) => {
			userIsDragging.current = true
		
			dragPoint.current = {
				x: mouse.clientX,
				y: mouse.clientY
			}
			
			starterOffset.current = mapOffset.current
		})
		
		window.addEventListener("mousemove", (mouse) => {
			if (!userIsDragging.current) return
		
			const displacement: Coord = {
				x: dragPoint.current.x - mouse.clientX,
				y: dragPoint.current.y - mouse.clientY
			}

			mapOffset.current = getCoordInsideScrollingLimits({
				x: starterOffset.current.x + displacement.x * MOUSE_DRAG_SPEED,
				y: starterOffset.current.y + displacement.y * MOUSE_DRAG_SPEED
			})
		})
		
		window.addEventListener("mouseup", () => {
			userIsDragging.current = false
		})
	}

	/**
	 * Allows user to move through the map by dragging
	 * it with their touchscreen
	 */
	function setupMapMovementByTouchDragging () {
		home.current?.addEventListener("touchstart", (finger) => {
			finger.preventDefault()
			userIsDragging.current = true
		
			dragPoint.current = {
				x: finger.touches[0].clientX,
				y: finger.touches[0].clientY
			}
			
			starterOffset.current = mapOffset.current
		})
		
		window.addEventListener("touchmove", (finger) => {
			if (!userIsDragging.current) return
		
			const displacement: Coord = {
				x: dragPoint.current.x - finger.touches[0].clientX,
				y: dragPoint.current.y - finger.touches[0].clientY
			}

			mapOffset.current = getCoordInsideScrollingLimits({
				x: starterOffset.current.x + displacement.x * TOUCH_DRAG_SPEED,
				y: starterOffset.current.y + displacement.y * TOUCH_DRAG_SPEED
			})
		})
		
		window.addEventListener("touchend", () => {
			userIsDragging.current = false
		})
	}

	/**
	 * Keeps track of the offset value, and smoothly moves
	 * the map to fit it's position
	 */
	function doMomentumScrolling() {
		mapDisplacement.current.x += (mapOffset.current.x - mapDisplacement.current.x) * SCROLLING_SPEED
		mapDisplacement.current.y += (mapOffset.current.y - mapDisplacement.current.y) * SCROLLING_SPEED
  
		const translation = `-${ mapDisplacement.current.x }px -${ mapDisplacement.current.y }px`
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
