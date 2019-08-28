export default async function LibraryBookDetailAPI(id) {
    const uri = `http://lib.jejunu.ac.kr/pyxis-api/1/biblios/${id}/items`;
    try {
        return await (await fetch(uri)).json();
    } catch (err) {
        throw err;
    }
}
