import { createStackNavigator } from 'react-navigation';
import Dreamy from '../../drawer/jnuservice/dreamy/Dreamy'
import { stackNavigationConfig } from '../navigationConfigs';

const DreamyStackNavigation = createStackNavigator({
    DreamyHome: {
        screen: Dreamy
    }
}, stackNavigationConfig)

export default DreamyStackNavigation