import type { INodeProperties } from "n8n-workflow";

const showOnlyForProject = {
  resource: ["project"],
};

const omitIfEmpty = '={{ $value === "" ? undefined : $value }}';
const nullableString = '={{ $value === "" ? undefined : $value === "null" ? null : $value }}';
const nullableNumber =
  '={{ $value === "" ? undefined : $value === "null" ? null : Number($value) }}';

export const projectDescription: INodeProperties[] = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: showOnlyForProject,
    },
    options: [
      {
        name: "Create Folder",
        value: "createFolder",
        action: "Create a folder",
        description: "Create a new work folder",
        routing: {
          request: {
            method: "POST",
            url: "/projects/new-folder",
          },
        },
      },
      {
        name: "Create Project",
        value: "createProject",
        action: "Create a project",
        description: "Create a new project",
        routing: {
          request: {
            method: "POST",
            url: "/projects/new-project",
          },
        },
      },
      {
        name: "Get",
        value: "get",
        action: "Get a project",
        description: "Retrieve project details",
        routing: {
          request: {
            method: "GET",
            url: "=/project/{{$parameter.projectId}}",
          },
        },
      },
      {
        name: "Get History",
        value: "getHistory",
        action: "Get a project history",
        description: "Retrieve project history events",
        routing: {
          request: {
            method: "GET",
            url: "=/projects/{{$parameter.projectId}}/history",
          },
        },
      },
      {
        name: "Get Many",
        value: "getAll",
        action: "Get many projects",
        description: "Retrieve company projects",
        routing: {
          request: {
            method: "GET",
            url: "/projects",
          },
        },
      },
      {
        name: "Get Tag Tasks",
        value: "getTagTasks",
        action: "Get tasks for a tag",
        description: "Retrieve tasks for a tag from the projects API page",
        routing: {
          request: {
            method: "GET",
            url: "=/tag/{{$parameter.tagId}}/tasks",
          },
        },
      },
      {
        name: "Get Tasks",
        value: "getTasks",
        action: "Get tasks for a project",
        description: "Retrieve tasks for a project",
        routing: {
          request: {
            method: "GET",
            url: "=/project/{{$parameter.projectId}}/tasks",
          },
        },
      },
      {
        name: "Get Users",
        value: "getUsers",
        action: "Get users for a project",
        description: "Retrieve project users",
        routing: {
          request: {
            method: "GET",
            url: "=/project/{{$parameter.projectId}}/users",
          },
        },
      },
      {
        name: "Update",
        value: "update",
        action: "Update a project",
        description: "Update project properties",
        routing: {
          request: {
            method: "PUT",
            url: "=/project/{{$parameter.projectId}}",
          },
        },
      },
    ],
    default: "getAll",
  },
  {
    displayName: "Project ID",
    name: "projectId",
    type: "string",
    default: "",
    required: true,
    displayOptions: {
      show: {
        resource: ["project"],
        operation: ["get", "getHistory", "getTasks", "getUsers", "update"],
      },
    },
  },
  {
    displayName: "Tag ID",
    name: "tagId",
    type: "string",
    default: "",
    required: true,
    displayOptions: {
      show: {
        resource: ["project"],
        operation: ["getTagTasks"],
      },
    },
  },
  {
    displayName: "Projects Filters",
    name: "projectFilters",
    type: "collection",
    placeholder: "Add Filter",
    default: {},
    displayOptions: {
      show: {
        resource: ["project"],
        operation: ["getAll"],
      },
    },
    options: [
      {
        displayName: "Archived",
        name: "archived",
        type: "boolean",
        default: false,
        description: "Whether to include archived or closed projects",
        routing: {
          send: {
            type: "query",
            property: "archived",
          },
        },
      },
      {
        displayName: "Root Only",
        name: "rootOnly",
        type: "boolean",
        default: false,
        description: "Whether to return only root projects",
        routing: {
          send: {
            type: "query",
            property: "rootOnly",
          },
        },
      },
    ],
  },
  {
    displayName: "Task Filters",
    name: "taskFilters",
    type: "collection",
    placeholder: "Add Filter",
    default: {},
    displayOptions: {
      show: {
        resource: ["project"],
        operation: ["getTasks"],
      },
    },
    options: [
      {
        displayName: "Closed",
        name: "closed",
        type: "boolean",
        default: false,
        description: "Whether to include open and closed tasks",
        routing: {
          send: {
            type: "query",
            property: "closed",
          },
        },
      },
      {
        displayName: "Subfolders",
        name: "subfolders",
        type: "boolean",
        default: false,
        description: "Whether to include tasks from subfolders",
        routing: {
          send: {
            type: "query",
            property: "subfolders",
          },
        },
      },
    ],
  },
  {
    displayName: "Task Filters",
    name: "tagTaskFilters",
    type: "collection",
    placeholder: "Add Filter",
    default: {},
    displayOptions: {
      show: {
        resource: ["project"],
        operation: ["getTagTasks"],
      },
    },
    options: [
      {
        displayName: "Closed",
        name: "closed",
        type: "boolean",
        default: false,
        description: "Whether to include open and closed tasks",
        routing: {
          send: {
            type: "query",
            property: "closed",
          },
        },
      },
    ],
  },
  {
    displayName: "Created By User ID",
    name: "createdByUserId",
    type: "string",
    default: "",
    required: true,
    displayOptions: {
      show: {
        resource: ["project"],
        operation: ["createFolder", "createProject"],
      },
    },
    routing: {
      send: {
        type: "body",
        property: "createdByUserId",
      },
    },
  },
  {
    displayName: "Name",
    name: "name",
    type: "string",
    default: "",
    required: true,
    displayOptions: {
      show: {
        resource: ["project"],
        operation: ["createFolder", "createProject"],
      },
    },
    routing: {
      send: {
        type: "body",
        property: "name",
      },
    },
  },
  {
    displayName: "Create Folder Options",
    name: "createFolderOptions",
    type: "collection",
    placeholder: "Add Option",
    default: {},
    displayOptions: {
      show: {
        resource: ["project"],
        operation: ["createFolder"],
      },
    },
    options: [
      {
        displayName: "Palette Index",
        name: "paletteIndex",
        type: "number",
        default: 1,
        typeOptions: {
          minValue: 1,
          maxValue: 24,
        },
        description: "Folder color from 1 to 24",
        routing: {
          send: {
            type: "body",
            property: "color",
          },
        },
      },
      {
        displayName: "Parent Project ID",
        name: "parentProjectId",
        type: "string",
        default: "",
        description: "Parent project ID for a subfolder",
        routing: {
          send: {
            type: "body",
            property: "parentProjectId",
            value: omitIfEmpty,
          },
        },
      },
    ],
  },
  {
    displayName: "Project Template ID",
    name: "projectTemplateId",
    type: "string",
    default: "",
    required: true,
    displayOptions: {
      show: {
        resource: ["project"],
        operation: ["createProject"],
      },
    },
    routing: {
      send: {
        type: "body",
        property: "projectTemplateId",
      },
    },
  },
  {
    displayName: "Create Project Options",
    name: "createProjectOptions",
    type: "collection",
    placeholder: "Add Option",
    default: {},
    displayOptions: {
      show: {
        resource: ["project"],
        operation: ["createProject"],
      },
    },
    options: [
      {
        displayName: "Deadline",
        name: "deadline",
        type: "string",
        default: "",
        placeholder: "YYYY-MM-DD",
        routing: {
          send: {
            type: "body",
            property: "deadline",
            value: omitIfEmpty,
          },
        },
      },
      {
        displayName: "End Date",
        name: "endDate",
        type: "string",
        default: "",
        placeholder: "YYYY-MM-DD",
        routing: {
          send: {
            type: "body",
            property: "endDate",
            value: omitIfEmpty,
          },
        },
      },
      {
        displayName: "Palette Index",
        name: "paletteIndex",
        type: "number",
        default: 1,
        typeOptions: {
          minValue: 1,
          maxValue: 24,
        },
        description: "Project color from 1 to 24",
        routing: {
          send: {
            type: "body",
            property: "color",
          },
        },
      },
      {
        displayName: "Parent Project ID",
        name: "parentProjectId",
        type: "string",
        default: "",
        description: "Parent project ID for a subproject",
        routing: {
          send: {
            type: "body",
            property: "parentProjectId",
            value: omitIfEmpty,
          },
        },
      },
      {
        displayName: "Project Owner User ID",
        name: "projectOwnerUserId",
        type: "string",
        default: "",
        routing: {
          send: {
            type: "body",
            property: "projectOwnerUserId",
            value: omitIfEmpty,
          },
        },
      },
      {
        displayName: "Start Date",
        name: "startDate",
        type: "string",
        default: "",
        placeholder: "YYYY-MM-DD",
        routing: {
          send: {
            type: "body",
            property: "startDate",
            value: omitIfEmpty,
          },
        },
      },
    ],
  },
  {
    displayName: "User ID",
    name: "userId",
    type: "string",
    default: "",
    required: true,
    displayOptions: {
      show: {
        resource: ["project"],
        operation: ["update"],
      },
    },
    description: "The user ID on whose behalf the request will execute",
    routing: {
      send: {
        type: "body",
        property: "userId",
      },
    },
  },
  {
    displayName: "Update Fields",
    name: "updateFields",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    displayOptions: {
      show: {
        resource: ["project"],
        operation: ["update"],
      },
    },
    options: [
      {
        displayName: "Description",
        name: "description",
        type: "string",
        default: "",
        placeholder: "Text or null",
        typeOptions: {
          rows: 4,
        },
        routing: {
          send: {
            type: "body",
            property: "description",
            value: nullableString,
          },
        },
      },
      {
        displayName: "End Date",
        name: "endDate",
        type: "string",
        default: "",
        placeholder: "YYYY-MM-DD or null",
        routing: {
          send: {
            type: "body",
            property: "endDate",
            value: nullableString,
          },
        },
      },
      {
        displayName: "Estimate Minutes",
        name: "estimate",
        type: "string",
        default: "",
        placeholder: "120 or null",
        description: "Estimate or null to reset",
        routing: {
          send: {
            type: "body",
            property: "estimate",
            value: nullableNumber,
          },
        },
      },
      {
        displayName: "Health",
        name: "health",
        type: "string",
        default: "",
        placeholder: "0, 1, 2, or null",
        routing: {
          send: {
            type: "body",
            property: "health",
            value: nullableNumber,
          },
        },
      },
      {
        displayName: "Name",
        name: "name",
        type: "string",
        default: "",
        placeholder: "Text or null",
        routing: {
          send: {
            type: "body",
            property: "name",
            value: nullableString,
          },
        },
      },
      {
        displayName: "Palette Index",
        name: "paletteIndex",
        type: "string",
        default: "",
        placeholder: "1-24 or null",
        description: "Project color or null to reset",
        routing: {
          send: {
            type: "body",
            property: "color",
            value: nullableNumber,
          },
        },
      },
      {
        displayName: "Parent Project ID",
        name: "parentProjectId",
        type: "string",
        default: "",
        placeholder: "Project ID or null",
        description: "Parent project ID or null to reset",
        routing: {
          send: {
            type: "body",
            property: "parentProjectId",
            value: nullableString,
          },
        },
      },
      {
        displayName: "Priority",
        name: "priority",
        type: "string",
        default: "",
        placeholder: "1-10, 50, 100, or null",
        description: "Priority or null to reset",
        routing: {
          send: {
            type: "body",
            property: "priority",
            value: nullableNumber,
          },
        },
      },
      {
        displayName: "Progress",
        name: "progress",
        type: "string",
        default: "",
        placeholder: "0-100 or null",
        description: "Progress percentage or null to reset",
        routing: {
          send: {
            type: "body",
            property: "progress",
            value: nullableNumber,
          },
        },
      },
      {
        displayName: "Start Date",
        name: "startDate",
        type: "string",
        default: "",
        placeholder: "YYYY-MM-DD or null",
        routing: {
          send: {
            type: "body",
            property: "startDate",
            value: nullableString,
          },
        },
      },
      {
        displayName: "Status Comments",
        name: "statusComments",
        type: "string",
        default: "",
        placeholder: "Text or null",
        typeOptions: {
          rows: 4,
        },
        routing: {
          send: {
            type: "body",
            property: "statusComments",
            value: nullableString,
          },
        },
      },
      {
        displayName: "System Status",
        name: "systemStatus",
        type: "string",
        default: "",
        placeholder: "2, 5, or null",
        description: "Pass 5 to archive or 2 to re-open",
        routing: {
          send: {
            type: "body",
            property: "systemStatus",
            value: nullableNumber,
          },
        },
      },
    ],
  },
];
