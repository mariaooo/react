const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const path = require('path');
const root = path.resolve(__dirname);
const public = path.resolve(root, 'public');
const src = path.resolve(root, 'src');
const dist = path.resolve(root, 'dist');

module.exports = {
  devtool: '#inline-source-map',
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
    filename: `[name].[hash].js`,
    chunkFilename: `[name].chunk.js`,
    sourceMapFilename: `[name].map`,
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
      title: 'demo',
      filename: 'index.html',
      // favicon: `${public}/favicon.ico`,
      template: `${public}/index.html`,
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
      filename: '[name].[hash].js'
    }),
    new ExtractTextPlugin({
      filename: "style.css",
      allChunks: true
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('development')
      }
    }),
    new webpack.LoaderOptionsPlugin({
      debug: true
    }),
    new CopyWebpackPlugin([
      {
        from: `server/`,
        to: dist,
      },
    ]),
  ]
};
