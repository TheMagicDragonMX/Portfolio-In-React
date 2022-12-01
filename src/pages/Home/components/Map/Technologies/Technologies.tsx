import React from "react"
import { Puck } from "../Puck"
import "./Technologies.scss"

export interface TechnologiesInterface {}

const Technologies : React.FC<TechnologiesInterface> = () => {
	return <>
		<div className="listed-technologies">
			<Puck
				className="projects-puck"
				depth={ 10 } 
				corner={ 10 }
				innerShadow={ 5 }><h2 className="topic">C</h2></Puck>

			<Puck
				className="projects-puck"
				depth={ 10 } 
				corner={ 10 }
				innerShadow={ 5 }><h2 className="topic">C++</h2></Puck>

			<Puck
				className="projects-puck"
				depth={ 10 } 
				corner={ 10 }
				innerShadow={ 5 }><h2 className="topic">C#</h2></Puck>
				
			<Puck
				className="projects-puck"
				depth={ 10 } 
				corner={ 10 }
				innerShadow={ 5 }><h2 className="topic">Java</h2></Puck>
				
			<Puck
				className="projects-puck"
				depth={ 10 } 
				corner={ 10 }
				innerShadow={ 5 }><h2 className="topic">Python</h2></Puck>
		</div>
	</>
}

export default Technologies
