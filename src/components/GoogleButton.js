import React, { Component } from "react";
import { Auth } from "aws-amplify";
import LoaderButton from "./LoaderButton";

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
    const ga = window.gapi.auth2.getAuthInstance();
    const { onError } = this.props;
    ga.signIn().then(
        googleUser => {
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
    const { id_token, expires_at } = data.getAuthResponse();
    

    const profile = data.getBasicProfile();
    let user = {
      email: profile.getEmail(),
      name: profile.getName()
    };
     
    

    this.setState({ isLoading: true });

    try {
      const response = await Auth.federatedSignIn(
              "google",
              { id_token, expires_at },
              user
          );

      this.setState({ isLoading: false });
      this.props.onLogin(response);
    } catch (e) {
      console.log("Dipti: google federatedSignIn failed");
      console.log(e);
      this.setState({ isLoading: false });
      this.handleError(e);
    }
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