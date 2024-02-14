import api, { route } from '@forge/api';

// Function to get issue events
const getIssueEvents = async () => {
  const response = await api.asUser().requestJira(route`/rest/api/3/events`, {
    headers: {
      'Accept': 'application/json'
    }
  });

  console.log(`Response: ${response.status} ${response.statusText}`);
  console.log(await response.json());
};

// Function to create an issue
const createIssue = async (bodyData) => {
  const response = await api.asUser().requestJira(route`/rest/api/3/issue`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: bodyData
  });

  console.log(`Response: ${response.status} ${response.statusText}`);
  console.log(await response.json());
};

// Function to archive an issue
const archiveIssue = async (bodyData) => {
  const response = await api.asUser().requestJira(route`/rest/api/3/issue/archive`, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: bodyData
  });

  console.log(`Response: ${response.status} ${response.statusText}`);
  console.log(await response.json());
};

// Function to bulk create issues
const createIssuesBulk = async (bodyData) => {
  const response = await api.asUser().requestJira(route`/rest/api/3/issue/bulk`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: bodyData
  });

  console.log(`Response: ${response.status} ${response.statusText}`);
  console.log(await response.json());
};

// Function to get metadata for creating issues
const getCreateMeta = async (projectIdOrKey) => {
  const response = await api.asUser().requestJira(route`/rest/api/3/issue/createmeta/${projectIdOrKey}/issuetypes`, {
    headers: {
      'Accept': 'application/json'
    }
  });

  console.log(`Response: ${response.status} ${response.statusText}`);
  console.log(await response.json());
};

// Function to get metadata for creating issues with specific issuetype
const getCreateMetaForIssueType = async (projectIdOrKey, issueTypeId) => {
  const response = await api.asUser().requestJira(route`/rest/api/3/issue/createmeta/${projectIdOrKey}/issuetypes/${issueTypeId}`, {
    headers: {
      'Accept': 'application/json'
    }
  });

  console.log(`Response: ${response.status} ${response.statusText}`);
  console.log(await response.json());
};

// Function to unarchive an issue
const unarchiveIssue = async (bodyData) => {
  const response = await api.asUser().requestJira(route`/rest/api/3/issue/unarchive`, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: bodyData
  });

  console.log(`Response: ${response.status} ${response.statusText}`);
  console.log(await response.json());
};

// Function to get details of a specific issue
const getIssueDetails = async (issueIdOrKey) => {
  const response = await api.asUser().requestJira(route`/rest/api/3/issue/${issueIdOrKey}`, {
    headers: {
      'Accept': 'application/json'
    }
  });

  console.log(`Response: ${response.status} ${response.statusText}`);
  console.log(await response.json());
};

// Function to update details of a specific issue
const updateIssueDetails = async (issueIdOrKey, bodyData) => {
  const response = await api.asUser().requestJira(route`/rest/api/3/issue/${issueIdOrKey}`, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: bodyData
  });

  console.log(`Response: ${response.status} ${response.statusText}`);
  console.log(await response.json());
};

// Function to delete a specific issue
const deleteIssue = async (issueIdOrKey) => {
  const response = await api.asUser().requestJira(route`/rest/api/3/issue/${issueIdOrKey}`, {
    method: 'DELETE'
  });

  console.log(`Response: ${response.status} ${response.statusText}`);
  console.log(await response.text());
};

// Function to assign an issue to a user
const assignIssueToUser = async (issueIdOrKey, accountId) => {
  const bodyData = `{
    "accountId": "${accountId}"
  }`;

  const response = await api.asUser().requestJira(route`/rest/api/3/issue/${issueIdOrKey}/assignee`, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: bodyData
  });

  console.log(`Response: ${response.status} ${response.statusText}`);
  console.log(await response.json());
};

// Function to get changelog of a specific issue
const getIssueChangelog = async (issueIdOrKey) => {
  const response = await api.asUser().requestJira(route`/rest/api/3/issue/${issueIdOrKey}/changelog`, {
    headers: {
      'Accept': 'application/json'
    }
  });

  console.log(`Response: ${response.status} ${response.statusText}`);
  console.log(await response.json());
};

// Function to list changelog of a specific issue
const listIssueChangelog = async (issueIdOrKey, bodyData) => {
  const response = await api.asUser().requestJira(route`/rest/api/3/issue/${issueIdOrKey}/changelog/list`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: bodyData
  });

  console.log(`Response: ${response.status} ${response.statusText}`);
  console.log(await response.json());
};

// Function to get edit metadata of a specific issue
const getEditMeta = async (issueIdOrKey) => {
  const response = await api.asUser().requestJira(route`/rest/api/3/issue/${issueIdOrKey}/editmeta`, {
    headers: {
      'Accept': 'application/json'
    }
  });

  console.log(`Response: ${response.status} ${response.statusText}`);
  console.log(await response.json());
};

// Function to notify about a specific issue
const notifyIssue = async (issueIdOrKey, bodyData) => {
  const response = await api.asUser().requestJira(route`/rest/api/3/issue/${issueIdOrKey}/notify`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: bodyData
  });

  console.log(`Response: ${response.status} ${response.statusText}`);
  console.log(await response.json());
};

// Function to get available transitions for a specific issue
const getIssueTransitions = async (issueIdOrKey) => {
  const response = await api.asUser().requestJira(route`/rest/api/3/issue/${issueIdOrKey}/transitions`, {
    headers: {
      'Accept': 'application/json'
    }
  });

  console.log(`Response: ${response.status} ${response.statusText}`);
  console.log(await response.json());
};

// Function to transition a specific issue
const transitionIssue = async (issueIdOrKey, bodyData) => {
  const response = await api.asUser().requestJira(route`/rest/api/3/issue/${issueIdOrKey}/transitions`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: bodyData
  });

  console.log(`Response: ${response.status} ${response.statusText}`);
  console.log(await response.json());
};

// Function to export archived issues
const exportArchivedIssues = async (bodyData) => {
  const response = await api.asUser().requestJira(route`/rest/api/3/issues/archive/export`, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: bodyData
  });

  console.log(`Response: ${response.status} ${response.statusText}`);
  console.log(await response.json());
};

export {
  getIssueEvents,
  createIssue,
  archiveIssue,
  createIssuesBulk,
  getCreateMeta,
  getCreateMetaForIssueType,
  unarchiveIssue,
  getIssueDetails,
  updateIssueDetails,
  deleteIssue,
  assignIssueToUser,
  getIssueChangelog,
  listIssueChangelog,
  getEditMeta,
  notifyIssue,
  getIssueTransitions,
  transitionIssue,
  exportArchivedIssues
};
