# 创建项目

#### 主要思路
利用webpack的alias, 把 import  from 'react-native' 自动转向 import from 'react-native-web'。这样可以保留react-native写法，一份代码，3端运行。

#### 创建react-native项目
 
 ```
 react-native init ReactNativeWeb
 ```
 
#### 引入依赖

```
// webapck相关
npm install --save -D webpack webpack-cli webpack-dev-server webpack-merge

// babel 相关
npm install --save -D @babel/core @babel/preset-env @babel/preset-react babel-loader

// react-native-web
npm install --save react-native-web

// 打包html
npm install --save -D html-webpack-plugin
```

#### 创建web的入口文件
在项目根目录下创建index.web.js作为入口文件
```
import { AppRegistry } from 'react-native';
import App from './App';

AppRegistry.registerComponent('App', () => App);
AppRegistry.runApplication('App', { rootTag: document.getElementById('root') });

```

### 创建webpack配置文件
为了使webpack结构清晰， 这里创建了如下三个文件：
* webpak.common :  共有的配置
* webpack.dev :    开发环境配置
* webpack.prod :   生产环境配置

**配置中特殊的地方:**

react-native-cli有默认的配置 babel.config.js , 所以需要新建配置文件，用于web

```
{
    loader: "babel-loader",
    options: {
        cacheDirectory: false,
        configFile: path.resolve(__dirname, 'babel.web.config.js'),
    }
}
```

```
  resolve: {
    // 文件在web端需特殊处理时，则建立新的文件加.web.js后缀， 如index.js 和index.web.js ，前者用于 react-native ,后者用于web的babel-loader
    extensions: ['.web.js', '.js', '.jsx'],
    alias: {
      'react-native': 'react-native-web', // web端库指向react-native-web
    },
  },
```

#### 运行 webpack 即可


