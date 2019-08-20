import React from 'react';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { jedaeroBottomTabNavigationConfig } from './navigationConfigs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { BusStackNavigation, FoodListStackNavigation, LibrarySearchStackNavigation, ScheduleStackNavigation, DreamyStackNavigation } from './stackNavigations';

const iconSize = 24

const TabNav = createMaterialBottomTabNavigator({
    Home: {
        screen: BusStackNavigation,
        navigationOptions: {
            title: '홈',
            tabBarIcon: ({tintColor, focused}) => (<Icon name={focused ? "home" : "home-outline"} color={tintColor} size={iconSize} style={{width: iconSize, height: iconSize}}/>)
        }
    },
    Food: {
        screen: FoodListStackNavigation,
        navigationOptions: {
            title: '뭐먹을까',
            tabBarIcon: ({tintColor}) => (<Icon name="food-fork-drink" color={tintColor} size={iconSize} style={{width: iconSize, height: iconSize}}/>)
        }
    },
    Dreamy: {
        screen: DreamyStackNavigation,
        navigationOptions: {
            title: '하영드리미',
            tabBarIcon: ({tintColor, focused}) => (<Icon name={focused ? "card-bulleted" : "card-bulleted-outline"} color={tintColor} size={iconSize} style={{width: iconSize, height: iconSize}}/>)
        }
    },
    LibrarySearch: {
        screen: LibrarySearchStackNavigation,
        navigationOptions: {
            title: '도서검색',
            tabBarIcon: ({tintColor, focused}) => (<Icon name={focused ? "book-open-page-variant" : "book-open-variant"} color={tintColor} size={iconSize} style={{width: iconSize, height: iconSize}}/>)
        }
    },
    ScheduleMain: {
        screen: ScheduleStackNavigation,
        navigationOptions: {
            title: '학사일정',
            tabBarIcon: ({tintColor, focused}) => (<Icon name={focused ? "clipboard" : "clipboard-outline"} color={tintColor} size={iconSize} style={{width: iconSize, height: iconSize}}/>)
        }
    },    
}, {
    ...jedaeroBottomTabNavigationConfig, 
    initialRouteName: "Dreamy"
})

TabNav.navigationOptions = () => ({
    title: '홈'
})
export default TabNav;