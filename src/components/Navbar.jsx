import React from 'react';

const Navbar = (props) => {
	return (
		<nav className="navbar bg-light">
			<div className="container">
				<a href="#" className="navbar-brand">
					<img className="w-50" src="./images/brain.jpg" alt="brain logo" />
				</a>
				<span>{props.account}</span>
			</div>
		</nav>

	)
}

export default Navbar;