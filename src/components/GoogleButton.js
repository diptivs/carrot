import React, { Component } from "react";
import { Auth } from "aws-amplify";
import LoaderButton from "./LoaderButton";
import AWS from "aws-sdk";

function waitForInit() {
  return new Promise((res, rej) => {
    const hasGapiLoaded = () => {
      if (window.gapi) {
        res();
      } else {
        setTimeout(hasGapiLoaded, 300);
      }
    };
    hasGapiLoaded();
  });
}

export default class GoogleButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true
    };
  }

  async componentDidMount() {
    await waitForInit();
    this.setState({ isLoading: false });
  }

  handleClick = () => {
    console.log("Dipti: Start handleClick ");
    const ga = window.gapi.auth2.getAuthInstance();
    const { onError } = this.props;
    ga.signIn().then(
        googleUser => {
	    console.log("Google Signin Success");
	    console.log(googleUser);
            this.handleResponse(googleUser);
        },
        error => {
            if (onError) this.handleError(error);
            else throw error;
        }
    );

  };

  handleError(error) {
    alert(error);
  }

  async handleResponse(data) {
    console.log("Enter handleResponse");

    const { id_token, expires_at } = data.getAuthResponse();

    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: 'us-west-2:09d04c0b-65ad-45f0-a955-c7aaa9b9cd3b',
        Logins: {
           'accounts.google.com': data['id_token']
        }
     });

     AWS.config.credentials.get(function(err) {
     	if (!err) {
     		var id = AWS.config.credentials.identityId;
		console.log("Success");
		console.log(id);
     	} else {
		console.log(err);
	}
	 
     });

/*
    console.log(data);
    //const { id_token, expires_at } = data.getAuthResponse();
    const googleResponse = data.getAuthResponse() 

    const profile = data.getBasicProfile();
    let user = {
      email: profile.getEmail(),
      name: profile.getName()
    };
	  
    console.log("Dipti start");
    console.log(user);
    //console.log(id_token);
    //console.log(expires_at);
    console.log("Dipti end");

    this.setState({ isLoading: true });

    try {
<<<<<<< HEAD
      const response = await Auth.federatedSignIn(
              "google",
              { id_token, expires_at },
=======
	    const response = await Auth.federatedSignIn(
              'google',
              googleResponse,
>>>>>>> b1e7ed3d4c6cb9e06d3e80d9b30d3c1ca400dcf5
              user
	    );
	    console.log(response);
	    this.setState({ isLoading: false });
	    this.props.onLogin(response);
    } catch (e) {
      console.log("Dipti: google federatedSignIn failed");
      console.log(e);
      this.setState({ isLoading: false });
      this.handleError(e);
    }*/
  }

  render() {
    return (
      <LoaderButton
        block
        bsSize="large"
        bsStyle="primary"
        className="GoogleButton"
        text="Login with Google"
        onClick={this.handleClick}
        disabled={this.state.isLoading}
      />
    );
  }
}
