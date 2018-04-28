import React, { Component } from 'react';
import './App.css';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Grids from "./Grids";

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<MuiThemeProvider>
				<Grids />
			</MuiThemeProvider>
		);
	}
}

export default App;