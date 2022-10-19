import React, { useEffect, useRef } from "react"
import "./Artist.scss"

export interface ArtistInterface {
	logo: string;
}

const Artist : React.FC<ArtistInterface> = ({ logo }) => {

	return (
		<div className="artist">
			<img className="artist-logo" src={ logo } />
		</div>
	)
}

export default Artist
