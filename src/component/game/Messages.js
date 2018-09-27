import React, { Component } from "react";
import axios from "axios";
import Pusher from "pusher-js";

class Messages extends Component {
	constructor(props) {
		super(props);
		this.state = {
			messageIsOpen: false,
			message: []
		};
	}
	componentDidMount() {
		const pusher = new Pusher("c515477a7100fd072337", {
			cluster: "us2",
			encrypted: true
		});
		const channel = pusher.subscribe(`p-channel-${this.props.uuid}`);
		channel.bind("broadcast", data => {
			let message = this.state.message.slice();
			message.push(data);
			console.log(message);
			this.setState({
				message
			});
		});
	}
	handleMessages = e => {
		this.setState({ messageIsOpen: !this.state.messageIsOpen });
	};
	render() {
		let { message } = this.state;
		let messages = message.map((m, i) => <p key={i}>{m.message}</p>);
		return (
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
		);
	}
}

export default Messages;
