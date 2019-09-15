function* busIter(timeTable) {
    const now = new Date();
    for (const time of timeTable) {
        const slice = time.split(':');
        const timetb_set_sec =
            Number(slice[0] * 60 * 60) + Number(slice[1] * 60) + Number(slice[2]);
        const this_time_sec = now.getHours() * 60 * 60 + now.getMinutes() * 60 + now.getSeconds();
        const _hours = parseInt((timetb_set_sec - this_time_sec) / 3600);

        yield { timetb_set_sec, this_time_sec, _hours };
    }
}

function dayCheck(bus) {
    return function(timeTable, route, Bus_holy) {
        const month = new Date().getMonth();
        const date = new Date().getDate();
        if ( Bus_holy[(month+1).toString()].indexOf(date) != -1 ) {
            return '휴일입니당'
        }
        const day = new Date().getDay();
        
        // 0:일요일 ~ 6:토요일 즉,주말일때 운행없음
        return day === 0 || day === 6 ? '운행없어요..' : bus(timeTable, route);
    };
}

export { busIter, dayCheck };
