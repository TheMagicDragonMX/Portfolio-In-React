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

			<SpinningWheel amountOfElements={ 4 } radius={ 130 } rotationTime={ 40 }>
				<SpinningWheelElement position={ 0 }>
					<AspectOrb>Music</AspectOrb>
				</SpinningWheelElement>

				<SpinningWheelElement position={ 1 }>
					<AspectOrb>Skills</AspectOrb>
				</SpinningWheelElement>
				
				<SpinningWheelElement position={ 2 }>
					<AspectOrb>Games</AspectOrb>
				</SpinningWheelElement>

				<SpinningWheelElement position={ 3 }>
					<AspectOrb>Food</AspectOrb>
				</SpinningWheelElement>
			</SpinningWheel>
		</div>
	);
};

export default Home;
