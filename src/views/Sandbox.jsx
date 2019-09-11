import React from 'react';
import Carousel from '../components/Carousel';
import CircleButton from '../components/CircleButton';
import CustomTable from '../components/CustomTable';
import './Sandbox.scss';

const Sandbox = () => {
	return (
		<div className="container">
			{/* <Carousel>
				<CircleButton text="🍊" name="orange" />
				<CircleButton text="🥝" name="green" />
				<CircleButton text="🍓" />
			</Carousel> */}
			<CustomTable />
		</div>
	);
};

export default Sandbox;
