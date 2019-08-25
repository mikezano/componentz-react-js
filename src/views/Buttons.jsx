import React, { Component } from 'react';
import CircleButton from '../components/CircleButton';
import '../components/all-components.scss';
import './Buttons.scss';

class Buttons extends Component {
	render() {
		return (
			<React.Fragment>
				<CircleButton text="🍊" name="orange" />
				<CircleButton text="🥝" name="green" />
				<CircleButton text="🍓" />
			</React.Fragment>
		);
	}
}

export default Buttons;
