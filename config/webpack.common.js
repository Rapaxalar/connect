const paths = require("./paths");
const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const Dotenv = require("dotenv-webpack");

module.exports = {
  entry: "./src/index.jsx",
  resolve: {
    extensions: [".js", ".jsx", ".json"],
    alias: {
      src: path.resolve(__dirname, "../src"),
      assets: path.resolve(__dirname, "../src/assets"),
      react: "preact/compat",
      "react-dom": "preact/compat",
    },
  },
  output: {
    path: paths.build,
    filename: "index.js",
    publicPath: "/",
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: paths.public,
          to: "assets",
        },
      ],
    }),
    new HtmlWebpackPlugin({
      template: "./src/html/index.html",
    }),
    new Dotenv(),
  ],
  module: {
    rules: [
      {
        test: /\.(js)x?$/,
        loader: require.resolve("babel-loader"),
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"],
      },
      {
        test: /\.svg$/,
        oneOf: [
          {
            resourceQuery: /external/,
            use: "url-loader",
          },
          {
            type: "asset/inline",
          },
        ],
      },
      { test: /\.(?:ico|gif|png|jpg|jpeg)$/i, type: "asset/resource" },
      { test: /\.(woff(2)?|eot|ttf|otf|)$/, type: "asset/resource" },
    ],
  },
};
