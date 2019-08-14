/**
 * Aerain
 */

import { createAppContainer,createStackNavigator, } from 'react-navigation'
import MainBottomTabNavigation from './navigations/MainBottomTabNavigation';

const MainStackNavigator = createStackNavigator({
    Jedaero: {
        screen: MainBottomTabNavigation
    },
}, {
    headerMode: 'none'
})

export default createAppContainer(MainStackNavigator);