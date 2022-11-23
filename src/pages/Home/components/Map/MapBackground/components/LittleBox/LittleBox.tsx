/* eslint-disable react/no-unknown-property */
import React from "react"

interface LittleBoxInterface {
	x: number
	y: number
	z: number
}

const LittleBox : React.FC<LittleBoxInterface> = ({ x, y, z }) => {

	return <>
		<mesh receiveShadow position={[ x, y, z ]} >
			<boxGeometry args={[ 0.1, 0.1, 0.1 ]} />
			<meshStandardMaterial />
		</mesh>
	</>
}

export default LittleBox
