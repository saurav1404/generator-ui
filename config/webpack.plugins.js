const webpack = require('webpack');
const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  plugins: (isProduction) => isProduction ? pluginsProduction() : pluginsDevelopment()
};

function pluginsDevelopment() {
  return plugins(false);
}

function pluginsProduction() {
  return plugins(true);
}

function plugins(isProduction) {
  return (isProduction ? pluginsProd() : pluginsDev());
}

/**
 * Returns all plugins needed for production builds.
 */
function pluginsProd() {
  const CopyWebpackPlugin = require("copy-webpack-plugin");

  return [
    new CleanWebpackPlugin(),
    // new BundleAnalyzerPlugin({
    //   analyzerMode: 'static'
    // }),
    // TODO: Use http://nginx.org/en/docs/http/ngx_http_gzip_static_module.html
    new CompressionPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].[hash:8].css',
      chunkFilename: '[name].[hash:8].css'
    }),
    new CopyWebpackPlugin([
      {from: path.resolve(__dirname, "../public"), to: path.resolve(__dirname, "../dist")},
      {from: path.resolve(__dirname, "../src/assets"), to: path.resolve(__dirname, "../dist/assets")},
    ]),
    new HtmlWebpackPlugin({
      title: 'InSettle',
      template: 'public/index.html',
      filename: path.resolve(__dirname, '../dist/index.html')
    })
  ]
}

/**
 * Returns all plugins needed for development builds.
 */
function pluginsDev() {
  const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
  return [
    new webpack.HotModuleReplacementPlugin(),
    new ForkTsCheckerWebpackPlugin({
      tslint: true,
      reportFiles: ['src/**/*.{ts,tsx}']
    }),
    new HtmlWebpackPlugin({
      title: 'InSettle',
      template: 'public/index.html'
    })
  ];
}