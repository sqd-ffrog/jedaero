import { createStackNavigator } from 'react-navigation';
import TimeTable from '../../drawer/jnuservice/dreamy/TimeTable'
import DreamyHome from '../../drawer/jnuservice/dreamy/DreamyHome';
import Login from '../../info/Login';
import { stackNavigationConfig } from '../navigationConfigs';
import Credit from '../../drawer/jnuservice/dreamy/Credit';
import CreditDetail from '../../drawer/jnuservice/dreamy/CreditDetail';

const DreamyStackNavigation = createStackNavigator({
    DreamyHome: {
        screen: DreamyHome,
    },
    TimeTable: {
        screen: TimeTable,
    },
    Credit: {
        screen: Credit,
    },
    CreditDetail: {
        screen: CreditDetail,
    },
    NestedLogin: {
        screen: Login,
    }
}, {
    ...stackNavigationConfig, 
    // initialRouteName: "TimeTable"
})

export default DreamyStackNavigation