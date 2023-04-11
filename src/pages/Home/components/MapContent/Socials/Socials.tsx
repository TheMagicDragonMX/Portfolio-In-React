import React from "react"
import "./Socials.scss"

import facebook from "@/assets/socials/facebook.png"
import github from "@/assets/socials/github.png"
import instagram from "@/assets/socials/instagram.png"
import leetcode from "@/assets/socials/leetcode.png"
import linkedin from "@/assets/socials/linkedin.png"

import { SmallPuck } from "../SmallPuck"

export interface SocialsInterface {}

const DEPTH = 5
const CORNER = 10
const SHADOW = 2

const Socials : React.FC<SocialsInterface> = () => {	
	return <>
		<div className="listed-socials">
			<SmallPuck
				depth={ DEPTH } 
				corner={ CORNER }
				innerShadow={ SHADOW }><img className="social-logo facebook-puck" src={ facebook } alt="Facebook Logo" /></SmallPuck>

			<SmallPuck
				depth={ DEPTH } 
				corner={ CORNER }
				innerShadow={ SHADOW }><img className="social-logo github-puck" src={ github } alt="Github Logo" /></SmallPuck>

			<SmallPuck
				depth={ DEPTH } 
				corner={ CORNER }
				innerShadow={ SHADOW }><img className="social-logo instagram-puck" src={ instagram } alt="Instagram Logo" /></SmallPuck>

			<SmallPuck
				depth={ DEPTH } 
				corner={ CORNER }
				innerShadow={ SHADOW }><img className="social-logo leetcode-puck" src={ leetcode } alt="LeetCode Logo" /></SmallPuck>

			<SmallPuck
				depth={ DEPTH } 
				corner={ CORNER }
				innerShadow={ SHADOW }><img className="social-logo linkedin-puck" src={ linkedin } alt="LinkedIn Logo" /></SmallPuck>
		</div>
	</>
}

export default Socials
