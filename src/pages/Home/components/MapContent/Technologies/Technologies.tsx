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

import { SmallPuck } from "../SmallPuck"

export interface TechnologiesInterface {}

const DEPTH = 5
const CORNER = 10
const SHADOW = 5

const Technologies : React.FC<TechnologiesInterface> = () => {

	return <>
		<div className="listed-technologies">
			<SmallPuck
				depth={ DEPTH } 
				corner={ CORNER }
				innerShadow={ SHADOW }><img className="tech-logo" src={ arduino } alt="Arduino Logo" /></SmallPuck>
				
			<SmallPuck
				depth={ DEPTH } 
				corner={ CORNER }
				innerShadow={ SHADOW }><img className="tech-logo" src={ c } alt="C Logo" /></SmallPuck>

			<SmallPuck
				depth={ DEPTH } 
				corner={ CORNER }
				innerShadow={ SHADOW }><img className="tech-logo" src={ csharp } alt="C# Logo" /></SmallPuck>

			<SmallPuck
				depth={ DEPTH } 
				corner={ CORNER }
				innerShadow={ SHADOW }><img className="tech-logo" src={ cpp } alt="C++ Logo" /></SmallPuck>

			<SmallPuck
				depth={ DEPTH } 
				corner={ CORNER }
				innerShadow={ SHADOW }><img className="tech-logo" src={ html } alt="HTML Logo" /></SmallPuck>

			<SmallPuck
				depth={ DEPTH } 
				corner={ CORNER }
				innerShadow={ SHADOW }><img className="tech-logo" src={ css } alt="CSS Logo" /></SmallPuck>

			<SmallPuck
				depth={ DEPTH } 
				corner={ CORNER }
				innerShadow={ SHADOW }><img className="tech-logo" src={ sass } alt="SASS Logo" /></SmallPuck>

			<SmallPuck
				depth={ DEPTH } 
				corner={ CORNER }
				innerShadow={ SHADOW }><img className="tech-logo" src={ javascript } alt="JS Logo" /></SmallPuck>

			<SmallPuck
				depth={ DEPTH } 
				corner={ CORNER }
				innerShadow={ SHADOW }><img className="tech-logo" src={ typescript } alt="TS Logo" /></SmallPuck>

			<SmallPuck
				depth={ DEPTH } 
				corner={ CORNER }
				innerShadow={ SHADOW }><img className="tech-logo" src={ react } alt="React Logo" /></SmallPuck>

			<SmallPuck
				depth={ DEPTH } 
				corner={ CORNER }
				innerShadow={ SHADOW }><img className="tech-logo" src={ nodejs } alt="NodeJS Logo" /></SmallPuck>

			<SmallPuck
				depth={ DEPTH } 
				corner={ CORNER }
				innerShadow={ SHADOW }><img className="tech-logo" src={ php } alt="PHP Logo" /></SmallPuck>

			<SmallPuck
				depth={ DEPTH } 
				corner={ CORNER }
				innerShadow={ SHADOW }><img className="tech-logo" src={ java } alt="Java Logo" /></SmallPuck>

			<SmallPuck
				depth={ DEPTH } 
				corner={ CORNER }
				innerShadow={ SHADOW }><img className="tech-logo" src={ firebase } alt="Firebase Logo" /></SmallPuck>

			<SmallPuck
				depth={ DEPTH } 
				corner={ CORNER }
				innerShadow={ SHADOW }><img className="tech-logo" src={ mysql } alt="MySQL Logo" /></SmallPuck>

			<SmallPuck
				depth={ DEPTH } 
				corner={ CORNER }
				innerShadow={ SHADOW }><img className="tech-logo" src={ python } alt="Python Logo" /></SmallPuck>

			<SmallPuck
				depth={ DEPTH } 
				corner={ CORNER }
				innerShadow={ SHADOW }><img className="tech-logo" src={ vite } alt="ViteJS Logo" /></SmallPuck>
		</div>
	</>
}

export default Technologies
