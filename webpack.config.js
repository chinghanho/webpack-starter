const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const isDev = process.env.NODE_ENV !== 'production'

const config = {
  mode: isDev ? 'development' : 'production',
  entry: './src/scripts/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  module: {
    rules: []
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyPlugin([
      {
        from: 'src/index.html'
      }
      // {
      //   from: 'src/css/style.css',
      //   to: 'css/'
      // },
      // {
      //   from: 'src/images/logo.png',
      //   to: 'images/'
      // }
    ])
  ],
  devtool: 'cheap-eval-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 8080,
    hot: true
  },
  optimization: {
    minimize: !isDev
  }
}

module.exports = config
