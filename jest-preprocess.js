const babelOptions = {
  presets: ["babel-preset-gatsby"],
  plugins: [
    "@babel/plugin-proposal-class-properties",
    "emotion",
  ],
}

module.exports = require("babel-jest").createTransformer(babelOptions)
