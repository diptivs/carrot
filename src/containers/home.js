import { Auth } from "aws-amplify";
import React, { Component } from "react";
import "./home.css";
import Lander from "./Lander";
import PomaHome from "./PomaHome";

export default class Home extends Component {

	constructor(props) {
		super(props);
		this.state = {
			isLoading: true,
			email: false,
			firstname: "",
			lastname: "",
			sub: ""
		};
	}

	async componentDidMount() {
		if (!this.props.isAuthenticated) {
			return;
		}
		this.getUserInfo();
		this.setState({ isLoading: false });
	}

	async getUserInfo() {
		const info = await Auth.currentUserInfo();
		console.log(info);
		if(this.props.isAuthenticated)
		{
			// Fetch id
			this.setState({id: info ? info.id : null});

			// Fetch email
			var strEmail = info.attributes['email'];
			if(strEmail.trim() === "admin@example.com")
			this.setState({email : true});
			
			// Fetch firstname
	    	var strFirstName = info.attributes['given_name'];
	    	this.setState({firstname : strFirstName });
			
			// Fetch lastname
	    	var strLastName = info.attributes['family_name'];
			this.setState({lastname : strLastName });
			
	    }
	}
	render() {
		const { firstname, lastname, email, id } = this.state;
		return (
			<div className="Home">
				{this.props.isAuthenticated ? <PomaHome firstname={firstname} lastname={lastname} id={id} email={email}/> : <Lander/>}
			</div>
		);
	}
}