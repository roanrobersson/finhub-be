import * as dotenv from "dotenv";
import type { Config } from "jest";

dotenv.config({
	path: "envs/test.env"
});

const config: Config = {
	moduleFileExtensions: ["js", "json", "ts"],
	rootDir: "./",
	modulePaths: ["<rootDir>"],
	roots: ["<rootDir>/src"],
	testRegex: ".*\\.(ut|it|e2e)\\.test\\.ts$",
	transform: {
		"^.+\\.(t|j)s$": "ts-jest"
	},
	collectCoverageFrom: ["**/*.(t|j)s"],
	coverageDirectory: "../coverage",
	testEnvironment: "node",
	setupFiles: ["dotenv/config"]
};

export default config;
