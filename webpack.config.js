const webpack = require("webpack");
const path = require("path");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    charts: path.resolve(__dirname, 'src', 'index.js'),
    style: path.join(__dirname, 'src', 'styles', 'style.scss')
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
        test: /\.scss|\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader',
            {
              loader: 'sass-loader'
            }]
        })
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
    ]),

    new ExtractTextPlugin({
      filename: 'style.css',
      allChunks: true
    }),
  ]
};
