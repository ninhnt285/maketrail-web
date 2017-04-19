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

const htmlTemplate = new HtmlWebpackPlugin({
  title: 'Maketrail.com',
  template: './index.html',
  mobile: true,
  inject: false
});
const favIcon = new FaviconsWebpackPlugin('./src/assets/favicon.png');

if (process.env.NODE_ENV === 'production') {
  appEntry = [path.join(__dirname, 'src/index.js')];
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
  appEntry = [path.join(__dirname, 'src/index.js')];
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
    vendor: ['react', 'react-dom', 'react-mdl', 'react-relay', 'react-router', 'react-router-relay']
  },
  output: {
    path: path.join(__dirname, 'build'),
    publicPath: '/',
    filename: '[name].js'
  },
  devtool,
  module: {
    rules: [{
      enforce: "pre",
      test: /\.js$/,
      exclude: /node_modules/,
      loader: "eslint-loader"
    },
    {
      test: /\.jsx?$/,
      use: 'babel-loader',
      exclude: /node_modules/
    }, {
      test: /\.css$/,
      use: [
        'style-loader',
        'css-loader'
      ],
    }, {
      test: /\.less$/,
      use: [{
          loader: "style-loader" // creates style nodes from JS strings
      }, {
          loader: "css-loader" // translates CSS into CommonJS
      }, {
          loader: "less-loader" // compiles Less to CSS
      }]
    }, {
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
            //https://github.com/postcss/postcss-loader/issues/164
            // use ident if passing a function
            ident: 'postcss', plugins: () => [
              require('precss'),
              require('autoprefixer')
            ]
          }

        }
      ]
    }, {
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
    }]
  },
  plugins
};
