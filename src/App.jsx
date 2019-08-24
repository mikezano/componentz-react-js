import React, { Component } from 'react';
import logo from './logo.svg';
import DDHierarchyCheckbox from './components/DropDownHierarchyCheckbox';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Home from './views/Home';
import Sandbox from './views/Sandbox';
import './App.css';

function App() {
	return (
		<Router basename="/F">
			<Route path="/Components/Checkboxes" component={DDHierarchyCheckbox} />
			<Route path="/Home" component={Home} />
			<Route path="/Sandbox" component={Sandbox} />
		</Router>
	);
}

export default App;
