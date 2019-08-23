import MIMETYPE from '../jsons/mimetype.json';

const getExtensions = fileName => /(?:\.([^.]+))?$/.exec(fileName)[1];

const getMimeType = fileName => MIMETYPE[getExtensions(fileName)];

export default getMimeType;