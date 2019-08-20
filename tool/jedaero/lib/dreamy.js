import encode64 from "./encode64";
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
    getCreditDetail: async function (account, year, semester, outsideSeq) {
        const uri = 'https://dreamy.jejunu.ac.kr/susj/sj/sta_sj_3230q.jejunu';
        const body = `mode=doList&year=${year}&term_gb=${semester}&group_gb=20&student_no=${account}&outside_seq=${outsideSeq}&del_gb=AND%20SJ_DEL_GB%20IS%20NULL&_=`
        return (await RNFetchBlob.config({
            trusty: true
        }).fetch('POST', uri, {
            "Content-Type": "application/x-www-form-urlencoded"
        }, body)).json();
    }
}

export default Dreamy;