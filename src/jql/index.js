import api, { route } from "@forge/api";

const fechAutocomplete = async ({ payload, context }) => {
    console.log("🚀 ~ fechAutocomplete ~ context:", context)
    console.log("🚀 ~ fechAutocomplete ~ payload:", payload)

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState([]);
    const [issues, setIssues] = useState([]);
    try {
        const jql = payload.jql;
        const response = await requestJira(
            `/rest/api/3/search?jql=${jql}&fields=status`
        );
        const data = await response.json();
        console.log("🚀 ~ fechAutocomplete ~ data:", data)

        if (response.status >= 400) {
            if (data.errorMessages && data.errorMessages.length > 0) {
                setIssues([]);
                // Format error messages to be displayed in the editor
                setErrors(
                    data.errorMessages.map((message) => ({
                        type: "error",
                        message,
                    }))
                );
            } else {
                throw new Error(`Invalid response code: ${response.status}`);
            }
        } else {
            // Map the status category of each issue
            const issues = data.issues.map((issue) => {
                const statusCategory = issue.fields.status.statusCategory;
                return {
                    statusCategory: statusCategory.name,
                    statusCategoryKey: statusCategory.key,
                };
            });
            setIssues(issues);
        }
    } catch (e) {
        console.error("Could not fetch issues", e);
        setIssues([]);
        setErrors([{ type: "error", message: "Could not fetch issues" }]);
    } finally {
        setLoading(false);
    }
};

const getJQLAutocompleteData = async () => {
    console.log("🚀 ~ getJQLAutocompleteData ~");
    try {
        // No hay parámetros para este ejemplo
        const response = await api
            .asUser()
            .requestJira(route`/rest/api/3/jql/autocompletedata`, {
                headers: {
                    Accept: "application/json",
                },
            });

        console.log(`15 Response: ${response.status} ${response.statusText}`);

        if (response.ok) {
            console.log(await response.json());
            return await response.json();
        } else {
            console.error(
                `17 Error: ${response.status} - ${response.statusText}`
            );
            return null;
        }
    } catch (error) {
        console.error("20 An error occurred:", error.message);
        return null;
    }
};

const getJQLAutocompleteSuggestions = async (
    fieldName,
    fieldValue,
    predicateName,
    predicateValue
) => {
    console.log("🚀 ~ getJQLAutocompleteSuggestions ~");
    try {
        const response = await api
            .asUser()
            .requestJira(
                route`/rest/api/3/jql/autocompletedata/suggestions?fieldName=${fieldName}&fieldValue=${fieldValue}&predicateName=${predicateName}&predicateValue=${predicateValue}`,
                {
                    headers: {
                        Accept: "application/json",
                    },
                }
            );

        console.log(`39 Response: ${response.status} ${response.statusText}`);

        if (response.ok) {
            console.log(await response.json());
            return await response.json();
        } else {
            console.error(`Error: ${response.status} - ${response.statusText}`);
            return null;
        }
    } catch (error) {
        console.error("An error occurred:", error.message);
        return null;
    }
};

const createJQLAutocompleteData = async (bodyData) => {
    console.log("🚀 ~ createJQLAutocompleteData ~ bodyData:", bodyData);
    try {
        const response = await api
            .asUser()
            .requestJira(route`/rest/api/3/jql/autocompletedata`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: bodyData,
            });

        console.log(`29 Response: ${response.status} ${response.statusText}`);

        if (response.ok) {
            console.log(await response.json());
            return await response.json();
        } else {
            console.error(
                `44 Error: ${response.status} - ${response.statusText}`
            );
            return null;
        }
    } catch (error) {
        console.error("47 An error occurred:", error.message);
        return null;
    }
};

const createJQLParse = async (bodyData) => {
    console.log("🚀 ~ createJQLParse ~ bodyData:", bodyData);
    try {
        const response = await api
            .asUser()
            .requestJira(route`/rest/api/3/jql/parse`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: bodyData,
            });

        console.log(`87 Response: ${response.status} ${response.statusText}`);

        if (response.ok) {
            console.log(await response.json());
            return await response.json();
        } else {
            console.error(
                `92 Error: ${response.status} - ${response.statusText}`
            );
            return null;
        }
    } catch (error) {
        console.error("95 An error occurred:", error.message);
        return null;
    }
};

const createJQLPDCleaner = async (bodyData) => {
    console.log("🚀 ~ createJQLPDCleaner ~ bodyData:", bodyData);
    try {
        const response = await api
            .asUser()
            .requestJira(route`/rest/api/3/jql/pdcleaner`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: bodyData,
            });

        console.log(`114 Response: ${response.status} ${response.statusText}`);

        if (response.ok) {
            console.log(await response.json());
            return await response.json();
        } else {
            console.error(
                `119 Error: ${response.status} - ${response.statusText}`
            );
            return null;
        }
    } catch (error) {
        console.error("122 An error occurred:", error.message);
        return null;
    }
};

const createJQLSanitize = async (bodyData) => {
    console.log("🚀 ~ createJQLSanitize ~ bodyData:", bodyData);
    try {
        const response = await api
            .asUser()
            .requestJira(route`/rest/api/3/jql/sanitize`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: bodyData,
            });

        console.log(`159 Response: ${response.status} ${response.statusText}`);

        if (response.ok) {
            console.log(await response.json());
            return await response.json();
        } else {
            console.error(
                `146 Error: ${response.status} - ${response.statusText}`
            );
            return null;
        }
    } catch (error) {
        console.error("149 An error occurred:", error.message);
        return null;
    }
};

export {
    getJQLAutocompleteData,
    getJQLAutocompleteSuggestions,
    createJQLAutocompleteData,
    createJQLParse,
    createJQLPDCleaner,
    createJQLSanitize,
    fechAutocomplete
};
