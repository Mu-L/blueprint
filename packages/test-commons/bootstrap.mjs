/*
 * Copyright 2017 Palantir Technologies, Inc. All rights reserved.
 */

import Adapter from "@cfaester/enzyme-adapter-react-18";
import Enzyme from "enzyme";

const adapter = new Adapter.default();

Enzyme.configure({ adapter });

console.info(`Enzyme configured with *${Adapter.name}*`);
