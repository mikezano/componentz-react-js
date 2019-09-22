import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.scss';

class Sidebar extends Component {
	render() {
		return (
			<section className="sidebar">
				<ul className="sidebar__list">
					<li className="sidebar__item">
						<Link to="/Components/DropDowns">Drop Downs</Link>
					</li>
					<li className="sidebar__item">
						<Link to="/Home">Home</Link>
					</li>
					<li className="sidebar__item">
						<Link to="/Sandbox">Sandbox</Link>
					</li>
					<li className="sidebar__item">
						<Link to="/Components/Buttons">Buttons</Link>
					</li>
					<li className="sidebar__item">
						<Link to="/Components/Tables">Tables</Link>
					</li>
				</ul>
			</section>
		);
	}
}

export default Sidebar;
