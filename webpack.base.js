/* eslint-disable import/no-extraneous-dependencies */

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { loadConfig } = require('./config-loader');

const config = loadConfig(path.join(__dirname, 'config.yaml'));

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './src/index.html',
  alwaysWriteToDisk: true,
});

module.exports = {
  entry: [
    './src/index.jsx',
  ],
  mode: 'development',
  module: {
    noParse: /(mapbox-gl)\.js$/,
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(png|jpg|gif|ico)$/,
        use:
          {
            loader: 'file-loader',
            options: {
              outputPath: 'dist',
              name: '[path][name].[ext]',
            },
          },
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              icon: true,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    modules: [
      path.resolve('./src'),
      path.resolve('./node_modules'),
    ],
    extensions: ['.js', '.jsx', 'index.jsx'],
  },
  plugins: [
    HtmlWebpackPluginConfig,
    new HtmlWebpackHarddiskPlugin(),
    new webpack.EnvironmentPlugin(config),
  ],
};
