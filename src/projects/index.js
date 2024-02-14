// apis.js
import api, { route } from "@forge/api";

// Funciones para manipular proyectos
const getProjects = async () => {
  const response = await api.asUser().requestJira(route`/rest/api/3/project`, {
    headers: {
      'Accept': 'application/json'
    }
  });

  console.log(`Response: ${response.status} ${response.statusText}`);
  console.log(await response.json());
};

const createProject = async (bodyData) => {
  const response = await api.asUser().requestJira(route`/rest/api/3/project`, {
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

const getRecentProjects = async () => {
  const response = await api.asUser().requestJira(route`/rest/api/3/project/recent`, {
    headers: {
      'Accept': 'application/json'
    }
  });

  console.log(`Response: ${response.status} ${response.statusText}`);
  console.log(await response.json());
};

const searchProjects = async (query) => {
  const response = await api.asUser().requestJira(route`/rest/api/3/project/search?query=${query}`, {
    headers: {
      'Accept': 'application/json'
    }
  });

  console.log(`Response: ${response.status} ${response.statusText}`);
  console.log(await response.json());
};

const getProjectByIdOrKey = async (projectIdOrKey) => {
  const response = await api.asUser().requestJira(route`/rest/api/3/project/${projectIdOrKey}`, {
    headers: {
      'Accept': 'application/json'
    }
  });

  console.log(`Response: ${response.status} ${response.statusText}`);
  console.log(await response.json());
};

const updateProject = async (projectIdOrKey, bodyData) => {
  const response = await api.asUser().requestJira(route`/rest/api/3/project/${projectIdOrKey}`, {
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

const deleteProject = async (projectIdOrKey) => {
  const response = await api.asUser().requestJira(route`/rest/api/3/project/${projectIdOrKey}`, {
    method: 'DELETE'
  });

  console.log(`Response: ${response.status} ${response.statusText}`);
};

const archiveProject = async (projectIdOrKey) => {
  const response = await api.asUser().requestJira(route`/rest/api/3/project/${projectIdOrKey}/archive`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  });

  console.log(`Response: ${response.status} ${response.statusText}`);
};

const deleteProjectPermanently = async (projectIdOrKey) => {
  const response = await api.asUser().requestJira(route`/rest/api/3/project/${projectIdOrKey}/delete`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  });

  console.log(`Response: ${response.status} ${response.statusText}`);
};

const restoreProject = async (projectIdOrKey) => {
  const response = await api.asUser().requestJira(route`/rest/api/3/project/${projectIdOrKey}/restore`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  });

  console.log(`Response: ${response.status} ${response.statusText}`);
};

const getProjectStatuses = async (projectIdOrKey) => {
  const response = await api.asUser().requestJira(route`/rest/api/3/project/${projectIdOrKey}/statuses`, {
    headers: {
      'Accept': 'application/json'
    }
  });

  console.log(`Response: ${response.status} ${response.statusText}`);
  console.log(await response.json());
};

const getProjectHierarchy = async (projectId) => {
  const response = await api.asUser().requestJira(route`/rest/api/3/project/${projectId}/hierarchy`, {
    headers: {
      'Accept': 'application/json'
    }
  });

  console.log(`Response: ${response.status} ${response.statusText}`);
  console.log(await response.json());
};

const getProjectNotificationScheme = async (projectKeyOrId) => {
  const response = await api.asUser().requestJira(route`/rest/api/3/project/${projectKeyOrId}/notificationscheme`, {
    headers: {
      'Accept': 'application/json'
    }
  });

  console.log(`Response: ${response.status} ${response.statusText}`);
  console.log(await response.json());
};

export {
  getProjects,
  createProject,
  getRecentProjects,
  searchProjects,
  getProjectByIdOrKey,
  updateProject,
  deleteProject,
  archiveProject,
  deleteProjectPermanently,
  restoreProject,
  getProjectStatuses,
  getProjectHierarchy,
  getProjectNotificationScheme
};
