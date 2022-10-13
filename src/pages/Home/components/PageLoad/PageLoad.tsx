import React from 'react';
import "./PageLoad.scss";

export interface PageLoadInterface {}

const PageLoad : React.FC<PageLoadInterface> = () => {
	return (
		<div id="page-load-container" className="page-load-container">
			<div className="greeting-container">
				<h1 id="greeting" className="greeting"></h1>
				<div className="blinking-bar"></div>
			</div>
  	</div>
	);
};

export default PageLoad;
