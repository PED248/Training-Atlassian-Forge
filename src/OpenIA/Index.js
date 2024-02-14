import api, { route, fetch } from "@forge/api";

const getComments = async ({ payload, context }) => {
    let issueKey = payload;
    // API call to get all comments of Jira issue with key 'issueKey'
    const commentsData = await api
        .asApp()
        .requestJira(route`/rest/api/3/issue/${issueKey}/comment`, {
            headers: {
                Accept: "application/json",
            },
        });

    const responseData = await commentsData.json();
    const jsonData = await responseData.comments;

    let extractedTexts = [];

    // Extracting all texts in the comments into extractedTexts array
    await jsonData.map((comment) => {
        if (comment.body && comment.body.content) {
            comment.body.content.map((contentItem) => {
                if (contentItem.type === "paragraph" && contentItem.content) {
                    contentItem.content.map((textItem) => {
                        if (textItem.type === "text" && textItem.text) {
                            extractedTexts.push(textItem.text);
                        }
                    });
                }
            });
        }
    });

    return extractedTexts.join(" ");
};

const callOpenAI = async ({ payload, context }) => {
    console.log("🚀 41 ~ callOpenAI ~ payload:", payload);

    let prompt = payload;
    const model = getOpenAPIModel(); // Added model variable

    const url = `https://api.openai.com/v1/chat/completions`;

    // Body for API call
    const newPayload = {
        model,
        messages: [
            {
                role: "user",
                content: prompt,
            },
        ],
        temperature: 0.7,
    };
    console.log("🚀 ~ callOpenAI ~ newPayload:", newPayload)

    // API call options
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getOpenAPIKey()}`,
        },
        redirect: "follow",
        body: JSON.stringify(newPayload),
    };
    console.log("🚀 ~ callOpenAI ~ options:", options);

    // API call to OpenAI
    const response = await fetch(url, options);
    console.log("🚀 ~ callOpenAI ~ response:", response);
    let result = "";

    if (response.status === 200) {
        const chatCompletion = await response.json();
        const firstChoice = chatCompletion.choices[0];

        if (firstChoice) {
            result = firstChoice.message.content;
        } else {
            console.warn(
                `Chat completion response did not include any assistance choices.`
            );
            result = `AI response did not include any choices.`;
        }
    } else {
        const text = await response.text();
        result = text;
    }
    return result;
};

// Get OpenAI API key
const getOpenAPIKey = () => {
    console.log(process.env.OPEN_API_KEY);
    return process.env.OPEN_API_KEY;
};

// Get OpenAI model
const getOpenAPIModel = () => {
    return "gpt-3.5-turbo";
    // return 'gpt-4';
};

export { getComments, callOpenAI };
