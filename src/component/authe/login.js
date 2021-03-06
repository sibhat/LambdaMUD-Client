import React from "react";
import { Link } from "react-router-dom";
import "./login.css";

const Loging = props => {
	let { header, login, inputHandler, handleSubmit } = props;
	let {
		email,
		password1,
		password2,
		username,
		dispatch,
		errormsg
	} = props.data;
	return (
		<div className="login">
			<div className="login__header">
				{header}
				<Link
					to={login ? "/auth/register" : "/auth/login"}
					className="login__header__right"
				>
					{login ? "Register" : "Login"}
				</Link>
			</div>
			{errormsg ? <span className="login__error">{errormsg}</span> : null}
			<form
				className="login__body"
				onSubmit={e => {
					e.preventDefault();
					handleSubmit(login ? "login" : "registration");
				}}
			>
				<input
					type="text"
					name="username"
					id="username"
					placeholder="Username"
					value={username}
					onChange={inputHandler}
				/>
				{login ? null : (
					<input
						type="email"
						name="email"
						id="email"
						value={email}
						onChange={inputHandler}
						placeholder="email"
					/>
				)}
				<input
					type="password"
					name="password1"
					placeholder="password"
					value={password1}
					onChange={inputHandler}
				/>
				{login ? null : (
					<input
						type="password"
						name="password2"
						placeholder="password"
						value={password2}
						onChange={inputHandler}
					/>
				)}
				<button className="btn login__btn" type="submit">
					<span>Connect</span>
					{dispatch ? <span className="spinner" /> : null}
				</button>
			</form>
		</div>
	);
};

export default Loging;
