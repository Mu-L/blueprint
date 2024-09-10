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

import { Alignment, Button, ButtonGroup, H5, type IconName, Popover, Switch } from "@blueprintjs/core";
import { Example, type ExampleProps, handleBooleanChange } from "@blueprintjs/docs-theme";

import { AlignmentSelect } from "./common/alignmentSelect";
import { FileMenu } from "./common/fileMenu";

export const ButtonGroupPopoverExample: React.FC<ExampleProps> = props => {
    const [alignText, setAlignText] = React.useState<Alignment>(Alignment.CENTER);
    const [fill, setFill] = React.useState(false);
    const [large, setLarge] = React.useState(false);
    const [minimal, setMinimal] = React.useState(false);
    const [vertical, setVertical] = React.useState(false);

    const handleFillChange = React.useCallback(handleBooleanChange(setFill), []);
    const handleLargeChange = React.useCallback(handleBooleanChange(setLarge), []);
    const handleMinimalChange = React.useCallback(handleBooleanChange(setMinimal), []);
    const handleVerticalChange = React.useCallback(handleBooleanChange(setVertical), []);
    const handleAlignChange = React.useCallback((alignText: Alignment) => setAlignText(alignText), []);

    const options = (
        <>
            <H5>Props</H5>
            <Switch label="Fill" checked={fill} onChange={handleFillChange} />
            <Switch label="Large" checked={large} onChange={handleLargeChange} />
            <Switch label="Minimal" checked={minimal} onChange={handleMinimalChange} />
            <Switch label="Vertical" checked={vertical} onChange={handleVerticalChange} />
            <AlignmentSelect align={alignText} label="Align text" onChange={handleAlignChange} />
        </>
    );

    return (
        <Example options={options} {...props}>
            <ButtonGroup fill={fill} large={large} minimal={minimal} vertical={vertical} style={{ minWidth: 120 }}>
                <PopoverButton text="File" iconName="document" vertical={vertical} />
                <PopoverButton text="Edit" iconName="edit" vertical={vertical} />
                <PopoverButton text="View" iconName="eye-open" vertical={vertical} />
            </ButtonGroup>
        </Example>
    );
};

const PopoverButton: React.FC<{ text: string; iconName: IconName; vertical: boolean }> = ({
    text,
    iconName,
    vertical,
}) => {
    const rightIconName: IconName = vertical ? "caret-right" : "caret-down";
    return (
        <Popover content={<FileMenu />} placement={vertical ? "right-start" : "bottom-start"}>
            <Button rightIcon={rightIconName} icon={iconName} text={text} />
        </Popover>
    );
};
