import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import axios from 'axios';

class App extends Component {
	render() {
		return (
			<div className="App">
				<header className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<h1 className="App-title">Welcome to React</h1>
				</header>
				<p className="App-intro">
					To get started, edit <code>src/App.js</code> and save to reload.
				</p>
				<MessageForm />
			</div>
		);
	}
}

class MessageForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			message: ""
		};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		
	}

	async handleSubmit(event) {
		event.preventDefault();
		// Handle fetch here
		// this.setState(
		// 	{
		// 		message: await axios.post('http://localhost:5000/msg', {
		// 		message: this.state.message
		// 	})
		// });
		let message;
		await axios.post('http://localhost:5000/msg', 
		{
			message: this.state.message
		}, 
		{
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		}).then(response => message = response);
		alert(message.data);
	}

	handleChange(event) {
		this.setState({message: event.target.value});
	}

	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				<input type="text" value={this.state.message} onChange={this.handleChange} />
				<input type="submit" value="submit" hidden/>
			</form>
		)
	}
}
export default App;
