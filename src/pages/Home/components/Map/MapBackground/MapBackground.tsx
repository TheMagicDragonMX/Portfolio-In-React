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
	 * Properties that control the behavior and look of the
	 * background
	 * 
	 * SQUARE_SIZE: 
	 * The size of each square in pixels
	 * 
	 * BLINKING_TIME: 
	 * How much it takes for the squares to blink
	 * 
	 * BRIGHTNESS & DARKNESS:
	 * Limits of the gray color scale, they can go
	 * from 0 to 255
	 */
	const SQUARE_SIZE = 15
	const BLINKING_TIME = 4000
	const BRIGHTNESS = 40
	const DARKNESS = 10

	/**
	 * Once the component is rendered, initializes
	 * background scenario and animation
	 */
	useEffect(() => {
		setupBackground()
		createSquaresGroups()
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
	}

	/**
	 * Depending on the canvas size, determines how many squares fit
	 * in and creates them (separated by groups)
	 */
	function createSquaresGroups () {
		if (!canvas.current) return // Prevent null warning

		// Determine how many squares are necessary to fill the entire canvas
		const amountOfHorizontalSquares = Math.floor(canvas.current.width / SQUARE_SIZE) + 1
		const amountOfVerticalSquares = Math.floor(canvas.current.height / SQUARE_SIZE) + 1

		// Create squares for the background
		for (let vertical = 0; vertical < amountOfVerticalSquares; vertical++)
			for (let horizontal = 0; horizontal < amountOfHorizontalSquares; horizontal++) {

				// Determine from which group the square will be part (and get an specific delay for that group)
				const selectedDelay = delays[Math.floor( Math.random() * delays.length )]

				// Add square to the randomly selected delay group
				squareGroups.find( group => group.delay === selectedDelay )?.squares.push({
					size: SQUARE_SIZE, 
					position: { x: horizontal * SQUARE_SIZE, y: vertical * SQUARE_SIZE },
				} as DarkSquare)
			}

		console.log({ totalSquares: amountOfHorizontalSquares * amountOfVerticalSquares})
	}

	/**
	 * Converts the given degrees to radians
	 */
	const toRadians = (degrees: number) => (degrees * Math.PI / 180)

	/**
	 * Mimics the CSS ease-in-out timing function by returning
	 * a percentage of the process depending on the time AND
	 * the phase shift given by a delay
	 */
	function getEaseInOutPercentage (delay: number) {
		const date = new Date()

		const milliseconds = date.getTime()
		const period = BLINKING_TIME / 360 // "360" is the default period time as milliseconds are treated like degrees
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

		// Update every square group with their corresponding color
		squareGroups.forEach( group => {

			// Set canvas pencil color to the according gray
			const grayPercentage = getEaseInOutPercentage( group.delay )
			const grayColor = Math.floor( (BRIGHTNESS - DARKNESS) * grayPercentage + DARKNESS )
			pencil.fillStyle = `rgb(${ grayColor }, ${ grayColor }, ${ grayColor })`

			// Update every square of the group
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
