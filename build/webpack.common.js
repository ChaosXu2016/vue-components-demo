const webpack = require('webpack')
const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const rootPath = path.resolve(__dirname, '..')
const components = require('../components.list.json')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

Object.keys(components).forEach(key => {
  components[key] = path.resolve(rootPath, components[key])
})

const config = {
  mode: 'development',
  entry: Object.assign({
    index: path.resolve(rootPath, 'src/index.js'),
  }, components),
  devtool: 'inline-source-map',
  output: {
    path: path.resolve(rootPath, 'dist'),
    filename: 'js/[name].js',
    publicPath: '/'
  },
  devServer: {
    contentBase: './dist',
  },
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      '@': path.resolve(rootPath, 'src/'),
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          transformAssetUrls: {
            video: ['src', 'poster'],
            source: 'src',
            img: 'src',
            image: 'xlink:href'
          }
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        include: path.resolve(rootPath, 'src'),
      },
      {
        test: /\.css$/,
        oneOf: [
          // this matches `<style module>`
          {
            resourceQuery: /module/,
            use: [
              'vue-style-loader',
              MiniCssExtractPlugin.loader,
              {
                loader: 'css-loader',
                options: {
                  modules: true,
                  localIdentName: '[local]_[hash:base64:5]'
                }
              },
            ]
          },
          {
            use: [
              'vue-style-loader',
              MiniCssExtractPlugin.loader,
              'css-loader',
            ]
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: false,
          esModule: false,
          name: 'img/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: false,
          esModule: false,
          name: 'media/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: false,
          esModule: false,
          name: 'fonts/[name].[hash:7].[ext]'
        }
      }
    ]
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: path.resolve(rootPath, 'lib'), to:  path.resolve(rootPath, 'dist/lib') },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
    }),
    new HtmlWebpackPlugin({
      title: 'Output Management',
      template: path.resolve(rootPath, 'index.html'),
      inject: false
    }),
    new CleanWebpackPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new VueLoaderPlugin()
  ]
}

exports.default = config
