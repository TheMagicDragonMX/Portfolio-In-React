import React, { useEffect, useRef, useState } from "react"
import "./MapBackground.scss"

interface Coord {
	x: number
	y: number
}
class DarkSquare {
	size: number
	position: Coord

	private readonly LIGHTER_LIMIT = 10
	private readonly DARKER_LIMIT = 5
	private gray: number
	private becomingDarker: boolean

	constructor (size: number, position: Coord) {
		this.size = size
		this.position = position

		this.gray = Math.floor(Math.random() * this.LIGHTER_LIMIT) + this.DARKER_LIMIT
		this.becomingDarker = (Math.random() > 0.5)
	}

	draw (pencil: CanvasRenderingContext2D) {
		pencil.fillStyle = `rgb(${ this.gray }, ${ this.gray }, ${ this.gray })`
		pencil.fillRect(this.position.x, this.position.y, this.size, this.size)
	}

	animate (pencil: CanvasRenderingContext2D) {
		this.gray += (this.becomingDarker ? -1 : 1)

		if (this.gray > 100)
			this.becomingDarker = true
			
		else if (this.gray < 10)
			this.becomingDarker = false

		this.draw(pencil)
	}

}

const MapBackground : React.FC = () => {

	const mapBackground = useRef<HTMLDivElement>(null)
	const canvas = useRef<HTMLCanvasElement>(null)
	
	const squares: DarkSquare[] = []
	const PIXEL_SIZE = 115

	useEffect(() => {
		if (!canvas.current) return
		if (!mapBackground.current) return

		canvas.current.width = mapBackground.current.offsetWidth
		canvas.current.height = mapBackground.current.offsetHeight

		const amountOfHorizontalSquares = Math.round(canvas.current.width / PIXEL_SIZE) + 1
		const amountOfVerticalSquares = Math.round(canvas.current.height / PIXEL_SIZE) + 1

		// const amountOfHorizontalSquares = 1
		// const amountOfVerticalSquares = 1
		

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
