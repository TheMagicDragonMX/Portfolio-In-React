import { ProfilePicCoin } from '../ProfilePicCoin';
import { SocialMediaButton } from '../SocialMediaButton';
import React from 'react';

import facebook from "@/assets/facebook.png"
import twitter from "@/assets/twitter.png"
import github from "@/assets/github.png"
import leetcode from "@/assets/leetcode.png"

export interface ProfileInterface {}

const Profile : React.FC<ProfileInterface> = () => {
	
	const socialMediaButtonsWidth = 50;

	return (
		<div className="profile">
			<ProfilePicCoin />

			<SocialMediaButton image={ facebook } width={ socialMediaButtonsWidth } onClick={ () => null }/>
			<SocialMediaButton image={ twitter } width={ socialMediaButtonsWidth } onClick={ () => null }/>
			<SocialMediaButton image={ github } width={ socialMediaButtonsWidth } onClick={ () => null }/>
			<SocialMediaButton image={ leetcode } width={ socialMediaButtonsWidth } onClick={ () => null }/>
		</div>
	);
};

export default Profile;
