# @7plx/n8n-nodes-goodday

This is an n8n community node. It lets you interact with [GoodDay](https://www.goodday.work/) in your n8n workflows.

GoodDay is a project management tool.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/sustainable-use-license/) workflow automation platform.

[Installation](#installation)
[Operations](#operations)
[Credentials](#credentials)
[Compatibility](#compatibility)
[Resources](#resources)

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

## Operations

### Projects

- Create Folder
- Create Project
- Get a project
- Get project history
- Get many projects
- Get tasks for a tag
- Get tasks for a project

### Tasks

- Create a task
- Delete a task
- Get a task
- Get many tasks in a project
- Get task messages
- Add a tag to a task
- Comment on a task

### Users

- Get a user
- Get hourly rate history for a user
- Get many users

### Trigger (Webhook)

- Project: create, delete, status update
- Task: create, delete, close, reopen, status update
- Timelog: create, update, delete

## Credentials

To use this node, you need a GoodDay API Key.

### API Key

1. Log in to [GoodDay](https://app.goodday.work/).
2. Navigate to your **Organisation Settings** > **Integrations** > **API**.
3. Generate or copy your **API Token**.
4. Use this key in your n8n GoodDay credentials.

Refer to the [GoodDay API documentation](https://www.goodday.work/developers/api-v2/connect) for more information.

## Compatibility

Compatible with n8n@1.60.0 or later

## Resources

- [n8n community nodes documentation](https://docs.n8n.io/integrations/#community-nodes)
- [GoodDay API docs](https://www.goodday.work/developers/api-v2)

