import React from "react"
import "./Puck.scss"

export interface PuckInterface {
	className?: string
	children: JSX.Element
	
	depth: number
	corner: number
	innerShadow: number
}

const Puck : React.FC<PuckInterface> = ({ className, children, depth, corner, innerShadow }) => {

	/**
	 * Setup CSS variables for the puck
	 */
	const puckStyle = {
		"--puckDepth": depth + "px",
		"--cornerSize": corner + "px",
		"--innerShadow": innerShadow + "px",
	} as React.CSSProperties

	return <>
		<div className={`puck ${ className ?? "" }`} style={ puckStyle }>

			<div className="edge leftwards long top"></div>
			<div className="edge leftwards short top first"></div>
			<div className="edge leftwards short bottom second"></div>
			<div className="edge leftwards short bottom third"></div>

			<div className="edge downwards long left"></div>
			<div className="edge downwards short left first"></div>
			<div className="edge downwards short left second"></div>
			<div className="edge downwards short right third"></div>

			<div className="content">{ children }</div>
		</div>
	</>
}

export default Puck
