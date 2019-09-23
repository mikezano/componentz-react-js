import React, { Component } from 'react';
import { HotTable } from '@handsontable/react';
import './Tables.scss';

class Tables extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [],
			columnHeaders: [],
			columnWidths: [],
			columnTypes: [],
		};
	}
	setUpColumnTypes() {
		return [
			{},
			{},
			{},
			{},
			{},
			{
				type: 'dropdown',
				source: ['yes', 'no', 'maybe', 'sometimes', 'always', 'never'],
			},
		];
	}
	setUpColumnHeaders() {
		return ['Mike Mike Mike', 'Test', 'Some', 'Alpha', 'Beta', 'BOOL'];
	}
	setUpColumnWidths() {
		var tableWidth = window.innerWidth - 300;
		var columnWidth = tableWidth / 6;
		return [
			columnWidth,
			columnWidth,
			columnWidth,
			columnWidth,
			columnWidth,
			columnWidth,
		];
	}

	setUpData() {
		return [
			['', 'Tesla', 'Mercedes', 'Toyota', 'Volvo', 'yes'],
			['2019', 10, 11, 12, 13, 'yes'],
			['2020', 20, 11, 14, 13, null],
			['2021', 30, 15, 12, 13, 'no'],
			['', 'Tesla', 'Mercedes', 'Toyota', 'Volvo', 'yes'],
			['2019', 10, 11, 12, 13, 'yes'],
			['2020', 20, 11, 14, 13, null],
			['2021', 30, 15, 12, 13, 'no'],
			['', 'Tesla', 'Mercedes', 'Toyota', 'Volvo', 'yes'],
			['2019', 10, 11, 12, 13, 'yes'],
			['2020', 20, 11, 14, 13, null],
			['2021', 30, 15, 12, 13, 'no'],
		];
	}

	onResize() {
		this.forceUpdate();
	}

	componentDidMount() {
		const data = this.setUpData();
		const columnHeaders = this.setUpColumnHeaders();
		const columnWidths = this.setUpColumnWidths();
		const columnTypes = this.setUpColumnTypes();
		this.setState({ data, columnHeaders, columnWidths, columnTypes });
		window.addEventListener('resize', () => this.onResize());
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.onResize);
	}

	whatChanged(a, b) {
		console.log(a, b);
		if (a) {
			const rowNumb = a[0][0];
			console.log(this.state.data[rowNumb]);
		}
	}

	afterDropdown(a, b) {
		console.log(a, b);
	}

	render() {
		const realTimeWidth = this.setUpColumnWidths();
		return (
			<div className="tables">
				<div className="hands-on-table">
					{this.state.data.length === 0 ? (
						<h1>No Data</h1>
					) : (
						<HotTable
							data={this.state.data}
							columns={this.state.columnTypes}
							colWidths={realTimeWidth}
							//stretchH="all"
							colHeaders={this.state.columnHeaders}
							columnSorting="true"
							rowHeaders={true}
							width="100%"
							height="400"
							manualColumnResize="true"
							afterChange={this.whatChanged.bind(this)}
							afterDropdownMenuDefaultOptions={this.afterDropdown.bind(this)}
							licenseKey="non-commercial-and-evaluation"
						/>
					)}
				</div>
			</div>
		);
	}
}

export default Tables;
