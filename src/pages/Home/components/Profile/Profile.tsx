import React, { useEffect, useRef } from 'react';
import "./Profile.scss"

import { ProfilePicCoin } from '../ProfilePicCoin';

import facebook from "@/assets/facebook.png"
import twitter from "@/assets/twitter.png"
import github from "@/assets/github.png"
import leetcode from "@/assets/leetcode.png"
import { ImageButton, SpinningWheel, SpinningWheelElement } from '@/components';

export interface ProfileInterface {}

const Profile : React.FC<ProfileInterface> = () => {
	
	const socialMediaButtonsWidth = 35;

	const socialMediaButtons = useRef<HTMLDivElement>(null);
	const toggleSocialMediaButtons = () => socialMediaButtons.current?.classList.toggle("showing-socials")

	return (
		<div className="profile">
			<ProfilePicCoin onClick={ toggleSocialMediaButtons } />
			
			<SpinningWheel ref={ socialMediaButtons } className="socials" rotationTime={ 15 } radius={ 130 } amountOfElements={ 4 }>
				<SpinningWheelElement position={ 0 }>
					<ImageButton image={ facebook } width={ socialMediaButtonsWidth } onClick={ () => null } />	
				</SpinningWheelElement>

				<SpinningWheelElement position={ 1 }>
					<ImageButton image={ twitter } width={ socialMediaButtonsWidth } onClick={ () => null } />
				</SpinningWheelElement>

				<SpinningWheelElement position={ 2 }>
					<ImageButton image={ github } width={ socialMediaButtonsWidth } onClick={ () => null } />
				</SpinningWheelElement>

				<SpinningWheelElement position={ 3 }>
					<ImageButton image={ leetcode } width={ socialMediaButtonsWidth } onClick={ () => null } />
				</SpinningWheelElement>
			</SpinningWheel>
		</div>
	);
};

export default Profile;
