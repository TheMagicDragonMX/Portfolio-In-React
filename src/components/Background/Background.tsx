import React from "react"
import "./Background.scss"

export interface BackgroundInterface {
	children?: React.ReactNode
}

const Background : React.FC<BackgroundInterface> = ({ children }) => {
	return <div className="background">
		{ children }
	</div>
}

export default Background
