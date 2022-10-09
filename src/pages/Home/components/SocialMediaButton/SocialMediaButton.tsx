import { ImageButton } from '@/components';
import { ImageButtonInterface } from '@/components/ImageButton/ImageButton';
import React, { useEffect, useRef } from 'react';
import "./SocialMediaButton.scss"

export interface SocialMediaButtonInterface extends ImageButtonInterface {
	position: number
}

const SocialMediaButton : React.FC<SocialMediaButtonInterface> = ({ position, image, width, onClick }) => {

	const socialMediaButton = useRef<HTMLDivElement>(null)
	const imageButtonContainer = useRef<HTMLDivElement>(null)
	
	return (
		<div ref={ socialMediaButton } className="social-media-button" style={{ "--rotationLevel": position } as React.CSSProperties}>
			<div ref={ imageButtonContainer } className="image-button-container">
				<ImageButton image={ image } width={ width } onClick={ onClick } />
			</div>
		</div>
	);
};

export default SocialMediaButton;
