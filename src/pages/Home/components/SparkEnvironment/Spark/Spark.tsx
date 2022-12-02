import React from "react"
import "./Spark.scss"

export interface Coord {
	x: number
	y: number
}

export interface SparkInterface {
	key: number

	color: string
	spawnPoint: Coord
	destiny: Coord
	timeToComplete: number
}

const Spark : React.FC<SparkInterface> = ({ color, spawnPoint, destiny, timeToComplete }) => {

	/**
	 * Setups CSS variables for the spark
	 */
	const sparkStyle = {
		"--sparkColor": color,

		"--startPointX": spawnPoint.x + "px",
		"--startPointY": spawnPoint.y + "px",

		"--endPointX": destiny.x + "px",
		"--endPointY": destiny.y + "px",

		"--timeToComplete": timeToComplete + "s"
	} as React.CSSProperties

	return <div className="spark" style={ sparkStyle }></div>
}

export default Spark