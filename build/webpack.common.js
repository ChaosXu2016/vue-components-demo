const webpack = require('webpack')
const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const rootPath = path.resolve(__dirname, '..')
const components = require('../components.list.json')

Object.keys(components).forEach(key => {
  components[key] = path.resolve(rootPath, components[key])
});

const config = merge({
  entry: Object.assign({
    index: path.resolve(rootPath, 'src/index.js'),
  }, components),
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
          },
          pluginOptions: {
            'style-resources-loader': {
              'preProcessor': 'less',
              'patterns': [
                path.resolve(rootPath, 'src/styles/*.less'),
              ]
            }
          }
        }
      },
      {
        test: /\.css$/,
        loaders: [
          'vue-style-loader',
          MiniCssExtractPlugin.loader,
          'css-loader',
        ]
      },
      {
        test: /\.less$/,
        use: [
          'vue-style-loader',
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                globalVars: {
                  mainBlueColor: '#0E72ED',
                  white: '#FFFFFF'
                }
              }
            }
          },
          'postcss-loader'
        ]
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        include: path.resolve(rootPath, 'src'),
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 1000,
          esModule: false,
          name: 'img/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 1000,
          esModule: false,
          name: 'media/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 1000,
          esModule: false,
          name: 'fonts/[name].[hash:7].[ext]'
        }
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].css',
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new VueLoaderPlugin(),
  ],
  stats: {
    children: false,
    assetsSort: '!size',
    chunksSort: 'name',
    chunks: false,
    modules: false,
  }
})

exports.default = config
