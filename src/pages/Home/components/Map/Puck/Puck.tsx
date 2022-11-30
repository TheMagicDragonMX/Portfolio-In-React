import React from "react"
import "./Puck.scss"

export interface PuckInterface {
	image: string
	
	width: number
	height: number
	depth: number
	corner: number
	innerShadow: number
}

const Puck : React.FC<PuckInterface> = ({ image, width, height, depth, corner, innerShadow }) => {

	/**
	 * Setup CSS variables for the puck
	 */
	const puckStyle = {
		"--puckWidth": width + "px",
		"--puckHeight": height + "px",
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
		<div className="puck" style={ puckStyle }>
			<span className="face front">
				<img src={ image } />
			</span>
			<span className="face back"></span>

			<div className="side short left" style={ sideWithThreeFragments } >
				<div className="fragment" style={ singleDisplacement } ></div>
				<div className="filler"></div>
				<div className="fragment" style={ singleDisplacement } ></div>
				<div className="fragment" style={ doubleDisplacement } ></div>
			</div>
			
			<div className="side short right" style={ sideWithTwoFragments } >
				<div className="fragment" style={ singleDisplacement } ></div>
				<div className="filler"></div>
				<div className="fragment" style={ singleDisplacement } ></div>
			</div>
			
			<div className="side long top" style={ sideWithTwoFragments } >
				<div className="fragment" style={ singleDisplacement } ></div>
				<div className="filler"></div>
				<div className="fragment" style={ singleDisplacement } ></div>
			</div>

			<div className="side long bottom" style={ sideWithThreeFragments } >
				<div className="fragment" style={ doubleDisplacement } ></div>
				<div className="fragment" style={ singleDisplacement } ></div>
				<div className="filler"></div>
				<div className="fragment" style={ singleDisplacement } ></div>
			</div>
		</div>
	</>
}

export default Puck
