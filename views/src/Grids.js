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
			history: ["Welcome to [insert app name]! My job is to help connect you to resources such as free or affordable medical or mental health treatment. How can I help?", "question"],
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

			<div style={{marginBottom: '40px', flexGrow: 1}}>
				<Grid container style={{width:'100%'}}>
					<Geolocation ref={this.geolocRef} />
					<Grid item xs md onClick={this.handleBackwardClick} style={{width: '100%', cursor: 'pointer', display: 'flex', justifyContent: 'flex-start', alignItems: 'stretch'}}>
						<div className="arrow">
							<img src={left} className="left-arrow"  />
						</div>
					</Grid>
					<Grid item xs={11} md={11}>
						<AppBar position="static" style={{borderRadius: "30px", backgroundColor: "#E8EAF6", minHeight:"300px", display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: "0"}} color="">
							<Toolbar style={{backgroundColor: "#E8EAF6"}}>

								<Typography style={{backgroundColor: "#E8EAF6"}}>

									<CSSTransitionGroup
										transitionName="appear" 
										transitionAppear={true}
										transitionAppearTimeout={500}
										transitionEnterTimeout={500}
										transitionLeave={false}>

										<h2 className="output" key={this.state.current} style={{ fontSize: "24px", backgroundColor: "#E8EAF6"}}>
										 	{this.state.history[this.state.current][0]}
										</h2> 
										
									</CSSTransitionGroup>
								</Typography>
							</Toolbar>
						</AppBar>
					</Grid>
					<Grid item xs md style={{cursor: 'pointer', display: 'flex', justifyContent: 'flex-end', alignItems: 'stretch'}}>
						<div className="arrow">
							<img src={right} className="right-arrow" onClick={this.handleForwardClick} />
						</div>
					</Grid>
				</Grid>
				<div className = "user">
					<form className="message-form" onSubmit={this.handleSubmit}>
						<MuiThemeProvider theme={theme}>	
						<Input fullWidth={true} type="type" value={this.state.message} onChange={this.handleChange} style={{fontSize: "50px"}} />
						<input type="submit" value="submit" hidden />
						</MuiThemeProvider>
					</form>
				</div>
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
