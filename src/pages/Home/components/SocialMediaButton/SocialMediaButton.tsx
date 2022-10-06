import { ImageButton } from '@/components';
import { ImageButtonInterface } from '@/components/ImageButton/ImageButton';
import React from 'react';

export interface SocialMediaButtonInterface extends ImageButtonInterface {

}

const SocialMediaButton : React.FC<SocialMediaButtonInterface> = ({ image, width, onClick }) => {
	return (
		<div className="social-media-button">
			<ImageButton image={ image } width={ width } onClick={ onClick } />
		</div>
	);
};

export default SocialMediaButton;
