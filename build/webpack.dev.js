const merge = require('webpack-merge')
const baseConig = require('./webpack.common').default;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path')
const rootPath = path.resolve(__dirname, '..')

exports.default = merge(baseConig, {
  mode: 'development',
  devtool: 'inline-source-map',
  output: {
    path: path.resolve(rootPath, 'dist'),
    filename: 'js/[name].js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        loaders: [
          'vue-style-loader',
          'css-loader',
        ]
      }
    ]
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: path.resolve(rootPath, 'lib'), to:  path.resolve(rootPath, 'dist/lib') },
      ],
    }),
    new HtmlWebpackPlugin({
      title: 'Output Management',
      template: path.resolve(rootPath, 'index.html'),
      inject: false
    }),
  ]
})
