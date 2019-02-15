// webpack v4 configuration

// get access to build/dist file path
const path = require("path");

/**
 * webpack Plug-ins
 */
// compile/inject css bundle into build/dist HTML
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// render the build/dist HTML w/ webpack bundles
const HtmlWebpackPlugin = require("html-webpack-plugin");

// build/dist filename hashing
const WebpackMd5Hash = require("webpack-md5-hash");

// keep the build/dist folder clean
const CleanWebpackPlugin = require("clean-webpack-plugin");

/**
 * build/dist workflow
 */
module.exports = {
  entry: ["babel-polyfill", "./src/js/index.js"],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.[chunkhash].js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader"
        ]
      },
      {
        test: /\.ico$/i,
        loader: "file-loader?name=[name].[ext]"
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin("dist", {}),
    new MiniCssExtractPlugin({
      filename: "styles.[contenthash].css"
    }),
    new HtmlWebpackPlugin({
      inject: false,
      hash: true,
      template: "./src/index.html",
      filename: "index.html",
      favicon: "./src/assets/static/favicon.ico"
    }),
    new WebpackMd5Hash()
  ]
};
