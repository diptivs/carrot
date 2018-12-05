import React, { Component } from "react";
import "./configure.css";
import config from "../../config";
import { ChatBot, AmplifyTheme } from 'aws-amplify-react';

const myTheme = {
  ...AmplifyTheme,
  sectionHeader: {
    ...AmplifyTheme.sectionHeader,
    backgroundColor: '#ff6600'
  }
};

export default class Configure extends Component {

	handleComplete(err, confirmation) {
		if (err) {
		  alert('Configuration setup failed')
		  return;
		}
	
		alert('Success: ' + JSON.stringify(confirmation, null, 2));
		return 'Configuration is complete! Start adding some tasks';
	}	

	render() {
		return (
			<div className="configure-container">
				<ChatBot
					title="My Bot"
					theme={myTheme}
					botName="PomaFocus"
					welcomeMessage="Welcome, start by telling me what time your day usually starts (i.e HH:00 AM)"
					onComplete={this.handleComplete.bind(this)}
					clearOnComplete={true}
				/>
			</div>
		);
	}
}