import { busIter, dayCheck } from './bus';

// import moment from 'moment'
// import {AsyncStorage} from 'react-native';

/* 버스 도착시간 계산 알고리즘  */

function bus(timeTable, route) {
    for (const { timetb_set_sec, this_time_sec, _hours } of busIter(timeTable)) {
        let hours = _hours,
            minutes;

        if (route < 3) minutes = parseInt(((timetb_set_sec - this_time_sec) % 3600) / 60) + route;

        if (route === 3) minutes = parseInt(((timetb_set_sec - this_time_sec) % 3600) / 60) + 11;

        if (route === 4)
            minutes = parseInt(((timetb_set_sec - this_time_sec) % 3600) / 60) + 11 - 1;

        if (route > 4)
            minutes = parseInt(((timetb_set_sec - this_time_sec) % 3600) / 60) + 15 - route;

        if (minutes >= 60) {
            hour += parseInt(minutes / 60);
            minutes = parseInt(minutes % 60);
        }
        if (timetb_set_sec > this_time_sec) {
            return `${hours}시간 ${minutes}분 전`;
        }
    }
    return '운행 종료';
}

export default dayCheck(bus);
