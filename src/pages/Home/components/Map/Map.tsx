import React, { useEffect, useRef } from "react"
import "./Map.scss"

import { Puck } from "./Puck"
import { Projects } from "./Projects"
import { Socials } from "./Socials"
import { Technologies } from "./Technologies"

import pfp from "@/assets/pixelated_cubes_pfp.png"

const Map : React.FC = () => {

	/**
	 * Control the maximum and minimum values 
	 * for the zoom
	 */
	const MAX_ZOOM = 2
	const MIN_ZOOM = 0.5
	const NORMAL_ZOOM = 1
	
	/**
	 * Keeps track of the HTML element that contains
	 * all the pucks
	 */
	const puckArea = useRef<HTMLDivElement>(null)

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
		if (!puckArea.current) return
	
		// puckArea.current.addEventListener("wheel", changeZoom, { passive: false })
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

		// Change parent sizes to fit the new zoomed (scaled) element
		const newWidth = this.clientWidth * zoom.current
		const newHeight = this.clientHeight * zoom.current

		if (!this.parentElement) return
		this.parentElement.style.width = newWidth + "px"
		this.parentElement.style.height = newHeight + "px"
	}

	return <>
		<div className="mapp">
			<div ref={ puckArea } className="puck-area">
				<Puck
					className="pfp-puck"
					depth={ 15 } 
					corner={ 20 }
					innerShadow={ 5 }><img className="profile-pic" src={ pfp } alt="Profile Pic" /></Puck>

				<Puck
					className="projects-puck"
					depth={ 10 } 
					corner={ 10 }
					innerShadow={ 5 }><h2 className="topic">Projects</h2></Puck>

				<Projects />

				<Puck
					className="technologies-puck"
					depth={ 10 } 
					corner={ 10 }
					innerShadow={ 5 }><h2 className="topic">Technologies</h2></Puck>

				<Technologies />

				<Puck
					className="socials-puck"
					depth={ 10 } 
					corner={ 10 }
					innerShadow={ 5 }><h2 className="topic">Socials</h2></Puck>

				<Socials />
			</div>
		</div>
	</>
}

export default Map
