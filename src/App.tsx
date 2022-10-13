import React from "react"
import "./App.scss"
import { Background } from "./components"
import { Home } from "./pages"

function App () {
	return <>
		<Background>
			<Home />
		</Background>
	</>
}

export default App
