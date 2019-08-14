/**
 * 제대로 가자 for React Native
 * 작성자 - 이청길
 * 작성일 - 2018.07.26
 */

import React, { Component } from 'react';
import { StatusBar, Platform } from 'react-native';
import JedaeroContainer from './components/JedaeroContainer';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false //api를 불러왔을때는 true가 되도록
    }
  }

  componentDidMount = () => {
    StatusBar.setBarStyle('dark-content')
    if(Platform.OS === 'android') {
      StatusBar.setBackgroundColor('#f7f7f7ff');
      StatusBar.setTranslucent(false);
    }
  }

  render() {
    // if(!isLoaded) {
    //   if(Platform.OS === 'android') { StatusBar.setBackgroundColor('#ffffff00'); }
    //   StatusBar.setTranslucent(true);
    //   StatusBar.setBarStyle('light-content');
    // } else {
    //   if(Platform.OS === 'android') { StatusBar.setBackgroundColor('#ffffffff'); }
    //   StatusBar.setTranslucent(false);
    //   StatusBar.setBarStyle('dark-content');
    // }
    // return isLoaded ? <MainDrawer/> : <Splash />

    return (
      <JedaeroContainer />
    )
  }
}
