import { PermissionsAndroid } from 'react-native';

const requestDownloadPermission = async () => {
    const checkDownloadPermission = async () => {
        return (
            await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE) &&
            await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE)
        )
    }

    const grantList = [
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,    
    ]
    if(!await checkDownloadPermission()) {
        let res = false;
        try {
            const readGrant = await PermissionsAndroid.requestMultiple(grantList);
            res = readGrant === PermissionsAndroid.RESULTS.GRANTED;
        } catch (err) {
            console.warn(err);
        } finally {
            return res;
        }
    }

    return true;
}

export { requestDownloadPermission };