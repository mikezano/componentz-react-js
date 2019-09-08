import React, { Component } from 'react';
import logo from '../logo.svg';
import DDHierarchyCheckbox from '../components/DropDownHierarchyCheckbox';
import LoadingIndicator from '../components/LoadIndicator';
import './DropDowns.scss';

class DropDowns extends Component {
	//let loadingSpot = null;

	constructor() {
		super();
		this.loadingSpot = React.createRef();
	}

	dropdownItems = [
		{ id: 0, parentId: null, name: 'Fruits', isChecked: false },
		{ id: 1, parentId: 0, name: '🥝', isChecked: false },
		{ id: 2, parentId: 0, name: '🥭', isChecked: false },
		{ id: 3, parentId: 0, name: '🍋', isChecked: false },
		{ id: 4, parentId: 0, name: '🍊', isChecked: false },
		{ id: 5, parentId: 0, name: '🍉', isChecked: false },
		{ id: 6, parentId: 0, name: '🍍', isChecked: false },
		{ id: 7, parentId: null, name: 'Faces', isChecked: false },
		{ id: 8, parentId: 7, name: '😀', isChecked: false },
		{ id: 9, parentId: 7, name: '😘', isChecked: false },
		{ id: 10, parentId: 7, name: '😂', isChecked: false },
		{ id: 11, parentId: 7, name: '🤑', isChecked: false },
	];

	onDropdownClosed = items => {
		console.log(items);
	};
	render() {
		return (
			<div className="dropdowns">
				<DDHierarchyCheckbox
					items={this.dropdownItems}
					onDropdownClosed={this.onDropdownClosed.bind(this)}
				/>
			</div>
		);
	}
}

export default DropDowns;
