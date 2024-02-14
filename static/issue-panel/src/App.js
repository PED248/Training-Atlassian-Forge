// App.js
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
import MyJqlEditor from "./component/MyJqlEditor";
import useJqlState from "./hooks/use-jql-state";
import { useIssuesFromJql } from "./hooks/use-issues-from-jql";
import IssuesVisualiser from "./component/IssuesVisualiser";
import Panel from "./component/Panel";
import OpenIA from "./component/OpenIA";

const App = () => {
    return (
        <div style={{}}>
            <div style={{}}>
                <Panel />
            </div>
            <div style={{}}>
                <OpenIA />
            </div>
        </div>
    );
};

export default App;
