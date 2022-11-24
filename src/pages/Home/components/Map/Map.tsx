import React from "react"
import "./Map.scss"

import { MapBackground } from "./MapBackground"
import { SparkRain } from "./SparkRain"

const Map : React.FC = () => {
	return <>
		<div className="map">
			<MapBackground />
			<SparkRain />

		</div>
	</>
}

export default Map
