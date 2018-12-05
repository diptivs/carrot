import React, { Component } from "react";
import LexChat from "react-lex";
import "./configure.css";
import config from "../../config";

export default class Configure extends Component {
	render() {
		console.log(config.cognito);
		return (
			<div className="configure-container">
				<LexChat botName="PomaFocus"
                	IdentityPoolId={config.cognito.IDENTITY_POOL_ID}
                	placeholder="Start by telling us when your day starts"
                	backgroundColor="#FFFFFF"
					height="430px"
                	region={config.cognito.REGION}
                	headerText="Configure here" />
			</div>
		);
	}
}