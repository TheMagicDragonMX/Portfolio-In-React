/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable react/no-unknown-property */

import React, { useEffect, useRef } from "react"

import { PointLight, PointLightHelper } from "three"
import { useHelper } from "@react-three/drei"
import { LittleBox } from "./components/LittleBox"

interface SceneCoord {
	x: number
	y: number
	z: number
}

const MapBackgroundScene : React.FC = () => {

	const pointLight = useRef<PointLight>(null!)
	useHelper(pointLight, PointLightHelper, 0.5, "blue")

	const secondPointLight = useRef<PointLight>(null!)
	useHelper(secondPointLight, PointLightHelper, 0.5, "white")

	const boxes: Array<SceneCoord> = []
	const columns = 30
	const rows = 30

	for (let column = 0; column < columns; column++)
		for (let row = 0; row < rows; row++)
			boxes.push({ 
				x: (column - columns / 2) / 10, 
				y: Math.random() / 10, 
				z: (row - rows / 2) / 10
			})	

	return <>
		<ambientLight 
			color="lightblue" 
			intensity={ 0.1 } />

		{/* <pointLight 
			ref={ pointLight } 
			castShadow
			color="blue"
			intensity={ 0.4 } 
			decay={ 2 }
			position={[ 0, 2, -2 ]} /> */}

		<pointLight 
			ref={ secondPointLight } 
			castShadow
			color="white"
			decay={ 2 }
			intensity={ 0.5 } 
			position={[ 0, 0.5, 0 ]} />

		{ boxes.map( (box, key) => <LittleBox key={ key } x={ box.x } y={ box.y } z={ box.z } /> ) }
	</>
}

export default MapBackgroundScene
