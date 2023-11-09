import React from "react";
import Navbar from "./Navbar";
import rigoImage from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import Characters from "./Characters";
import Planets from "./Planets";
import Vehicles from "./Vehicles";

export const Home = () => (
	<div className="container-fluid">
		<div className="container-navbar">
			<Navbar />
		</div>
		<div className="container-body-characters">
			<Characters />
		</div>
		<div className="container-planets">
			<Planets />
		</div>

		<div className="container-vehicles">
			<Vehicles />
		</div>
	</div>
);

