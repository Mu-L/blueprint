/*
 * Copyright 2022 Palantir Technologies, Inc. All rights reserved.
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
    Boundary,
    type BreadcrumbProps,
    Breadcrumbs,
    Card,
    Checkbox,
    H5,
    InputGroup,
    Label,
    RadioGroup,
    Slider,
} from "@blueprintjs/core";
import { Example, type ExampleProps, handleStringChange } from "@blueprintjs/docs-theme";

export interface BreadcrumbsExampleState {
    collapseFrom: Boundary;
    renderCurrentAsInput: boolean;
    alwaysRenderOverflow: boolean;
    width: number;
}

const COLLAPSE_FROM_RADIOS = [
    { label: "Start", value: Boundary.START.toString() },
    { label: "End", value: Boundary.END.toString() },
];

const ITEMS: BreadcrumbProps[] = [
    { icon: "folder-close", text: "All files" },
    { icon: "folder-close", text: "Users" },
    { icon: "folder-close", text: "Janet" },
    { href: "#", icon: "folder-close", text: "Photos" },
    { href: "#", icon: "folder-close", text: "Wednesday" },
    { icon: "document", text: "image.jpg", current: true },
];
// Show less items for always redner example so we can see when everything fits
const ITEMS_FOR_ALWAYS_RENDER: BreadcrumbProps[] = [
    { href: "#", icon: "folder-close", text: "Root" },
    { icon: "document", text: "image.jpg", current: true },
];

export const BreadcrumbsExample: React.FC<ExampleProps> = props => {
    const [alwaysRenderOverflow, setAlwaysRenderOverflow] = React.useState(false);
    const [collapseFrom, setCollapseFrom] = React.useState<Boundary>(Boundary.START);
    const [renderCurrentAsInput, setRenderCurrentAsInput] = React.useState(false);
    const [width, setWidth] = React.useState(50);

    const handleChangeCollapse = handleStringChange(value => setCollapseFrom(value as Boundary));

    const handleChangeRenderCurrentAsInput = () => setRenderCurrentAsInput(!renderCurrentAsInput);

    const handleChangeAlwaysRenderOverflow = () => setAlwaysRenderOverflow(!alwaysRenderOverflow);

    const renderBreadcrumbInput = ({ text }: BreadcrumbProps) => {
        return <BreadcrumbInput defaultValue={typeof text === "string" ? text : undefined} />;
    };

    const breadcrumbWidthLabelId = "num-visible-items-label";

    const options = (
        <>
            <H5>Props</H5>
            <RadioGroup
                name="collapseFrom"
                inline={true}
                label="Collapse from"
                onChange={handleChangeCollapse}
                options={COLLAPSE_FROM_RADIOS}
                selectedValue={collapseFrom.toString()}
            />
            <Checkbox
                name="alwaysRenderOverflow"
                label="Always render overflow"
                onChange={handleChangeAlwaysRenderOverflow}
                checked={alwaysRenderOverflow}
            />
            <Checkbox
                name="renderCurrent"
                label="Render current breadcrumb as input"
                onChange={handleChangeRenderCurrentAsInput}
                checked={renderCurrentAsInput}
            />
            <H5>Example</H5>
            <Label id={breadcrumbWidthLabelId}>Width</Label>
            <Slider
                labelRenderer={renderLabel}
                labelStepSize={50}
                max={100}
                onChange={setWidth}
                showTrackFill={false}
                value={width}
                handleHtmlProps={{ "aria-labelledby": breadcrumbWidthLabelId }}
            />
        </>
    );

    return (
        <Example options={options} {...props}>
            <Card elevation={0} style={{ width: `${width}%` }}>
                <Breadcrumbs
                    collapseFrom={collapseFrom}
                    items={alwaysRenderOverflow ? ITEMS_FOR_ALWAYS_RENDER : ITEMS}
                    currentBreadcrumbRenderer={renderCurrentAsInput ? renderBreadcrumbInput : undefined}
                    overflowListProps={{ alwaysRenderOverflow }}
                />
            </Card>
        </Example>
    );
};

const renderLabel = (value: number) => {
    return `${value}%`;
};

const BreadcrumbInput: React.FC<BreadcrumbProps & { defaultValue: string | undefined }> = props => {
    const [text, setText] = React.useState(props.defaultValue ?? "");
    return <InputGroup placeholder="rename me" value={text} onValueChange={setText} />;
};
