const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const common = require('./webpack.common.js')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'cheap-eval-source-map',
  output: {
    chunkFilename: 'js/[name].chunk.js'
  },
  devServer: {
    inline: true
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ],
  module: {
    rules: [
      {
        test: /\.(js)$/,
        include: path.resolve(__dirname, '../src'),
        enforce: 'pre',
        loader: 'eslint-loader',
        options: {
          emitWarning: true,
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.(js)$/,
        include: path.resolve(__dirname, '../src'),
        loader: 'babel-loader'
      }
    ]
  }
})
