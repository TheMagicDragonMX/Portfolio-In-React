import React, { useEffect, useMemo, useRef } from "react"
import "./MapBackground.scss"

import { random } from "@/util"

interface Coord {
	x: number
	y: number
}

interface DarkSquareGroup {
	positions: Coord[]
	delay: number
}

/**
 * An array that holds the different delays that the squares 
 * can get on their first blink
 * 
 * Having defined delays helps on grouping squares, which 
 * makes it easer for the canvas to draw 
 */
const delays = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000]

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
	 * - The positions of the squares that belong to the group
	 * 
	 * Each group having a unique delay time makes it possible 
	 * for the canvas to draw all squares of the group at once
	 */
	const squareGroups: DarkSquareGroup[] = useMemo( () => delays.map( delay => ({
		delay: delay,
		positions: []
	})), [])

	/**
	 * Once the component is rendered, initializes
	 * background scenario and animation
	 */
	useEffect(() => {

		setCanvasSizeToFitContainer()
		createSquaresGroups()
		
		updateBackground()

		return clearSquares
	}, [])


	/**
	 * The array that contains the squares must be emptied so
	 * when next time the user enters the map, they can be 
	 * created again
	 */
	function clearSquares (): void {
		squareGroups.forEach( group => { group.positions = [] } )
	}

	/**
	 * It is intended that the canvas fits its container,
	 * but using the CSS 100% value affects it's proportions
	 * and causes awful drawing, that's why the size is set
	 * with JS
	 */
	function setCanvasSizeToFitContainer (): void {
		if (!canvas.current) return // Prevent null warning
		if (!mapBackground.current) return // Prevent null warning

		canvas.current.width = mapBackground.current.clientWidth
		canvas.current.height = mapBackground.current.clientHeight + 1 // Covers the container when it's height has decimal values 
	}

	/**
	 * Depending on the canvas size, determines how many squares fit
	 * in and generates positions for them (separated by groups)
	 */
	function createSquaresGroups (): void {
		if (!canvas.current) return // Prevent null warning

		// Determine how many squares are necessary to fill the entire canvas
		const horizontalCapacity = Math.floor(canvas.current.width / SQUARE_SIZE) + 1
		const verticalCapacity = Math.floor(canvas.current.height / SQUARE_SIZE) + 1
		
		// Generate positions of squares for the background
		for (let y = 0; y < verticalCapacity; y++)
			for (let x = 0; x < horizontalCapacity; x++) {

				// Determine from which group the square will be part
				const correspondingDelay = delays[ random(0, delays.length - 1) ]

				// Add square position to the randomly selected group
				const correspondingGroup = squareGroups.find( group => group.delay === correspondingDelay )
				correspondingGroup?.positions.push({ x: x * SQUARE_SIZE, y: y * SQUARE_SIZE })
			}
	}

	/**
	 * Converts the given degrees to radians
	 */
	function toRadians (degrees: number): number { 
		return degrees * Math.PI / 180
	}

	/**
	 * Mimics the CSS ease-in-out timing function by returning
	 * a percentage of the process depending on the time
	 * 
	 * It also considers the phase shift given by a delay
	 */
	function getEaseInOutPercentage (delay: number): number {
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
		if (!pencil) return // Prevent null warning

		// Clear canvas
		pencil.clearRect(0, 0, canvas.current?.width ?? 0, canvas.current?.height ?? 0)

		// Update every square group with their corresponding color
		squareGroups.forEach( group => {

			// Set canvas pencil color to the according gray
			const grayPercentage = getEaseInOutPercentage( group.delay )
			const grayColor = Math.floor( (BRIGHTNESS - DARKNESS) * grayPercentage + DARKNESS )
			pencil.fillStyle = `rgb(${ grayColor }, ${ grayColor }, ${ grayColor })`

			// Update every square of the group
			group.positions.forEach( position => pencil?.fillRect(position.x, position.y, SQUARE_SIZE, SQUARE_SIZE) )
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
