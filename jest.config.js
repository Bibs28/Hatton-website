
// If using TypeScript see
// https://www.gatsbyjs.org/docs/unit-testing/#using-typescript

module.exports = {
  // Transform `js` or `jsx` files with our custom Babel config
  transform: {
    "^.+\\.jsx?$": `<rootDir>/jest-preprocess.js`,
  },
  // Tell Jest how to handle inputs: mock assets
  moduleNameMapper: {
    ".+\\.(css|styl|less|sass|scss)$": `identity-obj-proxy`,
    ".+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": `<rootDir>/__mocks__/file-mock.js`,
  },
  // Ignore any tests in `node_modules`, `.cache` or `cypress` folders
  testPathIgnorePatterns: [
    `node_modules`,
    `\\.cache`,
    `<rootDir>.*/public`,
    `\\cypress`,
  ],
  // Gatsby includes un-transpiled ES6 code; to avoid errors,
  // exclude the `gatsby` module
  transformIgnorePatterns: [`node_modules/(?!(gatsby)/)`],
  // Usually set by Gatsby; some components need this
  globals: {
    __PATH_PREFIX__: ``,
  },
  // Some DOM APIs like `localStorage` are unhappy with default (`about:blank`)
  // This is set by default in Jest > 23.5.0
  testURL: `http://localhost`,
  // Scripts to run before tests are run
  setupFiles: [
    `<rootDir>/loadershim.js`
  ],
  setupFilesAfterEnv: [
    "<rootDir>/setup-test-env.js"
  ]
}
