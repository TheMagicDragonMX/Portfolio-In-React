import React, { useEffect, useRef, useState } from "react"
import "./SparkEnvironment.scss"

import { Spark } from "./Spark"
import { Coord, SparkInterface } from "./Spark/Spark"

import { random } from "@/util"

interface SparkDetails {
	key: number
	details: SparkInterface
}

/**
 * ENVIRONMENT_MARGIN:
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
 * MAX_TRAVEL_TIME & MIN_TRAVEL_TIME:
 * How much it'll take for the spark to travel
 * from one side to another (min and max values)
 * 
 * sparkColors:
 * Colors that the sparks can get randomly
 */
const ENVIRONMENT_MARGIN = 150
const MAX_SPARKS = 15
const GENERATION_TIME = 2000
const MAX_TRAVEL_TIME = 6
const MIN_TRAVEL_TIME = 4
const sparkColors = ["#ffef83", "#ff83e8"]

const SparkEnvironment : React.FC = () => {

	/**
	 * Keeps track of the HTML element that contains
	 * the sparks
	 */
	const environment = useRef<HTMLDivElement>(null)

	/**
	 * Keeps the info of the sparks that are currently
	 * being displayed
	 */
	const [ sparks, setSparks ] = useState<SparkDetails[]>([])

	/**
	 * Generates the spawn and end points for the spark
	 * 
	 * The spark only spawns on one point of the "environment" 
	 * perimeter, and travels to the opposite point
	 * 
	 * The "environment" is an imaginary area that is greater than 
	 * the spark container so sparks can appear outside of it and 
	 * slide across.
	 * 
	 * Otherwise the spark would just drastically appear on the screen 
	 */
	function generateSparkSpawnAndEndPoints (): [ Coord, Coord ] {

		// The "environment" is just the sparks container + margin (clearly on both sides)
		const environmentWidth = (environment.current?.clientWidth ?? 0) + ENVIRONMENT_MARGIN * 2
		const environmentHeight = (environment.current?.clientHeight ?? 0) + ENVIRONMENT_MARGIN * 2

		/*
		First, a random side is picked so we can generate a random location on that side to spawn

		TOP = 0
		BOTTOM = 1
		LEFT = 2
		RIGHT = 3
		*/
		const side = random(0, 3) // Select on which side will spawn

		/*
		Then, depending on the selected side, the random location  could be a value between 0 and:

		- The environment's width: if the picked side was 0 (TOP) or 1 (BOTTOM)
		- The environment's height: if the picked side was 2 (LEFT) or 3 (RIGHT)
		*/
		const limits = [
			environmentWidth,	 // Top
			environmentWidth,  // Bottom
			environmentHeight, // Left
			environmentHeight	 // Right
		]
		
		// Then, a random position on the selected side is generated
		const location = random(0, limits[ side ]) 
		
		/*
		Now we can use the selected side to map spawn coords on both axis

		If the selected side was:
		- TOP: The coords would be (location, 0)
		- BOTTOM: The coords would be (location, environmentHeight)
		
		- LEFT: The coords would be (0, location)
		- RIGHT: The coords would be (environmentWidth, location)
		*/

		//														 TOP        BOTTOM 							LEFT				RIGHT
		const correspondingXCoords = [ location,	location,						0,					environmentWidth ]
		const correspondingYCoords = [ 0, 				environmentHeight,	location,		location ]

		// Now both spawn and end points can be calculated, "end" being the opposite of "spawn"
		const spawnPoint: Coord = {
			x: correspondingXCoords[ side ],
			y: correspondingYCoords[ side ]
		}

		const endPoint: Coord = {
			x: environmentWidth - spawnPoint.x,
			y: environmentHeight - spawnPoint.y
		}

		/** 
		 * At the beginning, the margin gets added to environment's width and height,
		 * but the origin coord starts on (0, 0)
		 * 
		 * This is good for calculations, but in reality we need it to be (-margin, -margin)
		 * so sparks can spawn outside of their container on every side
		 * 
		 * Subtracting the margin once on both coords adjusts this modification
		 */ 
		return [
			{ x: spawnPoint.x - ENVIRONMENT_MARGIN, y: spawnPoint.y - ENVIRONMENT_MARGIN },
			{ x: endPoint.x - ENVIRONMENT_MARGIN, y: endPoint.y - ENVIRONMENT_MARGIN }
		]
	}

	/**
	 * Generates a new spark that will move through
	 * the environment
	 * 
	 * If the max amount of sparks is reached, one gets
	 * cleared first
	 */
	function generateSpark () {
		if (sparks.length > MAX_SPARKS)
			sparks.shift()

		const key = random(0, 10000) // Keeps track of the generated spark
		const color = sparkColors[ random(0, sparkColors.length - 1) ] 
		const travelTime = random(MIN_TRAVEL_TIME, MAX_TRAVEL_TIME)
		const [ spawnPoint, endPoint ] = generateSparkSpawnAndEndPoints()

		sparks.push({ 
			key: key, 
			details: { color, travelTime, spawnPoint, endPoint } })

		setSparks([ ...sparks ])
	}
	
	/**
	 * When the component renders, generates a spark
	 * one every 2 seconds
	 * 
	 * The interval as well as the spark array get cleared in the cleanup
	 */
	useEffect(() => {
		const sparkGenerator = setInterval(() => generateSpark(), GENERATION_TIME)

		return () => {
			clearInterval(sparkGenerator)
			setSparks([])
		}
	}, [])

	return <>
		<div className="spark-environment">
			<div ref={ environment} className="spark-environment-container" >
				{ sparks.map( spark => <Spark key={ spark.key } { ...spark.details } /> )}
			</div>
		</div>
	</>
}

export default SparkEnvironment