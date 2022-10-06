import React from 'react';
import "./ProfilePicCoin.scss"

import pfpMyself from "@/assets/pfp-myself.jpg"
import pfpCubes from "@/assets/pfp-cubes.jpg"

export interface ProfilePicCoinInterface {}

const ProfilePicCoin : React.FC<ProfilePicCoinInterface> = () => {
	const imageWidth = 200;
	
	return ( 
		<div className="profile-pic-coin-container">
			<div className="coin">
				<div className="coin-side front">
					<img src={ pfpCubes } alt="" width={ imageWidth } />
				</div>

				<div className="coin-side back">
					<img src={ pfpMyself } alt="" width={ imageWidth } />
				</div>
			</div>
		</div>
	);
};

export default ProfilePicCoin;
