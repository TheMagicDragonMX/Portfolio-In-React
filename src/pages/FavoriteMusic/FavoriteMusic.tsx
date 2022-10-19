import React, { useEffect, useRef, useState } from "react"
import "./FavoriteMusic.scss"

import soundwaveV1 from "@/assets/soundwave_V1.jpg"
import soundwaveV2 from "@/assets/soundwave_V2.jpg"
import soundwaveV3 from "@/assets/soundwave_V3.jpg"
import { Artist } from "./components"

export interface FavoriteMusicInterface {}

const FavoriteMusic : React.FC<FavoriteMusicInterface> = () => {

	const artistsBar = useRef<HTMLDivElement>(null)

	useEffect(() => {
		if (!artistsBar.current) return

		artistsBar.current.onscroll = () => {
			console.log("Left: " + artistsBar.current?.scrollLeft)
			console.log("Scroll Width: " + artistsBar.current?.scrollWidth)
		}
		// artistsBar.current.onscroll = () => adjustArtistSize()
		// adjustArtistSize()
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

	const artists: JSX.Element[] = [
		<Artist key={ 0 } logo={ soundwaveV1 } />,
		<Artist key={ 1 } logo={ soundwaveV3 } />,
		<Artist key={ 2 } logo={ soundwaveV2 } />,
		<Artist key={ 3 } logo={ soundwaveV1 } />,
		<Artist key={ 4 } logo={ soundwaveV2 } />,
		<Artist key={ 5 } logo={ soundwaveV3 } />,
		<Artist key={ 6 } logo={ soundwaveV1 } />,
		<Artist key={ 7 } logo={ soundwaveV2 } />,
		<Artist key={ 8 } logo={ soundwaveV3 } />,
		<Artist key={ 9 } logo={ soundwaveV1 } />,
		<Artist key={ 10 } logo={ soundwaveV2 } />,
		<Artist key={ 11 } logo={ soundwaveV2 } />,
		<Artist key={ 12 } logo={ soundwaveV2 } />,
		<Artist key={ 13 } logo={ soundwaveV2 } />,
		<Artist key={ 14 } logo={ soundwaveV2 } />,
		<Artist key={ 15 } logo={ soundwaveV2 } />,
	]

	const [ cursor, setCursor ] = useState(0)

	return (
		<div className="favorite-music">
			<h2 className="title">Favorite Music</h2>

			<div ref={ artistsBar } className="artists-bar">
				{ artists }
			</div>

		</div>
	)
}

export default FavoriteMusic
