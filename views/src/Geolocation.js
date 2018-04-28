import React, {Component} from "react";
import {geolocated, geoPropTypes} from 'react-geolocated';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card'

class Geolocation extends Component {
	render() {
		return(<div></div>);
	}
}

export default geolocated({
    positionOptions: {
        enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
})(Geolocation);
