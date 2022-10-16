import React from "react"
import "./FavoriteMusic.scss"

import soundwaveV3 from "@/assets/soundwave_V3.jpg"

export interface FavoriteMusicInterface {}

const FavoriteMusic : React.FC<FavoriteMusicInterface> = () => {

	return (
		<div className="favorite-music">
			<h2 className="title">Favorite Music</h2>

			<div className="artist">
				<img className="artist-logo" src={ soundwaveV3} width="100" />
			</div>
		</div>
	)
}

export default FavoriteMusic
