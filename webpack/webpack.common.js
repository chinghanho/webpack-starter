const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  entry: {
    app: path.resolve(__dirname, '../src/scripts/index.js')
  },
  output: {
    path: path.join(__dirname, '../build'),
    filename: 'js/[name].js'
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      name: false
    }
  },
  plugins: [
    new ExtractTextPlugin({
      filename: 'src/styles/[name].css'
    })
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([
      { from: path.resolve(__dirname, '../public'), to: 'public' }
    ]),
    // dupcates `HtmlWebpackPlugin` code block if multiple static pages needed
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, '../src/index.html')
    }),
    new MiniCssExtractPlugin({
      filename: 'bundle.css'
    })
  ],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, '../src'),
      '@': path.resolve(__dirname, '../src/scripts')
    }
  },
  module: {
    rules: [
      {
        test: /\.(html)$/,
        loader: 'html-loader'
      },
      // using `script-laoder` to load module in webpack if external library
      // is not support CMD / ES6 modules
      //
      // {
      //   test: require.resolve('zepto'),
      //   use: ['exports-loader?window.Zepto', 'script-loader']
      // },
      {
        test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 1000, // bytes
            name: '[path][name]-[sha256:hash:base64:8].[ext]'
          }
        }
      },
      {
        test: /\.s?css/i,
        use: ExtractTextPlugin.extract({
          use: [
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                plugins: function() {
                  return [
                    require('autoprefixer'),
                    require('postcss-flexbugs-fixes')
                  ]
                }
              }
            },
            'sass-loader'
          ]
        })
        // use: [
        //   MiniCssExtractPlugin.loader,
        //   'css-loader',
        //   'sass-loader'
        // ]
      }
    ]
  }
}
