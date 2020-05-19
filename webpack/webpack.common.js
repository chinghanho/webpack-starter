const Path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  entry: {
    app: Path.resolve(__dirname, '../src/scripts/index.js')
  },
  output: {
    path: Path.join(__dirname, '../build'),
    filename: 'js/[name].js'
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      name: false
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([
      { from: Path.resolve(__dirname, '../public'), to: 'public' }
    ]),
    // 如果需要多個 static pages 可以重複建立這邊的 HtmlWebpackPlugin block
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: Path.resolve(__dirname, '../src/index.html')
    }),
    new MiniCssExtractPlugin({
      filename: 'bundle.css'
    })
  ],
  resolve: {
    alias: {
      '~': Path.resolve(__dirname, '../src'),
      '@': Path.resolve(__dirname, '../src/scripts')
    }
  },
  module: {
    rules: [
      {
        test: /\.(html)$/,
        loader: 'html-loader'
      },
      // 如果安裝不支援 CMD / ES6 Modules 可以用 script-loader 載入到 Webpack 模組化，例如：
      //
      // {
      //   test: require.resolve('zepto'),
      //   use: ['exports-loader?window.Zepto', 'script-loader']
      // },
      {
        test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[path][name]-[sha256:hash:base64:8].[ext]'
          }
        }
      },
      {
        test: /\.s?css/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  }
}
