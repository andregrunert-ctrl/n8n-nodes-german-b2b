import {
	IAuthenticateGeneric,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class GermanB2bApi implements ICredentialType {
	name = 'germanB2bApi';
	displayName = 'German B2B Apify API';
	documentationUrl = 'https://apify.com/agrunert';
	properties: INodeProperties[] = [
		{
			displayName: 'Apify API Token',
			name: 'apiToken',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			required: true,
			description:
				'Free personal Apify API token (starts with apify_api_...). Get your free token ($5/month free credits) at https://console.apify.com/account/integrations — test all 6 actors & 13 public tasks at https://apify.com/agrunert',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '=Bearer {{$credentials.apiToken}}',
			},
		},
	};
}
