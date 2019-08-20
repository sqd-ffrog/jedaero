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
        // undefined라면? 그 밖의 문제를 의미하므로 빈 오브젝트 반환.
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
            },
            schedule: res['MST_LIST'].filter((item, index) => index % 6 === 1).map(rawRow => {
                const row = { period: rawRow['gyosi'] === "0" ? "저녁 식사" : rawRow['gyosi'], time: rawRow['si'] };
                week.map(item => {
                    const time = rawRow[item].split("<br>");
                    row[item] = { name: time[0], room: time[1] || " "}
                });
                return row;
            }),
        };
        return data;
    }
}

const getCreditData = async () => {
    const account = await AsyncStorage.getItem('account');
    let res;
    try {
        res = await Dreamy.getCredit(account);
    } catch(err) {
        const password = await AsyncStorage.getItem("password");
        await Dreamy._openSession(account, password);
        res = await Dreamy.getCredit(account);
    } finally {
        if(!res) return {};
        return {
            personalData: {
                classId: res['PERSON_DATA']['cls_cd'],
                className: res['PERSON_DATA']['cls_nm'],
                groupGb: res['PERSON_DATA']['group_gb'],
                majorId: res['PERSON_DATA']['maj_cd'],
                majorName: res['PERSON_DATA']['maj_nm'],
                name: res['PERSON_DATA']['nm'],
                universityId: res['PERSON_DATA']['univ_cd'],
                universityName: res['PERSON_DATA']['univ_nm'],
            },
            credits: res['TERMNOW_DATA'].map(row => ({
                average: row["avg_mark"],
                totalCredit: row["get_credit"],
                outsideSeq: row["outside_seq"],
                semester: row['term_gb'],
                semesterName: row['term_nm'],
                total: row["tot_mark"],
                year: row['year']
            })),
            summary: {
                applyCredit: res['TOP_DATA']['apply_credit'],
                average: res['TOP_DATA']['avg_mark'],
                convertedAverage: res['TOP_DATA']['avg_mark45'],
                getCredit: res['TOP_DATA']['get_credit'],
                markCredit: res['TOP_DATA']['mark_credit'],
                totalMark: res['TOP_DATA']['tot_mark'],
            }
        };
    }
}

const getCreditDetailData = async (year, semester, outsideSeq, groupGb) => {
    const account = await AsyncStorage.getItem('account');
    let res;
    try {
        res = await Dreamy.getCreditDetail(account, year, semester, outsideSeq, groupGb);
    } catch(err) {
        const password = await AsyncStorage.getItem("password");
        await Dreamy._openSession(account, password);
        res = await Dreamy.getCreditDetail(account, year, semester, outsideSeq, groupGb)
    } finally {
        if(!res) return {};
        return {
            creditDetail: {
                applyCredit: res['BOTTOM_DATA']['apply_credit'],
                average: res['BOTTOM_DATA']['avg_mark'],
                convertedAverage: res['BOTTOM_DATA']['avg_mark45'],
                getCredit: res['BOTTOM_DATA']['get_credit'],
                markCredit: res['BOTTOM_DATA']['mark_credit'],
                totalMark: res['BOTTOM_DATA']['tot_mark'],
                semester: res['BOTTOM_DATA']['term_gb'],
                year: res['BOTTOM_DATA']['year']
            },
            lectures: res['GRID_DATA'].map(row => ({
                takeName: row['isu_nm'],
                grade: row['dg_gb'],
                credit: row['credit'],
                mark: row['mark'],
                subjectId: row['subject_cd'],
                subjectName: row['subject_nm'],
                semester: row['term_gb'],
                year: row['year']
            }))
        };
    }
}
export { getTimeTable, getCreditData, getCreditDetailData }