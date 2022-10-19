import React, { useEffect, useRef } from "react"
import "./Artist.scss"

export interface ArtistInterface {
	logo: string;
}

const Artist = React.forwardRef<HTMLDivElement, ArtistInterface>(({ logo }, ref) => {

	return (
		<div ref={ ref } className="artist">
			<img className="artist-logo" src={ logo } />
		</div>
	)
})

export default Artist
