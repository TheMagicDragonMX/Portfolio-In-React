import React, { useEffect, useRef, useState } from "react"
import "./MapBackground.scss"

const MapBackground : React.FC = () => {

	const mapBackground = useRef<HTMLDivElement>(null)

	const getRandomDelay = () => {
		const delay = Math.floor( Math.random() * 1000 )
		return `${ delay }ms`
	}

	const [ squares, setSquares ] = useState(new Array(0).fill(""))
	const [ groups, setGroups ] = useState(new Array(10).fill(""))

	useEffect(() => {
		const availableHorizontalSquares = Math.round((mapBackground.current?.parentElement?.offsetWidth ?? 15) / 15)
		const availableVerticalSquares = Math.round((mapBackground.current?.parentElement?.offsetHeight ?? 15) / 15)

		setSquares( new Array(availableHorizontalSquares).fill("") )
		setGroups( new Array(availableVerticalSquares).fill("") )
	}, [])

	return <>
		<div className="map-background" ref={ mapBackground }>
			{
				groups.map( (group, key) => 
					<div key={ key }>
						{ 
							squares.map( (square, key) => 
								<div key={ key } className="little-square" style={{ "--delay": getRandomDelay() } as React.CSSProperties}></div> 
							)
						}
					</div>
				)
			}
		</div>
	</>
}

export default MapBackground
