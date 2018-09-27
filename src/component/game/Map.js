import React, { Component } from "react";
import axios from "axios";

import ReactTooltip from "react-tooltip";

class Map extends Component {
	constructor(props) {
		super(props);
		this.state = {
			rooms: [],
			mapIsOpen: false
		};
	}

	handleMessages2 = e => {
		let url = "https://sibhat-lambdamud.herokuapp.com";

		axios
			.get(`${url}/api/adv/rooms`)
			.then(response => {
				console.log(response.data);
				this.setState({ rooms: response.data.rooms });
			})
			.catch(error => {
				console.log(error);
			});
		this.setState({ mapIsOpen: !this.state.mapIsOpen });
	};
	render() {
		let pos = [[72, 10], [40, 13], [10, 10], [40, 55], [20, 70]];
		let rooms = this.state.rooms.map((room, i) => {
			return (
				<div
					className="landing__room"
					style={{ top: `${pos[i][0]}%`, left: `${pos[i][1]}%` }}
					key={i}
					data-tip={
						room.length > 2
							? `${room[1]}  players: ${room[2]}`
							: room[1]
					}
				>
					{room[0]}
					<ReactTooltip />
				</div>
			);
		});
		return (
			<div>
				<button
					className="btn game__messages--btn"
					onClick={this.handleMessages2}
				>
					{this.state.mapIsOpen ? "close" : "open"}
				</button>

				{this.state.mapIsOpen ? (
					<span className="game__map"> {rooms} </span>
				) : null}
			</div>
		);
	}
}

export default Map;
