import RNFetchBlob from 'rn-fetch-blob';

const uri = 'https://raw.githubusercontent.com/sqd-ffrog/database/master/config.json'

export default async function getConfig() {
    let res;
    try {
        res = await RNFetchBlob.fetch('GET', uri);
    }
    catch (err) {
        console.error(err);
        return {};
    }
    return res.json();
}