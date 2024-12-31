import type { Config } from "jest";

import baseConfig from "./jest.config";

const e2eConfig: Config = {
	...baseConfig,
	testRegex: ".*\\.e2e\\.test\\.ts$"
};

export default e2eConfig;
