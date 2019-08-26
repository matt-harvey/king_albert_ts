module.exports = {
  "collectCoverage": true,
  "collectCoverageFrom": ["src/**/*.{js,jsx,ts,tsx}"],
  "roots": [
    "src",
  ],
  "transform": {
		"^.+\\.tsx?$": "ts-jest",
  },
};
