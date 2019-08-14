import encode64 from "./encode64";
/**
 * Dreamy Connection with fetch API.
 */
const Dreamy = {
    _openSession: (account, password) => {
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

    _isValidate: () => {

    },

    getTimeTable: async (account = null, password = null, month = null, date = null) => {
        if(!account || !password) throw "학번이나 비밀번호를 올바르게 입력해주세요.";

        // TODO 세션인증 부분 최적화 필요.
        try {
            await this._openSession(account, password);
        } catch(err) {
            throw err;
        }
        
        
        const uri = 'https://dreamy.jejunu.ac.kr/susj/su/sta_su_6170q.jejunu';
        const body = `mode=doListTimetable&curri_year=2018&term_gb=20&su_dt=20180901&student_no=2014108205&_=`;

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
}

export default Dreamy;