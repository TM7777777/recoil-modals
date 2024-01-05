const path = require("path");

module.exports = {
  mode: "production",
  entry: [path.resolve(__dirname, "src/index.ts")],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index.js",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".scss", ".wasm", ".mjs", ".cjs", ".js", ".json"],
  },
  resolveLoader: {
    modules: ["node_modules"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ["babel-loader"],
        exclude: /node_modules/,
      },
    ],
  },
};
