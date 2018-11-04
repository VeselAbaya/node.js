const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = {
  entry: {
    chat: ['babel-polyfill', './public/js/chat/chat.js'],
    index: './public/js/join/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: false,
      filename: 'chat.html',
      template: 'public/html/chat.html'
    }),
    new HtmlWebpackPlugin({
      inject: false,
      filename: 'index.html',
      template: 'public/html/index.html'
    })
  ],
  devServer: {
    contentBase: './dist'
  }
}