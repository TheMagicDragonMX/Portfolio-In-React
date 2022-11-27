import React from "react"
import "./Map.scss"

import { MapBackground } from "./MapBackground"
import { SparkEnvironment } from "./SparkEnvironment"

const Map : React.FC = () => {
	return <>
		<div className="map">
			{/* <MapBackground /> */}
			<SparkEnvironment />
		</div>
	</>
}

export default Map
