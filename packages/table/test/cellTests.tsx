/*
 * Copyright 2016 Palantir Technologies, Inc. All rights reserved.
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

import { render, screen } from "@testing-library/react";
import { expect } from "chai";
import * as React from "react";

import { Classes as CoreClasses, Intent } from "@blueprintjs/core";

import { Cell } from "../src/cell/cell";
import * as Classes from "../src/common/classes";

describe("Cell", () => {
    it("displays regular content", () => {
        render(
            <Cell>
                <div className="inner">Purple</div>
            </Cell>,
        );
        expect(screen.getByText("Purple")).to.exist;
    });

    it("renders loading state", () => {
        const { container } = render(<Cell loading={true}>test</Cell>);

        expect(screen.queryByText("test")).to.not.exist;
        expect(container.querySelector(`.${Classes.TABLE_CELL}.${CoreClasses.LOADING}`)).to.exist;
    });

    it("uses primary intent for styling", () => {
        const { container } = render(<Cell intent={Intent.PRIMARY}>Dangerous</Cell>);

        expect(container.querySelector(`.${Classes.TABLE_CELL}.${CoreClasses.INTENT_PRIMARY}`)).to.exist;
    });

    it("uses success intent for styling", () => {
        const { container } = render(<Cell intent={Intent.SUCCESS}>Dangerous</Cell>);

        expect(container.querySelector(`.${Classes.TABLE_CELL}.${CoreClasses.INTENT_SUCCESS}`)).to.exist;
    });

    it("uses warning intent for styling", () => {
        const { container } = render(<Cell intent={Intent.WARNING}>Dangerous</Cell>);

        expect(container.querySelector(`.${Classes.TABLE_CELL}.${CoreClasses.INTENT_WARNING}`)).to.exist;
    });

    it("uses danger intent for styling", () => {
        const { container } = render(<Cell intent={Intent.DANGER}>Dangerous</Cell>);

        expect(container.querySelector(`.${Classes.TABLE_CELL}.${CoreClasses.INTENT_DANGER}`)).to.exist;
    });
});
