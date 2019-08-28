export default function(currentDate) {
    /*getWeek() was developed by Nick Baicoianu at MeanFreePath: http://www.meanfreepath.com */

    //typeof dowOffset === number ?
    const dowOffset = typeof dowOffset == 'int' ? dowOffset : 0; //default dowOffset to zero
    const newYear = new Date(currentDate.getFullYear(), 0, 1);
    let day = newYear.getDay() - dowOffset; //the day of week the year begins on
    if (day < 0) day += 7;
    const daynum =
        Math.floor(
            (currentDate.getTime() -
                newYear.getTime() -
                (currentDate.getTimezoneOffset() - newYear.getTimezoneOffset()) * 60000) /
                86400000,
        ) + 1;
    const weeknum = Math.floor((daynum + day - 1) / 7) + 1;
    //if the year starts before the middle of a week
    if (day < 4 && weeknum > 52) {
        const nYear = new Date(currentDate.getFullYear() + 1, 0, 1);
		let nday = nYear.getDay() - dowOffset;
		if (nday < 0) nday += 7
        /*if the next year starts before the middle of
              the week, it is week #1 of that year*/
        return nday < 4 ? 1 : 53;
    }
    if (day < 4) return weeknum;
    return Math.floor((daynum + day - 1) / 7);
}
