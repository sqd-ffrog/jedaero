import { stackNavigationOptions } from "../navigationConfigs";
import { createStackNavigator } from "react-navigation";
import Schedule from "../../drawer/schedule/Schedule";
import ScheduleDetail from '../../drawer/schedule/ScheduleDetail';


const ScheduleStackNavigator = createStackNavigator({
    Schedule: {
        screen: Schedule,
    },
    ScheduleDetail: {
        screen: ScheduleDetail,
    }
}, stackNavigationOptions);

export default ScheduleStackNavigator
