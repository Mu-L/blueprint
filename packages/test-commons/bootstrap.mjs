/*
 * Copyright 2017 Palantir Technologies, Inc. All rights reserved.
 */

import Enzyme from "enzyme";
import Adapter from "@cfaester/enzyme-adapter-react-18";

Enzyme.configure({ adapter: new Adapter() });

console.info(`Enzyme configured with *${Adapter.name}*`);
