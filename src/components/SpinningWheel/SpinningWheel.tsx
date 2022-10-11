import React from 'react';
import "./SpinningWheel.scss";

export interface SpinningWheelInterface {
	rotationTime: number;
	
	size?: number;
	children?: React.ReactNode;
}

const SpinningWheel : React.FC<SpinningWheelInterface> = ({ rotationTime, size, children }) => {
	return (
		<div className="spinning-wheel" style={{ 
			"--rotationTime": `${rotationTime}s`, 
			"width": size ?? 100, 
			"height": size ?? 100 } as React.CSSProperties}>

			{ children }
		</div>
	);
};

export default SpinningWheel;
