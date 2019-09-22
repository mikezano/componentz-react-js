import React, { Component } from 'react';
import logo from './logo.svg';
import DDHierarchyCheckbox from './components/DropdownHierarchyCheckboxes';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Home from './views/Home';
import DropDowns from './views/DropDowns';
import Sandbox from './views/Sandbox';
import Buttons from './views/Buttons';
import Tables from './views/Tables';
import Sidebar from './views/Sidebar';
import './App.css';

function App() {
	fetch('https://jsonplaceholder.typicode.com/todos/')
		.then(response => response.json())
		.then(json => console.log(json));

	return (
		<div>
			<Router>
				<Sidebar />
				<Route path="/Components/Checkboxes" component={DDHierarchyCheckbox} />
				<Route path="/Components/DropDowns" component={DropDowns} />
				<Route path="/Home" component={Home} />
				<Route path="/Sandbox" component={Sandbox} />
				<Route path="/Components/Buttons" component={Buttons} />
				<Route path="/Components/Tables" component={Tables} />
				{/* <Route path="/" component={Buttons} /> */}
			</Router>
		</div>
	);
}

export default App;
