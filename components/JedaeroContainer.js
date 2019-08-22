/**
 * Aerain
 */

import { createAppContainer,createStackNavigator, } from 'react-navigation'
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
            header: null,
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
    Login: {
        screen: Login
    }
}, stackNavigationConfig)

export default createAppContainer(MainStackNavigator);