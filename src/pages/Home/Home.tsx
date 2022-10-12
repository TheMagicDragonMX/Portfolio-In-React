import React from 'react';
import "./Home.scss"

import { SpinningWheel, SpinningWheelElement } from "@/components";
import { AspectOrb } from "./components/AspectOrb";
import { Profile } from './components/Profile';

export interface HomeInterface {}

const Home : React.FC<HomeInterface> = () => {
	return (
		<div className="home">
			<Profile />

			<SpinningWheel amountOfElements={ 4 } radius={ 170 } rotationTime={ 40 }>
				<SpinningWheelElement position={ 0 }>
					<AspectOrb firstColor="#f8fe01" secondColor="#0080ff">Music</AspectOrb>
				</SpinningWheelElement>

				<SpinningWheelElement position={ 1 }>
					<AspectOrb firstColor="#ff80c0" secondColor="#a234dc">Skills</AspectOrb>
				</SpinningWheelElement>
				
				<SpinningWheelElement position={ 2 }>
					<AspectOrb firstColor="#00ff00" secondColor="#00ffff">Games</AspectOrb>
				</SpinningWheelElement>

				<SpinningWheelElement position={ 3 }>
					<AspectOrb firstColor="#ff0080" secondColor="#ff8000">Food</AspectOrb>
				</SpinningWheelElement>
			</SpinningWheel>
		</div>
	);
};

export default Home;
