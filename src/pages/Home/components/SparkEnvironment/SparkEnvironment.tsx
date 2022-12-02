import React, { useEffect, useRef, useState } from "react"
import "./SparkEnvironment.scss"

import { Spark } from "./Spark"
import { Coord, SparkInterface } from "./Spark/Spark"

import { random } from "@/util"

interface MovementPoints {
	spawnPoint: Coord
	destiny: Coord
}

const SparkEnvironment : React.FC = () => {

	/**
	 * Keeps track of the HTML element that contains
	 * the sparks
	 */
	const environment = useRef<HTMLDivElement>(null)

	/**
	 * SPAWN_MARGIN:
	 * How much the container grows for the sparks to
	 * travel from side to side
	 * 
	 * MAX_SPARKS:
	 * How many sparks at once there can be
	 * 
	 * GENERATION_TIME:
	 * In seconds, how much it will take to generate
	 * a new spark
	 * 
	 * sparkColors:
	 * Colors that the sparks can get randomly
	 */
	const SPAWN_MARGIN = 150
	const MAX_SPARKS = 15
	const GENERATION_TIME = 2000
	const sparkColors = ["#ffef83", "#ff83e8"]

	/**
	 * Keeps the info of the sparks that are currently
	 * being displayed
	 */
	const [ sparks, setSparks ] = useState<SparkInterface[]>([])

	/**
	 * Determines from where the spark will spawn and where 
	 * it will go.
	 * 
	 * "Environment" is a rectangle, a spark spawns at one point
	 * of its perimeter and travels to its opposite point 
	 * 
	 * Returns an object containing both the spawn point 
	 * and destiny
	 */
	function createSparkMovementPoints (): MovementPoints {
		if (!environment.current) return {spawnPoint: { x: 0, y: 0 }, destiny: { x: 0, y: 0 }} // Prevent null warning

		// Environment is just the container plus the selected margin
		const environmentWidth = environment.current.clientWidth + SPAWN_MARGIN * 2
		const environmentHeight = environment.current.clientHeight + SPAWN_MARGIN * 2

		// Gets a number randomly between 0 and the size of one the rectangle sides (horizontal or vertical)
		const spawnInVerticalSide = random(0, 1, true) > 0.5
		const point = random(0, spawnInVerticalSide ? environmentHeight : environmentWidth)

		// If vertical, X coordinate is 0, otherwise Y coordinate is
		const possible: Coord = {
			x: spawnInVerticalSide ? 0 : point,
			y: spawnInVerticalSide ? point : 0
		}

		// Determine if the spark will spawn in left || top sides, or in right || bottom sides
		const fromTopLeftSides = random(0, 1, true) > 0.5
		const spawnPoint: Coord = {
			x: fromTopLeftSides ? possible.x : environmentWidth - possible.x,
			y: fromTopLeftSides ? possible.y : environmentHeight - possible.y
		}
		
		// Calculate the opposite of the spawn pont
		const destiny: Coord = {
			x: environmentWidth - spawnPoint.x,
			y: environmentHeight - spawnPoint.y
		}

		/** 
		 * Margin increases rectangle's sides to right and bottom for points calculation
		 * Then it gets subtracted for correct coordinates locations 
		 */ 
		return {
			spawnPoint: { x: spawnPoint.x - SPAWN_MARGIN, y: spawnPoint.y - SPAWN_MARGIN },
			destiny: { x: destiny.x - SPAWN_MARGIN, y: destiny.y - SPAWN_MARGIN }
		}
	}

	/**
	 * When there aren't too much sparks...
	 * 
	 * Generates a new spark that will move through
	 * the environment
	 */
	function generateSpark () {
		if (sparks.length > MAX_SPARKS)
			sparks.shift()

		const key = random(0, 10000)
		
		const color = sparkColors[ random(0, sparkColors.length - 1) ]
		const timeToComplete = random(4, 6)
		const { spawnPoint, destiny } = createSparkMovementPoints()

		sparks.push({ key, color, timeToComplete, spawnPoint, destiny })
		setSparks([ ...sparks ])
	}
	
	/**
	 * When the component renders, generates a spark
	 * one every 2 seconds
	 */
	useEffect(() => {
		const sparkGenerator = setInterval(() => generateSpark(), GENERATION_TIME)

		return () => clearInterval(sparkGenerator)
	}, [])

	return <>
		<div className="spark-environment">
			<div ref={ environment} className="spark-environment-container" >
				{ sparks.map( spark => 
					<Spark
						key={ spark.key } 
						color={ spark.color }
						spawnPoint={ spark.spawnPoint } 
						destiny={ spark.destiny } 
						timeToComplete={ spark.timeToComplete } /> )}
			</div>
		</div>
	</>
}

export default SparkEnvironment