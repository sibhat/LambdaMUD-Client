import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ReactTooltip from "react-tooltip";

import "./game.css";
class Landing extends Component {
	constructor(props) {
		super(props);
		this.state = {
			rooms: []
		};
	}
	componentDidMount() {
		let url = "https://sibhat-lambdamud.herokuapp.com";
		url = "http://127.0.0.1:8800";
		axios
			.get(`${url}/api/adv/rooms`)
			.then(response => {
				console.log(response.data);
				this.setState({ ...response.data });
			})
			.catch(error => {
				console.log(error);
			});
	}
	render() {
		let pos = [[72, 10], [40, 13], [10, 10], [40, 55], [20, 70]];
		let rooms = this.state.rooms.map((room, i) => {
			return (
				<div
					className="landing__room"
					style={{ top: `${pos[i][0]}%`, left: `${pos[i][1]}%` }}
					key={i}
					data-tip={room[1]}
				>
					{room[0]}
					<ReactTooltip />
				</div>
			);
		});
		return (
			<div className="landing">
				{rooms}
				<div className="landing__textBox">
					<Link to="/auth/register" className="landing__link">
						Create Account
					</Link>
					<Link to="/auth/login" className="landing__link">
						Start Game
					</Link>
				</div>
			</div>
		);
	}
}

export default Landing;
