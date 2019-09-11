import React from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import Toggler from './Toggler';

class CustomTable extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [
				{
					id: 0,
					name: 'Tanner Linsley',
					age: 26,
					friend: {
						name: 'Jason Maurer',
						age: 23,
					},
					toggler: 'a',
					togglerYZ: 'a',
				},
				{
					id: 1,
					name: 'Michael Manzano',
					age: 30,
					friend: {
						name: 'Jason Maurer',
						age: 23,
					},
					toggler: 'a',
					togglerYZ: 'a',
				},
				{
					id: 2,
					name: 'Iliana Gonzalez',
					age: 26,
					friend: {
						name: 'Jason Maurer',
						age: 23,
					},
					toggler: 'b',
					togglerYZ: 'a',
				},
				{
					id: 3,
					name: 'Miguel Marques',
					age: 26,
					friend: {
						name: 'Michael Manzano',
						age: 23,
					},
					toggler: 'a',
					togglerYZ: 'a',
				},
				{
					id: 4,
					name: 'Miguel Marques',
					age: 26,
					friend: {
						name: 'Michael Manzano',
						age: 23,
					},
					toggler: 'a',
					togglerYZ: 'a',
				},
			],
		};
	}

	onChangedAB(row, event) {
		debugger;
		console.log(event.target.value);
		const updatedTabularData = this.state.data.map(i => {
			if (i.id == row.id) {
				return { ...i, toggler: event.target.value };
			} else {
				return i;
			}
		});
		this.setState({ data: updatedTabularData });
	}

	onChangedYZ(row, event) {
		debugger;
		console.log(event.target.value);
		const updatedTabularData = this.state.data.map(i => {
			if (i.id == row.id) {
				return { ...i, togglerYZ: event.target.value };
			} else {
				return i;
			}
		});
		this.setState({ data: updatedTabularData });
	}

	render() {
		const columns = [
			{
				Header: 'Id',
				accessor: 'id',
				show: false,
			},
			{
				Header: 'Name',
				accessor: 'name', // String-based value accessors!
			},
			{
				Header: 'Age',
				accessor: 'age',
				Cell: props => <span className="number">{props.value}</span>, // Custom cell components!
			},
			{
				Header: 'Toggler',
				accessor: 'toggler',
				Cell: props => (
					<Toggler
						link={Math.random()}
						name={Math.random()}
						selectedValue={props.value}
						onChanged={this.onChangedAB.bind(this, props.row)}
					/>
				),
			},
			{
				Header: 'Toggler',
				accessor: 'togglerYZ',
				Cell: props => (
					<Toggler
						link={Math.random()}
						name={Math.random()}
						selectedValue={props.value}
						onChanged={this.onChangedYZ.bind(this, props.row)}
					/>
				),
			},
			{
				id: 'friendName', // Required because our accessor is not a string
				Header: 'Friend Name',
				accessor: d => d.friend.name, // Custom value accessors!
			},
			{
				Header: props => <span>Friend Age</span>, // Custom header components!
				accessor: 'friend.age',
			},
		];

		return <ReactTable data={this.state.data} columns={columns} />;
	}
}

export default CustomTable;
