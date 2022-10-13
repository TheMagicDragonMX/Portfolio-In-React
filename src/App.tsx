import React from "react"
import "./App.scss"

import { Routes, Route } from "react-router-dom"

import { Background } from "./components"
import { Greeting, Home } from "./pages"


function App () {
	const hasVisitedPageBefore = localStorage.getItem("hasBeenHereBefore") === "true"
	
	return <>
		<Background>
			<Routes>
				<Route path="/" element={ hasVisitedPageBefore ? <Home/> : <Greeting /> } />
				<Route path="/home" element={ <Home /> } />
			</Routes>
		</Background>
	</>
}

export default App
