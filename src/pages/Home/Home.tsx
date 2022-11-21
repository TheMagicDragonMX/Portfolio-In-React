import React from "react"
import "./Home.scss"

import { Background } from "@/components"
import { Area, Menu } from "./components"

const Home : React.FC = () => {
	
	return <>
		<Background>
			<div className="home">
				<Menu />
			
				<Area /> 
			</div>		
		</Background>
	</>
}

export default Home
