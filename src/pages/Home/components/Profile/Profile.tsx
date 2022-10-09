import { ProfilePicCoin } from '../ProfilePicCoin';
import { SocialMediaButton } from '../SocialMediaButton';
import React, { useEffect, useRef } from 'react';
import "./Profile.scss"
import "../SocialMediaButton/SocialMediaButton.scss"

import facebook from "@/assets/facebook.png"
import twitter from "@/assets/twitter.png"
import github from "@/assets/github.png"
import leetcode from "@/assets/leetcode.png"
import { ImageButton } from '@/components';

export interface ProfileInterface {}

const Profile : React.FC<ProfileInterface> = () => {
	
	const socialMediaButtonsWidth = 35;

	const socialMediaButtonsContainer = useRef<HTMLDivElement>(null);

	const toggleSocialMediaButtons = () => socialMediaButtonsContainer.current?.classList.toggle("active")

	return (
		<div className="profile">
			<ProfilePicCoin onClick={ toggleSocialMediaButtons } />
			
			<div ref={ socialMediaButtonsContainer } className="social-media-buttons">
				<SocialMediaButton position={ 0 } image={ facebook } width={ socialMediaButtonsWidth } onClick={ () => null } />
				<SocialMediaButton position={ 1 } image={ twitter } width={ socialMediaButtonsWidth } onClick={ () => null } />
				<SocialMediaButton position={ 2 } image={ github } width={ socialMediaButtonsWidth } onClick={ () => null } />
				<SocialMediaButton position={ 3 } image={ leetcode } width={ socialMediaButtonsWidth } onClick={ () => null } />
			</div>



		</div>
	);
};

export default Profile;
