import React, { useRef } from "react"
import "./Home.scss"

import { MapBackground, MapDraggableArea, SparkEnvironment } from "./components"

const SCROLLING_SPEED = 0.05

const Home : React.FC = () => {
	
	const map = useRef<HTMLDivElement>(null)
	const mapDisplacement = useRef(0)
	const mapOffset = useRef(0)
	

	return <>
		<div className="home">
			<div className="map">
				<MapBackground />
				<SparkEnvironment />
			</div>
		</div>		
	</>
}

export default Home
