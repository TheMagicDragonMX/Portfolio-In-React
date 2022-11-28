import React, { useEffect, useRef, useState } from "react"
import "./SparkEnvironment.scss"

import { Spark } from "./Spark"
import { Coord, SparkInterface } from "./Spark/Spark"

import { random } from "@/util"

interface MovementPoints {
	startPoint: Coord
	endPoint: Coord
}

const SparkEnvironment : React.FC = () => {

	const environment = useRef<HTMLDivElement>(null)

	const SPAWN_MARGIN = 150
	const [ sparks, setSparks ] = useState<SparkInterface[]>([])

	function getMovementPoints (): MovementPoints {
		if (!environment.current) return {startPoint: { x: 0, y: 0 }, endPoint: { x: 0, y: 0 }} // Prevent null warning

		const environmentWidth = environment.current.clientWidth + SPAWN_MARGIN * 2
		const environmentHeight = environment.current.clientHeight + SPAWN_MARGIN * 2

		const startsInYAxis = random(0, 1, true) > 0.5
		const point = random(0, startsInYAxis ? environmentHeight : environmentWidth)

		const possible: Coord = {
			x: startsInYAxis ? 0 : point,
			y: startsInYAxis ? point : 0
		}

		const fromTopLeft = random(0, 1, true) > 0.5

		const startPoint: Coord = {
			x: fromTopLeft ? possible.x : environmentWidth - possible.x,
			y: fromTopLeft ? possible.y : environmentHeight - possible.y
		}
		
		const endPoint: Coord = {
			x: environmentWidth - startPoint.x,
			y: environmentHeight - startPoint.y
		}

		return {
			startPoint: { x: startPoint.x - SPAWN_MARGIN, y: startPoint.y - SPAWN_MARGIN },
			endPoint: { x: endPoint.x - SPAWN_MARGIN, y: endPoint.y - SPAWN_MARGIN }
		}
	}
	
	useEffect(() => {
		const sparkGenerator = setInterval(() => {
			if (sparks.length > 20)
				sparks.shift()

			const key = random(0, 10000)
			const timeToComplete = random(4, 6)
			const { startPoint, endPoint } = getMovementPoints()

			sparks.push({ key, timeToComplete, startPoint, endPoint })
			setSparks([ ...sparks ])
		}, 2000)

		return () => clearInterval(sparkGenerator)
	}, [])

	return <>
		<div className="spark-environment">
			<div ref={ environment} className="spark-environment-container" >
				{/* <Spark startPoint={{ x: window.innerWidth / 2, y: 0 }} endPoint={{ x: window.innerWidth / 2, y: window.innerHeight }} timeToComplete={ 5 } /> */}
				
				{ sparks.map( spark => 
					<Spark
						key={ spark.key } 
						startPoint={ spark.startPoint } 
						endPoint={ spark.endPoint } 
						timeToComplete={ spark.timeToComplete } /> )}
			</div>
		</div>
	</>
}

export default SparkEnvironment