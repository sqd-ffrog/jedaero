import { createStackNavigator } from 'react-navigation';
import Bus from '../../drawer/bus/bus';
import HakSikMain from '../../drawer/food/menu/haksik';
import DormitoryMain from '../../drawer/food/menu/dormitory';
import { stackNavigationOptions } from '../navigationConfigs';


export default createStackNavigator({
    Bus: {
        screen: Bus,
    },
    // Login: {
    //     screen: Login
    // },
    // Detail : {
    //     screen: Detail,
    // },
    // Second: {
    //     screen: License,
    // },
    Haksik: {
        screen: HakSikMain,
    },
    Dormitory: {
        screen: DormitoryMain, 
    },
}, stackNavigationOptions );