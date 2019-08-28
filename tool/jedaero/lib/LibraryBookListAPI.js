export default async function LibraryBookListAPI(keyword, offset = 0) {
    const uri = `http://lib.jejunu.ac.kr/pyxis-api/1/collections/1/search?all=1|k|a|${keyword}&facet=false&max=20&offset=${offset}`;
    try {
        return await (await fetch(uri)).json();
    } catch (err) {
        throw err;
    }
}
