import encode64 from "./encode64";
import { Platform } from 'react-native';
import RNFetchBlob from "rn-fetch-blob";
/**
 * Dreamy Connection with fetch API.
 */
const Dreamy = {
    _openSession: async function (account, password) {
        const uri = 'https://dreamy.jejunu.ac.kr/frame/sysUser.do?next=';
        const body = `tmpu=${encode64(account)}&tmpw=${encode64(password)}&mobile=&app=&z=N&userid=&password=`
        // 세션 확보
        return await RNFetchBlob.config({
            trusty: true
        }).fetch('POST', uri, {
            "Content-Type": "application/x-www-form-urlencoded"
        }, body);

    },

    _getBaseInfo: async function (account) {
        const uri = 'https://dreamy.jejunu.ac.kr/hjju/hj/sta_hj_1010q.jejunu';
        const body = `mode=doValue&student_no=${account}&_=`

        return (await RNFetchBlob.config({
            trusty: true
        }).fetch('POST', uri, {
            "Content-Type": "application/x-www-form-urlencoded"
        }, body)).json();
    },

    getTimeTable: async function (account, year, month, day) {
        let semester;

        if(month >= 2 && month <= 6) semester = 10; // 1학기
        else if(month === 7) semester = 11; // 하기계절
        else if(month >= 8 && month <= 12) semester = 20; // 2학기
        else if(month === 1) semester = 21; // 동기계절
        else semester = 0; // 아무것도 아님.
        /**
         * term_gb: 학기를 의미함.
         * 10 : 1학기
         * 11 : 하기계절
         * 20 : 2학기
         * 21 : 동기계절
         * 0 : 구분없음.
         */
        const uri = 'https://dreamy.jejunu.ac.kr/susj/su/sta_su_6170q.jejunu';
        const body = `mode=doListTimetable&curri_year=${year}&term_gb=${semester}&su_dt=${year}${month <= 9 ? `0${month}` : month}${day <= 9 ? `0${day}` : day}&student_no=${account}&_=`;
        return (await RNFetchBlob.config({
            trusty: true
        }).fetch('POST', uri, {
            "Content-Type": "application/x-www-form-urlencoded"
        }, body)).json()
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

    getCredit: async function (account) {
        const uri = 'https://dreamy.jejunu.ac.kr/susj/sj/sta_sj_3230q.jejunu';
        const body = `mode=doSearch&student_no=${account}&del_gb=&_=`;
        return (await RNFetchBlob.config({
            trusty: true
        }).fetch('POST', uri, {
            "Content-Type": "application/x-www-form-urlencoded"
        }, body)).json();
    },
    getCreditDetail: async function (account, year, semester, outsideSeq, groupGb) {
        const uri = 'https://dreamy.jejunu.ac.kr/susj/sj/sta_sj_3220q.jejunu';
        const body = `mode=doList&year=${year}&term_gb=${semester}&group_gb=${groupGb}&student_no=${account}&outside_seq=${outsideSeq}&del_gb=AND%20SJ_DEL_GB%20IS%20NULL&_=`;
        return (await RNFetchBlob.config({
            trusty: true
        }).fetch('POST', uri, {
            "Content-Type": "application/x-www-form-urlencoded"
        }, body)).json();
    },
    getLectureBoard: async function(account, name, userGb, year, semester) {
        const uri = 'https://dreamy.jejunu.ac.kr/frame/doumi_1020e.jejunu';
        const body = `mode=doListSugangBanNo&common_curri_year=${year}&common_term_gb=${semester}&common_student_no=${account}&common_subject_nm=${name}&common_prof_no=${account}&common_prof_nm=${name}&common_user_gb=${userGb}&mng_dept_cd=&_=`;
        return (await RNFetchBlob.config({
            trusty: true
        }).fetch('POST', uri, {
            "Content-Type": "application/x-www-form-urlencoded"
        }, body)).json();
    },
    getLectureItemBoard: async function(year, semester, classCode) {
        const uri = 'https://dreamy.jejunu.ac.kr/frame/doumi_1020e.jejunu';
        const body = `mode=doList&curri_year=${year}&term_gb=${semester}&ban_no=${classCode}&title&content&name&_=`;
        return (await RNFetchBlob.config({
            trusty: true
        }).fetch('POST', uri, {
            "Content-Type": "application/x-www-form-urlencoded"
        }, body)).json();
    },
    getLecturePost: async function(year, semester, classCode, num, root) {
        const uri = 'https://dreamy.jejunu.ac.kr/frame/doumi_1020e.jejunu';
        const body = `mode=doGetBoardDetail&curri_year=${year}&term_gb=${semester}&ban_no=${classCode}&num=${num}&root=${root}&prevnextyn=0&_=`
        return (await RNFetchBlob.config({
            trusty: true
        }).fetch('POST', uri, {
            "Content-Type": "application/x-www-form-urlencoded"
        }, body)).json();
    },
    downloadLecurePostFile: async function (
        account, 
        userGb, 
        departCode, 
        classCode, 
        professorCode, 
        year, 
        semester, 
        lectureCode, 
        lectureName, 
        professorName, 
        encoded, 
        fileName, 
        num,
        root,
        reply,
        email,
        title,
        author,
        date,
        count
    ) {
        const uri = 'https://dreamy.jejunu.ac.kr/frame/doumi_1020e.jejunu';
        const realPath = `/jnujeus/was/source/doumi/board/`;
        const body = `member_no=${account}&user_gb=${userGb}&init_dept_cd=${departCode}&mode=doDownLoadFile&common_ban_no=${classCode}&habgang_yn=&common_prof_no=${professorCode}&std_info=&search_student_no=&search_nm=&search_student_popup=&common_curri_year=${year}&common_term_gb=${semester}&cb_pagingMst=1&common_subject_cd=${lectureCode}&common_subject_nm=${encodeURIComponent(lectureName)}&common_prof_nm=${encodeURIComponent(professorName)}&smethod=1&sstring=&cb_pagingDtl=1&tempfilename=${encoded}&filename=${encodeURIComponent(fileName)}&file_path=${encodeURIComponent(realPath)}&curri_year=${year}&term_gb=${semester}&ban_no=${classCode}&num=${num}&root=${root}&reply=${reply}&email=${encodeURIComponent(email)}&file_root=${encodeURIComponent(`${realPath}${year}`)}&v_title=${encodeURIComponent(title)}&v_name=${encodeURIComponent(author)}&v_create_dt=${date}&v_count=${count}`;
        return RNFetchBlob.config({
            path: `${Platform.OS === 'ios' ? RNFetchBlob.fs.dirs.DocumentDir : RNFetchBlob.fs.dirs.DownloadDir}/${fileName}`,
            trusty: true, 
            fileCache: true,
        }).fetch('POST', uri, {
            "Content-Type": "application/x-www-form-urlencoded"
        }, body);
    },
    isPassDormitory: async function (account) {
        const uri = 'https://dreamy.jejunu.ac.kr/stsv/ht/sts_ht_0509e.jejunu';
        const body = `mode=doValue&campus_gb=A&student_no=${account}&_=`;
        return (await RNFetchBlob.config({
            trusty: true
        }).fetch('POST', uri, {
            "Content-Type": "application/x-www-form-urlencoded"
        }, body)).json();
    }
};

export default Dreamy;