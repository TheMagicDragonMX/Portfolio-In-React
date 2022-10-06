import React from 'react';
import { ProfilePicCoin } from './components';

export interface HomeInterface {}

const Home : React.FC<HomeInterface> = () => {
	return <div className="home">
		<ProfilePicCoin />
	</div>;
};

export default Home;
