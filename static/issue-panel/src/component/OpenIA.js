import React, { useEffect, useState } from "react";
import { invoke } from "@forge/bridge";
import { view } from "@forge/bridge";
import Button from "@atlaskit/button";
import { token } from "@atlaskit/tokens";
import { Label } from "@atlaskit/form";
import TextArea from "@atlaskit/textarea";
import Select from "@atlaskit/select";
import Textfield from "@atlaskit/textfield";
import Spinner from "@atlaskit/spinner";
import {
    Box,
    xcss,
    Bleed,
    Flex,
    Grid,
    Stack,
    Inline,
} from "@atlaskit/primitives";

const OpenIA = () => {
    const [inputText, setInputText] = useState("");
    const [result, setResult] = useState("");
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e) => {
        setInputText(e.target.value);
    };

    const handleButtonClick = async () => {
        setLoading(true);
        console.log("🚀 ~ handleButtonClick ~ inputText:", inputText)


        // Call OpenAI with the user input
        const openAIResult = await invoke("callOpenAI", inputText);

        setResult(openAIResult);
        setLoading(false);
    };

    return (
        <div style={{ width: "100%", margin: "16px" }}>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: "4px",
                    boxShadow: "0 1px 4px rgba(9, 30, 66, 0.25)",
                    backgroundColor: "#fff",
                    padding: "16px",
                }}
            >
                <h1
                    style={{
                        borderBottom: "1px solid #DFE1E6",
                        margin: "0",
                        fontSize: "24px",
                        fontWeight: "600",
                        color: "#172B4D",
                        paddingBottom: "16px",
                    }}
                >
                    OpenIA Interaction
                </h1>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        width: "100%",
                        padding: "16px",
                    }}
                >
                    <Label label="Enter text for OpenAI:" />
                    <TextArea
                        name="openai-input"
                        placeholder="Type here..."
                        value={inputText}
                        onChange={handleInputChange}
                        maxHeight="120px"
                    />

                    <Button
                        appearance="primary"
                        onClick={handleButtonClick}
                        isDisabled={loading}
                        marginTop="8px"
                    >
                        {loading ? <Spinner size="small" /> : "Submit to OpenAI"}
                    </Button>

                    {result && (
                        <div style={{ marginTop: "16px" }}>
                            <Label label="OpenAI Result:" />
                            <TextArea
                                name="openai-result"
                                isDisabled
                                value={result}
                                maxHeight="120px"
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default OpenIA;
