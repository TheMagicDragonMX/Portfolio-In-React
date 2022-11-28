import React from "react"
import "./Spark.scss"

export interface Coord {
	x: number
	y: number
}

export interface SparkInterface {
	key: number
	startPoint: Coord
	endPoint: Coord
	timeToComplete: number
}

const Spark : React.FC<SparkInterface> = ({ startPoint, endPoint, timeToComplete }) => {

	const sparkStyle = {
		"--startPointX": startPoint.x + "px",
		"--startPointY": startPoint.y + "px",

		"--endPointX": endPoint.x + "px",
		"--endPointY": endPoint.y + "px",

		"--timeToComplete": timeToComplete + "s"
	} as React.CSSProperties

	return <div className="spark" style={ sparkStyle }></div>
}

export default Spark