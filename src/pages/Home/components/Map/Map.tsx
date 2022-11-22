/* eslint-disable react/no-unknown-property */

import React from "react"
import "./Map.scss"

import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"

import { MapBackgroundScene } from "./MapBackground"

const Map : React.FC = () => {
	return <>
		<div className="map">
			<Canvas>
				<gridHelper />
				<OrbitControls />

				<color attach="background" args={[ "black" ]} />
				
				<MapBackgroundScene />
			</Canvas>
		</div>
	</>
}

export default Map
