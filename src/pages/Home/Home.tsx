import React from "react"
import "./Home.scss"

import { SpinningWheel, SpinningWheelElement } from "@/components"
import { AspectOrb } from "./components/AspectOrb"
import { Profile } from "./components/Profile"
import { useNavigate } from "react-router-dom"

export interface HomeInterface {}

const Home : React.FC<HomeInterface> = () => {

	/**
	 * Helps on redirecting user to another pages
	 */
	const navigate = useNavigate()
	
	return (
		<div className="home">
			<Profile />

			<SpinningWheel amountOfElements={ 4 } radius={ 170 } rotationTime={ 40 } counterclockwise>
				<SpinningWheelElement position={ 0 }>
					<AspectOrb firstColor="#f8fe01" secondColor="#0080ff" onClick={ () => navigate("/favorite-music") }>Music</AspectOrb>
				</SpinningWheelElement>

				<SpinningWheelElement position={ 1 }>
					<AspectOrb firstColor="#ff80c0" secondColor="#a234dc" onClick={ () => navigate("/skills") }>Skills</AspectOrb>
				</SpinningWheelElement>
				
				<SpinningWheelElement position={ 2 }>
					<AspectOrb firstColor="#00ff00" secondColor="#00ffff" onClick={ () => navigate("/favorite-games") }>Games</AspectOrb>
				</SpinningWheelElement>

				<SpinningWheelElement position={ 3 }>
					<AspectOrb firstColor="#ff0080" secondColor="#ff8000" onClick={ () => navigate("/favorite-foot") }>Food</AspectOrb>
				</SpinningWheelElement>
			</SpinningWheel>
		</div>
	)
}

export default Home
