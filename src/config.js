

const pomafocusdev = {
	apiGateway: {
		REGION: "us-west-2",
		URL: "https://ou5tkzfluj.execute-api.us-west-2.amazonaws.com/pomafocusDev"
	},
	cognito: {
		REGION: "us-west-2",
		USER_POOL_ID: "us-west-2_G0NVTrPej",
		APP_CLIENT_ID: "41hjo3rmk66uad1md4krl04d1e",
		IDENTITY_POOL_ID: "us-west-2:d4290dd9-154c-4bfb-adc8-3dfd2ac5024a"
	},
	social: {
		FB: "542629866184897"
	}
};

const pomafocusprod = {
};


const config = process.env.REACT_APP_ENV === 'pomafocusprod'
	? pomafocusprod
	: pomafocusdev;	

export default {
	MAX_ATTACHMENT_SIZE: 5000000,
	...config
};