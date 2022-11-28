import React from "react"
import "./Map.scss"

import { MapBackground } from "./MapBackground"
import { SparkEnvironment } from "./SparkEnvironment"
import { Puck } from "./Puck"

const Map : React.FC = () => {
	return <>
		<div className="map">
			{/* <MapBackground /> */}
			{/* <SparkEnvironment /> */}

			<Puck />	
		</div>
	</>
}

export default Map
