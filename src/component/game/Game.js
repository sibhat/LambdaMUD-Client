import React, { Component } from "react";
import axios from "axios";
import Pusher from "pusher-js";
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
			dispatch: true,
			messageIsOpen: false,
			rooms: [],
			mapIsOpen: false
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
				const pusher = new Pusher("c515477a7100fd072337", {
					cluster: "us2",
					encrypted: true
				});
				const channel = pusher.subscribe(
					`p-channel-${response.data.uuid}`
				);
				channel.bind("broadcast", data => {
					let message = this.state.message;
					message.push(data);
					// console.log(message);
					this.setState({
						message
					});
				});
			})
			.catch(error => {
				console.log({ error });
				this.setState({ dispatch: false });
			});
		axios
			.get(`${url}/api/adv/rooms`)
			.then(response => {
				console.log(response.data);
				this.setState({ rooms: response.data.rooms });
			})
			.catch(error => {
				console.log(error);
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
				// console.log(comand);
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
				data = { message: comand, to: "testuser3" };
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
	handleMessages = e => {
		this.setState({ messageIsOpen: !this.state.messageIsOpen });
	};
	handleMessages2 = e => {
		this.setState({ mapIsOpen: !this.state.mapIsOpen });
	};
	render() {
		let {
			name,
			uuid,
			message,
			description,
			title,
			players,
			error_msg,
			dispatch
		} = this.state;
		let messages = message.map((m, i) => <p key={i}>{m.message}</p>);
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
		return dispatch ? (
			<Spiner />
		) : (
			<div className="game">
				<button
					className="btn game__messages--btn"
					onClick={this.handleMessages2}
				>
					{this.state.mapIsOpen && message.length > 0
						? "close"
						: "open"}
				</button>

				{this.state.mapIsOpen ? (
					<span className="game__map"> {rooms} </span>
				) : null}

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
				<div className="game__messages">
					<button
						className="btn game__messages--btn"
						onClick={this.handleMessages}
					>
						{this.state.messageIsOpen && message.length > 0
							? "close"
							: "open"}
					</button>
					{this.state.messageIsOpen && message.length > 0 ? (
						<span>message: {messages}</span>
					) : null}
				</div>
			</div>
		);
	}
}
export default Game;
