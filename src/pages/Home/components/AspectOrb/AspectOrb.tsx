import React from "react"
import "./AspectOrb.scss"

export interface AspectOrbInterface {
	firstColor: string;
	secondColor: string;
	
	children?: React.ReactNode;

	onClick: () => void;
}

const AspectOrb : React.FC<AspectOrbInterface> = ({ firstColor, secondColor, children, onClick }) => {

	const aspectOrbStyle = {
		"--firstColor": firstColor,
		"--secondColor": secondColor,
	} as React.CSSProperties

	return (
		<div className="aspect-orb" style={ aspectOrbStyle } onClick={ onClick } >
			<span className="aspect-orb-content">{ children }</span>
		</div>
	)
}

export default AspectOrb
