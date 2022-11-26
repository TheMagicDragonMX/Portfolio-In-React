import React, { useEffect, useRef } from "react"
import "./MapBackground.scss"

interface Coord {
	x: number
	y: number
}

interface DarkSquare {
	size: number
	position: Coord
}

interface DarkSquareGroup {
	squares: DarkSquare[]
	delay: number
}

const MapBackground : React.FC = () => {

	/**
	 * Both keep track of the HTML elements needed for
	 * the background
	 */
	const mapBackground = useRef<HTMLDivElement>(null)
	const canvas = useRef<HTMLCanvasElement>(null)
	
	/**
	 * Squares are separated by groups
	 * 
	 * Each group has:
	 * - Different delay time
	 * - Squares that belong to the group
	 * 
	 * Each group having a unique delay time makes it possible 
	 * for the canvas to draw all squares of the group at once
	 */
	const delays = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000]
	const squareGroups: DarkSquareGroup[] = delays.map( delay => ({
		squares: [],
		delay: delay
	} as DarkSquareGroup))

	/**
	 * Contains the squares that fill the entire canvas
	 * some properties of the background are listed too
	 */
	const PIXEL_SIZE = 15
	const FADING_TIME = 4000
	const BRIGHTER_LIMIT = 40
	const DARKER_LIMIT = 10

	/**
	 * Once the component is rendered, initializes
	 * background scenario and animation
	 */
	useEffect(() => {
		setupBackground()
		updateBackground()
	}, [])

	/**
	 * Setups the canvas size and the squares that will fill it
	 */
	function setupBackground (): void {
		if (!canvas.current) return // Prevent null warning
		if (!mapBackground.current) return // Prevent null warning

		// Makes canvas to fit the entire available space
		canvas.current.width = mapBackground.current.offsetWidth
		canvas.current.height = mapBackground.current.offsetHeight

		// Determine how many squares are necessary to fill the entire canvas
		const amountOfHorizontalSquares = Math.floor(canvas.current.width / PIXEL_SIZE) + 1
		const amountOfVerticalSquares = Math.floor(canvas.current.height / PIXEL_SIZE) + 1

		// Instantiate determined squares for the background
		for (let vertical = 0; vertical < amountOfVerticalSquares; vertical++)
			for (let horizontal = 0; horizontal < amountOfHorizontalSquares; horizontal++) {

				// Determine from which group the square will be part (and get an specific delay for that group)
				const selectedDelay = delays[Math.floor( Math.random() * delays.length )]

				// Add square to the randomly selected delay group
				squareGroups.find( group => group.delay === selectedDelay)?.squares.push({
					size: PIXEL_SIZE, 
					position: { x: horizontal * PIXEL_SIZE, y: vertical * PIXEL_SIZE },
				} as DarkSquare)
			}

		console.log({ totalSquares: amountOfHorizontalSquares * amountOfVerticalSquares})
	}

	/**
	 * Converts the given degrees to radians
	 */
	const toRadians = (degrees: number) => (degrees * Math.PI / 180)

	/**
	 * Calculates how dark the square will be depending on
	 * the current time (in milliseconds) + delay
	 */
	function getEaseInOutPercentage (delay: number) {
		const date = new Date()

		const milliseconds = date.getTime()
		const period = FADING_TIME / 360 // "360" is the default period time as milliseconds are treated like degrees
		const angleInRadiants = toRadians( milliseconds / period + delay )
		const percentage = Math.sin( angleInRadiants ) / 2 + 0.5 // <- Turns [1, -1] range of sine into [1, 0]

		return Number(percentage.toFixed(2))
	}

	/**
	 * For every animation frame, clears the canvas and updates
	 * the look of every square inside it
	 */
	function updateBackground (): void {
		const pencil = canvas.current?.getContext("2d")
		if (!pencil) return

		// Clear canvas
		pencil.clearRect(0, 0, canvas.current?.width ?? 0, canvas.current?.height ?? 0)

		// Update every square look
		squareGroups.forEach( group => {
			if (pencil === undefined) return

			const grayPercentage = getEaseInOutPercentage( group.delay )
			const grayColor = Math.floor( (BRIGHTER_LIMIT - DARKER_LIMIT) * grayPercentage + DARKER_LIMIT )

			pencil.fillStyle = `rgb(${ grayColor }, ${ grayColor }, ${ grayColor })`
			group.squares.forEach( square => pencil?.fillRect(square.position.x, square.position.y, square.size, square.size) )
		})

		requestAnimationFrame(updateBackground)
	}

	return <>
		<div className="map-background" ref={ mapBackground }>
			<canvas ref={ canvas }></canvas>
		</div>
	</>
}

export default MapBackground
