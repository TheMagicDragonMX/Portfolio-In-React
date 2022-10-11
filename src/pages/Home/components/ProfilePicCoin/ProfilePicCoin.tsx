import React from 'react';
import "./ProfilePicCoin.scss"

import pfpMyself from "@/assets/pfp-myself.jpg"
import pfpCubes from "@/assets/pfp-cubes.jpg"

export interface ProfilePicCoinInterface {
	onClick: () => void;
}

const ProfilePicCoin : React.FC<ProfilePicCoinInterface> = ({ onClick }) => {

	/**
	 * Determines how big the image of myself will be
	 */
	const imageWidth = 200;
	
	return ( 
		<div className="profile-pic-coin" onClick={ onClick }>
			<img src={ pfpMyself } alt="" width={ imageWidth } />
			<img className="blurring" src={ pfpCubes } alt="" width={ imageWidth } />
		</div>
	);
};

export default ProfilePicCoin;
