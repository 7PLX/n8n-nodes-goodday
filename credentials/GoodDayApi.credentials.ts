import type {
	IAuthenticateGeneric,
	Icon,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class GoodDayApi implements ICredentialType {
	name = 'goodDayApi';

	displayName = 'GoodDay API';

	icon: Icon = { light: 'file:../icons/goodday.svg', dark: 'file:../icons/goodday.dark.svg' };

	documentationUrl =
		'https://www.goodday.work/developers/api-v2/connect';

	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				'gd-api-token': '={{$credentials?.apiKey}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://api.goodday.work/2.0',
			url: '/users',
			method: 'GET',
		},
	};
}
