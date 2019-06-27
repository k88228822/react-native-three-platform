const merge = require('webpack-merge')
const webpack = require('webpack')
const path = require('path')

const commonConfig = require('./webpack.common')

module.exports = merge(commonConfig,{
  mode: 'development',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    // contentBase: path.resolve(__dirname, 'dist'),
    compress: true,
    hot: true,
  }
})