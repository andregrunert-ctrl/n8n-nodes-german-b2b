import {
	IAuthenticateGeneric,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class GermanB2bApi implements ICredentialType {
	name = 'germanB2bApi';
	displayName = 'German B2B Apify API';
	documentationUrl = 'https://docs.apify.com/platform/integrations/api';
	properties: INodeProperties[] = [
		{
			displayName: 'Apify API Token',
			name: 'apiToken',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			required: true,
			description: 'Personal Apify API token (starts with apify_api_...). Find it in Apify Console under Settings -> Integrations.',
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
