import { random } from "@/util"
import React from "react"
import "./Spark.scss"

export interface SparkInterface {
	
}

const Spark : React.FC<SparkInterface> = () => {

	function calculateStartPoint () {
		const leftStartPoint = -20
		const topStartPoint = random(-100, 80)

		return [ leftStartPoint, topStartPoint ]
	}

	const [ left, top ] = calculateStartPoint()

	return <div className="spark" style={{ 
		"--startPointTop": top + "%",
		"--startPointLeft": left + "%" 
	} as React.CSSProperties}></div>
}

export default Spark