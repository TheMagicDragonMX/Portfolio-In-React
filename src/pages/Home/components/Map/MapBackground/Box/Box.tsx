/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable react/no-unknown-property */

import React, { useRef } from "react"

import { BoxHelper, Mesh } from "three"
import { useHelper } from "@react-three/drei"

const Box : React.FC = () => {
	
	const box = useRef<Mesh>(null!)
	useHelper(box, BoxHelper, "cyan")
	
	return <>
		<mesh ref={ box }>
			<boxGeometry />
			<meshStandardMaterial wireframe />
		</mesh>
	</>
}

export default Box