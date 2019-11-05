import { createStackNavigator } from 'react-navigation-stack';
import TimeTable from '../../drawer/jnuservice/dreamy/TimeTable'
import DreamyHome from '../../drawer/jnuservice/dreamy/DreamyHome';
import Login from '../../info/Login';
import { stackNavigationConfig } from '../navigationConfigs';
import Credit from '../../drawer/jnuservice/dreamy/Credit';
import CreditDetail from '../../drawer/jnuservice/dreamy/CreditDetail';
import LectureBoard from '../../drawer/jnuservice/dreamy/LectureBoard';
import LectureItemBoard from '../../drawer/jnuservice/dreamy/LectureItemBoard';
import LecturePost from '../../drawer/jnuservice/dreamy/LecturePost';
import PassDormitory from '../../drawer/jnuservice/dreamy/PassDormitory';
import LecturePlan from '../../drawer/jnuservice/dreamy/LecturePlan';
import LecturePlanDetail from '../../drawer/jnuservice/dreamy/LecturePlanDetail';

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
    LectureBoard: {
        screen: LectureBoard,
    },
    LectureItemBoard: {
        screen: LectureItemBoard,
    },
    LecturePost: {
        screen: LecturePost,
    },
    PassDormitory: {
        screen: PassDormitory,
    },
    NestedLogin: {
        screen: Login,
    },
    LecturePlan: {
        screen: LecturePlan,
    },
    LecturePlanDetail: {
        screen: LecturePlanDetail
    }
}, {...stackNavigationConfig, initialRouteName: "DreamyHome"})

export default DreamyStackNavigation