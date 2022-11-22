/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable react/no-unknown-property */

import React from "react"
import "./MapBackground.scss"

import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"

import { Box } from "./Box"
import { SinglePointLight } from "./PointLight"

const MapBackground : React.FC = () => {

	return <>
		<Canvas>
			<color attach="background" args={[ "black" ]} />

			<gridHelper />
			<OrbitControls />

			<ambientLight color="white" intensity={ 0.2 } />
			<SinglePointLight />

			<Box />

		</Canvas>
	</>
}

export default MapBackground
