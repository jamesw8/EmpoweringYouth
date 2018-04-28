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
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import Card from 'material-ui/Card';
import Geolocation from "./Geolocation";

class Grids extends Component {
	constructor(props) {
		super(props);
		this.state = {
			message: "",
			nums: [],
			current: 0,
		};
		this.geolocRef = React.createRef();
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleForwardClick = this.handleForwardClick.bind(this);
		this.handleBackwardClick = this.handleBackwardClick.bind(this);
		this.handleCoordinates = this.handleCoordinates.bind(this);
	}

	async handleSubmit(event) {
		event.preventDefault();
    	event.target.reset();
		// Handle fetch here
		let message;
		await axios.post('http://localhost:5000/msg', 
		{
			message: this.state.message
		},
		{
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		}).then(response => message = response);
		this.setState({nums: this.state.nums.concat(message.data)});
	}

	handleChange(event) {
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
		if (this.state.current + 1 < this.state.nums.length)
			this.setState({current: this.state.current + 1});
		else
			alert(this.current + ' No!');
	}

	handleBackwardClick(event) {
		if (this.state.current - 1 >= 0)
			this.setState({current: this.state.current - 1});
		else
			alert(this.current + 'No!');
	}

	render() {
		return (
			<Grid container spacing={8}>
			{this.getComponent} 
			<Geolocation ref={this.geolocRef} />
				<Grid item xs={12} sm={12} md={12} lg={12}>
					<div className="App">
						<header className="App-header">
							<h1 className="App-title">{this.state.nums.join()}</h1>

							
								<CSSTransitionGroup
									transitionName="appear"
									transitionAppear={true}
									transitionAppearTimeout={500}
									transitionEnterTimeout={500}
									transitionLeave={false}>
									<h2 key={this.state.current}>
									 	Current: {this.state.nums[this.state.current]}
									</h2>
								</CSSTransitionGroup>
			
						</header>
						<div className = "center">
							<Grid container spacing={24}>
									<Grid item xs={2}>
										<img src={left} className="left-arrow" onClick={this.handleBackwardClick}/>
									</Grid>
									<Grid item xs={8}>
										<Card>
										</Card>
									</Grid>
									<Grid item xs={2}>
										<img src={right} className="right-arrow" onClick={this.handleForwardClick}/>
									</Grid>
							</Grid>
						</div>
						<div className = "user">
							<form onSubmit={this.handleSubmit}>
								<MuiThemeProvider theme={theme}>
									<TextField value={this.state.message} onChange={this.handleChange} hintText="Please let me know how we can help ex: I want to see a doctor. " fullWidth={true} defaultValue="will focus"/>	
								<input type="submit" value="submit" hidden />
								</MuiThemeProvider>
							</form>
						</div>
					</div>
				</Grid>
			</Grid>
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
