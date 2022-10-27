import React from "react"
import "./App.scss"

import { Routes, Route } from "react-router-dom"

import { Background } from "./components"
import { FavoriteMusic, Greeting, Home, SpotifyAuthorization } from "./pages"
import { SpotifyCodeReceiver } from "./pages/SpotifyCodeReceiver"


function App () {
	// const hasVisitedPageBefore = localStorage.getItem("hasBeenHereBefore") === "true"
	const hasVisitedPageBefore = true
	
	return <>
		<Background>
			<Routes>
				<Route index element={ hasVisitedPageBefore ? <Home/> : <Greeting /> } />

				<Route path="home" element={ <Home /> } />
				
				<Route path="favorite-music" element={ <FavoriteMusic /> } />


				<Route path="spotify-authorization" element={ <SpotifyAuthorization /> } />
				<Route path="spotify-code-manager" element={ <SpotifyCodeReceiver /> } />
				
				<Route path="*" element={ <h1>Nothing! <i>for now...</i></h1> } />
			</Routes>
		</Background>
	</>
}

export default App
