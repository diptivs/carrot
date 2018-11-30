import React, { Component } from "react";
import LexChat from "react-lex";
import "./configure.css";

export default class Configure extends Component {
	render() {
		return (
			<div className="configure-container">
				<LexChat botName="OrderFlowers"
                	IdentityPoolId="us-east-1:7292b8c0-56f1-4441-b2a6-xxxxxxxxxxxx"
                	placeholder="Start by telling us when your day starts"
                	backgroundColor="#FFFFFF"
					height="430px"
                	region="us-east-1"
                	headerText="Configure here" />
			</div>
		);
	}
}