import React, { Component } from 'react';

class SandboxClass extends Component {
	state = { datalength: 0 };
	async componentDidMount() {
		//const data = await this.apiCall();
	}

	apiCall() {
		return fetch('https://jsonplaceholder.typicode.com/todos')
			.then(response => response.json())
			.then(json => console.log(json));
	}

	render() {
		return <h1>Hi length is {this.state.datalength}</h1>;
	}
}

export default SandboxClass;
