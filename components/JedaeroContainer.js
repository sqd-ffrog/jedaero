import React, { Component } from 'react'
import { Platform, StatusBar, View ,Alert,} from 'react-native'
import { createAppContainer,createStackNavigator, SafeAreaView, } from 'react-navigation'
import MainTabNavigation from './MainTabNavigation';
import settingsStackNavigator from './drawer/settings/settingsStackNavigator';

// const jedaero = ({navigation}) => (
//     <SafeAreaView style={{flex: 1, 
//             paddingTop: (Platform.OS === 'android' ? StatusBar.currentHeight : 0), backgroundColor: '#ffffff' }} forceInset={{top: 'never', bottom: 'never'}}>
//         <MainTabNavigation navigation={navigation} />
//     </SafeAreaView>
// );

let MainStackNavigator = createStackNavigator({
    Jedaero: {
        screen: MainTabNavigation
    },
    settings: {
        screen: settingsStackNavigator
    }
}, {
    headerMode: 'none'
})

export default createAppContainer(MainStackNavigator);