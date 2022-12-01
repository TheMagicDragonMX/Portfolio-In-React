import React, { useEffect, useRef } from "react"
import "./Map.scss"

import { MapBackground } from "./MapBackground"
import { SparkEnvironment } from "./SparkEnvironment"
import { Puck } from "./Puck"

import pfp from "@/assets/pixelated_cubes_pfp.png"

const Map : React.FC = () => {

	/**
	 * Control the maximum and minimum values 
	 * for the zoom
	 */
	const MAX_ZOOM = 3
	const MIN_ZOOM = 1
	const NORMAL_ZOOM = 1
	
	/**
	 * Keeps track of the HTML element that contains
	 * the map
	 */
	const map = useRef<HTMLDivElement>(null)

	/**
	 * Keeps track of the amount of zoom that
	 * the user currently has
	 */
	const zoom = useRef(NORMAL_ZOOM)
	
	/**
	 * Once the map element renders, give it the
	 * listener that changes the zoom when the wheel
	 * is rotated
	 */
	useEffect(() => {
		if (!map.current) return
	
		// map.current.style.scale = zoom.current + ""
		map.current.addEventListener("wheel", changeZoom, { passive: false })
	}, [])

	/**
	 * Depending on the amount of distance that the wheel
	 * moved, scales the map accordingly.
	 * 
	 * Wheel down to zoom out
	 * Wheel up to zoom in
	 */
	function changeZoom (this: HTMLDivElement, wheel: WheelEvent) {
		wheel.preventDefault() // Prevent scrolling map with wheel

		const differential = wheel.deltaY / -800
		zoom.current = Number(Math.max( Math.min( zoom.current + differential, MAX_ZOOM ), MIN_ZOOM ).toFixed(2))

		this.style.scale = zoom.current + ""
	}

	return <>
		<div ref={ map } className="map-margin">
			<div className="map">
				{/* <MapBackground /> */}
				{/* <SparkEnvironment /> */}

				<div className="puck-area">
					<Puck 
						depth={ 10 } 
						corner={ 30 }
						innerShadow={ 5 }><img className="profile-pic" src={ pfp } alt="Profile Pic" /></Puck>

					<Puck
						depth={ 10 } 
						corner={ 10 }
						innerShadow={ 5 }><h2 className="topic">Technologies</h2></Puck>

				</div>
			</div>
		</div>
	</>
}

export default Map
