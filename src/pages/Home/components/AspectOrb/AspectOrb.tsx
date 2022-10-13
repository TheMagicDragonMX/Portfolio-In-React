import React from "react"
import "./AspectOrb.scss"

export interface AspectOrbInterface {
	firstColor: string;
	secondColor: string;
	
	children?: React.ReactNode;
}

const AspectOrb : React.FC<AspectOrbInterface> = ({ firstColor, secondColor, children }) => {

	const aspectOrbStyle = {
		"--firstColor": firstColor,
		"--secondColor": secondColor,
	} as React.CSSProperties

	return (
		<div className="aspect-orb" style={ aspectOrbStyle } >
			<span className="aspect-orb-content">{ children }</span>
		</div>
	)
}

export default AspectOrb
