import React from 'react';
import './LoadingIndicator.scss';

const LoadIndicator = ({ element, isLoading }) => {
	debugger;
	if (!element.current) return null;
	const dimensions = element.getClientBoundingRect();

	return isLoading ? (
		<div className="loading">
			<div className="loading__spinner" />
			<div className="loading__text" />
		</div>
	) : null;
};
export default LoadIndicator;
