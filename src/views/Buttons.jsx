import React, { Component } from 'react';
import CircleButton from '../components/CircleButton';
import LayoutCentered from '../components/LayoutCentered';
import '../components/all-components.scss';
import './Buttons.scss';

class Buttons extends Component {
	render() {
		return (
			<LayoutCentered
				content={
					<React.Fragment>
						<CircleButton text="🍊" name="orange" />
						<CircleButton text="🥝" name="green" />
						<CircleButton text="🍓" />
					</React.Fragment>
				}
			></LayoutCentered>
		);
	}
}

export default Buttons;
