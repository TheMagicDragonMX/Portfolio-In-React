import React from 'react';
import "./SpinningWheel.scss";

export interface SpinningWheelInterface {
	rotationTime: number;
	radius: number;
	amountOfElements: number;
	
	counterclockwise?: boolean;
	className?: string;
	children?: React.ReactNode;
}

const SpinningWheel = React.forwardRef<HTMLDivElement, SpinningWheelInterface>(({ rotationTime, radius, amountOfElements, counterclockwise, className, children }, ref) => {

	const spinningWheelStyle = { 
		"--rotationTime": `${ rotationTime }s`, 
		"--radius": `${ radius }px`,
		"--amountOfElements": amountOfElements,
		"--counterclockwise": counterclockwise ? -1 : 1
	} as React.CSSProperties;

	return (
		<div ref={ ref } className={`spinning-wheel ${ className ?? "" }`} style={ spinningWheelStyle}>
			{ children }
		</div>
	);
});

export default SpinningWheel;
