import React, { useEffect, useRef } from "react"
import "./MapBackground.scss"

interface Coord {
	x: number
	y: number
}

interface DarkSquareInterface {
	size: number
	position: Coord
	fadingTime: number
	brighterLimit: number
	darkerLimit: number
	delay: number
}
class DarkSquare {
	size: number
	position: Coord
	fadingTime: number
	brighterLimit: number
	darkerLimit: number
	delay: number

	private gray: number

	constructor ({ size, position, fadingTime, brighterLimit, darkerLimit, delay }: DarkSquareInterface) {
		this.size = size
		this.position = position
		this.fadingTime = fadingTime
		this.brighterLimit = brighterLimit
		this.darkerLimit = darkerLimit
		this.delay = Math.floor(Math.random() * delay)

		this.gray = 0 // Starts at black
	}

	/**
	 * Converts the given degrees to radians
	 */
	private toRadians = (degrees: number) => (degrees * Math.PI / 180)

	/**
	 * Calculates how dark the square will be depending on
	 * the current time (in milliseconds) + delay
	 */
	private getEaseInOutPercentage = () => {
		const date = new Date()

		const milliseconds = date.getTime()
		const period = this.fadingTime / 360 // "360" is the default period time as milliseconds are treated like degrees
		const angleInRadiants = this.toRadians( milliseconds / period + this.delay )
		const percentage = Math.sin( angleInRadiants ) / 2 + 0.5 // <- Turns [1, -1] range of sine into [1, 0]

		return percentage
	}

	/**
	 * Draws the square on the canvas
	 * @param pencil 2D context of the canvas where the square will be drawn
	 */
	draw (pencil: CanvasRenderingContext2D) {
		pencil.fillStyle = `rgb(${ this.gray }, ${ this.gray }, ${ this.gray })`
		pencil.fillRect(this.position.x, this.position.y, this.size, this.size)
	}

	/**
	 * Draws the square on the canvas with a gray scale
	 * that changes over time
	 * 
	 * @param pencil 2D context of the canvas where the square will be drawn
	 */
	animate (pencil: CanvasRenderingContext2D) {
		const grayPercentage = this.getEaseInOutPercentage()

		// Calculate gray scale over the given limits
		this.gray = Math.floor( (this.brighterLimit - this.darkerLimit) * grayPercentage + this.darkerLimit )
		this.draw(pencil)
	}
}

const MapBackground : React.FC = () => {

	/**
	 * Both keep track of the HTML elements needed for
	 * the background
	 */
	const mapBackground = useRef<HTMLDivElement>(null)
	const canvas = useRef<HTMLCanvasElement>(null)
	const pencil = useRef<CanvasRenderingContext2D>()
	
	/**
	 * Contains the squares that fill the entire canvas
	 * some properties of the background are listed too
	 */
	const squares: DarkSquare[] = []
	const PIXEL_SIZE = 20
	const FADING_TIME = 4000
	const BRIGHTER_LIMIT = 40
	const DARKER_LIMIT = 10
	const MAX_DELAY = 1000

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
		const amountOfHorizontalSquares = Math.round(canvas.current.width / PIXEL_SIZE) + 1
		const amountOfVerticalSquares = Math.round(canvas.current.height / PIXEL_SIZE) + 1

		// Instantiate determined squares for the background
		for (let vertical = 0; vertical < amountOfVerticalSquares; vertical++)
			for (let horizontal = 0; horizontal < amountOfHorizontalSquares; horizontal++)
				squares.push( new DarkSquare({
					size: PIXEL_SIZE, 
					position: { x: horizontal * PIXEL_SIZE, y: vertical * PIXEL_SIZE },
					fadingTime: FADING_TIME,
					brighterLimit: BRIGHTER_LIMIT,
					darkerLimit: DARKER_LIMIT,
					delay: MAX_DELAY
				}))

		// Assign context to "pencil" so we can draw on the canvas
		pencil.current = canvas.current.getContext("2d", {
			alpha: false
		}) ?? undefined
	}

	/**
	 * For every animation frame, clears the canvas and updates
	 * the look of every square inside it
	 */
	function updateBackground (): void {
		if (!pencil.current) return

		// Clear canvas
		pencil.current.clearRect(0, 0, canvas.current?.width ?? 0, canvas.current?.height ?? 0)

		// Update every square look
		squares.forEach(square => {
			if (pencil.current !== undefined)
				square.animate(pencil.current)
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
