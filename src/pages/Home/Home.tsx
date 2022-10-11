import { SpinningWheel, SpinningWheelElement } from "@/components";
import React from 'react';
import { AspectOrb } from "./components/AspectOrb";
import { Profile } from './components/Profile';

export interface HomeInterface {}

const Home : React.FC<HomeInterface> = () => {
	return (
		<div className="home">
			{/* <Profile /> */}

			<SpinningWheel amountOfElements={ 2 } radius={ 10 } rotationTime={ 20 }>
				<SpinningWheelElement position={ 0 }>
					<AspectOrb>Music</AspectOrb>
				</SpinningWheelElement>

				<SpinningWheelElement position={ 1 }>
					<AspectOrb>Skills</AspectOrb>
				</SpinningWheelElement>
			</SpinningWheel>
		</div>
	);
};

export default Home;
