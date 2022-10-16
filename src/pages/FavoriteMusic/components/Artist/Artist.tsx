import React from "react"
import "./Artist.scss"

export interface ArtistInterface {
	logo: string;
}

const Artist : React.FC<ArtistInterface> = ({ logo }) => {
	return (
		<div className="artist">
			<img className="artist-logo" src={ logo } width="100" />
		</div>
	)
}

export default Artist
