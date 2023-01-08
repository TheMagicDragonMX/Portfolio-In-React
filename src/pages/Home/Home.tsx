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

	const topXScrollLimit = useRef(0)
	const topYScrollLimit = useRef(0)

	const mapXDisplacement = useRef(0)
	const mapXOffset = useRef(0)
	const mapYDisplacement = useRef(0)
	const mapYOffset = useRef(0)
	
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

		topXScrollLimit.current = map.current.offsetWidth - home.current.clientWidth
		topYScrollLimit.current = map.current.offsetHeight - home.current.clientHeight
	}

	/**
	 * Allows user to move through the map with their
	 * mouse wheel
	 */
	function setupMapMovementWithMouseWheel () {
		home.current?.addEventListener("wheel", (wheel) => {
			if (wheel.shiftKey)
				mapXOffset.current = Math.max( Math.min(mapXOffset.current + wheel.deltaY, topXScrollLimit.current), 0 )  
			
			else
				mapYOffset.current = Math.max( Math.min(mapYOffset.current + wheel.deltaY, topYScrollLimit.current), 0 )  
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
			
			starterOffset.current = {
				x: mapXOffset.current,
				y: mapYOffset.current
			}
		})
		
		window.addEventListener("mousemove", (mouse) => {
			if (!userIsDragging.current) return
		
			const displacement: Coord = {
				x: dragPoint.current.x - mouse.clientX,
				y: dragPoint.current.y - mouse.clientY
			}

			mapXOffset.current = Math.max( Math.min(starterOffset.current.x + displacement.x * MOUSE_DRAG_SPEED, topXScrollLimit.current), 0 )  
			mapYOffset.current = Math.max( Math.min(starterOffset.current.y + displacement.y * MOUSE_DRAG_SPEED, topYScrollLimit.current), 0 )  
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
			
			starterOffset.current = {
				x: mapXOffset.current,
				y: mapYOffset.current
			}
		})
		
		window.addEventListener("touchmove", (finger) => {
			if (!userIsDragging.current) return
		
			const displacement: Coord = {
				x: dragPoint.current.x - finger.touches[0].clientX,
				y: dragPoint.current.y - finger.touches[0].clientY
			}

			mapXOffset.current = Math.max( Math.min(starterOffset.current.x + displacement.x * TOUCH_DRAG_SPEED, topXScrollLimit.current), 0 )  
			mapYOffset.current = Math.max( Math.min(starterOffset.current.y + displacement.y * TOUCH_DRAG_SPEED, topYScrollLimit.current), 0 )  
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
		mapXDisplacement.current += (mapXOffset.current - mapXDisplacement.current) * SCROLLING_SPEED
		mapYDisplacement.current += (mapYOffset.current - mapYDisplacement.current) * SCROLLING_SPEED
  
		const translation = `-${ mapXDisplacement.current }px -${ mapYDisplacement.current }px`
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
