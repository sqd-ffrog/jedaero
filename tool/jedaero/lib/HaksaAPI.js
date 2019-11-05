import RNFetchBlob from 'rn-fetch-blob';
import cheerio from 'react-native-cheerio';

const uri = "http://www.jejunu.ac.kr/camp/sai/academyschedule/" + new Date().getFullYear();


export default async function () {
	const haksa = {
		title: '학사일정',
		month: []
	};
	
	try {
		const res = await (await fetch(uri)).text();
		const $ = cheerio.load(res);
		$('.table.border_left.border_top_blue.font09').each(function () {
			const eachMonth = {
				month_title: $(this).find('caption').text(),
				schedule: $(this).find('tr > td').map(function (index) {
					return {
						key: toString(index),
						haksa: $(this).text().replace(/(\s*~\s*)/gi, ' ~ ').replace(/(^\s*)|(\s*$)/g, '')
					}
				})
			};
			haksa.month.push(eachMonth);
		});
	} catch (err) {
		throw err;
	} finally {
		return haksa;
	}
}
