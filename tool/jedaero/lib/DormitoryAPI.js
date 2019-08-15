import RNFetchBlob from 'rn-fetch-blob';
import cheerio from 'react-native-cheerio';
import iconv from 'iconv-lite';
import { Buffer } from 'buffer';

export default async function DormitoryAPI () {
    const uri = 'http://dormitory.neo-internet.co.kr';
    const data = {};
    try {
        const res = await RNFetchBlob.fetch('GET',`${uri}/board/adm/Recipe/restaurant.php`);
        const strbase64 = new Buffer(res.data, 'base64');
        const resBody = iconv.decode(strbase64, 'EUC-KR').toString();
        const $ = cheerio.load(resBody);
        
        data['title'] = '기숙사 식당';
        countday = 0;
        countmenu = 0;
        $('.wanted > tbody > tr > td').each(function() {
            TempText = $(this).text();
            locateNumber = 'dormitory' + countday + '_' + countmenu;
            data[locateNumber] = TempText;

            countmenu++;
            if (countmenu % 6 === 0){
                countmenu = 1;
                countday++;
            }
        });

        const meal = {
            mealMon: {
                dawn : data.dormitory1_1,
                breakfast : data.dormitory1_2,
                lunch: data.dormitory1_3,
                dinner: data.dormitory1_4,
            }, 
            mealTue: {
                dawn : data.dormitory2_1,
                breakfast : data.dormitory2_2,
                lunch: data.dormitory2_3,
                dinner: data.dormitory2_4,
            }, 
            mealWed: {
                dawn : data.dormitory3_1,
                breakfast : data.dormitory3_2,
                lunch: data.dormitory3_3,
                dinner: data.dormitory3_4,
            }, 
            mealThu: {
                dawn : data.dormitory4_1,
                breakfast : data.dormitory4_2,
                lunch: data.dormitory4_3,
                dinner: data.dormitory4_4,
            }, 
            mealFri: {
                dawn : data.dormitory5_1,
                breakfast : data.dormitory5_2,
                lunch: data.dormitory5_3,
                dinner: data.dormitory5_4,
            }, 
            mealSat: {
                dawn : data.dormitory6_1,
                breakfast : data.dormitory6_2,
                lunch: data.dormitory6_3,
                dinner: data.dormitory6_4,
            }, 
            mealSun: {
                dawn : data.dormitory7_1,
                breakfast : data.dormitory7_2,
                lunch: data.dormitory7_3,
                dinner: data.dormitory7_4,
            }, 
        }

        return meal;
    } catch (err) {
        throw err;
    }
}