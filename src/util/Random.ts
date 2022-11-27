export function random (min: number, max: number, precise?: boolean) {
	return precise 
		? (Math.random() * (max - min) + min) 
		: Math.round( Math.random() * (max - min) + min )
}