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
			{/* <div className="face front"></div> */}
			{/* <div className="face back"></div> */}

			{/* <div className="side short left" style={ sideWithThreeFragments } >
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
			</div> */}

			<div className="edge leftwards long top"></div>
			<div className="edge leftwards short top first"></div>
			<div className="edge leftwards short bottom second"></div>
			<div className="edge leftwards short bottom third"></div>

			<div className="edge downwards long left"></div>
			<div className="edge downwards short left first"></div>
			<div className="edge downwards short left second"></div>
			<div className="edge downwards short right third"></div>

			{/* <div className="side left short first"></div>
			<div className="side left large first"></div>
			<div className="side left short second"></div>
			<div className="side left short third"></div> */}

			<div className="content">{ children }</div>
		</div>
	</>
}

export default Puck
