'use strict';

const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const precss = require('precss');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

let appEntry;
let devtool;
let plugins;
let publicPath;

const htmlTemplate = new HtmlWebpackPlugin({
  title: 'Maketrail.com',
  template: './index.html',
  mobile: true,
  inject: false
});
const favIcon = new FaviconsWebpackPlugin({
  logo: './src/assets/favicon.png',
  prefix: 'icons/'
});

if (process.env.NODE_ENV === 'production') {
  publicPath = '//cdn.maketrail.com/';
  appEntry = ['babel-polyfill', path.join(__dirname, 'src/index.js')];
  devtool = 'source-map';
  plugins = [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.CommonsChunkPlugin({name: 'vendor', filename: 'vendor.js'}),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        screw_ie8: true
      }
    }),
    htmlTemplate,
    favIcon
  ];
} else if (process.env.NODE_ENV === 'localhost') {
  publicPath = '//localhost:4000/';
  appEntry = ['babel-polyfill', path.join(__dirname, 'src/index.js')];
  devtool = 'source-map';
  plugins = [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.CommonsChunkPlugin({name: 'vendor', filename: 'vendor.js'}),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        screw_ie8: true
      }
    }),
    htmlTemplate,
    favIcon
  ];
} else {
  publicPath = '//localhost:4000/';
  appEntry = ['babel-polyfill', path.join(__dirname, 'src/index.js')];
  devtool = 'source-map';
  plugins = [
    new webpack.optimize.CommonsChunkPlugin({name: 'vendor', filename: 'vendor.js'}),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({
      __DEV__: true
    }),
    htmlTemplate,
    favIcon
  ];
}

module.exports = {
  entry: {
    app: appEntry,
    vendor: ['babel-polyfill', 'react', 'react-dom', 'react-mdl', 'react-relay', 'react-router', 'react-router-relay']
  },

  output: {
    path: path.join(__dirname, 'build'),
    publicPath,
    filename: '[name].js'
  },

  devtool,

  resolve: {
    extensions: ['.js', '.scss', '*'],
    modules: [path.resolve(__dirname, 'src'), 'node_modules']
  },

  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "eslint-loader"
      },
      {
        test: /\.jsx?$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          'resolve-url-loader'
        ],
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: "[name]__[local]___[hash:base64:5]",
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss', plugins: () => [
                require('precss'),
                require('autoprefixer')
              ]
            }
          },
          'resolve-url-loader',
          'sass-loader?sourceMap'
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1000,
              name: "assets/[hash].[ext]"
            }
          }
        ]
      }
    ]
  },
  plugins
};
