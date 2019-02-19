// webpack v4 configuration

// get access to build/dist file path
const path = require("path");

/**
 * webpack Plug-ins
 */
// include built-in plug-ins
const webpack = require("webpack");

// compile/inject css bundle into build/dist HTML
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// render the build/dist HTML w/ webpack bundles
const HtmlWebpackPlugin = require("html-webpack-plugin");

// build/dist filename hashing
const WebpackMd5Hash = require("webpack-md5-hash");

// keep the build/dist folder clean
const CleanWebpackPlugin = require("clean-webpack-plugin");

// generic file copy (used for images)
const CopyWebpackPlugin = require("copy-webpack-plugin");

/**
 * build/dist workflow
 */
module.exports = {
  entry: ["babel-polyfill", "./src/js/index.js"],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.[chunkhash].js"
  },
  devtool: 'source-map',
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
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'fonts/'
          }
        }]
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
    new WebpackMd5Hash(),
    new CopyWebpackPlugin([{
      from:'src/assets/img', 
      to:'img'
    }]),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery"
    })
  ]
};
