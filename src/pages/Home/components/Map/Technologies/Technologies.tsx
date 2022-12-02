import React from "react"
import "./Technologies.scss"

import arduino from "@/assets/technologies/arduino.png"
import c from "@/assets/technologies/c.png"
import csharp from "@/assets/technologies/csharp.png"
import cpp from "@/assets/technologies/cpp.png"
import css from "@/assets/technologies/css.png"
import firebase from "@/assets/technologies/firebase.png"
import html from "@/assets/technologies/html.png"
import java from "@/assets/technologies/java.png"
import javascript from "@/assets/technologies/javascript.png"
import mysql from "@/assets/technologies/mysql.png"
import nodejs from "@/assets/technologies/nodejs.png"
import php from "@/assets/technologies/php.png"
import python from "@/assets/technologies/python.png"
import react from "@/assets/technologies/react.png"
import sass from "@/assets/technologies/sass.png"
import typescript from "@/assets/technologies/typescript.png"
import vite from "@/assets/technologies/vite.png"

import { Puck } from "../Puck"

export interface TechnologiesInterface {}

const Technologies : React.FC<TechnologiesInterface> = () => {

	const DEPTH = 10
	const CORNER = 5
	const SHADOW = 2
	
	return <>
		<div className="listed-technologies">
			<Puck
				depth={ DEPTH } 
				corner={ CORNER }
				innerShadow={ SHADOW }><img className="tech-logo" src={ arduino } alt="Arduino Logo" /></Puck>
				
			<Puck
				depth={ DEPTH } 
				corner={ CORNER }
				innerShadow={ SHADOW }><img className="tech-logo" src={ c } alt="C Logo" /></Puck>

			<Puck
				depth={ DEPTH } 
				corner={ CORNER }
				innerShadow={ SHADOW }><img className="tech-logo" src={ csharp } alt="C# Logo" /></Puck>

			<Puck
				depth={ DEPTH } 
				corner={ CORNER }
				innerShadow={ SHADOW }><img className="tech-logo" src={ cpp } alt="C++ Logo" /></Puck>

			<Puck
				depth={ DEPTH } 
				corner={ CORNER }
				innerShadow={ SHADOW }><img className="tech-logo" src={ html } alt="HTML Logo" /></Puck>

			<Puck
				depth={ DEPTH } 
				corner={ CORNER }
				innerShadow={ SHADOW }><img className="tech-logo" src={ css } alt="CSS Logo" /></Puck>

			<Puck
				depth={ DEPTH } 
				corner={ CORNER }
				innerShadow={ SHADOW }><img className="tech-logo" src={ sass } alt="SASS Logo" /></Puck>

			<Puck
				depth={ DEPTH } 
				corner={ CORNER }
				innerShadow={ SHADOW }><img className="tech-logo" src={ javascript } alt="JS Logo" /></Puck>

			<Puck
				depth={ DEPTH } 
				corner={ CORNER }
				innerShadow={ SHADOW }><img className="tech-logo" src={ typescript } alt="TS Logo" /></Puck>

			<Puck
				depth={ DEPTH } 
				corner={ CORNER }
				innerShadow={ SHADOW }><img className="tech-logo" src={ react } alt="React Logo" /></Puck>

			<Puck
				depth={ DEPTH } 
				corner={ CORNER }
				innerShadow={ SHADOW }><img className="tech-logo" src={ nodejs } alt="NodeJS Logo" /></Puck>

			<Puck
				depth={ DEPTH } 
				corner={ CORNER }
				innerShadow={ SHADOW }><img className="tech-logo" src={ php } alt="PHP Logo" /></Puck>

			<Puck
				depth={ DEPTH } 
				corner={ CORNER }
				innerShadow={ SHADOW }><img className="tech-logo" src={ java } alt="Java Logo" /></Puck>

			<Puck
				depth={ DEPTH } 
				corner={ CORNER }
				innerShadow={ SHADOW }><img className="tech-logo" src={ firebase } alt="Firebase Logo" /></Puck>

			<Puck
				depth={ DEPTH } 
				corner={ CORNER }
				innerShadow={ SHADOW }><img className="tech-logo" src={ mysql } alt="MySQL Logo" /></Puck>

			<Puck
				depth={ DEPTH } 
				corner={ CORNER }
				innerShadow={ SHADOW }><img className="tech-logo" src={ python } alt="Python Logo" /></Puck>

			<Puck
				depth={ DEPTH } 
				corner={ CORNER }
				innerShadow={ SHADOW }><img className="tech-logo" src={ vite } alt="ViteJS Logo" /></Puck>
		</div>
	</>
}

export default Technologies
