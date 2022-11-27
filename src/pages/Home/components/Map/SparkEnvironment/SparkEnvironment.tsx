import React, { useEffect, useRef, useState } from "react"
import "./SparkEnvironment.scss"

import { Spark } from "./Spark"
import { SparkInterface } from "./Spark/Spark"

const SparkEnvironment : React.FC = () => {
	const [ sparks, setSparks ] = useState<SparkInterface[]>([])

	return <>
		<div className="spark-environment">
			<div className="spark-environment-container">
				{/* { sparks } */}
				<Spark startPoint={{ x: -10, y: -10 }} endPoint={{ x: 10, y: 10 }} timeToFall={ 6 } />
			</div>
		</div>
	</>
}

export default SparkEnvironment