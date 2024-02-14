import {IssueStatus} from "./use-issues-from-jql";
import {useMemo} from "react";
import {ChartData} from "chart.js";

const getColorFromKey = (key) => {
    switch(key) {
        case 'new':
            return '#8C9CB8';
        case 'indeterminate':
            return '#0065FF';
        case 'done':
            return '#36B37E';
        default:
            return '#8C9CB8';
    }
}

export const usePieChartDataFromIssues = (issues) => {
    return useMemo(() => {
        const dataMap = {};

        issues.forEach(({ statusCategory, statusCategoryKey }) => {
            if (!dataMap[statusCategory]) {
                dataMap[statusCategory] = {
                    color: getColorFromKey(statusCategoryKey),
                    count: 0,
                };
            }

            dataMap[statusCategory].count += 1;
        });

        const data = [];
        const backgroundColor = [];
        const labels = [];

        Object.keys(dataMap).forEach(statusCategory => {
            data.push(dataMap[statusCategory].count);
            backgroundColor.push(dataMap[statusCategory].color);
            labels.push(statusCategory);
        });

        return {
            datasets: [{
                data,
                backgroundColor,
            }],
            labels,
        }
    }, [issues]);
}
