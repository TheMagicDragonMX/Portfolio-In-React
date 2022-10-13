import React from "react"
import "./App.scss"

import { Routes, Route } from "react-router-dom"

import { Background } from "./components"
import { Greeting, Home } from "./pages"


function App () {
	const hasVisitedPageBefore = false
	
	return <>
		<Background>
			<Routes>
				<Route path="/" element={ hasVisitedPageBefore ? <Home/> : <Greeting /> } />
			</Routes>
		</Background>
	</>
}

export default App
