const CLIENT_ID = "777ca20501164302add21cb113e0fca5"
const CLIENT_SECRET = "81f8455023474fa2afb8fa8f18a75223"

const REFRESH_TOKEN = "AQApqZqhRn4c6uV8o_pzljxQGMuTjScqVcqXpw_sWXVPDj1DspOilD9A-SgvYsvqjJ3vo2prtDUWvjyLwMfIRu5OpcQf8b2AEeMhEXWRcsmeT2orrzVIeDAZAvFg7ACK3vE"
let token = ""

/**
 * Requests a new token to the Spotify Web API
 */
async function requestRefreshedToken () {
	try {
		const refreshedTokenResponse = await fetch("https://accounts.spotify.com/api/token", {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
				"Authorization": `Basic ${ window.btoa(CLIENT_ID + ":" + CLIENT_SECRET) }`
				// "Authorization": `Basic ${ new Buffer(CLIENT_ID + ":" + CLIENT_SECRET).toString("base64") }`
			},
			body: JSON.stringify({
				"grant_type": "refresh_token",
				"refresh_token": REFRESH_TOKEN,
			})
		})

		const refreshedTokenData = await refreshedTokenResponse.json()
		return refreshedTokenData.access_token
	}

	catch (error) {
		console.log(error)
	}
}

/**
 * Makes a request to get an artist's data
 * 
 * @param artistID Spotify ID of the wanted artist
 */
async function requestArtistData (artistID: string): Promise<Response> {
	const artistResponse = await fetch(`https://api.spotify.com/v1/artists/${ artistID }`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			"Authorization": `Bearer ${ token }`
		}
	})

	return artistResponse		
}

/**
 * Retrieves the data of the given artist
 * 
 * It'll refresh the token if necessary
 * 
 * @param artistID Spotify ID of the wanted artist
 */
export async function fetchArtistData (artistID: string) {	
	token = await requestRefreshedToken()
	console.log("Acquired new token: " + token)
	const artistDataResponse = await requestArtistData(artistID)

	const artistData = await artistDataResponse.json() as SpotifyApi.SingleArtistResponse
	return artistData
}