export default async function LibraryBookDetailAPI(id) {
    const uri = `http://lib.jejunu.ac.kr/pyxis-api/1/biblios/${id}/items`;
    try {
        const data = await (await fetch(uri)).json();
        return data;
    } catch(err) {
        throw err;
    }
}