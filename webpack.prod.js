const baseConfig = require('./webpack.base');

baseConfig.output = {
  filename: '[name].[chunkhash].js',
  chunkFilename: '[name].[chunkhash].js',
};

baseConfig.devtool = 'cheap-source-map';
baseConfig.mode = 'production';

const config = Object.assign({}, baseConfig);

module.exports = config;
