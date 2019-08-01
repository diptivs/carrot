

const pomafocusdev = {
	apiGateway: {
		REGION: "us-west-2",
		URL: "https://phlrveklx2.execute-api.us-west-2.amazonaws.com/dev"
	},
	cognito: {
		REGION: "us-west-2",
		USER_POOL_ID: "us-west-2_5zUsaaG5Z",
		APP_CLIENT_ID: "3qf6isld48pmpl5toi0dorimgn",
		IDENTITY_POOL_ID: "us-west-2:1c74c78c-7ade-413e-926b-1c8d7696cc18"
	},
	social: {
		FB: "2259819917380032",
		GOOGLE: "342197279641-91rss3lpgh46hmtkahm1v1rhum2cbn98.apps.googleusercontent.com",
		CALAPPKEY: "AIzaSyDPB1jNCQr1RGOaaLzWW6dFc1RprWOVUPg"
	}
};

const pomafocusprod = {
		apiGateway: {
		REGION: "us-west-2",
		URL: "https://rds5qo34u2.execute-api.us-west-2.amazonaws.com/prod"
	},
	cognito: {
		REGION: "us-west-2",
		USER_POOL_ID: "us-west-2_FE8E9ZMJY",
		APP_CLIENT_ID: "95nednjr1oe02vr25ukva5o5c",
		IDENTITY_POOL_ID: "us-west-2:8eb6422e-c8c9-4164-9572-e76fd8604335"
	},
	social: {
		FB: "2259819917380032",
		GOOGLE: "342197279641-91rss3lpgh46hmtkahm1v1rhum2cbn98.apps.googleusercontent.com",
		CALAPPKEY: "AIzaSyDPB1jNCQr1RGOaaLzWW6dFc1RprWOVUPg"
	}
};


const config = process.env.REACT_APP_ENV === 'pomafocusprod'
	? pomafocusprod
	: pomafocusdev;	

export default {
	MAX_ATTACHMENT_SIZE: 5000000,
	...config
};
