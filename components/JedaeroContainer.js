/**
 * Aerain
 */

import { createAppContainer,createStackNavigator, } from 'react-navigation'
import MainBottomTabNavigation from './navigations/MainBottomTabNavigation';
import InfoHome from './info/InfoHome';
import { stackNavigationConfig } from './navigations/navigationConfigs';

const MainStackNavigator = createStackNavigator({
    Jedaero: {
        screen: MainBottomTabNavigation,
        navigationOptions: () => ({
            header: null,
        })
    },
    Info: {
        screen: InfoHome,
    }
}, stackNavigationConfig)

export default createAppContainer(MainStackNavigator);