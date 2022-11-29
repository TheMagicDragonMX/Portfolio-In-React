import React, { useEffect, useRef } from "react"
import "./Map.scss"

import { MapBackground } from "./MapBackground"
import { SparkEnvironment } from "./SparkEnvironment"
import { Puck } from "./Puck"

import pfp from "@/assets/pfp-cubes.jpg"

const Map : React.FC = () => {

	const MAX_ZOOM = 3
	const MIN_ZOOM = 1
	
	const map = useRef<HTMLDivElement>(null)
	const scale = useRef(1)
	
	useEffect(() => {
		if (!map.current) return
	
		map.current.style.scale = scale.current + ""
		map.current.addEventListener("wheel", zoom, { passive: false })
	}, [])

	function zoom (this: HTMLDivElement, wheel: WheelEvent) {
		wheel.preventDefault() // Prevent scrolling map with wheel

		const differential = wheel.deltaY / -800
		scale.current = Number(Math.max( Math.min( scale.current + differential, MAX_ZOOM ), MIN_ZOOM ).toFixed(2))
		
		this.style.scale = scale.current + ""
	}

	return <>
		<div className="map-margin">
			<div ref={ map } className="map">
				<MapBackground />
				{/* <SparkEnvironment /> */}

				<Puck 
					image={ pfp }
					width={ 300 } 
					height={ 200 } 
					depth={ 30 } 
					corner={ 20 } />	
			</div>
		</div>
	</>
}

export default Map
