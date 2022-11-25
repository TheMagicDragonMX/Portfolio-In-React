import React from "react"
import "./SparkRain.scss"

import { Spark } from "./Spark"
import { useInView } from "framer-motion"

const SparkRain : React.FC = () => {
	// const [  ] = useInView()
	
	return <>
		<div className="spark-rain">
			<div className="spark-rain-container">
				<Spark />
			</div>
		</div>
	</>
}

export default SparkRain