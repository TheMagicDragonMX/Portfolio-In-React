import React from 'react';
import "./AspectOrb.scss"

export interface AspectOrbInterface {
	children?: React.ReactNode;
}

const AspectOrb : React.FC<AspectOrbInterface> = ({ children }) => {
	return (
		<div className="aspect-orb">
			<span className="aspect-orb-content">{ children }</span>
		</div>
	);
};

export default AspectOrb;
