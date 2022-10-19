import React, { useEffect, useRef, useState } from "react"
import "./FavoriteMusic.scss"

import soundwaveV1 from "@/assets/soundwave_V1.jpg"
// import soundwaveV2 from "@/assets/soundwave_V2.jpg"
// import soundwaveV3 from "@/assets/soundwave_V3.jpg"
import { Artist } from "./components"

export interface FavoriteMusicInterface {}

const FavoriteMusic : React.FC<FavoriteMusicInterface> = () => {

	const listOfArtists = [ "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X" ]
	const artistsElements: React.RefObject<HTMLDivElement>[] = []

	const artistsBar = useRef<HTMLDivElement>(null)

	useEffect(() => {
		if (!artistsBar.current) return

		listOfArtists.map(() => artistsElements.push( React.createRef() ))
	}, [])

	function adjustArtistSize () {
		// Get every artist element so we can access their properties
		const artists = document.getElementsByClassName("artist")
		const distancesFromLeft: number[] = []
		const distancesFromRight: number[] = []
		
		// Get the position from the left of the viewport of each artist element
		for (let i = 0; i < artists.length; i++) {
			distancesFromLeft.push(artists[i].getBoundingClientRect().left)
			distancesFromRight.push(artists[i].getBoundingClientRect().right)
		}

		// Calculate their "presence", which defines how clearly the user sees it
		const presences: number[] = []
		const visibleDistance = window.innerWidth * 0.20
		const visibleLeftDistance = window.innerWidth * 0.20
		const visibleRightDistance = window.innerWidth * 0.80

		for (let i = 0; i < artists.length; i++) {
			const left = distancesFromLeft[i]
			const right = distancesFromRight[i]

			const presence = left < visibleLeftDistance
				? left * 1 / visibleLeftDistance

				: right > visibleRightDistance
					? 1 - ((right - visibleRightDistance) * 1 / (window.innerWidth - visibleRightDistance))

					: 1

			presences.push(presence)
		}

		// Give the artist elements an appropriate scale depending on their presence  
		for (let i = 0; i < artists.length; i++)
			artists[i].setAttribute("style", "scale: " + presences[i])
	}

	return (
		<div className="favorite-music">
			<h2 className="title">Favorite Music</h2>

			<div ref={ artistsBar } className="artists-bar">
				{
					artistsElements.map((ref, index) => <Artist key={ index } logo={ soundwaveV1 } />)
				}
			</div>

		</div>
	)
}

export default FavoriteMusic
