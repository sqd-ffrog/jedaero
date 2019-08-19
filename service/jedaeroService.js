import AsyncStorage from '@react-native-community/async-storage';
import { Dreamy } from '../tool/jedaero';

const getTimeTable = async (year,month,day) => {
    const account = await AsyncStorage.getItem("account");
    let res;
    try {
        res = await Dreamy.getTimeTable(account, year, month, day);
    } catch(err) {
        // json형태에서 오류가 발생했으면 undefined이거나 <script> alert("세션이 종료되었습니다.") </script>. 그러므로 재 로그인 시도.
        const account = await AsyncStorage.getItem("account");
        const password = await AsyncStorage.getItem("password");
        await Dreamy._openSession(account, password);

        res = await Dreamy.getTimeTable(account, year, month, day);
    } finally {
        // undefined라면? 해당 날짜에 시간표가 없다는거.
        if(!res) return {};

        const week = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
        const data = {
            day: {
                mon: res['MST_DATE'].mon,
                tue: res['MST_DATE'].tue,
                wed: res['MST_DATE'].wed,
                thu: res['MST_DATE'].thu,
                fri: res['MST_DATE'].fri,
                sat: res['MST_DATE'].sat,
            }
        };
        data.schedule = res['MST_LIST'].filter((item, index) => index % 6 === 1).map(rawRow => {
            const row = { period: rawRow['gyosi'] === "0" ? "저녁 식사" : rawRow['gyosi'], time: rawRow['si'] };
            week.map(item => {
                const time = rawRow[item].split("<br>");
                row[item] = { name: time[0], room: time[1] || " "}
            });
            return row;
        });
        return data;
    }
}

export { getTimeTable }