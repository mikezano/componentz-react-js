import React from 'react';

class Toggler extends React.Component {
	render() {
		return (
			<div>
				<label htmlFor={`a-${this.props.link}`}>
					A
					<input
						type="radio"
						id={`a-${this.props.link}`}
						value="a"
						name={this.props.name}
						checked={this.props.selectedValue == 'a'}
						onChange={this.props.onChanged}
					/>
				</label>
				<label htmlFor={`b-${this.props.link}`}>
					B
					<input
						type="radio"
						id={`b-${this.props.link}`}
						value="b"
						name={this.props.name}
						checked={this.props.selectedValue == 'b'}
						onChange={this.props.onChanged}
					/>
				</label>
			</div>
		);
	}
}

export default Toggler;
