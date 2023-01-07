import React from "react"
import "./Spark.scss"

export interface Coord {
	x: number
	y: number
}

export interface SparkInterface {
	color: string
	spawnPoint: Coord
	endPoint: Coord
	travelTime: number
}

const Spark : React.FC<SparkInterface> = ({ color, spawnPoint, endPoint, travelTime }) => {

	/**
	 * Setups CSS variables for the spark
	 */
	const sparkStyle = {
		"--sparkColor": color,

		"--startPointX": spawnPoint.x + "px",
		"--startPointY": spawnPoint.y + "px",

		"--endPointX": endPoint.x + "px",
		"--endPointY": endPoint.y + "px",

		"--travelTime": travelTime + "s"
	} as React.CSSProperties

	return <div className="spark" style={ sparkStyle }></div>
}

export default Spark