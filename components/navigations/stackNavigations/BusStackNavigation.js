import { createStackNavigator } from 'react-navigation';
import Bus from '../../drawer/bus/bus';
import HakSikMain from '../../drawer/food/menu/haksik';
import DormitoryMain from '../../drawer/food/menu/dormitory';
import { stackNavigationConfig } from '../navigationConfigs';


const BusStackNavigation =  createStackNavigator({
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
}, stackNavigationConfig );

export default BusStackNavigation;