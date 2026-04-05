import type { INodeProperties } from 'n8n-workflow';

const showOnlyForTask = {
	resource: ['task'],
};

const omitIfEmpty = '={{ $value === "" ? undefined : $value }}';
const nullableString = '={{ $value === "" ? undefined : $value === "null" ? null : $value }}';
const nullableNumber = '={{ $value === "" ? undefined : $value === "null" ? null : Number($value) }}';
const parseJsonOrOmit = '={{ $value === "" ? undefined : JSON.parse($value) }}';
const splitCsvOrOmit =
	'={{ $value === "" ? undefined : $value.split(",").map((entry) => entry.trim()).filter(Boolean) }}';

export const taskDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForTask,
		},
		options: [
			{
				name: 'Add Tag',
				value: 'addTag',
				action: 'Add a tag to a task',
				description: 'Add a tag to a task',
				routing: {
					request: {
						method: 'POST',
						url: '=/task/{{$parameter.taskId}}/tag/{{$parameter.tagId}}',
					},
				},
			},
			{
				name: 'Comment',
				value: 'comment',
				action: 'Comment on a task',
				description: 'Create a task comment',
				routing: {
					request: {
						method: 'POST',
						url: '=/task/{{$parameter.taskId}}/comment',
					},
				},
			},
			{
				name: 'Create',
				value: 'create',
				action: 'Create a task',
				description: 'Create a new task',
				routing: {
					request: {
						method: 'POST',
						url: '/tasks',
					},
				},
			},
			{
				name: 'Delete',
				value: 'delete',
				action: 'Delete a task',
				description: 'Delete a task',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/task/{{$parameter.taskId}}',
					},
				},
			},
			{
				name: 'Get',
				value: 'get',
				action: 'Get a task',
				description: 'Retrieve task details',
				routing: {
					request: {
						method: 'GET',
						url: '=/task/{{$parameter.taskId}}',
					},
				},
			},
			{
				name: 'Get Messages',
				value: 'getMessages',
				action: 'Get task messages',
				description: 'Retrieve task messages',
				routing: {
					request: {
						method: 'GET',
						url: '=/task/{{$parameter.taskId}}/messages',
					},
				},
			},
			{
				name: 'Get Project Tasks',
				value: 'getProjectTasks',
				action: 'Get tasks in a project',
				description: 'Retrieve tasks for a project',
				routing: {
					request: {
						method: 'GET',
						url: '=/project/{{$parameter.projectLookupId}}/tasks',
					},
				},
			},
			{
				name: 'Get User Action Required Tasks',
				value: 'getUserActionRequiredTasks',
				action: 'Get action required tasks for a user',
				description: 'Retrieve action required tasks for a user',
				routing: {
					request: {
						method: 'GET',
						url: '=/user/{{$parameter.targetUserId}}/action-required-tasks',
					},
				},
			},
			{
				name: 'Get User Assigned Tasks',
				value: 'getUserAssignedTasks',
				action: 'Get tasks assigned to a user',
				description: 'Retrieve assigned tasks for a user',
				routing: {
					request: {
						method: 'GET',
						url: '=/user/{{$parameter.targetUserId}}/assigned-tasks',
					},
				},
			},
			{
				name: 'Remove Tag',
				value: 'removeTag',
				action: 'Remove a tag from a task',
				description: 'Remove a tag from a task',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/task/{{$parameter.taskId}}/tag/{{$parameter.tagId}}',
					},
				},
			},
			{
				name: 'Reply / Change AR User',
				value: 'reply',
				action: 'Reply to a task or change the action required user',
				description: 'Reply to a task or change the action required user',
				routing: {
					request: {
						method: 'POST',
						url: '=/task/{{$parameter.taskId}}/reply',
					},
				},
			},
			{
				name: 'Update',
				value: 'update',
				action: 'Update a task',
				description: 'Update task parameters',
				routing: {
					request: {
						method: 'PUT',
						url: '=/task/{{$parameter.taskId}}/update',
					},
				},
			},
			{
				name: 'Update Status',
				value: 'updateStatus',
				action: 'Update a task status',
				description: 'Update task status',
				routing: {
					request: {
						method: 'PUT',
						url: '=/task/{{$parameter.taskId}}/status',
					},
				},
			},
		],
		default: 'getProjectTasks',
	},
	{
		displayName: 'Project ID',
		name: 'projectLookupId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['task'],
				operation: ['getProjectTasks'],
			},
		},
	},
	{
		displayName: 'Project ID',
		name: 'projectId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['task'],
				operation: ['create'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'projectId',
			},
		},
	},
	{
		displayName: 'Task ID',
		name: 'taskId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['task'],
				operation: ['get', 'getMessages', 'comment', 'reply', 'addTag', 'removeTag', 'updateStatus', 'update', 'delete'],
			},
		},
	},
	{
		displayName: 'User ID',
		name: 'targetUserId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['task'],
				operation: ['getUserActionRequiredTasks', 'getUserAssignedTasks'],
			},
		},
	},
	{
		displayName: 'User ID',
		name: 'userId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['task'],
				operation: ['comment', 'reply', 'addTag', 'removeTag', 'updateStatus', 'update'],
			},
		},
		description: 'The user ID on whose behalf the request will execute',
		routing: {
			send: {
				type: 'body',
				property: 'userId',
			},
		},
	},
	{
		displayName: 'Title',
		name: 'title',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['task'],
				operation: ['create'],
			},
		},
		description: 'Task title',
		routing: {
			send: {
				type: 'body',
				property: 'title',
			},
		},
	},
	{
		displayName: 'From User ID',
		name: 'fromUserId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['task'],
				operation: ['create'],
			},
		},
		description: 'The user ID on whose behalf the task will be created',
		routing: {
			send: {
				type: 'body',
				property: 'fromUserId',
			},
		},
	},
	{
		displayName: 'Task Options',
		name: 'taskOptions',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['task'],
				operation: ['getProjectTasks'],
			},
		},
		options: [
			{
				displayName: 'Include Closed',
				name: 'closed',
				type: 'boolean',
				default: false,
				description: 'Whether to include both open and closed tasks',
				routing: {
					send: {
						type: 'query',
						property: 'closed',
					},
				},
			},
			{
				displayName: 'Include Subfolders',
				name: 'subfolders',
				type: 'boolean',
				default: false,
				description: 'Whether to include tasks from project subfolders',
				routing: {
					send: {
						type: 'query',
						property: 'subfolders',
					},
				},
			},
		],
	},
	{
		displayName: 'Task Options',
		name: 'assignedTaskOptions',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['task'],
				operation: ['getUserAssignedTasks'],
			},
		},
		options: [
			{
				displayName: 'Include Closed',
				name: 'closed',
				type: 'boolean',
				default: false,
				description: 'Whether to include both open and closed tasks',
				routing: {
					send: {
						type: 'query',
						property: 'closed',
					},
				},
			},
		],
	},
	{
		displayName: 'Message',
		name: 'message',
		type: 'string',
		typeOptions: {
			rows: 4,
		},
		default: '',
		displayOptions: {
			show: {
				resource: ['task'],
				operation: ['comment', 'reply', 'updateStatus'],
			},
		},
		description: 'Comment text',
		routing: {
			send: {
				type: 'body',
				property: 'message',
				value: omitIfEmpty,
			},
		},
	},
	{
		displayName: 'Create Options',
		name: 'createOptions',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['task'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Assigned To User ID',
				name: 'toUserId',
				type: 'string',
				default: '',
				description: 'Assigned to or action required user ID',
				routing: {
					send: {
						type: 'body',
						property: 'toUserId',
						value: omitIfEmpty,
					},
				},
			},
			{
				displayName: 'CRM Account ID',
				name: 'crmAccountId',
				type: 'string',
				default: '',
				routing: {
					send: {
						type: 'body',
						property: 'crmAccountId',
						value: omitIfEmpty,
					},
				},
			},
			{
				displayName: 'CRM Contact IDs',
				name: 'crmContactIds',
				type: 'string',
				default: '',
				placeholder: 'CONTACT-1, CONTACT-2',
				description: 'Comma-separated CRM contact IDs',
				routing: {
					send: {
						type: 'body',
						property: 'crmContactIds',
						value: splitCsvOrOmit,
					},
				},
			},
			{
				displayName: 'Deadline',
				name: 'deadline',
				type: 'string',
				default: '',
				placeholder: 'YYYY-MM-DD',
				description: 'Task deadline date',
				routing: {
					send: {
						type: 'body',
						property: 'deadline',
						value: omitIfEmpty,
					},
				},
			},
			{
				displayName: 'End Date',
				name: 'endDate',
				type: 'string',
				default: '',
				placeholder: 'YYYY-MM-DD',
				description: 'Task end date',
				routing: {
					send: {
						type: 'body',
						property: 'endDate',
						value: omitIfEmpty,
					},
				},
			},
			{
				displayName: 'Estimate Minutes',
				name: 'estimate',
				type: 'number',
				default: 0,
				typeOptions: {
					minValue: 0,
				},
				description: 'Task estimate in minutes',
				routing: {
					send: {
						type: 'body',
						property: 'estimate',
					},
				},
			},
			{
				displayName: 'Message',
				name: 'message',
				type: 'string',
				typeOptions: {
					rows: 4,
				},
				default: '',
				description: 'Task description or initial message',
				routing: {
					send: {
						type: 'body',
						property: 'message',
						value: omitIfEmpty,
					},
				},
			},
			{
				displayName: 'Parent Task ID',
				name: 'parentTaskId',
				type: 'string',
				default: '',
				description: 'Parent task ID to create a subtask',
				routing: {
					send: {
						type: 'body',
						property: 'parentTaskId',
						value: omitIfEmpty,
					},
				},
			},
			{
				displayName: 'Priority',
				name: 'priority',
				type: 'number',
				default: 5,
				typeOptions: {
					minValue: 1,
				},
				description: 'Task priority, where 50 is blocker and 100 is emergency',
				routing: {
					send: {
						type: 'body',
						property: 'priority',
					},
				},
			},
			{
				displayName: 'Start Date',
				name: 'startDate',
				type: 'string',
				default: '',
				placeholder: 'YYYY-MM-DD',
				description: 'Task start date',
				routing: {
					send: {
						type: 'body',
						property: 'startDate',
						value: omitIfEmpty,
					},
				},
			},
			{
				displayName: 'Story Points',
				name: 'storyPoints',
				type: 'number',
				default: 0,
				typeOptions: {
					minValue: 0,
				},
				description: 'Story points estimate',
				routing: {
					send: {
						type: 'body',
						property: 'storyPoints',
					},
				},
			},
			{
				displayName: 'Task Type ID',
				name: 'taskTypeId',
				type: 'string',
				default: '',
				routing: {
					send: {
						type: 'body',
						property: 'taskTypeId',
						value: omitIfEmpty,
					},
				},
			},
			{
				displayName: 'Todo List JSON',
				name: 'todoList',
				type: 'string',
				typeOptions: {
					rows: 4,
				},
				default: '',
				placeholder: '[{"name":"Checklist item"}]',
				description: 'Todo list payload as JSON',
				routing: {
					send: {
						type: 'body',
						property: 'todoList',
						value: parseJsonOrOmit,
					},
				},
			},
		],
	},
	{
		displayName: 'Action Required User ID',
		name: 'actionRequiredUserId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['task'],
				operation: ['reply'],
			},
		},
		description: 'The action required user ID for the reply request',
		routing: {
			send: {
				type: 'body',
				property: 'actionRequiredUserId',
			},
		},
	},
	{
		displayName: 'Tag ID',
		name: 'tagId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['task'],
				operation: ['addTag', 'removeTag'],
			},
		},
	},
	{
		displayName: 'Status ID',
		name: 'statusId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['task'],
				operation: ['updateStatus'],
			},
		},
		description: 'The new task status ID',
		routing: {
			send: {
				type: 'body',
				property: 'statusId',
			},
		},
	},
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['task'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Assigned To User ID',
				name: 'assignedToUserId',
				type: 'string',
				default: '',
				description: 'Assigned user ID or null to reset',
				routing: {
					send: {
						type: 'body',
						property: 'assignedToUserId',
						value: nullableString,
					},
				},
			},
			{
				displayName: 'Deadline',
				name: 'deadline',
				type: 'string',
				default: '',
				placeholder: 'YYYY-MM-DD or null',
				description: 'Deadline date or null to reset',
				routing: {
					send: {
						type: 'body',
						property: 'deadline',
						value: nullableString,
					},
				},
			},
			{
				displayName: 'End Date',
				name: 'endDate',
				type: 'string',
				default: '',
				placeholder: 'YYYY-MM-DD or null',
				description: 'End date or null to reset',
				routing: {
					send: {
						type: 'body',
						property: 'end-date',
						value: nullableString,
					},
				},
			},
			{
				displayName: 'Estimate Minutes',
				name: 'estimate',
				type: 'string',
				default: '',
				placeholder: '120 or null',
				description: 'Estimate in minutes or null to reset',
				routing: {
					send: {
						type: 'body',
						property: 'estimate',
						value: nullableNumber,
					},
				},
			},
			{
				displayName: 'Parent Task ID',
				name: 'parentTaskId',
				type: 'string',
				default: '',
				description: 'Parent task ID; do not combine with Project ID',
				routing: {
					send: {
						type: 'body',
						property: 'parentTaskId',
						value: nullableString,
					},
				},
			},
			{
				displayName: 'Priority',
				name: 'priority',
				type: 'string',
				default: '',
				placeholder: '5 or 50 or 100 or null',
				description: 'Priority or null to reset',
				routing: {
					send: {
						type: 'body',
						property: 'priority',
						value: nullableNumber,
					},
				},
			},
			{
				displayName: 'Progress',
				name: 'progress',
				type: 'string',
				default: '',
				placeholder: '0-100 or null',
				description: 'Progress percentage or null to reset',
				routing: {
					send: {
						type: 'body',
						property: 'progress',
						value: nullableNumber,
					},
				},
			},
			{
				displayName: 'Project ID',
				name: 'projectId',
				type: 'string',
				default: '',
				description: 'Project or folder ID to move the task to',
				routing: {
					send: {
						type: 'body',
						property: 'projectId',
						value: nullableString,
					},
				},
			},
			{
				displayName: 'Start Date',
				name: 'startDate',
				type: 'string',
				default: '',
				placeholder: 'YYYY-MM-DD or null',
				description: 'Start date or null to reset',
				routing: {
					send: {
						type: 'body',
						property: 'start-date',
						value: nullableString,
					},
				},
			},
			{
				displayName: 'Title',
				name: 'title',
				type: 'string',
				default: '',
				description: 'Task title',
				routing: {
					send: {
						type: 'body',
						property: 'title',
						value: nullableString,
					},
				},
			},
			{
				displayName: 'Todo List JSON',
				name: 'todoList',
				type: 'string',
				typeOptions: {
					rows: 4,
				},
				default: '',
				placeholder: '[{"name":"Checklist item"}]',
				description: 'Todo list JSON or null to reset',
				routing: {
					send: {
						type: 'body',
						property: 'todoList',
						value: '={{ $value === "" ? undefined : $value === "null" ? null : JSON.parse($value) }}',
					},
				},
			},
		],
	},
];