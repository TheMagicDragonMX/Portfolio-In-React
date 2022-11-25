import React from "react"
import "./Spark.scss"

export interface SparkInterface {
	
}

const Spark : React.FC<SparkInterface> = () => {

	function getSparkDestiny () {
		const leftDestiny = Math.floor(Math.random() * (50 - -50)) - 50
		const topDestiny = (leftDestiny > 0)
			? Math.floor(Math.random() * (0 - -50)) - 50
			: Math.floor(Math.random() * 50)

		return [ leftDestiny, topDestiny ]
	}

	const [ left, right ] = getSparkDestiny()

	return <div className="spark" style={{ 
		"--topDestiny": left + "%", 
		"--leftDestiny": right + "%"
	} as React.CSSProperties}></div>
}

export default Spark