

const pomafocusdev = {
	apiGateway: {
		REGION: "us-west-2",
		URL: "https://99tc53sae1.execute-api.us-west-2.amazonaws.com/dev"
	},
	cognito: {
		REGION: "us-west-2",
		USER_POOL_ID: "us-west-2_G0NVTrPej",
		APP_CLIENT_ID: "41hjo3rmk66uad1md4krl04d1e",
		IDENTITY_POOL_ID: "us-west-2:d4290dd9-154c-4bfb-adc8-3dfd2ac5024a"
	},
	social: {
		FB: "2259819917380032"
	}
};

const pomafocusprod = {
		apiGateway: {
		REGION: "us-west-2",
		URL: "https://hr4idm6xy8.execute-api.us-west-2.amazonaws.com/pomafocusProd"
	},
	cognito: {
		REGION: "us-west-2",
		USER_POOL_ID: "us-west-2_Wsw2FD5dp",
		APP_CLIENT_ID: "638g576h4vbdo6gobl8a2poco2",
		IDENTITY_POOL_ID: "us-west-2:1348e714-59c2-4fab-b336-4b0bfb4d7a06"
	},
	social: {
		FB: "2259819917380032"
	}
};


const config = process.env.REACT_APP_ENV === 'pomafocusprod'
	? pomafocusprod
	: pomafocusdev;	

export default {
	MAX_ATTACHMENT_SIZE: 5000000,
	...config
};