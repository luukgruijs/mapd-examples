var webpack = require("webpack");
const CopyWebpackPlugin = require('copy-webpack-plugin');
var path = require("path");

module.exports = {
  entry: {
    charts: path.resolve(__dirname, 'src', 'index.js'),
  },
  devtool: "source-map",
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "/dist/",
    filename: "[name].bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(dist)/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            plugins: []
          }
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader" ]
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader"
        ]
      }
    ],
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: path.join(__dirname, 'node_modules', '@mapd', 'connector', 'dist', 'browser-connector.js'), to: path.join(__dirname, 'dist', 'mapd') },
      { from: path.join(__dirname, 'node_modules', '@mapd', 'crossfilter', 'dist', 'mapd-crossfilter.js'), to: path.join(__dirname, 'dist', 'mapd') },
      { from: path.join(__dirname, 'node_modules', '@mapd', 'mapdc', 'dist', 'mapdc.js'), to: path.join(__dirname, 'dist', 'mapd') },
      { from: path.join(__dirname, 'node_modules', '@mapd', 'mapdc', 'dist', 'mapdc.css'), to: path.join(__dirname, 'dist', 'mapd') },
      { from: path.join(__dirname, 'node_modules', 'd3', 'd3.min.js'), to: path.join(__dirname, 'dist', 'mapd') },
    ])
  ]
};
