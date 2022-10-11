import React from 'react';
import "./SpinningWheel.scss";

export interface SpinningWheelInterface {
	rotationTime: number;
	radius: number;
	amountOfElements: number;
	
	className?: string;
	children?: React.ReactNode;
}

const SpinningWheel = React.forwardRef<HTMLDivElement, SpinningWheelInterface>(({ rotationTime, radius, amountOfElements, className, children }, ref) => {

	const spinningWheelStyle = { 
		"--rotationTime": `${ rotationTime }s`, 
		"--radius": `${ radius }px`,
		"--amountOfElements": amountOfElements, 
	} as React.CSSProperties;

	return (
		<div ref={ ref } className={`spinning-wheel ${ className ?? "" }`} style={ spinningWheelStyle}>
			{ children }
		</div>
	);
});

export default SpinningWheel;
