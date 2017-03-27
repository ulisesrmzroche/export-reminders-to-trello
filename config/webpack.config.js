const ENV = require('./environment');
const webpack = require('webpack');
const dotenv = require('dotenv');
const _ = require('lodash');

dotenv.load();

module.exports = {
  context: `${ENV.ROOT_PATH}`,
  entry: {
    osx: `${ENV.ROOT_PATH}/src/modules/osx/index.js`,
    trello: `${ENV.ROOT_PATH}/src/modules/trello/index.js`,
  },
  target: 'node',
  output: {
    path: `${ENV.ROOT_PATH}/dist`,
    filename: 'bundle.[name].js',
    publicPath: '/',
  },
  plugins: _.filter([
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': process.env.NODE_ENV ? `"${process.env.NODE_ENV}"` : '"development"',
      'process.env.TRELLO_DEV_KEY': `"${process.env.TRELLO_DEV_KEY}"`,
      'process.env.TRELLO_DEV_TOKEN': `"${process.env.TRELLO_DEV_TOKEN}"`,
      'process.env.TRELLO_BACKLOG_LIST_ID': `"${process.env.TRELLO_BACKLOG_LIST_ID}"`,
      'process.env.ROOT_PATH': `"${ENV.ROOT_PATH}"`,
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    process.env.NODE_ENV === 'production' && new webpack.optimize.UglifyJsPlugin({
      debug: true,
      minimize: true,
      sourceMap: false,
      output: {
        comments: false,
      },
      compressor: {
        warnings: false,
        drop_console: true,
      },
    }),
  ]),
  resolve: {
    extensions: ['.js'],
    alias: {
    },
  },
  module: {
    rules: [
      // JAVASCRIPTS
      {
        test: /\.js?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: `${ENV.ROOT_PATH}/tmp`,
            },
          },
        ],
        include: `${ENV.ROOT_PATH}/src`,
        exclude: /node_modules/,
      },
      {
        test: /\.json$/,
        use: 'json-loader',
      },
    ],
  },
  devtool: 'source-map',
};
