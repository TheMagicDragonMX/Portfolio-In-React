/* eslint-disable react/no-unknown-property */

import React from "react"
import "./Map.scss"

import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"

import { MapBackground } from "./MapBackground"

const Map : React.FC = () => {
	return <>
		<div className="map">
			<MapBackground />
		</div>
	</>
}

export default Map
