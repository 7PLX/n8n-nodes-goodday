import { NodeConnectionTypes, type INodeType, type INodeTypeDescription } from "n8n-workflow";
import { projectDescription } from "./resources/project";
import { taskDescription } from "./resources/task";
import { userDescription } from './resources/user';

export class GoodDay implements INodeType {
  description: INodeTypeDescription = {
    displayName: "GoodDay",
    name: "goodDay",
    icon: { light: "file:../../icons/goodday.svg", dark: "file:../../icons/goodday.dark.svg" },
    group: ["input"],
    version: 1,
    subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
    description: "Integrate with the GoodDay API",
    defaults: {
      name: "GoodDay",
    },
    usableAsTool: true,
    inputs: [NodeConnectionTypes.Main],
    outputs: [NodeConnectionTypes.Main],
    credentials: [
      {
        name: "goodDayApi",
        required: true,
        displayOptions: {
          show: {
            authentication: ["apiKey"],
          },
        },
      },
    ],
    requestDefaults: {
      baseURL: "https://api.goodday.work/2.0",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    },
    properties: [
      {
        displayName: "Authentication",
        name: "authentication",
        type: "options",
        options: [
          {
            name: "API Key",
            value: "apiKey",
          },
        ],
        default: "apiKey",
      },
      {
        displayName: "Resource",
        name: "resource",
        type: "options",
        noDataExpression: true,
        options: [
          {
            name: "Project",
            value: "project",
          },
          {
            name: "Task",
            value: "task",
          },
          {
            name: 'User',
            value: 'user',
          },
        ],
        default: "project",
      },
      ...projectDescription,
      ...taskDescription,
      ...userDescription,
    ],
  };

  methods = {};
}
