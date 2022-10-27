import { useEffect, useState } from "react"
import axios from "axios"

export interface AccessTokenResponse {
	access_token: string
	token_type: string
	scope: string
	expires_in: number
	refresh_token: string
}

export interface RefreshedTokenResponse {
	access_token: string
	token_type: string
	scope: string
	expires_in: number
}

export const useSpotifyAuth = (code: string) => {

	const CLIENT_ID = "777ca20501164302add21cb113e0fca5"
	const CLIENT_SECRET = "81f8455023474fa2afb8fa8f18a75223"

	const [ token, setToken ] = useState<string>("")
	const [ refreshToken, setRefreshToken ] = useState<string>("")
	const [ expirationTime, setExpirationTime ] = useState<number>(0)

	const [ tokenAcquired, setTokenAcquired ] = useState<boolean>(false)

	/**
	 * Requests a new access token to the Spotify Web API
	 */
	async function retrieveAccessToken () {

		try {
			const accessTokenRequestParams = new URLSearchParams({
				grant_type: "authorization_code",
				code: code,
				redirect_uri: "http://127.0.0.1:3000/favorite-music"
			})
			
			const accessTokenResponse = await axios.post<AccessTokenResponse>("https://accounts.spotify.com/api/token", accessTokenRequestParams.toString(), {
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
					"Authorization": `Basic ${ window.btoa(CLIENT_ID + ":" + CLIENT_SECRET) }`
				}
			})
	
			setToken(accessTokenResponse.data.access_token)
			setTokenAcquired(true)
			setRefreshToken(accessTokenResponse.data.refresh_token)
			setExpirationTime(accessTokenResponse.data.expires_in)
		}

		catch {
			setTokenAcquired(false)
		}
	}

	/**
	 * Requests a new refreshed token to the Spotify Web API
	 */
	async function retrieveRefreshedToken () {
		
		try {
			const refreshedTokenRequestParams = new URLSearchParams({
				grant_type: "refresh_token",
				refresh_token: refreshToken
			})
			
			const refreshedTokenResponse = await axios.post<RefreshedTokenResponse>("https://accounts.spotify.com/api/token", refreshedTokenRequestParams.toString(), {
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
					"Authorization": `Basic ${ window.btoa(CLIENT_ID + ":" + CLIENT_SECRET) }`
				}
			})
	
			setToken(refreshedTokenResponse.data.access_token)
			setTokenAcquired(true)
			setExpirationTime(refreshedTokenResponse.data.expires_in)
		}
		
		catch {
			setTokenAcquired(false)
		}
	}

	/**
	 * Retrieves a new access token
	 */
	useEffect(() => {
		retrieveAccessToken()
	}, [])

	/**
	 * Creates a timeout so the token gets refreshed once its expiration 
	 * time is about one minute to expire
	 */
	useEffect(() => {
		if (expirationTime < 10) return
		const refreshTokenTimeout = setTimeout(() => retrieveRefreshedToken(), (expirationTime - 60) * 1000)	

		return () => clearTimeout(refreshTokenTimeout)
	}, [ expirationTime ])
	

	return [ token, tokenAcquired ]
}

export default useSpotifyAuth