import React, { useEffect, useRef, useState } from "react"
import "./FavoriteMusic.scss"

import soundwaveV1 from "@/assets/soundwave_V1.jpg"
// import soundwaveV2 from "@/assets/soundwave_V2.jpg"
// import soundwaveV3 from "@/assets/soundwave_V3.jpg"
import { Artist } from "./components"
import { listOfFavoriteArtists } from "@/data"

export interface FavoriteMusicInterface { }

const FavoriteMusic: React.FC<FavoriteMusicInterface> = () => {

	const artistsBar = useRef<HTMLDivElement>(null)
	const artistsElements = useRef( listOfFavoriteArtists.map(() => React.createRef<HTMLDivElement>()) )
	const selectedArtist = useRef<HTMLDivElement>()

	const spotifyToken = useRef("BQD0ihJFd3PZaScTiqc1i1bphF6tkkEN7TdiW6FULIcspg0zOpXVcpNkv-KC-9UXOuQgOmk8rAQi_7CPF4PlmbabP4utVckAWfzujAf3-ZhnCuh4m59ya4IaLwujFORjCelVKVD5iOGKkCaa4yTefTle7I_KpUd2ooKfeE3SP15tTtJpFYkNfOTA5XFHV9VgZuEqfA")
	const spotifyRefreshToken = useRef("AQApqZqhRn4c6uV8o_pzljxQGMuTjScqVcqXpw_sWXVPDj1DspOilD9A-SgvYsvqjJ3vo2prtDUWvjyLwMfIRu5OpcQf8b2AEeMhEXWRcsmeT2orrzVIeDAZAvFg7ACK3vE")

	const [ artistsImages, setArtistsImages ] = useState<Array<string>>( listOfFavoriteArtists.map(() => "") )

	/**
	 * Setups the page when it loads
	 */
	useEffect(() => setup(), [])
	
	function setup () {
		setupArtistsBar()

		fetchFavoriteArtistsData()
	}

	async function fetchFavoriteArtistsData () {

		const newImages = listOfFavoriteArtists.map(() => "")

		listOfFavoriteArtists.forEach( async (artist, index) => {
			try {
				const artistResponse = await fetch(`https://api.spotify.com/v1/artists/${ artist.spotifyID }`, {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						"Authorization": `Bearer ${ spotifyToken.current }`
					}
				})
	
				const artistData = await artistResponse.json()
				
				newImages[index] = artistData.images[0].url
				setArtistsImages(newImages)
			}
	
			catch (e) {
				console.log(e)
			}
		})

	}

	/**
	 * Prepares the artists scroll bar to style its elements
	 * when it scrolls
	 */
	function setupArtistsBar (): void {
		if (!artistsBar.current) return

		adjustArtistSize()
		artistsBar.current.onscroll = () => adjustArtistSize()
	}

	/**
	 * Returns the midpoint of the given artist element
	 * 
	 * The element's midpoint is calculated by using the **geometric midpoint formula**
	 * `midpoint = (x1 + x2) / 2`
	 * 
	 * @param artist A ref to the artist element 
	 */
	function getArtistMidpoint (artist: React.RefObject<HTMLDivElement>): number {
		if (!artist.current) return 0 // Default value for inexistent element (quite impossible)

		return (artist.current.getBoundingClientRect().left + artist.current.getBoundingClientRect().right) / 2
	}

	/**
	 * Returns an array containing the midpoints of every artist element
	 */
	function getArtistsMidpoints (): Array<number> {
		return artistsElements.current.map( artist => getArtistMidpoint(artist) )
	}

	/**
	 * Returns an array containing the presences of every artist element
	 * 
	 * The farther the detachment, the less presence it gets
	 * 
	 * The presence is 100% absent when the detachment reaches the **Limit**, which
	 * is the half of the container width
	 * 
	 * An element is 100% present (0% absent) when the detachment equals (or is less than)
	 * the **Absence Point**
	 * 
	 * Since the Absence Point is the *"frame of reference"*
	 * 
	 * `Limit = Half Bar Container - Absence Point`
	 * 
	 * `Real Detachment = Detachment - Absence Point`
	 * 
	 * So...
	 * ```
	 * Limit -> 100% (absent)
	 * Real Detachment -> ? (absent)
	 * ```
	 * 
	 * `? (absent) = Result Detachment / 100% * Limit`
	 * 
	 * Finally, "presence" is the opposite of "absent", so getting the rest 
	 * of the gone (%) will nail it
	 */
	function getArtistsPresences (): Array<number> {
		if (!artistsBar.current) return [] // Avoid null warnings

		// Distance from viewport to the left of the bar container
		const BAR_OFFSET_LEFT = artistsBar.current?.offsetLeft

		// Width of the bar container
		const BAR_WIDTH = artistsBar.current?.offsetWidth

		// Half width of the bar container
		const BAR_CONTAINER_HALF_WIDTH = BAR_WIDTH / 2

		// Distance from viewport to the midpoint of the bar
		const BAR_MIDPOINT = BAR_OFFSET_LEFT + BAR_CONTAINER_HALF_WIDTH
		

		/**
		 * Get the detachment of every element
		 * 
		 * A "detachment" represents the distance from the bar's midpoint to the element's midpoint
		 */
		const detachments = getArtistsMidpoints().map(artistMidpoint => Math.abs( BAR_MIDPOINT - artistMidpoint ))

		// Determines where the presence starts to reduce
		const ABSENCE_POINT = 0.10 * BAR_CONTAINER_HALF_WIDTH

		// Calculate and return presences
		return detachments.map(detachment => 
			detachment < ABSENCE_POINT 
				? 1 // Element is fully present 
				: 1 - ((detachment - ABSENCE_POINT) * 1) / (BAR_CONTAINER_HALF_WIDTH - ABSENCE_POINT) // Presence calculation is made
		)
	}

	/**
	 * Changes the scale of the artist elements depending on their presence
	 */
	function adjustArtistSize (): void {
		const presences = getArtistsPresences()

		// Give the artist elements an appropriate scale depending on their presence  
		artistsElements.current.forEach(({ current: artist }, index) => {
			if (artist)
				artist.style.scale = "" + presences[index]
		})
	}

	/**
	 * Moves scrollbar to the selected artist and gives it a unique style
	 * 
	 * @param artist Selected artist
	 */
	function onArtistClicked (artist: React.RefObject<HTMLDivElement>): void {
		scrollToArtist(artist)
		remarkArtistSelection(artist)
	}

	/**
	 * Moves the scrollbar so the selected artist element is at the middle of it
	 * 
	 * @param artist Selected artist that will be shown in the middle
	 */
	function scrollToArtist (artist: React.RefObject<HTMLDivElement>) {
		if (!artistsBar.current) return
		if (!artist.current) return
		
		// Half width of the bar container
		const BAR_CONTAINER_HALF_WIDTH = artistsBar.current.offsetWidth / 2

		// The distance from the left of the scrollbar to de midpoint of the selected artist element
		const scrollPosition = artist.current.offsetLeft + artist.current.offsetWidth / 2 
		
		artistsBar.current.scrollTo({
			left: scrollPosition - BAR_CONTAINER_HALF_WIDTH, // Will set the element to the middle of the bar
			behavior: "smooth"
		})
	}

	/**
	 * Gives the selected artist element a style when its selected
	 * 
	 * @param artist Selected artist that will receive the style 
	 */
	function remarkArtistSelection (artist: React.RefObject<HTMLDivElement>) {
		if (!artist.current) return
		
		selectedArtist.current?.classList.remove("selected-artist")
		selectedArtist.current = artist.current

		selectedArtist.current?.classList.add("selected-artist")
	}

	return (
		<div className="favorite-music">
			<h2 className="title">Favorite Music</h2>

			<div ref={artistsBar} className="artists-bar">
				<div className="spacer"></div>
				
				{ listOfFavoriteArtists.map((artist, index) => 
					<Artist 
						key={ index } 
						ref={ artistsElements.current[index] } 
						logo={ artistsImages[index] } 
						onClick={ () => onArtistClicked(artistsElements.current[index]) } /> ) 
				}

				<div className="spacer"></div>
			</div>

		</div>
	)
}

export default FavoriteMusic
