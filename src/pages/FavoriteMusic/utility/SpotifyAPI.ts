import axios from "axios"

const CLIENT_ID = "777ca20501164302add21cb113e0fca5"
const CLIENT_SECRET = "81f8455023474fa2afb8fa8f18a75223"
const REFRESH_TOKEN = "AQC5Ml7l0wxCxGhSdHMqCqxMztqD4EdoPNBKOW7jy2LcgjIWMwWa_jsKEUZOVIH392orpg6eFuUwsJml9q0fpEuKmmhiCmdAlWy2w0k2swzQKDdxHr6RVvK73vpXxXy_Vc0"

export let accessToken = "BQCNY0ivKNVj8iHJVryxpgAxqHMbi4OlMgNNJEvK5wRk9i13kviV6wqcze_tnzHY6o2OaPw4N8lXl84OqFr02MVFlXJV0R2C1Ezf7o6Li_sO8grQKnRaIREX8E6Qt00YwIu2W0sLXISp4Fmq-MH-IjwEEZ74COUvOi_B57SlAYJbeVemWomx6juoMhINeLTUgsUK6g"


/**
 * Requests a token to the Spotify Web API
 */
export async function requestNewToken (code: string): Promise<string> {

	const newTokenParams = new URLSearchParams({ 
		grant_type: "authorization_code",
		code: code,
		redirect_uri: "http://127.0.0.1:3000/favorite-music"
	})

	const newTokenResponse = await axios.post("https://accounts.spotify.com/api/token", newTokenParams.toString(), {
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
			"Authorization": `Basic ${ window.btoa(CLIENT_ID + ":" + CLIENT_SECRET) }`
		}
	})

	return newTokenResponse.data
}

/**
 * Requests a new token to the Spotify Web API
 */
export async function requestRefreshedToken (): Promise<string> {

	const newTokenParams = new URLSearchParams({ 
		grant_type: "refresh_token",
		refresh_token: REFRESH_TOKEN
	})

	const newTokenResponse = await axios.post("https://accounts.spotify.com/api/token", newTokenParams.toString(), {
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
			"Authorization": `Basic ${ window.btoa(CLIENT_ID + ":" + CLIENT_SECRET) }`
		}
	})

	return newTokenResponse.data.access_token
}

/**
 * Makes a request to get an artist's data
 * 
 * @param artistID Spotify ID of the wanted artist
 */
async function requestArtistData (artistID: string) {
	
	const artistDataResponse = await axios.get(`https://api.spotify.com/v1/artists/${ artistID }`, {
		headers: {
			"Content-Type": "application/json",
			"Authorization": `Bearer ${ accessToken }`
		}
	})

	return artistDataResponse		
}

/**
 * Retrieves the data of the given artist
 * 
 * It'll refresh the token if necessary
 * 
 * @param artistID Spotify ID of the wanted artist
 */
export async function fetchArtistData (artistID: string) {	

	let artistDataResponse = await requestArtistData(artistID)

	while (artistDataResponse.status === 401) {
		accessToken = await requestRefreshedToken()
		artistDataResponse = await requestArtistData(artistID)
	}

	const artistData = await artistDataResponse.data as SpotifyApi.SingleArtistResponse
	return artistData
}

/**
 * Makes a request to get several artist's data
 * 
 * @param artistsIDs Array of Spotify IDs of the wanted artists
 */
async function requestSeveralArtistData (artistsIDs: Array<string>) {
	
	const severalArtistsDataResponse = await axios.get("https://api.spotify.com/v1/artists", {
		headers: {
			"Content-Type": "application/json",
			"Authorization": `Bearer ${ accessToken }`
		},
		params: {
			ids: artistsIDs.join(",")
		}
	})

	return severalArtistsDataResponse		
}

/**
 * Retrieves the data of all the given artists
 * 
 * It'll refresh the token if necessary
 * 
 * @param artistsIDs Array of Spotify IDs of the wanted artists
 */
export async function fetchSeveralArtistData (artistsIDs: Array<string>): Promise<SpotifyApi.MultipleArtistsResponse> {	

	try {
		const severalArtistsDataResponse = await requestSeveralArtistData(artistsIDs)
		const severalArtistsData = await severalArtistsDataResponse.data as SpotifyApi.MultipleArtistsResponse
		
		return severalArtistsData
	}
	
	catch (error) {
		console.log(error)
		accessToken = await requestRefreshedToken()
		return await fetchSeveralArtistData(artistsIDs)
	}

}


/*
Scopes that are possibly needed
- user-read-playback-state: Read access to a user’s player state.
- user-modify-playback-state: Write access to a user’s playback state
- user-read-currently-playing: Read access to a user’s currently playing content.
- user-read-email: Read access to user’s email address.
- user-top-read: Read access to a user's top artists and tracks.
- user-read-recently-played: Read access to a user’s recently played tracks.

- user-follow-read:	Read access to the list of artists and other users that the user follows.

*/