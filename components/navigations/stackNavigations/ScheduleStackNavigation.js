import { stackNavigationConfig } from "../navigationConfigs";
import { createStackNavigator } from "react-navigation-stack";
import Schedule from "../../drawer/schedule/Schedule";
import ScheduleDetail from '../../drawer/schedule/ScheduleDetail';


const ScheduleStackNavigator = createStackNavigator({
    Schedule: {
        screen: Schedule,
    },
    ScheduleDetail: {
        screen: ScheduleDetail,
    }
}, stackNavigationConfig);

export default ScheduleStackNavigator
