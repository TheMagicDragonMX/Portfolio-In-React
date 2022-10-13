import React from "react"
import "./SpinningWheelElement.scss"

export interface SpinningWheelElementInterface {
	position: number;

	className?: string;
	children?: React.ReactNode;
}

const SpinningWheelElement : React.FC<SpinningWheelElementInterface> = ({ position, className, children }) => {

	const spinningWheelElementOffsetStyle = { 
		"--position": position,
	} as React.CSSProperties
	
	return (
		<div className={`spinning-wheel-element-offset ${ className ?? "" }`} style={ spinningWheelElementOffsetStyle }>
			<div className="spinning-wheel-element">
				{ children }
			</div>
		</div>
	)
}

export default SpinningWheelElement
