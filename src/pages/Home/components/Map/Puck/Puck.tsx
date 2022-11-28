import React from "react"
import "./Puck.scss"

import pfp from "@/assets/pfp-cubes.jpg"

export interface PuckInterface {}

const Puck : React.FC<PuckInterface> = () => {
	return <>
		<div className="puck">
			<span className="face front">
				<img src={ pfp } />
			</span>
			<span className="face back"></span>

			<div className="side short left" style={{ "--amountOfFragments": 3 } as React.CSSProperties} >
				<div className="fragment" style={{ "--displacement": 1 } as React.CSSProperties } ></div>
				<div className="filler"></div>
				<div className="fragment" style={{ "--displacement": 1 } as React.CSSProperties } ></div>
				<div className="fragment" style={{ "--displacement": 2 } as React.CSSProperties } ></div>
			</div>
			
			<div className="side short right" style={{ "--amountOfFragments": 2 } as React.CSSProperties} >
				<div className="fragment" style={{ "--displacement": 1 } as React.CSSProperties } ></div>
				<div className="filler"></div>
				<div className="fragment" style={{ "--displacement": 1 } as React.CSSProperties } ></div>
			</div>
			
			<div className="side long top" style={{ "--amountOfFragments": 2 } as React.CSSProperties} >
				<div className="fragment" style={{ "--displacement": 1 } as React.CSSProperties } ></div>
				<div className="filler"></div>
				<div className="fragment" style={{ "--displacement": 1 } as React.CSSProperties } ></div>
			</div>

			<div className="side long bottom" style={{ "--amountOfFragments": 3 } as React.CSSProperties} >
				<div className="fragment" style={{ "--displacement": 2 } as React.CSSProperties } ></div>
				<div className="fragment" style={{ "--displacement": 1 } as React.CSSProperties } ></div>
				<div className="filler"></div>
				<div className="fragment" style={{ "--displacement": 1 } as React.CSSProperties } ></div>
			</div>
		</div>
	</>
}

export default Puck
