import React from "react"
import "./MapBackground.scss"

const MapBackground : React.FC = () => {

	const getRandomGrayColor = () => {
		const gray = Math.floor( Math.random() * 20 ) + 10
		return `rgb(${ gray }, ${ gray }, ${ gray })`
	}

	const columns = 150
	const rows = 100
	const squares = new Array<string>(columns).fill( "" )
	const groups = new Array<string>(rows).fill( "" )

	return <>
		<div className="map-background">
			{
				groups.map( (group, key) => 
					<div key={ key }>
						{ 
							squares.map( (square, key) => 
								<div key={ key } className="little-square" style={{ backgroundColor: getRandomGrayColor() }}></div> 
							)
						}
					</div>
				)
			}
		</div>
	</>
}

export default MapBackground
