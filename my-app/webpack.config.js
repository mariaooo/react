const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

const getBundleLoaders = require('./bundleLoaders');

/** ********************************************************* */
// set env config
const envConfig = process.env.ENV_CONFIG;


/** ********************************************************* */

const rootPath = pathConfig.rootPath;
const srcPath = pathConfig.srcPath;
const distPath = pathConfig.distPath;

/** ********************************************************* */
module.exports = {
  devtool: 'inline-source-map',

  entry: {
    main: `${srcPath}/index.js`,
    vendor: [
      'babel-polyfill',
      'classnames',
      'fetch-jsonp',
      'jquery',
      'moment',
      'moment-timezone',
      'numeral',
      'prop-types',
      'react',
      'react-addons-css-transition-group',
      'react-dom',
      'react-redux',
      'react-router',
      'react-router-redux',
      'redux',
      'redux-saga',
      'whatwg-fetch',
    ],
  },

  output: {
    path: distPath,
    publicPath: 'http://localhost:3000/',
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
    sourceMapFilename: '[name].map',
  },

  devServer: {
    contentBase: './dist',
  },

  resolve: {
    extensions: [' ', '.js', '.jsx', '.css'],
  },

  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      ...getBundleLoaders(appConfig, pathConfig.configPath, intlEnv),
      ...getBundleLoaders(appConfig, pathConfig.intlPath, intlEnv),
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader',
        }),
      },
      {
        test: /\.style$/,
        exclude: /node_modules/,
        loader: 'style-loader!css-loader',
      },
      {
        test: /\.(jpg|png|jpeg|gif|svg)$/,
        exclude: /node_modules/,
        loader: 'url-loader',
      },
      {
        test: /\.(woff|ttf)$/,
        exclude: /node_modules/,
        loader: 'file-loader',
      },
      {
        test: /\.(wav|mp3|mpeg|mp4|webm|ogv)$/,
        exclude: /node_modules/,
        loader: 'file-loader',
      },
      {
        test: /\.(json|json5)$/,
        exclude: /node_modules/,
        loader: 'json-loader',
      },
      {
        test: /\.txt$/,
        exclude: /node_modules/,
        loader: 'raw-loader',
      },
      {
        test: /\.(html|htm|md|markdown)$/,
        exclude: /node_modules/,
        loader: 'html-loader',
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'test',
      filename: 'index.html',
      favicon: `${pathConfig.publicPath}/favicon.ico`,
      template: `${pathConfig.publicPath}/index.html`,
      inject: 'body',
      hash: true,
      cache: false,
      showErrors: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
      },
    }),
    new OpenBrowserPlugin({
      url: 'http://localhost:3000',
      delay: 0,
      browser: 'chrome',
      ignoreErrors: false,
    }),
    new webpack.ProvidePlugin({
      React: 'react',
      ReactDOM: 'react-dom',
      PropTypes: 'prop-types',
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest'],
      filename: '[name].js',
    }),

    new ExtractTextPlugin({
      filename: 'style.css',
      allChunks: true,
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
        ENV_CONFIG: JSON.stringify(env),
      }
    }),
    new CopyWebpackPlugin([
      {
        from: `server/${serverSubPath}`,
        to: distPath,
      },
      {
        from: `${srcPath}/lib/amcharts/images`,
        to: 'amcharts/images',
      },
    ]),
  ],
};
