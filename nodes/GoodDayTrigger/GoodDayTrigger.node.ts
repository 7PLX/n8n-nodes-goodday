import type {
  IDataObject,
  INodeExecutionData,
  INodePropertyOptions,
  INodeType,
  INodeTypeDescription,
  IWebhookFunctions,
  IWebhookResponseData,
  JsonObject,
} from "n8n-workflow";
import { NodeConnectionTypes } from "n8n-workflow";

const webhookEvents: INodePropertyOptions[] = [
  {
    name: "Project Create",
    value: "project.create",
    description: "Fired when a new folder or project is created",
  },
  {
    name: "Project Delete",
    value: "project.delete",
    description: "Fired when a folder or project is deleted",
  },
  {
    name: "Project Status",
    value: "project.status",
    description: "Fired when a project status is updated",
  },
  {
    name: "Task Close",
    value: "task.close",
    description: "Fired when a task is closed or canceled",
  },
  {
    name: "Task Create",
    value: "task.create",
    description: "Fired when a task is created",
  },
  {
    name: "Task Deleted",
    value: "task.deleted",
    description: "Fired when a task is deleted",
  },
  {
    name: "Task Reopen",
    value: "task.reopen",
    description: "Fired when a closed task is reopened",
  },
  {
    name: "Task Status",
    value: "task.status",
    description: "Fired when a task status is updated",
  },
  {
    name: "Timelog Create",
    value: "timelog.create",
    description: "Fired when time is reported",
  },
  {
    name: "Timelog Delete",
    value: "timelog.delete",
    description: "Fired when a time report is deleted",
  },
  {
    name: "Timelog Update",
    value: "timelog.update",
    description: "Fired when a time report is updated",
  },
];

function asRecord(value: unknown): IDataObject {
  if (value !== null && typeof value === "object" && !Array.isArray(value)) {
    return value as IDataObject;
  }

  return {};
}

function extractEventType(body: IDataObject): string | undefined {
  const directCandidates = ["event", "eventType", "type", "trigger", "webhookType"];

  for (const candidate of directCandidates) {
    const value = body[candidate];
    if (typeof value === "string" && value.length > 0) {
      return value;
    }
  }

  const nestedCandidates = ["meta", "payload", "data"];

  for (const candidate of nestedCandidates) {
    const nested = asRecord(body[candidate]);
    for (const nestedKey of directCandidates) {
      const value = nested[nestedKey];
      if (typeof value === "string" && value.length > 0) {
        return value;
      }
    }
  }

  return undefined;
}

export class GoodDayTrigger implements INodeType {
  description: INodeTypeDescription = {
    displayName: "GoodDay Trigger",
    name: "goodDayTrigger",
    icon: { light: "file:../../icons/goodday.svg", dark: "file:../../icons/goodday.dark.svg" },
    group: ["trigger"],
    version: 1,
    subtitle: '={{$parameter["events"].join(", ") || "manual webhook"}}',
    description:
      "Starts the workflow when GoodDay sends a webhook event. Configure the webhook manually in GoodDay Organization > Settings > API > Manage Webhooks.",
    defaults: {
      name: "GoodDay Trigger",
    },
    inputs: [],
    outputs: [NodeConnectionTypes.Main],
    usableAsTool: true,
    webhooks: [
      {
        name: "default",
        httpMethod: "POST",
        responseMode: "onReceived",
        path: "webhook",
      },
    ],
    properties: [
      {
        displayName: "Events",
        name: "events",
        type: "multiOptions",
        required: true,
        default: ["task.create"],
        description: "The GoodDay webhook events this trigger expects to receive",
        options: webhookEvents,
      },
    ],
  };

  async webhook(this: IWebhookFunctions): Promise<IWebhookResponseData> {
    const bodyData = this.getBodyData();
    const headerData = this.getHeaderData();
    const queryData = this.getQueryData();
    const configuredEvents = this.getNodeParameter("events") as string[];

    const records = Array.isArray(bodyData)
      ? bodyData.map((entry) => asRecord(entry))
      : [asRecord(bodyData)];

    const returnData: INodeExecutionData[] = [];

    for (const record of records) {
      const eventType = extractEventType(record);

      if (eventType !== undefined && !configuredEvents.includes(eventType)) {
        continue;
      }

      returnData.push({
        json: {
          eventType,
          body: record,
          headers: headerData,
          query: queryData,
        } as JsonObject,
      });
    }

    if (returnData.length === 0) {
      return {
        webhookResponse: "OK",
      };
    }

    return {
      workflowData: [returnData],
      webhookResponse: "OK",
    };
  }
}
