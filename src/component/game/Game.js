import React, { Component } from "react";
import axios from "axios";
import Messages from "./Messages";
import Map from "./Map";
import Spiner from "../layout/Spiner";
import "./game.css";
import ReactTooltip from "react-tooltip";

class Game extends Component {
	constructor(props) {
		super();
		this.state = {
			description: "",
			name: "",
			uuid: null,
			title: "",
			players: [],
			command: "",
			error_msg: null,
			message: [],
			dispatch: true
		};
	}
	componentDidMount() {
		let url = "https://sibhat-lambdamud.herokuapp.com";
		// url = "http://127.0.0.1:8800";

		axios
			.get(`${url}/api/adv/init/`, {
				headers: {
					Authorization: `Token ${localStorage.getItem("key")}`
				}
			})
			.then(response => {
				let state = response.data;
				this.setState({ ...state, dispatch: false });
			})
			.catch(error => {
				console.log({ error });
				this.setState({ dispatch: false });
			});
	}
	handleInput = e => {
		let comand = e.target.value;
		let data;
		if (Number(e.charCode) === 13) {
			let url = "https://sibhat-lambdamud.herokuapp.com";
			// url = "http://127.0.0.1:8800";
			if (comand.length === 1) {
				url += "/api/adv/move/";
				data = { direction: comand };
			} else if (comand.split(" ")[0].toLowerCase() === "say") {
				url += "/api/adv/say/";
				comand = comand.split(" ");
				comand.shift();
				comand = comand.join(" ");
				data = { message: comand };
			} else if (comand.split(" ")[0].toLowerCase() === "shout") {
				url += "/api/adv/shout/";
				comand = comand.split(" ");
				comand.shift();
				comand = comand.join(" ");
				data = { message: comand };
			} else if (comand.split(" ")[0].toLowerCase() === "whisper") {
				url += "/api/adv/whisper/";
				comand = comand.split(" ");
				comand.shift();
				comand = comand.join(" ");
				data = { message: comand, to: "thursday1" };
			}
			axios
				.post(`${url}`, data, {
					headers: {
						"Content-Type": "application/json",
						Authorization: `Token ${localStorage.getItem("key")}`
					}
				})
				.then(response => {
					// console.log(response.data);
					let state = response.data;
					this.setState({ ...state });
				})
				.catch(error => {
					console.log({ error });
				});
			e.target.value = "";
		}
	};

	render() {
		let {
			name,
			uuid,
			description,
			title,
			players,
			error_msg,
			dispatch
		} = this.state;

		return dispatch ? (
			<Spiner />
		) : (
			<div className="game">
				<Map />
				<div className="game__center">
					<div className="game_header">
						<strong>{name}</strong> : id [ {uuid} ]
					</div>
					<div className="game__body">
						<div className="game__instances">
							Your location: {title}
						</div>
						<div className="game__instances">
							Room description: {description}
						</div>
						<div className="game__instances">
							players in room: {players}
						</div>
						<span className="game__errors">{error_msg}</span>
					</div>
					<div className="game__command">
						<i className="fas fa-angle-double-right" />
						<input
							type="text"
							name="comand"
							className="game__input"
							onKeyPress={this.handleInput}
							placeholder="Enter command"
						/>
					</div>
				</div>
				<Messages uuid={uuid} />
			</div>
		);
	}
}
export default Game;
