import React from "react"
import "./Map.scss"

import { MapBackground } from "./MapBackground"
import { Puck } from "./Puck"
import { SparkEnvironment } from "./SparkEnvironment"

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
