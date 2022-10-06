import React from 'react';
import { Profile } from './components/Profile';

export interface HomeInterface {}

const Home : React.FC<HomeInterface> = () => {
	return (
		<div className="home">
			<Profile />
		</div>
	);
};

export default Home;
