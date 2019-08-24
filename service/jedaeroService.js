import * as Keychain from 'react-native-keychain';
import { Dreamy } from '../tool/jedaero';

const getTimeTable = async (year,month,day) => {
    const {username: account, password: baseInfo} = await Keychain.getGenericPassword();
    const { password } = JSON.parse(baseInfo);
    let res;
    try {
        res = await Dreamy.getTimeTable(account, year, month, day);
        console.log(res);
    } catch(err) {
        console.log(err);
        // json형태에서 오류가 발생했으면 undefined이거나 <script> alert("세션이 종료되었습니다.") </script>. 그러므로 재 로그인 시도.
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

const getBaseInfo = async (account, password) => {
    // 학적 조회. 여기서부터 단과대학코드, 제적코드 등만 파싱해서 저장. 기타 개인정보는 전부 배제.
    let res;
    try {
        res = await Dreamy._getBaseInfo(account);
    } catch(err) {
        await Dreamy._openSession(account, password);
        res = await Dreamy._getBaseInfo(account);
    } finally {
        if(!res) throw new Error("error on get BaseInfo");
        return {
            name: res["HJ_MST"]["nm"],
            departCode: res["HJ_MST"]["dept_cd"],
            userGb: res["HJ_MST"]["chkUserGb"],
        }
    }
}

const getCreditData = async () => {
    const {username: account, password: baseInfo} = await Keychain.getGenericPassword();
    const { password } = JSON.parse(baseInfo);
    let res;
    try {
        res = await Dreamy.getCredit(account);
    } catch(err) {
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
    const {username: account, password: baseInfo} = await Keychain.getGenericPassword();
    const { password } = JSON.parse(baseInfo);
    let res;
    try {
        res = await Dreamy.getCreditDetail(account, year, semester, outsideSeq, groupGb);
    } catch(err) {
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

const getLectureBoardData = async (year, semester) => {
    const {username: account, password: baseInfo} = await Keychain.getGenericPassword();
    const { password, name, userGb } = JSON.parse(baseInfo);
    let res;
    try {
        res = await Dreamy.getLectureBoard(account, name, userGb, year, semester);
    } catch (err) {
        await Dreamy._openSession(account, password);
        res = await Dreamy.getLectureBoard(account, encodeURIComponent(name), userGb, year, semester);
    } finally {
        if(!res) return {};
        return {
            lectureBoardInfo: {
                year: res["MST_ROW"]['common_curri_year'],
                semester: res["MST_ROW"]['common_term_gb'],
            },
            lectures: res["MST_LIST"].map(row => ({
                classCode: row['common_ban_no'],
                professorName: row['common_prof_nm'],
                professorCode: row['common_prof_no'],
                lectureCode: row['common_subject_cd'],
                lectureName: row['common_subject_nm'],
            }))
        };
    }
}

const getLectureItemBoardData = async (year, semester, classCode) => {
    let res;
    try {
        res = await Dreamy.getLectureItemBoard(year, semester, classCode);
    } catch(err) {
        const {username: account, password: baseInfo} = await Keychain.getGenericPassword();
        const { password } = JSON.parse(baseInfo);
        await Dreamy._openSession(account, password);
        res = await Dreamy.getLectureItemBoard(year, semester, classCode);
    } finally {
        if(!res) return {};
        return res['BORAD_LIST'].map(row => ({
            root: row['root'],
            num: row['num'],
            uploadDate: row['create_dt'],
            count: row['count'],
            title: row['title'],
            author: row['name'],
            reply: row['reply'],
        }));
    }
}

const getLecturePostData = async (year, semester, classCode, num, root) => {
    let res;
    try {
        res = await Dreamy.getLecturePost(year, semester, classCode, num, root);
    } catch (err) {
        const {username: account, password: baseInfo} = await Keychain.getGenericPassword();
        const { password } = JSON.parse(baseInfo);
        await Dreamy._openSession(account, password);
        res = await Dreamy.getLecturePost(year, semester, classCode, num, root);
    } finally {
        if(!res) return {};
        return {
            title: res["BORAD_CONTENT"]['title'],
            author: res["BORAD_CONTENT"]['name'],
            count: res["BORAD_CONTENT"]['count'],
            date: res["BORAD_CONTENT"]['create_dt'],
            email: res["BORAD_CONTENT"]['email'],
            content: res["BORAD_CONTENT"]['content'],
            file: [
                {
                    fileName: res["BORAD_CONTENT"]['filename'],
                    path: res["BORAD_CONTENT"]['file_path'],
                    size: res["BORAD_CONTENT"]['file_size'],
                    encoded: res["BORAD_CONTENT"]['temp_file_nm'],
                },
                {
                    fileName: res["BORAD_CONTENT"]['filename1'],
                    path: res["BORAD_CONTENT"]['file_path1'],
                    size: res["BORAD_CONTENT"]['file_size1'],
                    encoded: res["BORAD_CONTENT"]['temp_file_nm1'],
                },
                {
                    fileName: res["BORAD_CONTENT"]['filename2'],
                    path: res["BORAD_CONTENT"]['file_path2'],
                    size: res["BORAD_CONTENT"]['file_size2'],
                    encoded: res["BORAD_CONTENT"]['temp_file_nm2'],
                }
            ].filter(item => item.fileName !== 'N'),

        }
    }
}

const downloadLecturePostFile = async (classCode, professorCode, year, semester, lectureCode, lectureName, professorName, encoded, fileName, num, root, reply, email, title, author, date, count) => {
    const {username: account, password: baseInfo} = await Keychain.getGenericPassword();
    const { password, userGb, departCode } = JSON.parse(baseInfo);
    let res;
    try {
        res = await Dreamy.downloadLecurePostFile(account, userGb, departCode, classCode, professorCode, year, semester, lectureCode, lectureName, professorName, encoded, fileName, num, root, reply, email, title, author, date, count);
    } catch (err) {
        await Dreamy._openSession(account, password);
        res = await Dreamy.downloadLecurePostFile(account, userGb, departCode, classCode, professorCode, year, semester, lectureCode, lectureName, professorName, encoded, fileName, num, root, reply, email, title, author, date, count);
    } finally { 
        return res;
    }
}

const logoutDreamy = async () => {
    try {
        await Dreamy._logout();
        await Keychain.resetGenericPassword();
        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
}

const isPassDormitory = async () => {
    const { username: account, password: baseInfo } = await Keychain.getGenericPassword();
    const { password } = JSON.parse(baseInfo);
    let res;
    try {
        res = await Dreamy.isPassDormitory(account);
    } catch (err) {
        await Dreamy._openSession(account, password);
        res = await Dreamy.isPassDormitory(account);
    } finally {
        if(!res) return {};
        res = res['VALUE'];
        return {
            resultCode: parseInt(res['result_flag']) || 0,
            get description() {
                return [
                    '생활관 대상자가 아니신데요? 🤔',
                    `축하합니다! ${this.appliedPlace}에 합격하셨습니다!🙌🏼${'\n'}${'\n'}생활관비 납부기간 확인하는거 잊지 마세요‼️`,
                    `축하합니다! ${this.appliedPlace}에 합격하셨습니다!🙌🏼${'\n'}${'\n'}${this.allocatedPlace} ${this.allocatedRoomNo}에 배정받으셨습니다👍🏻`,
                    `현재 ${this.appliedPlace} ${this.competitor} 대기 순번 ${this.rank}번입니다!`,
                    `죄송합니다. 서류미제출로 불합격하셨습니다. 😥`,
                    `불합격하셨습니다. 😥`,
                    `현재 합격자 발표 기간이 아닙니다..`,
                    `현재 합격자 발표 기간이 아닙니다..`,
                ][this.resultCode];
            },
            collectTitle: res['collect_title'],
            appliedPlace: res['app_build_cd_nm'],
            allocatedPlace: res['alloc_build'],
            allocatedRoomNo: res['alloc_room_no'],
            name: res['dorm_nm'],
            id: res['dorm_no'],
            rank: res['rank'],
            competitor: res['student_gb_nm']
        }
    }
}

/**
 * 
 * @param {object} data 
 * @return { classCode, credit, professorName, takeName, lectureCode, lectureName, time }
 */
const getLecturePlanList = async data => {
    let res;
    try {
        res = await Dreamy.getLecturePlanList(data);
    } catch (err) {
        const { username: account, password: baseInfo } = await Keychain.getGenericPassword();
        const { password } = JSON.parse(baseInfo);
        await Dreamy._openSession(account, password);
        res = await Dreamy.getLecturePlanList(data);
    } finally {
        if(!res) return [];
        return res["GRID_DATA"].map(row => ({
            classCode: row["ban_no"],
            credit: row["credit"],
            professorName: row['emp_nm'],
            takeName: row["isu_nm"],
            lectureCode: row["subject_cd"],
            lectureName: row["subject_nm"],
            time: row["timeroom"],
        }));
    }
}

const getLecturePlanDetail = async ({year, semester, lecture: {classCode, lectureCode}}) => {
    let res;
    try {
        res = {
            ...await Dreamy.getLecturePlanSummary({year, semester, lecture: {classCode, lectureCode}})['CODE_DETAIL'],
            ...await Dreamy.getLecturePlanList({year, semester, classCode}),
            ...await Dreamy.getLecturePlanDetailWeekList({year, semester, classCode})['MST_LIST']
        }
    } catch(err) {
        const { username: account, password: baseInfo } = await Keychain.getGenericPassword();
        const { password } = JSON.parse(baseInfo);
        await Dreamy._openSession(account, password);
        res = {
            ...await Dreamy.getLecturePlanSummary({year, semester, lecture: {classCode, lectureCode}})['CODE_DETAIL'],
            ...await Dreamy.getLecturePlanDetail({year, semester, classCode}),
            ...await Dreamy.getLecturePlanDetailWeekList({year, semester, classCode})
        }
    } finally {
        if(!res) return {};
        return Array.isArray(res['SINGLE_DATA']) && res['SINGLE_DATA'].length > 0 ? {
            classCode: res['SINGLE_DATA'][0]['ban_no'],
            credit: res['SINGLE_DATA'][0]['credit'],
            year: res['SINGLE_DATA'][0]['curri_year'],
            professorName: res['SINGLE_DATA'][0]['disp_emp_nm'],
            professorCode: res['SINGLE_DATA'][0]['emp_no'],
            lectureName: res['SINGLE_DATA'][0]['subject_nm'],
            lectureCode: res['SINGLE_DATA'][0]['subject_cd'],
            evaluation: res['SINGLE_DATA'][0]['sj_val_gb'],
            attendanceRate: res['SINGLE_DATA'][0]['eval_rate1'],
            middleRate: res['SINGLE_DATA'][0]['eval_rate2'],
            finalRate: res['SINGLE_DATA'][0]['eval_rate3'],
            assignmentRate: res['SINGLE_DATA'][0]['eval_rate4'],
            frequentRate: res['SINGLE_DATA'][0]['eval_rate5'],
            etcetraRate: res['SINGLE_DATA'][0]['eval_rate6'],
            email: res['SINGLE_DATA'][0]['inst_email'],
            tel: res['SINGLE_DATA'][0]['inst_tel'],
            lecturePlan: res['SINGLE_DATA'][0]['learn_mark'],
            note: res['SINGLE_DATA'][0]['note'],
            book: {
                author: res['SINGLE_DATA'][0]['mater_author'],
                publish: res['SINGLE_DATA'][0]['mater_com'],
                name: res['SINGLE_DATA'][0]['mater_nm'],
                year: res['SINGLE_DATA'][0]['mater_year'],
            },
            references: [
                {
                    author: res['SINGLE_DATA'][0]['ref1_author'],
                    publish: res['SINGLE_DATA'][0]['ref1_com'],
                    name: res['SINGLE_DATA'][0]['ref1_nm'],
                    year: res['SINGLE_DATA'][0]['year'],
                },
                {
                    author: res['SINGLE_DATA'][0]['ref1_author'],
                    publish: res['SINGLE_DATA'][0]['ref1_com'],
                    name: res['SINGLE_DATA'][0]['ref1_nm'],
                    year: res['SINGLE_DATA'][0]['year'],
                }
            ].filter(reference => !!reference.name),
            tasks: [
                {
                    name: res['SINGLE_DATA'][0]['task_nm'],
                    description: res['SINGLE_DATA'][0]['task_desc'],
                },
                {
                    name: res['SINGLE_DATA'][0]['task_nm2'],
                    description: res['SINGLE_DATA'][0]['task_desc2'],
                }
            ].filter(task => !!task.name),
            weekList: res['MST_LIST'].map(row => ({
                week: row['week_cnt'],
                title: row['title'],
                book: row['task_exte'],
                plan: row['learn_plan'],
            })),
            fileList: res['FILE_LIST'].map(row => ({
                fileName: row['file_nm'],
                encoded: row['down_file_nm'],
                fileSize: row['file_size']
            }))
        } : {};
    }
}
const checkLogin = async () => {
    const credentials = await Keychain.getGenericPassword();
    return !!credentials;
}
export { getTimeTable, getCreditData, getCreditDetailData, getBaseInfo, getLectureBoardData, getLectureItemBoardData, getLecturePostData, downloadLecturePostFile, logoutDreamy, isPassDormitory, checkLogin, getLecturePlanList, getLecturePlanDetail }