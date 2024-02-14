import Resolver from "@forge/resolver";
import api, { route } from "@forge/api";
import { callOpenAI, getComments } from "./OpenIA/Index";

import {
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
    exportArchivedIssues,
} from "./issues";
import {
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
    getProjectNotificationScheme,
} from "./projects";
import {
    getJQLAutocompleteData,
    createJQLAutocompleteData,
    getJQLAutocompleteSuggestions,
    createJQLParse,
    createJQLPDCleaner,
    createJQLSanitize,
} from "./jql";



// --- Automate Jira using triggers ---

export async function run(event, context) {
    console.log("🚀 ~ file: index.js ~ line 13 ~ run ~ event", event);
    console.log("🚀 ~ file: index.js ~ line 14 ~ run ~ context", context);
    const response = await addComment(
        event.issue.id,
        "Hello World! It's the Comment Issue app."
    );

    console.log(`Response: ${JSON.stringify(response)}`);
}

async function addComment(issueIdOrKey, message) {
    /**
     * @issueIdOrKey - the Jira issueId number or key for the issue that this function will try to add
     * a comment to (as per the Jira Rest API)
     * @message {string} - the message that will appear in the comment
     *
     * @example addComment('10050', 'Hello world')
     */

    // See https://developer.atlassian.com/cloud/jira/platform/rest/v3/#api-rest-api-3-issue-issueIdOrKey-comment-post
    const requestUrl = route`/rest/api/3/issue/${issueIdOrKey}/comment`;
    const body = {
        body: {
            type: "doc",
            version: 1,
            content: [
                {
                    type: "paragraph",
                    content: [
                        {
                            text: message,
                            type: "text",
                        },
                    ],
                },
            ],
        },
    };

    // Use the Forge Runtime API to fetch data from an HTTP server using your (the app developer) Authorization header
    let response = await api.asApp().requestJira(requestUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });

    // Error checking: the Jira issue comment Rest API returns a 201 if the request is successful
    if (response.status !== 201) {
        console.log(response.status);
        throw `Unable to add comment to issueId ${issueIdOrKey} Status: ${response.status}.`;
    }

    return response.json();
}


const resolver = new Resolver();

// --- OpenAI ---
resolver.define("getComments",  getComments);
resolver.define("callOpenAI",  callOpenAI);


// --- JQL ---

// resolver.define("getJQLAutocompleteData", async (req) => {
//   return await getJQLAutocompleteData(req);
// });

// resolver.define("createJQLAutocompleteData", async (req, { bodyData }) => {
//   return await createJQLAutocompleteData(bodyData);
// });

// resolver.define("getJQLAutocompleteSuggestions", async (req) => {
//   return await getJQLAutocompleteSuggestions(req);
// });

// resolver.define("createJQLParse", async (req, { bodyData }) => {
//   return await createJQLParse(bodyData);
// });

// resolver.define("createJQLPDCleaner", async (req) => {
//   return await createJQLPDCleaner(req);
// });

// resolver.define("createJQLSanitize", async (req) => {
//   return await createJQLSanitize(req);
// });

// --- Issues ---

// resolver.define("getIssueEvents", async (req) => {
//   return await getIssueEvents(req);
// });

// resolver.define("createIssue", async (req, { bodyData }) => {
//   return await createIssue(bodyData);
// });

// resolver.define("archiveIssue", async (req) => {
//   return await archiveIssue(req);
// });

// resolver.define("createIssuesBulk", async (req, { bodyData }) => {
//   return await createIssuesBulk(bodyData);
// });

// resolver.define("getCreateMeta", async (req) => {
//   return await getCreateMeta(req);
// });

// resolver.define("getCreateMetaForIssueType", async (req, { projectIdOrKey }) => {
//   return await getCreateMetaForIssueType(projectIdOrKey);
// });

// resolver.define("unarchiveIssue", async (req) => {
//   return await unarchiveIssue(req);
// });

// resolver.define("getIssueDetails", async (req, { issueIdOrKey }) => {
//   return await getIssueDetails(issueIdOrKey);
// });

// resolver.define("updateIssueDetails", async (req, { issueIdOrKey, bodyData }) => {
//   return await updateIssueDetails(issueIdOrKey, bodyData);
// });

// resolver.define("deleteIssue", async (req, { issueIdOrKey }) => {
//   return await deleteIssue(issueIdOrKey);
// });

// resolver.define("assignIssueToUser", async (req, { issueIdOrKey, bodyData }) => {
//   return await assignIssueToUser(issueIdOrKey, bodyData);
// });

// resolver.define("getIssueChangelog", async (req, { issueIdOrKey }) => {
//   return await getIssueChangelog(issueIdOrKey);
// });

// resolver.define("listIssueChangelog", async (req, { issueIdOrKey, bodyData }) => {
//   return await listIssueChangelog(issueIdOrKey, bodyData);
// });

// resolver.define("getEditMeta", async (req, { issueIdOrKey }) => {
//   return await getEditMeta(issueIdOrKey);
// });

// resolver.define("notifyIssue", async (req, { issueIdOrKey, bodyData }) => {
//   return await notifyIssue(issueIdOrKey, bodyData);
// });

// resolver.define("getIssueTransitions", async (req, { issueIdOrKey }) => {
//   return await getIssueTransitions(issueIdOrKey);
// });

// resolver.define("transitionIssue", async (req, { issueIdOrKey, bodyData }) => {
//   return await transitionIssue(issueIdOrKey, bodyData);
// });

// resolver.define("exportArchivedIssues", async (req) => {
//   return await exportArchivedIssues(req);
// });

// --- Projects ---

// resolver.define("getProjects", async (req) => {
//   return await getProjects(req);
// });

// resolver.define("createProject", async (req, { bodyData }) => {
//   return await createProject(bodyData);
// });

// resolver.define("getRecentProjects", async (req) => {
//   return await getRecentProjects(req);
// });

// resolver.define("searchProjects", async (req, { bodyData }) => {
//   return await searchProjects(bodyData);
// });

// resolver.define("getProjectByIdOrKey", async (req, { projectIdOrKey }) => {
//   return await getProjectByIdOrKey(projectIdOrKey);
// });

// resolver.define("updateProject", async (req, { projectIdOrKey, bodyData }) => {
//   return await updateProject(projectIdOrKey, bodyData);
// });

// resolver.define("deleteProject", async (req, { projectIdOrKey }) => {
//   return await deleteProject(projectIdOrKey);
// });

// resolver.define("archiveProject", async (req, { projectIdOrKey }) => {
//   return await archiveProject(projectIdOrKey);
// });

// resolver.define("deleteProjectPermanently", async (req, { projectIdOrKey }) => {
//   return await deleteProjectPermanently(projectIdOrKey);
// });

// resolver.define("restoreProject", async (req, { projectIdOrKey }) => {
//   return await restoreProject(projectIdOrKey);
// });

// resolver.define("getProjectStatuses", async (req, { projectIdOrKey }) => {
//   return await getProjectStatuses(projectIdOrKey);
// });

// resolver.define("getProjectHierarchy", async (req, { projectId }) => {
//   return await getProjectHierarchy(projectId);
// });

// resolver.define("getProjectNotificationScheme", async (req, { projectKeyOrId }) => {
//   return await getProjectNotificationScheme(projectKeyOrId);
// });

export const handler = resolver.getDefinitions();
