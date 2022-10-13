import React from "react"
import "./ImageButton.scss"

export interface ImageButtonInterface {
	onClick: () => void

	image: string
	width: number
	alt?: string
}

const ImageButton : React.FC<ImageButtonInterface> = ({ onClick, image, width, alt }) => {
	
	return (
		<div className="image-button" onClick={ onClick }>
			<img src={ image } alt={ alt } width={ width } />
		</div>
	)
}

export default ImageButton