import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const SpotifyCodeReceiver : React.FC = () => {

	const spotifyCode = new URLSearchParams(location.search).get("code")
	const navigate = useNavigate()
	
	useEffect(() => {
		localStorage.setItem("spotifyCode", spotifyCode ?? "error")

		setTimeout(() => navigate("/favorite-music"), 5000)
	})

	return (
		<div>
			<h2>Code received</h2>
			<h3>Redirecting to music</h3>
		</div>
	)
}

export default SpotifyCodeReceiver
