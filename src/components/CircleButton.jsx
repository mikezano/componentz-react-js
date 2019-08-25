import React from 'react';
import './CircleButton.scss';

const CircleButton = ({ text, name, styles }) => {
	return (
		<button
			className={`${name ? name : 'default'} circle-button`}
			style={styles}
		>
			{text}
		</button>
	);
};

export default CircleButton;
