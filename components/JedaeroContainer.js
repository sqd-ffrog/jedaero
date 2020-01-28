/**
 * Aerain
 */

import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack';
import MainBottomTabNavigation from './navigations/MainBottomTabNavigation';
import InfoHome from './info/InfoHome';
import { stackNavigationConfig } from './navigations/navigationConfigs';
import Developer from './info/Developer';
import License from './info/License';
import Login from './info/Login';

const MainStackNavigator = createStackNavigator({
    Jedaero: {
        screen: MainBottomTabNavigation,
        navigationOptions: () => ({
            headerShown: false
        })
    },
    Info: {
        screen: InfoHome,
    },
    Developer : {
        screen: Developer
    },
    License: {
        screen: License
    },
}, stackNavigationConfig)

export default createAppContainer(MainStackNavigator);