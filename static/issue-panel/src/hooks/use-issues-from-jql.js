import { useEffect, useState } from "react";
import { requestJira } from "@forge/bridge";

export const useIssuesFromJql = (jql) => {
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState([]);
    const [issues, setIssues] = useState([]);

    useEffect(() => {
        if (jql === undefined) {
            return;
        }

        setLoading(true);
        setErrors([]);

        // Retrieve issues for the provided JQL string
        const fetchIssues = async () => {
            try {
                const response = await requestJira(`/rest/api/3/search?jql=${jql}&fields=status`);
                const data = await response.json();

                if (response.status >= 400) {
                    if (data.errorMessages && data.errorMessages.length > 0) {
                        setIssues([]);
                        // Format error messages to be displayed in the editor
                        setErrors(data.errorMessages.map((message) => ({ type: 'error', message })));
                    } else {
                        throw new Error(`Invalid response code: ${response.status}`);
                    }
                } else {
                    // Map the status category of each issue
                    const issues = data.issues
                    setIssues(issues);
                }
            } catch (error) {
                console.error("Could not fetch issues", error);
                setIssues([]);
                setErrors([{ type: 'error', message: "Could not fetch issues" }]);
            } finally {
                setLoading(false);
            }
        };

        fetchIssues();
    }, [jql, setLoading, setIssues, setErrors]);

    return {
        loading,
        errors,
        issues,
    };
};
