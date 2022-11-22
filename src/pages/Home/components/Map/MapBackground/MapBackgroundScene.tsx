/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable react/no-unknown-property */

import React, { useRef } from "react"

import { PointLight, PointLightHelper } from "three"
import { useHelper } from "@react-three/drei"

const MapBackgroundScene : React.FC = () => {

	const pointLight = useRef<PointLight>(null!)
	useHelper(pointLight, PointLightHelper, 0.5, "cyan")

	return <>
		<ambientLight color="white" intensity={ 0.2 } />
		<pointLight ref={ pointLight } color="white" position={[ 5, 5, 5 ]} />

		<mesh>
			<boxGeometry />
			<meshStandardMaterial wireframe />
		</mesh>
	</>
}

export default MapBackgroundScene
