const path = require("path");
const nodeExternals = require("webpack-node-externals");
const forkTsChecker = require("fork-ts-checker-webpack-plugin");

const client = {
  mode: process.env.NODE_ENV,
  target: "web",
  entry: path.join(__dirname, "src/client.tsx"),
  output: {
    path: path.join(__dirname, "dist/static/js/"),
    filename: "bundle.js"
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              sourceType: "unambiguous",
              plugins: [
                "@babel/plugin-transform-runtime",
                ["babel-plugin-styled-components", { ssr: false }]
              ],
              presets: ["@babel/preset-env", "@babel/preset-react"]
            }
          },
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true
            }
          }
        ]
      }
    ]
  },
  plugins: [new forkTsChecker()]
};

const server = {
  mode: process.env.NODE_ENV,
  target: "node",
  entry: path.join(__dirname, "src/index.ts"),
  output: {
    path: path.join(__dirname, "dist"),
    filename: "index.js"
  },
  externals: [nodeExternals()],
  resolve: {
    extensions: [".ts", ".tsx"]
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true
            }
          }
        ]
      }
    ]
  },
  plugins: [new forkTsChecker()]
};

module.exports = [client, server];
