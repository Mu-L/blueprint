/*
 * Copyright 2024 Palantir Technologies, Inc. All rights reserved.
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

import classNames from "classnames";
import * as React from "react";

import {
    type Alignment,
    AnchorButton,
    type AnchorButtonProps,
    Button,
    type ButtonProps,
    Code,
    Divider,
    H5,
    Intent,
    Switch,
} from "@blueprintjs/core";
import { Example, type ExampleProps, handleBooleanChange } from "@blueprintjs/docs-theme";
import { Duplicate, Refresh } from "@blueprintjs/icons";

import { PropCodeTooltip } from "../../common/propCodeTooltip";

import { AlignmentSelect } from "./common/alignmentSelect";
import { IntentSelect } from "./common/intentSelect";
import { type Size, SizeSelect } from "./common/sizeSelect";

export const ButtonPlaygroundExample: React.FC<ExampleProps> = props => {
    const [active, setActive] = React.useState(false);
    const [alignText, setAlignText] = React.useState<Alignment | undefined>(undefined);
    const [disabled, setDisabled] = React.useState(false);
    const [ellipsizeText, setEllipsizeText] = React.useState(false);
    const [fill, setFill] = React.useState(false);
    const [iconOnly, setIconOnly] = React.useState(false);
    const [intent, setIntent] = React.useState<Intent>(Intent.NONE);
    const [loading, setLoading] = React.useState(false);
    const [longText, setLongText] = React.useState(false);
    const [minimal, setMinimal] = React.useState(false);
    const [outlined, setOutlined] = React.useState(false);
    const [size, setSize] = React.useState<Size>("regular");
    const [wiggling, setWiggling] = React.useState(false);

    const handleActiveChange = handleBooleanChange(setActive);
    const handleDisabledChange = handleBooleanChange(setDisabled);
    const handleEllipsizeTextChange = handleBooleanChange(setEllipsizeText);
    const handleFillChange = handleBooleanChange(setFill);
    const handleIconOnlyChange = handleBooleanChange(setIconOnly);
    const handleLoadingChange = handleBooleanChange(setLoading);
    const handleLongTextChange = handleBooleanChange(setLongText);
    const handleMinimalChange = handleBooleanChange(setMinimal);
    const handleOutlinedChange = handleBooleanChange(setOutlined);

    const wiggleTimeoutId = React.useRef<number>();

    const beginWiggling = React.useCallback(() => {
        window.clearTimeout(wiggleTimeoutId.current);
        setWiggling(true);
        wiggleTimeoutId.current = window.setTimeout(() => setWiggling(false), 300);
    }, []);

    const buttonProps: ButtonProps & AnchorButtonProps = {
        active,
        alignText,
        disabled,
        ellipsizeText,
        fill,
        intent,
        loading,
        minimal,
        outlined,
    };

    const wiggleButtonText = iconOnly
        ? undefined
        : longText
          ? "Click to trigger a whimsical wiggling animation"
          : "Click to wiggle";

    const duplicateButtonText = iconOnly
        ? undefined
        : longText
          ? "Duplicate this web page in a new browser tab"
          : "Duplicate this page";

    const options = (
        <>
            <H5>Props</H5>
            <Switch label="Active" checked={active} onChange={handleActiveChange} />
            <Switch label="Disabled" checked={disabled} onChange={handleDisabledChange} />
            <Switch label="Loading" checked={loading} onChange={handleLoadingChange} />
            <Switch label="Minimal" checked={minimal} onChange={handleMinimalChange} />
            <Switch label="Outlined" checked={outlined} onChange={handleOutlinedChange} />
            <Switch label="Fill" checked={fill} onChange={handleFillChange} />
            <PropCodeTooltip snippet={`ellipsizeText={${ellipsizeText.toString()}}`}>
                <Switch label="Ellipsize long text" checked={ellipsizeText} onChange={handleEllipsizeTextChange} />
            </PropCodeTooltip>
            <Divider />
            <AlignmentSelect align={alignText} onChange={setAlignText} />
            <SizeSelect size={size} onChange={setSize} />
            <IntentSelect intent={intent} onChange={setIntent} />
            <H5>Example</H5>
            <Switch label="Icons only" checked={iconOnly} onChange={handleIconOnlyChange} />
            <Switch label="Long text" checked={longText} onChange={handleLongTextChange} />
        </>
    );

    return (
        <Example options={options} {...props}>
            <div className={classNames({ "docs-flex-column": fill })}>
                <p>
                    <Code>Button</Code>
                </p>
                <Button
                    className={wiggling ? "docs-wiggle" : ""}
                    icon={<Refresh />}
                    onClick={beginWiggling}
                    small={size === "small"}
                    large={size === "large"}
                    text={wiggleButtonText}
                    {...buttonProps}
                />
            </div>
            <div className={classNames({ "docs-flex-column": fill })}>
                <p>
                    <Code>AnchorButton</Code>
                </p>
                <AnchorButton
                    href="#core/components/buttons"
                    icon={<Duplicate />}
                    rightIcon="share"
                    target="_blank"
                    text={duplicateButtonText}
                    small={size === "small"}
                    large={size === "large"}
                    {...buttonProps}
                />
            </div>
        </Example>
    );
};
