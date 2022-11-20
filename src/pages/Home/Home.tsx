import React from "react"
import "./Home.scss"

import { Background } from "@/components"
import { Map, Menu } from "./components"

const Home : React.FC = () => {
	
	return <>
		<Background>
			<div className="home">
				<Menu />
			
				<Map /> 
			</div>		
		</Background>
	</>
}

export default Home
