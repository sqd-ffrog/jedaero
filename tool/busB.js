import moment from 'moment';
import { AsyncStorage } from 'react-native';

/* 버스 도착시간 계산 알고리즘  */

export default function daycheck(timeTable, route) {
    const day = new Date().getDay();
    // 0:일요일 ~ 6:토요일 즉,주말일때 운행없음
    return day === 0 || day === 6 ? '운행없어요..' : bus(timeTable, route);
}

function bus(timeTable, route) {
    const now = new Date();
    for (const time of timeTable) {
		// time is colum or row?
        const slice = time.split(':');
        const timetb_set_sec =
            Number(slice[0] * 60 * 60) + Number(slice[1] * 60) + Number(slice[2]);
        const this_time_sec = now.getHours() * 60 * 60 + now.getMinutes() * 60 + now.getSeconds();
        let hours = parseInt((timetb_set_sec - this_time_sec) / 3600);

        if (route < 3) minutes = parseInt(((timetb_set_sec - this_time_sec) % 3600) / 60) + route;

        if (route === 3) minutes = parseInt(((timetb_set_sec - this_time_sec) % 3600) / 60) + 11;

        if (route === 4)
            minutes = parseInt(((timetb_set_sec - this_time_sec) % 3600) / 60) + 11 - 1;

        if (route > 4)
            minutes = parseInt(((timetb_set_sec - this_time_sec) % 3600) / 60) + 15 - route;

        if (minutes >= 60) {
            hours += parseInt(minutes / 60);
            minutes = parseInt(minutes % 60);
        }
        if (timetb_set_sec > this_time_sec) {
            return `${hours}시간 ${minutes}분 전`;
        }
    }
    return '운행 종료';
}
