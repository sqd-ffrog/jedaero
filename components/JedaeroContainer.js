/**
 * Aerain
 */

import { createAppContainer,createStackNavigator, } from 'react-navigation'
import MainBottomTabNavigation from './navigations/MainBottomTabNavigation';

let MainStackNavigator = createStackNavigator({
    Jedaero: {
        screen: MainBottomTabNavigation
    },
}, {
    headerMode: 'none'
})

export default createAppContainer(MainStackNavigator);