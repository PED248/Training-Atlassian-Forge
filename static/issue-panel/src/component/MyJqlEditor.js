import React, { useCallback } from "react";
import { JQLEditorForgeAsync } from "@atlassianlabs/jql-editor-forge"; 

const MyJqlEditor = ({ jql, setJql, queryErrors }) => {
    const onSearch = useCallback(
        (query, jast) => {
            // Only update our JQL if the query is valid
            if (jast.errors.length === 0) {
                setJql(query);
            }
        },
        [setJql]
    );

    return (
        <div style={{ marginBottom: "10px" }}>
            <JQLEditorForgeAsync
                locale={"en"}
                query={jql}
                onSearch={onSearch}
                messages={queryErrors}
                
            />
        </div>
    );
};

export default MyJqlEditor;
