const baseConfig = require('./webpack.common').default;
const merge = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require('path');
const rootPath = path.resolve(__dirname, '..')

exports.default = merge(baseConfig, {
  mode: 'production',
  output: {
    path: path.resolve(rootPath, 'dist'),
    filename: 'js/[name].[contenthash].js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        loaders: [
          'vue-style-loader',
          MiniCssExtractPlugin.loader,
          'css-loader',
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].css',
    }),
    new CleanWebpackPlugin(),
  ]
})
