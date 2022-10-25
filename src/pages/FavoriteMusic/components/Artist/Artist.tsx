import React from "react"
import "./Artist.scss"

export interface ArtistInterface {
	logo: string;

	onClick: () => void;
}

const Artist = React.forwardRef<HTMLDivElement, ArtistInterface>(({ logo, onClick }, ref) => {

	return (
		<div ref={ ref } className="artist" onClick={ onClick }>
			<div className="artist-logo" style={{ backgroundImage: `url(${ logo })` } as React.CSSProperties }></div>
		</div>
	)
})

export default Artist
