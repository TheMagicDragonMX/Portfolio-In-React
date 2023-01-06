import React from "react"
import "./Home.scss"

import { MapBackground, MapDraggableArea, SparkEnvironment } from "./components"

const Home : React.FC = () => {
	
	return <>
		<div className="home">
			<MapBackground />
			<SparkEnvironment />

			{/* <MapDraggableArea />  */}
		</div>		
	</>
}

export default Home
