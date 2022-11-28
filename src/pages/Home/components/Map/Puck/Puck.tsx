import React from "react"
import "./Puck.scss"

import pfp from "@/assets/pfp-cubes.jpg"

export interface PuckInterface {}

const Puck : React.FC<PuckInterface> = () => {
	return <>
		<div className="puck">
			<span className="front-face">
				<img src={ pfp } />
			</span>

			<span className="back-face"></span>
			<span className="short-side" style={{ "--shortSide": 1 } as React.CSSProperties}></span>
			<span className="short-side" style={{ "--shortSide": -1 } as React.CSSProperties}></span>
			<span className="long-side" style={{ "--longSide": 1 } as React.CSSProperties}></span>
			<span className="long-side" style={{ "--longSide": -1 } as React.CSSProperties}></span>
		</div>
	</>
}

export default Puck
