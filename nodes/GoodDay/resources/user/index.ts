import type { INodeProperties } from 'n8n-workflow';

const showOnlyForUser = {
	resource: ['user'],
};

export const userDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForUser,
		},
		options: [
			{
				name: 'Get',
				value: 'get',
				action: 'Get a user',
				description: 'Retrieve organization user details',
				routing: {
					request: {
						method: 'GET',
						url: '=/user/{{$parameter.userId}}',
					},
				},
			},
			{
				name: 'Get Hourly Rate History',
				value: 'getHourlyRateHistory',
				action: 'Get hourly rate history for a user',
				description: 'Retrieve hourly rate history for an organization user',
				routing: {
					request: {
						method: 'GET',
						url: '=/user/{{$parameter.userId}}/hourly-rate-history',
					},
				},
			},
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get many users',
				description: 'Retrieve company users',
				routing: {
					request: {
						method: 'GET',
						url: '/users',
					},
				},
			},
		],
		default: 'getAll',
	},
	{
		displayName: 'User ID',
		name: 'userId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['get', 'getHourlyRateHistory'],
			},
		},
		description: 'The GoodDay user ID',
	},
	{
		displayName: 'User Filters',
		name: 'userFilters',
		type: 'collection',
		placeholder: 'Add Filter',
		default: {},
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				displayName: 'Deleted',
				name: 'deleted',
				type: 'boolean',
				default: false,
				description: 'Whether to include deleted company users',
				routing: {
					send: {
						type: 'query',
						property: 'deleted',
					},
				},
			},
		],
	},
];