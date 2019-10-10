import { busIter, dayCheck } from './bus';

// import moment from 'moment'
// import {AsyncStorage} from 'react-native';

/* 버스 도착시간 계산 알고리즘  */

// _storeData = async (i) => {
//     try {
//       await AsyncStorage.setItem(i);
//     } catch (error) {
//       // Error saving data
//     }
//   };

//   _retrieveData = async (i) => {
//     try {
//       const value = await AsyncStorage.getItem(i);
//       if (value !== null) {
//         // We have data!!
//         console.log(value);
//       }
//     } catch (error) {
//       // Error retrieving data
//     }
//   };

function bus(timeTable, route, BusHoly) {
    for (const { timetbSetSec, thisTimeSec, _hours } of busIter(timeTable)) {
        let hours = _hours,
            minutes = parseInt(((timetbSetSec - thisTimeSec) % 3600) / 60) + route;
        if (minutes >= 60) {
            hours += parseInt(minutes / 60);
            minutes = parseInt(minutes % 60);
        }
        if (timetbSetSec > thisTimeSec) {
            return `${hours}시간 ${minutes}분 전`;
        }
    }
    return '운행 종료';

    //     var thistime = moment().format('kk:mm:ss');

    //     for(i=0; i<timeTable.length; i++){
    //         var a = moment(timeTable[i],'kk:mm:ss').format('kk:mm:ss');
    //         var result = moment(thistime,'kk:mm:ss').diff(moment(a,'kk:mm:ss'));
    //         var b = moment.duration(result);
    //         var s =  Math.floor(b.asHours()) + moment.utc(result).format(":mm:ss");
    //         if(s > 0 )
    //         {
    //             //TODO Logic (Asyncstorage)
    //             // return "ㅂ2";

    //         }
    //         else {
    //             return  s;
    //         }
    //     }
    //     return "운행종료";
    // }
}
// function bus2(timetable) {

//     var thistime = new Date();
//     for(i=0; i<timeTable.length; i++){
//         var a = timeTable[i];
//         slice = a.split(':');
//         if(Number(slice[0]) > thistime.getHours()){
//             // if(Number(slice[1]) >= thistime.getMinutes()){
//                 return result_time(timeTable[i]);
//             // }

//         }else if(slice[0]=== thistime.getHours()){
//             if(Number(slice[1])>thistime.getHours()){
//                 return result_time(timeTable[i],1);
//             }
//         }
//     }
//     return "운행 종료"
// }

function resultTime(params, im) {
    const slicetime = params.split(':');
    const now = new Date(); //현재시간
    let hour = Number(slicetime[0]) - now.getHours();
    let minutes = Number(slicetime[1]) - now.getMinutes();

    if (hour < 0) hour = 24 + hour;

    if (minutes < 0) {
        hour -= 1;
        minutes = 60 + minutes;
    }

    if (im == 1) hour -= 1;

    return `${hour}시간 ${minutes}분 전`;
}

export default dayCheck(bus);
