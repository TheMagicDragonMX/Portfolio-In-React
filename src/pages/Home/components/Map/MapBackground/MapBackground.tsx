import React, { useEffect, useRef } from "react"
import "./MapBackground.scss"

interface Coord {
	x: number
	y: number
}
class DarkSquare {
	size: number
	position: Coord

	private readonly LIGHTER_LIMIT = 50
	private readonly DARKER_LIMIT = 10
	private gray: number
	private becomingDarker: boolean

	constructor (size: number, position: Coord) {
		this.size = size
		this.position = position

		this.gray = Math.floor(Math.random() * this.LIGHTER_LIMIT) + this.DARKER_LIMIT
		this.becomingDarker = true
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

	const square = new DarkSquare(300, { x: 0, y: 0 })
	const squareTwo = new DarkSquare(300, { x: 350, y: 0 })
	const squareTree = new DarkSquare(300, { x: 700, y: 0 })

	useEffect(() => {
		if (!canvas.current) return
		if (!mapBackground.current) return

		canvas.current.width = mapBackground.current.offsetWidth
		canvas.current.height = mapBackground.current.offsetHeight

		updateBackground()
	}, [])

	function updateBackground () {
		const pencil = canvas.current?.getContext("2d")
		if (!pencil) return
		pencil.clearRect(0, 0, canvas.current?.width ?? 0, canvas.current?.height ?? 0)

		square.animate(pencil)
		squareTwo.animate(pencil)
		squareTree.animate(pencil)

		requestAnimationFrame(updateBackground)
	}

	return <>
		<div className="map-background" ref={ mapBackground }>
			<canvas ref={ canvas }></canvas>
		</div>
	</>
}

export default MapBackground
