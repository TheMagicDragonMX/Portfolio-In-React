import React from "react"
import "./FavoriteMusic.scss"

export interface FavoriteMusicInterface {}

const FavoriteMusic : React.FC<FavoriteMusicInterface> = () => {
	return (
		<div className="favorite-music">
			Favorite Music
		</div>
	)
}

export default FavoriteMusic
