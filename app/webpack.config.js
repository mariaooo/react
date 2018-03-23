const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const path = require('path');
const root = path.resolve(__dirname);
const src = path.resolve(root, 'src');
const dist = path.resolve(root, 'dist');

module.exports = {
  entry: {
    main: src + '/index.jsx',
    vendor: [
      "babel-polyfill",
      "classnames",
      "jquery",
      "react",
      "react-router",
      "react-router-redux",
      "redux",
      "numeral",
      "moment",
      "redux-saga",
      "whatwg-fetch",
      "prop-types"
    ],
  },

  output: {
    path: dist,
    filename: `[name].js`,
  },

  devServer: {
    contentBase: './dist',
  },

  resolve: {
    extensions: [' ', '.js', '.jsx', '.scss', '.css'],
  },

  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      },
      {
        test: /\.less$/,
        exclude: /node_modules/,
        loader: 'style-loader!css-loader!less-loader'
      },
      {
        test: /\.sass$/,
        exclude: /node_modules/,
        loader: 'style-loader!css-loader!sass-loader'
      },
      {
        test: /\.style$/,
        exclude: /node_modules/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.(jpg|png|jpeg|gif|svg)$/,
        exclude: /node_modules/,
        loader: "url-loader"
      },
      {
        test: /\.(woff|ttf)$/,
        exclude: /node_modules/,
        loader: "file-loader"
      },
      {
        test: /\.(wav|mp3|mpeg|mp4|webm|ogv)$/,
        exclude: /node_modules/,
        loader: "file-loader"
      },
      {
        test: /\.swf$/,
        exclude: /node_modules/,
        loader: "file-loader?name=[path][name].[ext]"
      },
      {
        test: /\.(json|json5)$/,
        exclude: /node_modules/,
        loader: "json-loader"
      },
      {
        test: /\.txt$/,
        exclude: /node_modules/,
        loader: "raw-loader"
      },
      {
        test: /\.(html|htm|md|markdown)$/,
        exclude: /node_modules/,
        loader: "html-loader"
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'FX Alert',
      filename: 'index.html',
      favicon: root + '/public/favicon.ico',
      template: root + '/public/index.html',
      inject: 'body',
      cache: false,
      showErrors: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true
      },

    }),
    new OpenBrowserPlugin({
      url: 'http://localhost:3000',
      delay: 0,
      browser: 'chrome',
      ignoreErrors: false
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'mainifest'],
      filename: '[name].js'
    }),
    new ExtractTextPlugin({
      filename: "style.css",
      allChunks: true
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new CopyWebpackPlugin([
      {
        from: `server/`,
        to: dist,
      },
    ]),
    new webpack.optimize.UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          drop_console: true,
        },
        output: {
          comments: 'all',
        },
      }
    })
  ]
};
