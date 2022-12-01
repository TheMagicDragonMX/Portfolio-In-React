import React, { useEffect, useRef } from "react"
import "./MapArrangement.scss"
import "./MapContent.scss"

import { MapBackground } from "./MapBackground"
import { SparkEnvironment } from "./SparkEnvironment"
import { Puck } from "./Puck"

import pfp from "@/assets/pixelated_cubes_pfp.png"
import facebook from "@/assets/socials/facebook.png"
import github from "@/assets/socials/github.png"
import instagram from "@/assets/socials/instagram.png"
import leetcode from "@/assets/socials/leetcode.png"
import linkedin from "@/assets/socials/linkedin.png"
import { Projects } from "./Projects"

const Map : React.FC = () => {

	/**
	 * Control the maximum and minimum values 
	 * for the zoom
	 */
	const MAX_ZOOM = 3
	const MIN_ZOOM = 0.5
	const NORMAL_ZOOM = 1
	
	/**
	 * Keeps track of the HTML element that contains
	 * the map
	 */
	const map = useRef<HTMLDivElement>(null)

	/**
	 * Keeps track of the amount of zoom that
	 * the user currently has
	 */
	const zoom = useRef(NORMAL_ZOOM)
	
	/**
	 * Once the map element renders, give it the
	 * listener that changes the zoom when the wheel
	 * is rotated
	 */
	useEffect(() => {
		if (!map.current) return
	
		// map.current.style.scale = zoom.current + ""
		map.current.addEventListener("wheel", changeZoom, { passive: false })
	}, [])

	/**
	 * Depending on the amount of distance that the wheel
	 * moved, scales the map accordingly.
	 * 
	 * Wheel down to zoom out
	 * Wheel up to zoom in
	 */
	function changeZoom (this: HTMLDivElement, wheel: WheelEvent) {
		wheel.preventDefault() // Prevent scrolling map with wheel

		const differential = wheel.deltaY / -800
		zoom.current = Number(Math.max( Math.min( zoom.current + differential, MAX_ZOOM ), MIN_ZOOM ).toFixed(2))

		this.style.scale = zoom.current + ""
	}

	return <>
		<div ref={ map } className="map-margin">
			<div className="map">
				<MapBackground />
				<SparkEnvironment />

				<div className="puck-area">
					<Puck
						className="pfp-puck"
						depth={ 20 } 
						corner={ 20 }
						innerShadow={ 5 }><img className="profile-pic" src={ pfp } alt="Profile Pic" /></Puck>

					<Puck
						className="projects-puck"
						depth={ 10 } 
						corner={ 10 }
						innerShadow={ 5 }><h2 className="topic">Projects</h2></Puck>

					<Projects />

					<div className="listed technologies">
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
					
					<div className="listed socials">
						<Puck
							depth={ 5 } 
							corner={ 7 }
							innerShadow={ 3 }><img className="social-logo facebook-puck" src={ facebook } alt="" /></Puck>

						<Puck
							depth={ 5 } 
							corner={ 7 }
							innerShadow={ 3 }><img className="social-logo github-puck" src={ github } alt="" /></Puck>

						<Puck
							depth={ 5 } 
							corner={ 7 }
							innerShadow={ 3 }><img className="social-logo instagram-puck" src={ instagram } alt="" /></Puck>

						<Puck
							depth={ 5 } 
							corner={ 7 }
							innerShadow={ 3 }><img className="social-logo leetcode-puck" src={ leetcode } alt="" /></Puck>

						<Puck
							depth={ 5 } 
							corner={ 7 }
							innerShadow={ 3 }><img className="social-logo linkedin-puck" src={ linkedin } alt="" /></Puck>
					</div>

					<Puck
						className="technologies-puck"
						depth={ 10 } 
						corner={ 10 }
						innerShadow={ 5 }><h2 className="topic">Technologies</h2></Puck>

					<Puck
						className="socials-puck"
						depth={ 10 } 
						corner={ 10 }
						innerShadow={ 5 }><h2 className="topic">Socials</h2></Puck>

				</div>
			</div>
		</div>
	</>
}

export default Map
