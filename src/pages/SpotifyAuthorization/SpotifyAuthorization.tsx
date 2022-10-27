import React from "react"

const SpotifyAuthorization : React.FC = () => {

	function askSpotifyForCode () {
		window.location.href = "https://accounts.spotify.com/authorize?client_id=777ca20501164302add21cb113e0fca5&response_type=code&redirect_uri=http%3A%2F%2F127.0.0.1%3A3000%2Fspotify-code-manager&scope=user-read-playback-state%20user-modify-playback-state%20user-read-currently-playing%20user-read-email%20user-top-read%20user-read-recently-played"
	}
	
	return (
		<div>
			<button onClick={ askSpotifyForCode }>Ask for authorization</button>
		</div>
	)
}

export default SpotifyAuthorization


/* 
Request code to spotify
Spotify responds and sends to <Another Page>
<Another Page> stores it in local storage
<Another Page> sends to Favorite Music
*/