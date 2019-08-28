import RNFetchBlob from 'rn-fetch-blob';
import cheerio from 'react-native-cheerio';
import iconv from 'iconv-lite';
import { Buffer } from 'buffer';

var uri = 'http://203.253.194.135:8011/WebSeat/domian5.asp';

export default async function() {
    const haksa = {
        title: '도서좌석',
        row: [],
    };
    try {
        const { data } = await RNFetchBlob.fetch('GET', uri);
        const strbase64 = new Buffer(data, 'base64');
        const resBody = iconv.decode(strbase64, 'EUC-KR').toString();
        const $ = cheerio.load(resBody);

        $('table')
            .eq(1)
            .find('tr')
            .each(function(tr) {
                if (tr >= 2) {
                    let tempRow = { key: tr };
                    $(this)
                        .find('td')
                        .each(function(td) {
                            tempRow['table' + td] = $(this).text();
                        });
                    haksa.row.push(tempRow);
                }
            });
    } catch (err) {
        console.error(err);
    } finally {
        return haksa;
    }
}
