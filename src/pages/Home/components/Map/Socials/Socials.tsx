import React from "react"
import "./Socials.scss"

import facebook from "@/assets/socials/facebook.png"
import github from "@/assets/socials/github.png"
import instagram from "@/assets/socials/instagram.png"
import leetcode from "@/assets/socials/leetcode.png"
import linkedin from "@/assets/socials/linkedin.png"

import { Puck } from "../Puck"

export interface SocialsInterface {}

const Socials : React.FC<SocialsInterface> = () => {

	const DEPTH = 10
	const CORNER = 7
	const SHADOW = 2
	
	return <>
		<div className="listed-socials">
			<Puck
				depth={ DEPTH } 
				corner={ CORNER }
				innerShadow={ SHADOW }><img className="social-logo facebook-puck" src={ facebook } alt="Facebook Logo" /></Puck>

			<Puck
				depth={ DEPTH } 
				corner={ CORNER }
				innerShadow={ SHADOW }><img className="social-logo github-puck" src={ github } alt="Github Logo" /></Puck>

			<Puck
				depth={ DEPTH } 
				corner={ CORNER }
				innerShadow={ SHADOW }><img className="social-logo instagram-puck" src={ instagram } alt="Instagram Logo" /></Puck>

			<Puck
				depth={ DEPTH } 
				corner={ CORNER }
				innerShadow={ SHADOW }><img className="social-logo leetcode-puck" src={ leetcode } alt="LeetCode Logo" /></Puck>

			<Puck
				depth={ DEPTH } 
				corner={ CORNER }
				innerShadow={ SHADOW }><img className="social-logo linkedin-puck" src={ linkedin } alt="LinkedIn Logo" /></Puck>
		</div>
	</>
}

export default Socials
