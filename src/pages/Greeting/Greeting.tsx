import React, { useEffect, useRef } from "react"
import "./Greeting.scss"

export interface GreetingInterface {}

const Greetings : React.FC<GreetingInterface> = () => {
	
	/**
	 * Keeps track of the component that displays a greeting to the user
	 */
	const greeting = useRef<HTMLHeadingElement>(null)

	/**
	 * Determines how fast the greeting will be typed
	 */
	const TYPING_SPEED = 200

	/**
	 * Allows the execution of some code after certain time asynchronously
	 * 
	 * @param time In `ms`
	 */
	const wait = (time: number) => new Promise((resolve) => setTimeout(resolve, time))

	/**
	 * Displays the given message char by char until it's complete
	 */
	async function displayTextInGreeting (message: string, durationPerTick: number) {
		if (!greeting.current) return

		for (const char of message) {
			greeting.current.innerHTML += char
			await wait(durationPerTick)
		}
	}

	/**
	 * Clears the displayed message char by char until emptied
	 */
	async function clearTextInGreeting (durationPerTick: number) {
		if (!greeting.current) return

		while (greeting.current.innerHTML !== "") {
			greeting.current.innerHTML = greeting.current.innerHTML.substring(0, greeting.current.innerHTML.length - 1)
			await wait(durationPerTick)
		}
	}
	
	/**
	 * Greets the user to the page
	 */
	async function greetUser () {
		await wait(1000)
		await displayTextInGreeting("Hi", TYPING_SPEED)
		await wait(2400)
		await clearTextInGreeting(TYPING_SPEED)
		
		await displayTextInGreeting("I'm Alex! ", TYPING_SPEED)
		await wait(1200)
		await displayTextInGreeting("🤗", TYPING_SPEED)
		await wait(2400)
		await clearTextInGreeting(TYPING_SPEED)
	}

	/**
	 * Calls the greeting function at component load
	 */
	useEffect(() => {
		greetUser()
	}, [])
	
	return (
		<div className="page-load">
			<div ref={ greeting } className="greeting"></div>
		</div>
	)
}

export default Greetings
