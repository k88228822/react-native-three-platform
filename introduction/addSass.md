# 添加sass

#### 目的
可以自定义全局变量，css modules，保持react native 和 web样式写法的一致性

#### 引入依赖
```
npm install --save -D style-loader sass-loader node-sass react-native-sass-transformer babel-plugin-react-native-classname-to-style babel-plugin-react-native-platform-specific-extensions
```

#### react-native 引入 sass
* 参考  [react-native-sass-transformer](https://github.com/kristerkari/react-native-sass-transformer) 的使用
其中需要修改metro.config.js文件， react-native使用[mertro](https://facebook.github.io/metro/docs/en/configuration)进行打包

#### web引入sass
使用sass-loader 转成css， 使用css-loader设置模块化，再使用style-loader 挂载样式属性到dom元素
```
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
          "sass-loader",
        ]
      }
```