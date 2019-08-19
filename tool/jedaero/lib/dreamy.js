import encode64 from "./encode64";
/**
 * Dreamy Connection with fetch API.
 */
const Dreamy = {
    _openSession: function (account, password) {
        const uri = 'https://dreamy.jejunu.ac.kr/frame/sysUser.do?next=';
        const body = `tmpu=${encode64(account)}&tmpw=${encode64(password)}&mobile=&app=&z=N&userid=&password=`
        // 세션 확보
        return fetch(uri, {
            method: 'POST',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            keepalive: true,
            body,
            credentials: 'include',
        });
    },

    getTimeTable: async function (account, year, month, day) {
        let semester;

        if(month >= 2 && month <= 6) semester = 10;
        else if(month === 7) semester = 11;
        else if(month >= 8 && month <= 12) semester = 20;
        else if(month === 1) semester = 21;
        else semester = 0;

        /**
         * term_gb: 학기를 의미함.
         * 10 : 1학기
         * 11 : 하기계절
         * 20 : 2학기
         * 21 : 동기계절
         * 0 : 구분없음.
         */
        const uri = 'https://dreamy.jejunu.ac.kr/susj/su/sta_su_6170q.jejunu';
        const body = `mode=doListTimetable&curri_year=${year}&term_gb=${semester}&su_dt=${year}${month}${day}&student_no=${account}&_=`;
        
        return await (await fetch(uri, {
            method: 'POST',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            keepalive: true,
            body,
            credentials: 'include',
        })).json();
    },

    isValidAccount: async function(account = '', password = '') {
        const res = await this._openSession(account, password);
        const match = /loginerror=([0-9])*/g.exec(res.url);
        return !match;
    }
}

export default Dreamy;