import React, { useEffect, useRef } from "react"
import "./MapBackground.scss"

interface Coord {
	x: number
	y: number
}
class DarkSquare {
	size: number
	position: Coord

	private readonly LIGHTER_LIMIT = 40
	private readonly DARKER_LIMIT = 15
	private readonly ANIMATION_DURATION = 4000
	private gray: number
	private delay: number

	constructor (size: number, position: Coord) {
		this.size = size
		this.position = position

		this.gray = Math.floor(Math.random() * this.LIGHTER_LIMIT) + this.DARKER_LIMIT
		this.delay = Math.floor(Math.random() * 1000)
	}

	private toRadians = (degrees: number) => (degrees * Math.PI / 180)

	private getEaseInOutPercentage = () => {
		const milliseconds = (new Date()).getTime()
		const period = this.ANIMATION_DURATION / 360
		const angleInRadiants = this.toRadians( milliseconds / period + this.delay )
		const percentage = Math.sin( angleInRadiants ) / 2 + 0.5 // <- Turns [1, -1] range of sine into [1, 0]

		return percentage
	}

	draw (pencil: CanvasRenderingContext2D) {
		pencil.fillStyle = `rgb(${ this.gray }, ${ this.gray }, ${ this.gray })`
		pencil.fillRect(this.position.x, this.position.y, this.size, this.size)
	}

	animate (pencil: CanvasRenderingContext2D) {
		const grayPercentage = this.getEaseInOutPercentage()

		this.gray = Number((this.LIGHTER_LIMIT * grayPercentage).toFixed(0))
		this.draw(pencil)
	}
}

const MapBackground : React.FC = () => {

	const mapBackground = useRef<HTMLDivElement>(null)
	const canvas = useRef<HTMLCanvasElement>(null)
	
	const squares: DarkSquare[] = []
	const PIXEL_SIZE = 15

	useEffect(() => {
		if (!canvas.current) return
		if (!mapBackground.current) return

		canvas.current.width = mapBackground.current.offsetWidth
		canvas.current.height = mapBackground.current.offsetHeight

		const amountOfHorizontalSquares = Math.round(canvas.current.width / PIXEL_SIZE) + 1
		const amountOfVerticalSquares = Math.round(canvas.current.height / PIXEL_SIZE) + 1

		for (let vertical = 0; vertical < amountOfVerticalSquares; vertical++)
			for (let horizontal = 0; horizontal < amountOfHorizontalSquares; horizontal++)
				squares.push( new DarkSquare(PIXEL_SIZE, { x: horizontal * PIXEL_SIZE, y: vertical * PIXEL_SIZE }))

		updateBackground()
	}, [])

	function updateBackground () {
		const pencil = canvas.current?.getContext("2d")
		if (!pencil) return
		pencil.clearRect(0, 0, canvas.current?.width ?? 0, canvas.current?.height ?? 0)

		squares.forEach(square => square.animate(pencil))

		requestAnimationFrame(updateBackground)
	}

	return <>
		<div className="map-background" ref={ mapBackground }>
			<canvas ref={ canvas }></canvas>
		</div>
	</>
}

export default MapBackground
