import React from 'react';
import { createStackNavigator } from 'react-navigation';

import HakSikMain from '../../drawer/food/menu/haksik';
import DormitoryMain from '../../drawer/food/menu/dormitory';
import FoodList from '../../drawer/food/foodlist';
import Hansik from '../../drawer/food/menu/hansik';
import DetailMenu from '../../drawer/food/menu/detailmenu';
import {stackNavigationOptions} from '../navigationConfigs';

export default createStackNavigator(
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
            screen: props => <Hansik navigation={props.navigation} list='hansik' />,
            navigationOptions: {
                headerTitle: '한식'
            }
        }, 
        Etcera: {
            screen: props => <Hansik navigation={props.navigation} list='etc' />,
            navigationOptions: {
                headerTitle: '중•일•양식'
            }
        }, 
        Chicken: {
            screen: props => <Hansik navigation={props.navigation} list='chicken' />,
            navigationOptions: {
                headerTitle: '치킨'
            }
        }, 
        DetailMenu: {
            screen: DetailMenu,
        }

    }, stackNavigationOptions
)