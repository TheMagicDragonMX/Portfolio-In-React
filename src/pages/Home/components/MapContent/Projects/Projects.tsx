import React from "react"
import "./Projects.scss"

import { Puck } from "../Puck"

export interface ProjectsInterface { }

const DEPTH = 5
const CORNER = 10
const SHADOW = 5

const Projects : React.FC<ProjectsInterface> = () => {
	return <>
		<div className="listed-projects">
			<Puck
				className="projects-puck"
				depth={ DEPTH } 
				corner={ CORNER }
				innerShadow={ SHADOW }><h2 className="topic">Academo</h2></Puck>

			<Puck
				className="projects-puck"
				depth={ DEPTH } 
				corner={ CORNER }
				innerShadow={ SHADOW }><h2 className="topic">LED Cube</h2></Puck>

			<Puck
				className="projects-puck"
				depth={ DEPTH } 
				corner={ CORNER }
				innerShadow={ SHADOW }><h2 className="topic">Rotating Cube</h2></Puck>
				
			<Puck
				className="projects-puck"
				depth={ DEPTH } 
				corner={ CORNER }
				innerShadow={ SHADOW }><h2 className="topic">Happy Birthday Gift Card</h2></Puck>
				
			<Puck
				className="projects-puck"
				depth={ DEPTH } 
				corner={ CORNER }
				innerShadow={ SHADOW }><h2 className="topic">Portfolio</h2></Puck>
		</div>
	</>
}

export default Projects
