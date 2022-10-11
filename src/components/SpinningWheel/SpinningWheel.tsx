import React from 'react';
import "./SpinningWheel.scss";

export interface SpinningWheelInterface {
	rotationTime: number;
	radius: number;
	amountOfElements: number;
	
	className?: string;
	children?: React.ReactNode;
}

const SpinningWheel : React.FC<SpinningWheelInterface> = ({ rotationTime, radius, amountOfElements, className, children }) => {

	const spinningWheelStyle = { 
		"--rotationTime": `${ rotationTime }s`, 
		"--radius": `${ radius }px`,
		"--amountOfElements": amountOfElements, 
	} as React.CSSProperties;

	return (
		<div className={`spinning-wheel ${ className }`} style={ spinningWheelStyle}>
			{ children }
		</div>
	);
};

export default SpinningWheel;
