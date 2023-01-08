import React from "react"
import "./Home.scss"

import { MapBackground, MapDraggableArea, SparkEnvironment } from "./components"

const Home : React.FC = () => {
	
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
