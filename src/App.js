import React, {Component} from 'react';
import {Text, View} from 'react-native';
import scssStyle from './style.scss'

export default class App extends Component {
  render() {
    return (
      <View className={scssStyle.container}>
        <Text className={scssStyle.welcome}>Welcome to React Native!</Text>
        <Text className={scssStyle.instructions}>To get started, edit App.js</Text>
      </View>
    )
  }
}
