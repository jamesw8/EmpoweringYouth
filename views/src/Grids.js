import React, { Component } from 'react';
import logo from './logo.svg';
import left from './left_arrow.svg';
import right from './right_arrow.svg';
import './App.css';
import axios from 'axios';
import { CSSTransitionGroup } from 'react-transition-group';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Table ,{TableBody, TableHead, TableCell, TableRow} from 'material-ui/Table';
import {Card, CardActions, CardHeader, CardMedia, CardText} from 'material-ui';
import AppBar from 'material-ui/AppBar';
import {withStyles} from 'material-ui/styles';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Input from 'material-ui/Input';
import Geolocation from "./Geolocation";

class Grids extends Component {
	constructor(props) {
		super(props);
		this.appName = "NYC Resource Assistant";
		axios.post('http://localhost:5000/msg', 
			{
				text: ""
			},
			{
				headers: {
					'Access-Control-Allow-Origin': '*',
					'Content-Type': 'application/x-www-form-urlencoded'
				}
			}).then(response => {
				console.log(response);
				console.log([response.data['text'],response.data['type']]);
				this.setState({
					context: response.data['context'],
					history: [[response.data['text'], response.data['type']]],
					current: 0
				});
			});
		this.state = {
			message: "",
			history: ["Welcome to " + this.appName + "My job is to help connect you to resources such as free or affordable medical or mental health treatment. How can I help?"],
			current: 0,
		};
		console.log("hi"+this.state.history[this.state.current]);
		this.geolocRef = React.createRef();
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleForwardClick = this.handleForwardClick.bind(this);
		this.handleBackwardClick = this.handleBackwardClick.bind(this);
		this.handleCoordinates = this.handleCoordinates.bind(this);
	}
	// async componentWillMount() {
	// 	let message;
	// 	await axios.post('http://localhost:5000/msg', 
	// 		{
	// 			text: ""
	// 		},
	// 		{
	// 			headers: {
	// 				'Access-Control-Allow-Origin': '*',
	// 				'Content-Type': 'application/x-www-form-urlencoded'
	// 			}
	// 		}).then(response => {
	// 			console.log(response);
	// 			message = response;
	// 		});
	// 		this.setState({
	// 		context: message.data['context'],
	// 		history: this.state.history.concat(message.data['text']),
	// 		current: this.state.history.length - 1,
	// 		type: message.data['type']
	// 	});
	// }

	async handleSubmit(event) {
		event.preventDefault();
		this.setState({message: ""});
		// Handle fetch here
		let message;
		if (this.state.context === null) {
			await axios.post('http://localhost:5000/msg', 
			{
				text: this.state.message
			},
			{
				headers: {
					'Access-Control-Allow-Origin': '*',
					'Content-Type': 'application/x-www-form-urlencoded'
				}
			}).then(response => {
				console.log(response);
				message = response;
			});
		} else {
			await axios.post('http://localhost:5000/msg', 
			{
				text: this.state.message,
				context: this.state.context
			},
			{
				headers: {
					'Access-Control-Allow-Origin': '*',
					'Content-Type': 'application/x-www-form-urlencoded'
				}
			}).then(response => {
				console.log(response);
				message = response;
			});
		}
		let history = this.state.history;
		history.push([message.data['text'], message.data['type']]);
		console.log("new history");
		console.log(history);
		this.setState({
			context: message.data['context'],
			history: history,
			current: this.state.history.length - 1
		});
		console.log(message.data['context'])
		console.log(this.state.history);
		console.log(this.state.history[this.state.history.length - 1]);
	}

	handleChange(event) {
		// console.log(event.target.value);
		this.setState({message: event.target.value});
	}

	async handleCoordinates() {
		await axios.post('http://localhost:5000/sendCoordinates',
		{
			latitude: this.geolocRef.current.state.coords.latitude,
			longitude: this.geolocRef.current.state.coords.longitude,
		},
		{
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		});
	}
	handleForwardClick(event) {
		console.log((this.geolocRef.current.state.coords));
		if (this.state.current + 1 < this.state.history.length)
			this.setState({current: this.state.current + 1});
		else
			alert(this.state.current + ' No!');
	}

	handleBackwardClick(event) {
		if (this.state.current - 1 >= 0)
			this.setState({current: this.state.current - 1});
		else
			alert(this.state.current + 'No!');
	}

	render() {
		console.log(this.state.history[this.state.current][0]);
		let isQuestion = this.state.history[this.state.current][1] == "question";
		console.log("Render Current: " + this.state.current);
		if (this.state.history[this.state.current][1] == "question") {
		// 	console.log("yes");
			isQuestion = true;
		} else {
			isQuestion = false;
		}
		return (
			<div className="container" >
				<Geolocation ref={this.geolocRef} />
				<Grid item className="msg" xs={12}>
					Welcome to NYC Resource Assistant
				</Grid>
				<Grid className="main" container spacing={24}>
					<Grid item xs={2}>
						<img src={left} className="left-arrow" onClick={this.handleBackwardClick}/>
					</Grid>
						<Grid item xs={8}>
							<Grid container spacing={12}>
								<Grid item className="talk" xs={12}>
									<Grid container className="watson" spacing={12}>	
										<Grid item xs={12}>
											<CSSTransitionGroup
												transitionName="appear" 
												transitionAppear={true}
												transitionAppearTimeout={500}
												transitionEnterTimeout={500}
												transitionLeave={false}>
												<p className="output" key={this.state.current}>
										 			{this.state.history[this.state.current][0]}
												</p>
											</CSSTransitionGroup>
										</Grid>
									</Grid>
									<Grid container className="user" spacing={12}>			
										<Grid item xs={12}>
										<form className="message-form" onSubmit={this.handleSubmit}>
											<MuiThemeProvider theme={theme}>	
												<Input placeholder="Let us know how we can help you. ex: I feel sick" fullWidth={true} type="type" value={this.state.message} onChange={this.handleChange} style={{fontSize: "50px", fontFamily: 'Raleway'}} />
												<input type="submit" value="submit" hidden />
											</MuiThemeProvider>
										</form>	
									</Grid>		
									</Grid>			
								</Grid>
							</Grid>
						</Grid>
					<Grid item xs={2}>
						<img src={right} className="right-arrow" onClick={this.handleForwardClick}/>
					</Grid>
				</Grid>
			</div>		
		);
	}
}	

const theme = createMuiTheme({
  overrides: {
    MuiInput: {
      underline: {
      	size: 'large',
        color: 'black',
        '&:hover:not($disabled):after': {
          backgroundColor: '#00FFFF',
        },
        '&:hover:not($disabled):before': {
          backgroundColor: '#00FFFF',
        },
        '&:hover:($disabled):after': {
          backgroundColor: '#00FFFF',
        },
        '&:hover:($disabled):before': {
          backgroundColor: '#00FFFF',
        },
      },
    },
  },
});


export default Grids;
