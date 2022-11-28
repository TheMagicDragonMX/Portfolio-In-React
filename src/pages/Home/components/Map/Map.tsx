import React from "react"
import "./Map.scss"

import { MapBackground } from "./MapBackground"
import { SparkEnvironment } from "./SparkEnvironment"
import { Puck } from "./Puck"

import pfp from "@/assets/pfp-cubes.jpg"

const Map : React.FC = () => {
	return <>
		<div className="map">
			{/* <MapBackground /> */}
			{/* <SparkEnvironment /> */}

			<Puck 
				image={ pfp }
				width={ 300 } 
				height={ 200 } 
				depth={ 30 } 
				corner={ 20 } />	
		</div>
	</>
}

export default Map
