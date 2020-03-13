/**
 * 제대로 가자 for React Native
 * 작성자 - 이청길
 * 작성일 - 2018.07.26
 */

import React, { useEffect } from 'react';
import { StatusBar, Platform } from 'react-native';
import JedaeroContainer from './components/JedaeroContainer';
import { Provider } from 'react-redux'; 
import store from './reducer/store';
const App = () => {
  return (
    <Provider store={store}>
      <JedaeroContainer />
    </Provider>
  )
}

export default App;
