import React from 'react';
import "./ProfilePicCoin.scss"

import pfpMyself from "@/assets/pfp-myself.jpg"
import pfpCubes from "@/assets/pfp-cubes.jpg"

export interface ProfilePicCoinInterface {}

const ProfilePicCoin : React.FC<ProfilePicCoinInterface> = () => {
	const imageWidth = 200;
	
	return ( 
		<div className="profile-pic-coin">
			<img src={ pfpMyself } alt="" width={ imageWidth } />
			<img className="blurring" src={ pfpCubes } alt="" width={ imageWidth } />
		</div>
	);
};

export default ProfilePicCoin;
