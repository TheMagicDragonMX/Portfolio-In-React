import React, { useEffect, useRef } from "react"
import "./Home.scss"

import { MapBackground, MapDraggableArea, SparkEnvironment } from "./components"

const SCROLLING_SPEED = 0.05

const Home : React.FC = () => {
	
	const map = useRef<HTMLDivElement>(null)
	const mapDisplacement = useRef(0)
	const mapOffset = useRef(0)
	
	function doMomentumScrolling() {
		mapDisplacement.current += (mapOffset.current - mapDisplacement.current) * SCROLLING_SPEED
  
		const translation = `0px -${ mapDisplacement.current }px`
		map.current?.style.setProperty("translate", translation)
	
		requestAnimationFrame(doMomentumScrolling)
	}

	useEffect(() => {
		doMomentumScrolling()
	}, [])

	return <>
		<div className="home">
			<div ref={ map } className="map">
				<MapBackground />
				<SparkEnvironment />
			</div>
		</div>		
	</>
}

export default Home
