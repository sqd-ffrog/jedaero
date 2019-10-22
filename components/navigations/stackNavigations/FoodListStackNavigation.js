import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';

import HakSikMain from '../../drawer/food/menu/haksik';
import DormitoryMain from '../../drawer/food/menu/dormitory';
import FoodList from '../../drawer/food/foodlist';
import OutSideFood from '../../drawer/food/menu/outsidefood';
import DetailMenu from '../../drawer/food/menu/detailmenu';
import {stackNavigationConfig} from '../navigationConfigs';

const FoodListStackNavigation =  createStackNavigator(
    {
        FoodList: {
            screen: FoodList,
        },
        Haksik: {
            screen: HakSikMain,
        },
        Dormitory: {
            screen: DormitoryMain,
            navigationOptions : {
                headerTitle:'기숙사 식당'
            }
        },
        Hansik: {
            screen: props => <OutSideFood navigation={props.navigation} list='hansik' />,
            navigationOptions: {
                headerTitle: '한식'
            }
        }, 
        Etcera: {
            screen: props => <OutSideFood navigation={props.navigation} list='etc' />,
            navigationOptions: {
                headerTitle: '중•일•양식'
            }
        }, 
        Chicken: {
            screen: props => <OutSideFood navigation={props.navigation} list='chicken' />,
            navigationOptions: {
                headerTitle: '치킨'
            }
        }, 
        DetailMenu: {
            screen: DetailMenu,
        }

    }, stackNavigationConfig
)

export default FoodListStackNavigation;