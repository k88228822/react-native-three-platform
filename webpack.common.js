const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {app: './index.web.js'},
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
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