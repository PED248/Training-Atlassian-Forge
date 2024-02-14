import { useEffect, useState } from "react";
import { view } from "@forge/bridge";

const useJqlState = () => {
    const [jql, setJql] = useState();

    useEffect(() => {
        view.getContext()
            .then((context) => {
                const projectKey = context.extension?.project?.key;
                // Use project context data to set initial JQL query
                if (projectKey) {
                    setJql(`project = "${projectKey}"`);
                } else {
                    setJql("");
                }
            });
    }, [setJql]);

    return [jql, setJql];
};

export default useJqlState;
