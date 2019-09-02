import React, { Component } from "react";
import logo from "./logo.svg";
import DDHierarchyCheckbox from "./components/DropdownHierarchyCheckboxes";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from "./views/Home";
import DropDowns from "./views/DropDowns";
import Sandbox from "./views/Sandbox";
import Buttons from "./views/Buttons";
import "./App.css";

function App() {
	return (
		<Router>
			<Route path="/Components/Checkboxes" component={DDHierarchyCheckbox} />
			<Route path="/Components/DropDowns" component={DropDowns} />
			<Route path="/Home" component={Home} />
			<Route path="/Sandbox" component={Sandbox} />
			{/* <Route path="/Buttons" component={Buttons} /> */}
			{/* <Route path="/" component={Buttons} /> */}
		</Router>
	);
}

export default App;
