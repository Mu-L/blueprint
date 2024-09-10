/*
 * Copyright 2017 Palantir Technologies, Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import * as React from "react";

import {
    Alignment,
    AnchorButton,
    Button,
    ButtonGroup,
    Classes,
    H5,
    Icon,
    Intent,
    Switch,
    Tooltip,
} from "@blueprintjs/core";
import { Example, type ExampleProps, handleBooleanChange } from "@blueprintjs/docs-theme";

import { AlignmentSelect } from "./common/alignmentSelect";
import { IntentSelect } from "./common/intentSelect";

export const ButtonGroupExample: React.FC<ExampleProps> = props => {
    const [alignText, setAlignText] = React.useState<Alignment>(Alignment.CENTER);
    const [fill, setFill] = React.useState(false);
    const [iconOnly, setIconOnly] = React.useState(false);
    const [intent, setIntent] = React.useState<Intent>(Intent.NONE);
    const [large, setLarge] = React.useState(false);
    const [minimal, setMinimal] = React.useState(false);
    const [outlined, setOutlined] = React.useState(false);
    const [vertical, setVertical] = React.useState(false);

    const handleAlignChange = React.useCallback(alignText => setAlignText(alignText), []);
    const handleFillChange = React.useCallback(handleBooleanChange(setFill), []);
    const handleIconOnlyChange = React.useCallback(handleBooleanChange(setIconOnly), []);
    const handleIntentChange = React.useCallback(intent => setIntent(intent), []);
    const handleLargeChange = React.useCallback(handleBooleanChange(setLarge), []);
    const handleMinimalChange = React.useCallback(handleBooleanChange(setMinimal), []);
    const handleOutlinedChange = React.useCallback(handleBooleanChange(setOutlined), []);
    const handleVerticalChange = React.useCallback(handleBooleanChange(setVertical), []);

    const bgProps = { fill, large, minimal, outlined, vertical };
    const buttonProps = { intent };

    const options = (
        <>
            <H5>Props</H5>
            <Switch checked={fill} label="Fill" onChange={handleFillChange} />
            <Switch checked={large} label="Large" onChange={handleLargeChange} />
            <Switch checked={minimal} label="Minimal" onChange={handleMinimalChange} />
            <Switch checked={outlined} label="Outlined" onChange={handleOutlinedChange} />
            <Switch checked={vertical} label="Vertical" onChange={handleVerticalChange} />
            <IntentSelect intent={intent} label={intentLabelInfo} onChange={handleIntentChange} />
            <AlignmentSelect align={alignText} onChange={handleAlignChange} />
            <H5>Example</H5>
            <Switch checked={iconOnly} label="Icons only" onChange={handleIconOnlyChange} />
        </>
    );

    return (
        <Example options={options} {...props}>
            {/* set `minWidth` so `alignText` will have an effect when vertical */}
            <ButtonGroup style={{ minWidth: 200 }} {...bgProps}>
                <Button {...buttonProps} icon="database" text={iconOnly ? undefined : "Queries"} />
                <Button {...buttonProps} icon="function" text={iconOnly ? undefined : "Functions"} />
                <AnchorButton
                    {...buttonProps}
                    icon="cog"
                    rightIcon="settings"
                    text={iconOnly ? undefined : "Options"}
                />
            </ButtonGroup>
        </Example>
    );
};

const intentLabelInfo = (
    <Tooltip
        content={
            <span className={Classes.TEXT_SMALL}>
                Intents are set individually on each button <br />
                in the group, not the ButtonGroup wrapper.
            </span>
        }
        placement="top"
        minimal={true}
    >
        <span>
            Intent{" "}
            <span style={{ padding: 2, lineHeight: "16px", verticalAlign: "top" }}>
                <Icon className={Classes.TEXT_MUTED} icon="info-sign" size={12} />
            </span>
        </span>
    </Tooltip>
);
