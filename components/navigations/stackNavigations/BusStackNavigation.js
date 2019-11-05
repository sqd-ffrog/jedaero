import { createStackNavigator } from 'react-navigation-stack';
import Bus from '../../drawer/home/bus';
import HakSikMain from '../../drawer/food/menu/haksik';
import DormitoryMain from '../../drawer/food/menu/dormitory';
import { stackNavigationConfig } from '../navigationConfigs';
import BusSchedule from '../../drawer/home/BusTimeTable'

const BusStackNavigation =  createStackNavigator({
    Bus: {
        screen: Bus,
    },
    BusSchedule:{
        screen: BusSchedule,
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