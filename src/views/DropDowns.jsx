import React, { Component } from "react";
import logo from "../logo.svg";
import DDHierarchyCheckbox from "../components/DropdownHierarchyCheckboxes";
import DDCheckboxes from "../components/DropdownCheckboxes";
import LoadingIndicator from "../components/LoadIndicator";

class DropDowns extends Component {
	//let loadingSpot = null;

	constructor() {
		super();
		this.loadingSpot = React.createRef();
	}

	dropdownItems = [
		{ id: 0, parentId: null, name: "Fruits", isChecked: false },
		{ id: 1, parentId: 0, name: "🥝", isChecked: false },
		{ id: 2, parentId: 0, name: "🥭", isChecked: false },
		{ id: 3, parentId: 0, name: "🍋", isChecked: false },
		{ id: 4, parentId: 0, name: "🍊", isChecked: false },
		{ id: 5, parentId: 0, name: "🍉", isChecked: false },
		{ id: 6, parentId: 0, name: "🍍", isChecked: false },
		{ id: 7, parentId: null, name: "Faces", isChecked: false },
		{ id: 8, parentId: 7, name: "😀", isChecked: false },
		{ id: 9, parentId: 7, name: "😘", isChecked: false },
		{ id: 10, parentId: 7, name: "😂", isChecked: false },
		{ id: 11, parentId: 7, name: "🤑", isChecked: false }
	];

	onDropdownClosed = items => {
		console.log(items);
	};
	render() {
		return (
			<div className="App">
				<header className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<p ref="loadingSpot">
						Edit <code>src/App.js</code> and save to reload.
					</p>
					{/* <LoadingIndicator element={this.refs.loadingSpot} isLoading={true} /> */}
					<a
						className="App-link"
						href="https://reactjs.org"
						target="_blank"
						rel="noopener noreferrer"
					>
						Learn React
					</a>
					<DDHierarchyCheckbox
						items={this.dropdownItems}
						onDropdownClosed={this.onDropdownClosed.bind(this)}
					/>
					<DDCheckboxes
						items={this.dropdownItems}
						onDropdownClosed={this.onDropdownClosed.bind(this)}
					/>
				</header>
			</div>
		);
	}
}

export default DropDowns;
