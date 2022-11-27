import React from "react"
import "./Spark.scss"

interface Coord {
	x: number
	y: number
}

export interface SparkInterface {
	startPoint: Coord
	endPoint: Coord
	timeToFall: number
}

const Spark : React.FC<SparkInterface> = ({ startPoint, endPoint, timeToFall }) => {

	const sparkStyle = {
		"--startPointX": startPoint.x + "px",
		"--startPointY": startPoint.y + "px",

		"--endPointX": endPoint.x + "px",
		"--endPointY": endPoint.y + "px",

		"--timeToFall": timeToFall + "s"
	} as React.CSSProperties

	return <>
		<div className="spark" style={ sparkStyle }></div>
	</>
}

export default Spark