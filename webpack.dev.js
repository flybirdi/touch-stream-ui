/* eslint-disable import/no-extraneous-dependencies */

const path = require('path');
const { WebpackPluginServe } = require('webpack-plugin-serve');
const baseConfig = require('./webpack.base');

baseConfig.module.rules.push({
  test: /\.css$/,
  use: [
    { loader: 'style-loader' }, // creates style nodes from JS strings
    { loader: 'css-loader' }, // translates CSS into CommonJS
  ],
});

// Dev server
baseConfig.entry.push('webpack-plugin-serve/client');
baseConfig.plugins.push(new WebpackPluginServe({
  port: 8006,
  static: path.join(process.cwd(), '/dist'),
  historyFallback: true,
  hmr: true,
  progress: 'minimal',
}));
baseConfig.watch = true;

baseConfig.devtool = 'cheap-module-eval-source-map';

const config = Object.assign({}, baseConfig);

module.exports = config;
