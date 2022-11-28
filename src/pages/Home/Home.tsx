import React from "react"
import "./Home.scss"

import { Background } from "@/components"
import { MapDraggableArea, Menu } from "./components"

const Home : React.FC = () => {
	
	return <>
		<Background>
			<div className="home">
				<Menu />
			
				<MapDraggableArea /> 
			</div>		
		</Background>
	</>
}

export default Home
