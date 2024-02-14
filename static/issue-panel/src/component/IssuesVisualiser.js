import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import Spinner from "@atlaskit/spinner";
import { IssueStatus } from "../hooks/use-issues-from-jql";
import { usePieChartDataFromIssues } from "../hooks/use-pie-chart-data-from-issues";
import EmptyState from "@atlaskit/empty-state";

Chart.register(ArcElement, Tooltip, Legend);

const IssuesVisualiser = ({ issues, loading }) => {
    let newIssues = [];
    if (issues.length > 0) {
        newIssues = issues.map((issue) => {
            const statusCategory = issue.fields.status.statusCategory;
            return {
                statusCategory: statusCategory.name,
                statusCategoryKey: statusCategory.key,
            };
        });
    }
    let data = usePieChartDataFromIssues(newIssues);

    return (
        <>
            <div
                style={{ 
                    alignSelf: "center",
                    textAlign: "center",
                    margin: "0 auto", // Centrar el elemento utilizando auto en los márgenes izquierdo y derecho
                }}
            >
                {loading ? (
                    <Spinner size={"xlarge"} />
                ) : newIssues.length === 0 ? (
                    <EmptyState
                        header={"There are no issues matching your query"}
                    />
                ) : (
                    <Pie data={data} />
                )}
            </div>
        </>
    );
};

export default IssuesVisualiser;
