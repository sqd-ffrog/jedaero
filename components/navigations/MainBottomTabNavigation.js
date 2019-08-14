import React from 'react';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { jedaeroBottomTabNavigationConfig } from './navigationConfigs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { BusStackNavigation, FoodListStackNavigation, LibrarySearchStackNavigation, ScheduleStackNavigation } from './stackNavigations';

const TabNav = createMaterialBottomTabNavigator({
    Bus: {
        screen: BusStackNavigation,
        navigationOptions: {
            title: '순환버스',
            tabBarIcon: ({tintColor}) => (<Icon name="home-outline" color={tintColor} size={30} style={{width: 30, height: 60}}/>)
        }
    },
    Food: {
        screen: FoodListStackNavigation,
        navigationOptions: {
            title: '뭐먹을까',
            tabBarIcon: ({tintColor}) => (<Icon name="food-fork-drink" color={tintColor} size={30} style={{width: 30, height: 60}}/>)
        }
    },
    ScheduleMain: {
        screen: ScheduleStackNavigation,
        navigationOptions: {
            title: '학사일정',
            tabBarIcon: ({tintColor}) => (<Icon name="clipboard-outline" color={tintColor} size={30} style={{width: 30, height: 60}}/>)
        }
    },    
    LibrarySearch: {
        screen: LibrarySearchStackNavigation,
        navigationOptions: {
            title: '도서검색',
            tabBarIcon: ({tintColor}) => (<Icon name="book-open-variant" color={tintColor} size={30} style={{width: 30, height: 60}}/>)
        }
    },
}, jedaeroBottomTabNavigationConfig)

export default TabNav;