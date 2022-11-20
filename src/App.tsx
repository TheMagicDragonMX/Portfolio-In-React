import React from "react"
import "./App.scss"

import { Routes, Route } from "react-router-dom"
import { Home } from "./pages"


function App () {
	return <>
		<Routes>
			<Route index element={ <Home/> } />

			<Route path="home" element={ <Home /> } />
			
			<Route path="*" element={ <h1>Nothing! <i>for now...</i></h1> } />
		</Routes>
	</>
}

export default App
