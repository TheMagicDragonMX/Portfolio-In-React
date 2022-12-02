import React from "react"
import "./Home.scss"

import { MapBackground, MapDraggableArea, Menu, SparkEnvironment } from "./components"

const Home : React.FC = () => {
	
	return <>
		<div className="home">
			<MapBackground />
			<SparkEnvironment />

			{/* <Menu /> */}
			{/* <MapDraggableArea />  */}
		</div>		
	</>
}

export default Home
