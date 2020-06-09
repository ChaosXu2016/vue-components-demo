const baseConfig = require('./webpack.common').default;
const merge = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');
const rootPath = path.resolve(__dirname, '..')
const CompressionPlugin = require('compression-webpack-plugin');

exports.default = merge(baseConfig, {
  mode: 'production',
  output: {
    path: path.resolve(rootPath, 'dist'),
    filename: 'js/[name].[contenthash].js',
    publicPath: '/'
  },
  module: {
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CompressionPlugin(),
  ]
})
