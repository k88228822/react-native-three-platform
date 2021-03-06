const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const pxToRem = require('postcss-pxtorem')
const autoPreFixer = require('autoprefixer')

const postCssOptions = {
  ident: 'postcss',
  plugins: () => [
    autoPreFixer,
    pxToRem({
      rootValue: 16, // 设计图根fontSize大小
      propWhiteList: []
    }),
  ],
  sourceMap: true,

}

module.exports = {
  entry: {app: './index.web.js'},
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
              modules: true,
              localIdentName: '[name]_[local]-[hash:base64:5]',
            }
          },
          {
            loader: 'postcss-loader',
            options: postCssOptions
          },
          "sass-loader",
        ]
      },
      {
        test: /\.(js|jsx)$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              cacheDirectory: false,
              // react-native-cli有默认的配置 babel.config.js , 所以需要新建配置文件，用于web
              configFile: path.resolve(__dirname, 'babel.web.config.js'),
            }
          }
        ],
        exclude: path.resolve(__dirname, 'node_modules'),
      }
    ]
  },
  resolve: {
    // 文件在web端需特殊处理时，则建立新的文件加.web.js后缀， 如index.js 和index.web.js ，前者用于 react-native ,后者用于web
    extensions: ['.web.js', '.js', '.jsx'],
    alias: {
      'react-native': 'react-native-web', // web端库指向react-native-web
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'public/index.html'),
      templateParameters: {title: 'hello react-native-web !'}
    }),
  ]
}