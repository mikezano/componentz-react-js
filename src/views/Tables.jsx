import React, { Component } from 'react';
import { HotTable } from '@handsontable/react';
import './Tables.scss';

class Tables extends Component {
	constructor(props) {
		super(props);
		this.columns = [
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
		this.data = [
			['', 'Tesla', 'Mercedes', 'Toyota', 'Volvo', 'yes'],
			['2019', 10, 11, 12, 13, 'yes'],
			['2020', 20, 11, 14, 13, null],
			['2021', 30, 15, 12, 13, 'no'],
		];
	}

	render() {
		return (
			<div className="tables">
				<HotTable
					data={this.data}
					columns={this.columns}
					colHeaders={true}
					rowHeaders={true}
					width="600"
					height="300"
					licenseKey="non-commercial-and-evaluation"
				/>
			</div>
		);
	}
}

export default Tables;
