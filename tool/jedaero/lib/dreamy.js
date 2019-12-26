import { Platform } from 'react-native';
import RNFetchBlob from "rn-fetch-blob";
import { Buffer } from 'buffer';

const fetchData = (uri, body) => RNFetchBlob.config({trusty: true}).fetch('POST', uri, {"Content-Type": "application/x-www-form-urlencoded"}, body)

const encode64 = (string) => Buffer.from(string).toString('base64')

/**
 * Dreamy Connection with fetch API.
 */
const Dreamy = {
    _openSession: function (account, password) {
        const uri = 'https://dreamy.jejunu.ac.kr/frame/sysUser.do?next=';
        const body = `tmpu=${encode64(account)}&tmpw=${encode64(password)}&mobile=y&app=null&z=Y&userid=&password=`
        // 세션 확보
        return fetchData(uri, body);
    },

    _getBaseInfo: async function (account) {
        const uri = 'https://dreamy.jejunu.ac.kr/hjju/hj/sta_hj_1010q.jejunu';
        const body = `mode=doValue&student_no=${account}&_=`
        return (await fetchData(uri, body)).json();
    },

    _logout: async function() {
        const uri = 'https://dreamy.jejunu.ac.kr/frame/sysUser.do?mode=logout';
        return RNFetchBlob.config({trusty: true}).fetch('GET', uri);
    },

    getSemester: function(month) {
        let semester;

        if(month >= 2 && month <= 6) semester = 10; // 1학기
        else if(month === 7) semester = 11; // 하기계절
        else if(month >= 8 && month <= 12) semester = 20; // 2학기
        else if(month === 1) semester = 21; // 동기계절
        else semester = 0; // 아무것도 아님.

        return semester; 
        /**
         * term_gb: 학기를 의미함.
         * 10 : 1학기
         * 11 : 하기계절
         * 20 : 2학기
         * 21 : 동기계절
         * 0 : 구분없음.
         */
    },
      
    getTimeTable: async function (account, year, month, day) {
        let semester = this.getSemester(month);
    
        const uri = 'https://dreamy.jejunu.ac.kr/susj/su/sta_su_6170q.jejunu';
        const body = `mode=doListTimetable&curri_year=${year}&term_gb=${semester}&su_dt=${year}${month <= 9 ? `0${month}` : month}${day <= 9 ? `0${day}` : day}&student_no=${account}&_=`;
        return (await fetchData(uri, body)).json()
    },

    isValidAccount: async function(account = '', password = '') {
        let res;
        try {
            res = await this._openSession(account, password);
        } catch (err) {
            console.error(err);
            return false;
        }
        const url = res.respInfo.redirects.pop();
        const match = /loginerror=([0-9])*/g.exec(url);
        return !match;
    },
    getMoment: async function(account) {
        const uri = 'https://dreamy.jejunu.ac.kr/susj/com/com_su.jejunu'
        const body = ``
    },

    getEvlState: async function(account) {
        let semester = this.getSemester();

        const uri = 'https://dreamy.jejunu.ac.kr/susj/com/com_su.jejunu'
        const body = `mode=doCheckEvllec&year=${year}&term_gb=${semester}&student_no=${account}&_=`
        return (await fetchData(uri , body)).json();
    },

    getCredit: async function (account) {
        const uri = 'https://dreamy.jejunu.ac.kr/susj/sj/sta_sj_3230q.jejunu';
        const body = `mode=doSearch&student_no=${account}&del_gb=&_=`;
        return (await fetchData(uri, body)).json();
    }, 
    getCreditDetail: async function (account, year, semester, outsideSeq, groupGb) {
        const uri = 'https://dreamy.jejunu.ac.kr/susj/sj/sta_sj_3220q.jejunu';
        const body = `mode=doList&year=${year}&term_gb=${semester}&group_gb=${groupGb}&student_no=${account}&outside_seq=${outsideSeq}&del_gb=AND%20SJ_DEL_GB%20IS%20NULL&_=`;
        return (await fetchData(uri, body)).json();
    }, 
    getCreditCurrent: async function (account, year, semester ) {    
        const uri = 'https://dreamy.jejunu.ac.kr/susj/sj/sta_sj_3225q.jejunu';
        const body = `mode=doListMst&curri_year=${year}&term_gb=${semester}&student_no=${account}&_=`;
        return (await fetchData(uri, body)).json();  
    },
    getLectureBoard: async function(account, name, userGb, year, semester) {
        const uri = 'https://dreamy.jejunu.ac.kr/frame/doumi_1020e.jejunu';
        const body = `mode=doListSugangBanNo&common_curri_year=${year}&common_term_gb=${semester}&common_student_no=${account}&common_subject_nm=${name}&common_prof_no=${account}&common_prof_nm=${name}&common_user_gb=${userGb}&mng_dept_cd=&_=`;
        return (await fetchData(uri, body)).json();
    },
    getLectureItemBoard: async function(year, semester, classCode) {
        const uri = 'https://dreamy.jejunu.ac.kr/frame/doumi_1020e.jejunu';
        const body = `mode=doList&curri_year=${year}&term_gb=${semester}&ban_no=${classCode}&title&content&name&_=`;
        return (await fetchData(uri, body)).json();
    },
    getLecturePost: async function(year, semester, classCode, num, root) {
        const uri = 'https://dreamy.jejunu.ac.kr/frame/doumi_1020e.jejunu';
        const body = `mode=doGetBoardDetail&curri_year=${year}&term_gb=${semester}&ban_no=${classCode}&num=${num}&root=${root}&prevnextyn=0&_=`
        return (await fetchData(uri, body)).json();
    },
    downloadLecurePostFile: async function (
        account = '', 
        userGb = '', 
        departCode = '', 
        classCode = '', 
        professorCode = '', 
        year = 0, 
        semester = 0, 
        lectureCode = '', 
        lectureName = '', 
        professorName = '', 
        encoded = '', 
        fileName = '', 
        num = 0,
        root = 0,
        reply = 0,
        email = '',
        title = '',
        author = '',
        date = '',
        count = 0
    ) {
        const uri = 'https://dreamy.jejunu.ac.kr/frame/doumi_1020e.jejunu';
        const realPath = `/jnujeus/was/source/doumi/board/`;
        const body = `member_no=${account}&user_gb=${userGb}&init_dept_cd=${departCode}&mode=doDownLoadFile&common_ban_no=${classCode}&habgang_yn=&common_prof_no=${professorCode}&std_info=&search_student_no=&search_nm=&search_student_popup=&common_curri_year=${year}&common_term_gb=${semester}&cb_pagingMst=1&common_subject_cd=${lectureCode}&common_subject_nm=${encodeURIComponent(lectureName)}&common_prof_nm=${encodeURIComponent(professorName)}&smethod=1&sstring=&cb_pagingDtl=1&tempfilename=${encoded}&filename=${encodeURIComponent(fileName)}&file_path=${encodeURIComponent(realPath)}&curri_year=${year}&term_gb=${semester}&ban_no=${classCode}&num=${num}&root=${root}&reply=${reply}&email=${encodeURIComponent(email)}&file_root=${encodeURIComponent(`${realPath}${year}`)}&v_title=${encodeURIComponent(title)}&v_name=${encodeURIComponent(author)}&v_create_dt=${date}&v_count=${count}`;
        return RNFetchBlob.config({
            path: `${Platform.select({ios: RNFetchBlob.fs.dirs.DocumentDir, android: RNFetchBlob.fs.dirs.DownloadDir})}/${fileName}`,
            trusty: true, 
            fileCache: true,
        }).fetch('POST', uri, {
            "Content-Type": "application/x-www-form-urlencoded"
        }, body);
    },
    isPassDormitory: async function (account) {
        const uri = 'https://dreamy.jejunu.ac.kr/stsv/ht/sts_ht_0509e.jejunu';
        const body = `mode=doValue&campus_gb=A&student_no=${account}&_=`;
        return (await fetchData(uri, body)).json();
    },
    getLecturePlanList: async function ({year, semester, search: {classCode = '', professorName = '', lectureName = ''}}) {
        const uri = 'https://dreamy.jejunu.ac.kr/susj/su/sta_su_7020q.jejunu';
        const body = `mode=doList&curri_year=${year}&term_gb=${semester}&ban_no=${classCode}&emp_nm=${professorName}&emp_no=&subject_nm=${lectureName}&_=`;
        return (await fetchData(uri, body)).json();
    },
    getLecturePlanSummary: async function ({year, semester, lecture: {classCode, lectureCode}}) {
        const uri = 'https://dreamy.jejunu.ac.kr/susj/su/sta_su_7020q.jejunu';
        const body = `mode=doGetListDetail&curri_year=${year}&term_gb=${semester}&ban_no=${classCode}&subject_cd=${lectureCode}&_=`
        return (await fetchData(uri, body)).json();
    },
    getLecturePlanDetail: async function({year, semester, classCode}) {
        const uri = 'https://dreamy.jejunu.ac.kr/susj/su/sta_su_7012e.jejunu';
        const body = `mode=doSearch&curri_year=${year}&term_gb=${semester}&ban_no=${classCode}&_=`
        return (await fetchData(uri, body)).json();
    },
    getLecturePlanDetailWeekList: async function ({year, semester, classCode}) {
        const uri = 'https://dreamy.jejunu.ac.kr/susj/su/sta_su_7012e.jejunu';
        const body = `mode=doListMst&curri_year=${year}&term_gb=${semester}&ban_no=${classCode}&_=`
        return (await fetchData(uri, body)).json();
    },
    downloadLecturePlan: async function ({account, name, encoded, fileName, classCode, year, semester, lectureName}) {
        const uri = 'https://dreamy.jejunu.ac.kr/susj/su/sta_su_7020q.jejunu';
        const body = `mode=doDownLoadFile&init_user_id=${account}&init_user_nm=${encodeURIComponent(name)}&tempfilename=${encoded}_down&filename=${encodeURIComponent(fileName)}&seq=&select_ban_no=${classCode}&find_curri_year=${year}&find_term_gb=${semester}&find_ban_no=&find_emp_nm=&find_subject_nm=${lectureName}&cb_pagingMst=1`
        return RNFetchBlob.config({
            path: `${Platform.select({ios: RNFetchBlob.fs.dirs.DocumentDir, android: RNFetchBlob.fs.dirs.DownloadDir})}/${fileName}`,
            trusty: true, 
            fileCache: true,
        }).fetch('POST', uri, {
            "Content-Type": "application/x-www-form-urlencoded"
        }, body);
    }
};

export default Dreamy;
