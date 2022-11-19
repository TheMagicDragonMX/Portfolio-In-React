import React from "react"
import "./App.scss"

import { Routes, Route } from "react-router-dom"
import { Background } from "./components"
import { Home } from "./pages"


function App () {
	return <>
		<Background>
			<Routes>
				<Route index element={ <Home/> } />

				<Route path="home" element={ <Home /> } />
				
				<Route path="*" element={ <h1>Nothing! <i>for now...</i></h1> } />
			</Routes>
		</Background>
	</>
}

export default App
