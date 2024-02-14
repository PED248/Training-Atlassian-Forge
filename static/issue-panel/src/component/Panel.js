import React, { useEffect, useState } from "react";
import { invoke } from "@forge/bridge";
import { view } from "@forge/bridge";
import MyJqlEditor from "./MyJqlEditor";
import useJqlState from "../hooks/use-jql-state";
import { useIssuesFromJql } from "../hooks/use-issues-from-jql";
import IssuesVisualiser from "./IssuesVisualiser";

const Panel = () => {
    const [jql, setJql] = useJqlState();
    const { loading, error, issues } = useIssuesFromJql(jql);
    console.log("🚀 ~ Panel ~ issues:", issues)

    if (jql === undefined) {
        return null;
    }

    return (
        <div>
            <div
                style={{
                    width: "100%",
                    margin: "16px", // Añadido para dar un poco de espacio alrededor del componente
                }}
            >
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        height: "100%",
                        width: "100%",
                        borderRadius: "4px", // Añadido para esquinas redondeadas
                        boxShadow: "0 1px 4px rgba(9, 30, 66, 0.25)", // Añadido para sombra suave
                        backgroundColor: "#fff", // Añadido para fondo blanco
                    }}
                >
                    <h1
                        style={{
                            padding: "16px",
                            borderBottom: "1px solid #DFE1E6", // Añadido para separar el título
                            margin: "0",
                            fontSize: "24px",
                            fontWeight: "600",
                            color: "#172B4D", // Añadido para color de texto oscuro
                        }}
                    >
                        JQL Editor
                    </h1>
                    <div
                        style={{
                            padding: "32px",
                            flexGrow: 1,
                            display: "flex",
                            flexDirection: "column",
                            width: "100%",
                        }}
                    >
                        <div
                            style={{
                                marginBottom: "16px",
                                fontSize: "18px",
                                fontWeight: "600",
                                color: "#172B4D", // Añadido para color de texto oscuro
                            }}
                        >
                            <h3>Issue Status Summary for JQL Query Results</h3>
                        </div>
                        <div
                            style={{
                                flexGrow: 1,
                                width: "100%",
                                maxWidth: "90%", // Ancho máximo del 90%
                                flex: "1 0 auto", // Permite que el componente se expanda automáticamente
                            }}
                        >
                            <MyJqlEditor
                                jql={jql}
                                setJql={setJql}
                                queryErrors={error}
                            />
                        </div>
                        <div
                            style={{
                                marginTop: "24px",
                                width: "100%",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <IssuesVisualiser
                                issues={issues}
                                loading={loading}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Panel;
