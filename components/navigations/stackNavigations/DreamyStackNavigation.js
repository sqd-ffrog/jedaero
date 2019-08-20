import { createStackNavigator } from 'react-navigation';
import TimeTable from '../../drawer/jnuservice/dreamy/TimeTable'
import DreamyHome from '../../drawer/jnuservice/dreamy/DreamyHome';
import Login from '../../info/Login';
import { stackNavigationConfig } from '../navigationConfigs';

const DreamyStackNavigation = createStackNavigator({
    DreamyHome: {
        screen: DreamyHome,
    },
    TimeTable: {
        screen: TimeTable,
    },
    NestedLogin: {
        screen: Login,
    }
}, {
    ...stackNavigationConfig, 
    // initialRouteName: "TimeTable"
})

export default DreamyStackNavigation