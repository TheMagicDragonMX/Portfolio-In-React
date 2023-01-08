import React, { useEffect, useRef } from "react"
import "./Home.scss"

import { MapBackground, MapDraggableArea, SparkEnvironment } from "./components"

const SCROLLING_SPEED = 0.05

const Home : React.FC = () => {
	
	const map = useRef<HTMLDivElement>(null)
	const home = useRef<HTMLDivElement>(null)

	const topXScrollLimit = useRef(0)
	const topYScrollLimit = useRef(0)

	const mapXDisplacement = useRef(0)
	const mapXOffset = useRef(0)
	const mapYDisplacement = useRef(0)
	const mapYOffset = useRef(0)
	
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

	function setupScrollingLimits () {
		if (!map.current) return // Prevent null warning
		if (!home.current) return // Prevent null warning

		topXScrollLimit.current = map.current.offsetWidth - home.current.clientWidth
		topYScrollLimit.current = map.current.offsetHeight - home.current.clientHeight
	}

	function setupMapMovementWithMouseWheel () {
		home.current?.addEventListener("wheel", (wheel) => {
			if (wheel.shiftKey)
				mapXOffset.current = Math.max( Math.min(mapXOffset.current + wheel.deltaY, topXScrollLimit.current), 0 )  
			
			else
				mapYOffset.current = Math.max( Math.min(mapYOffset.current + wheel.deltaY, topYScrollLimit.current), 0 )  
		})
	}

	useEffect(() => {
		setupScrollingLimits()
		setupMapMovementWithMouseWheel()

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
