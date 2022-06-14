const paths = require("./paths");
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    historyApiFallback: true,
    contentBase: paths.build,
    open: false,
    compress: true,
    hot: true,
    host: "127.0.0.1",
    port: 8001,
    disableHostCheck: true,
    writeToDisk: true,
  },
});
