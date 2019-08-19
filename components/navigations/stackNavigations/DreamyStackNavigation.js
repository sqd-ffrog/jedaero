import { createStackNavigator } from 'react-navigation';
import TimeTable from '../../drawer/jnuservice/dreamy/TimeTable'
import DreamyHome from '../../drawer/jnuservice/dreamy/DreamyHome';
import { stackNavigationConfig } from '../navigationConfigs';

const DreamyStackNavigation = createStackNavigator({
    DreamyHome: {
        screen: DreamyHome
    },
    TimeTable: {
        screen: TimeTable
    }
}, {...stackNavigationConfig, initialRouteName: "TimeTable"})

export default DreamyStackNavigation