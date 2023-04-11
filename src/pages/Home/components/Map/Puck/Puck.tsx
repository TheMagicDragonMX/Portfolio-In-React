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

	/**
	 * Fragments are divs that fill corners, each side
	 * has a defined amount of them 
	 */
	const sideWithTwoFragments = { "--amountOfFragments": 2 } as React.CSSProperties
	const sideWithThreeFragments = { "--amountOfFragments": 3 } as React.CSSProperties

	/**
	 * Each fragments must displace to bottom a given
	 * amount of units to fill the corner gap
	 */
	const singleDisplacement = { "--displacement": 1 } as React.CSSProperties
	const doubleDisplacement = { "--displacement": 2 } as React.CSSProperties
	
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
