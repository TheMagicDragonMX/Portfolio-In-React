import React from "react"
import "./MapContent.scss"

import { Puck } from "./Puck"
import { Projects } from "./Projects"
import { Socials } from "./Socials"
import { Technologies } from "./Technologies"

import pfp from "@/assets/pixelated_cubes_pfp.png"

const MapContent = React.forwardRef((props, ref: React.ForwardedRef<HTMLDivElement>) => {

	return <>
		<div className="map-content-container">
			<span ref={ ref } className="map-content">
				<Puck
					className="pfp-puck"
					depth={ 15 } 
					corner={ 20 }
					innerShadow={ 5 }><img className="profile-pic" src={ pfp } alt="Profile Pic" /></Puck>

				<Puck
					className="projects-puck"
					depth={ 5 } 
					corner={ 10 }
					innerShadow={ 5 }><h2 className="topic">Projects</h2></Puck>

				<Projects />

				<Puck
					className="technologies-puck"
					depth={ 5 } 
					corner={ 10 }
					innerShadow={ 5 }><h2 className="topic">Technologies</h2></Puck>

				<Technologies />

				<Puck
					className="socials-puck"
					depth={ 5 } 
					corner={ 10 }
					innerShadow={ 5 }><h2 className="topic">Socials</h2></Puck>

				<Socials />
			</span>
		</div>
	</>
})

export default MapContent
