import React from "react"
import "./Artist.scss"

export interface ArtistInterface {
	logo: string;

	onClick: () => void;
}

const Artist = React.forwardRef<HTMLDivElement, ArtistInterface>(({ logo, onClick }, ref) => {

	return (
		<div ref={ ref } className="artist" onClick={ onClick }>
			<img className="artist-logo" src={ logo } />
		</div>
	)
})

export default Artist
