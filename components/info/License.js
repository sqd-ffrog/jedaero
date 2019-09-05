import React, {useState, useEffect} from 'react';
import { View, Text, FlatList, TouchableOpacity, Linking } from 'react-native'
//import license from '../../jsons/license';
import { normalize } from 'react-native-elements';
import colorPalette from '../styles/colorPalette';
import { licenseStyle } from '../styles/jedaeroCSS';



const baseURI = 'https://raw.githubusercontent.com/jnuro/database/master/'




const License = () => {
    const [license, setLicense] = useState("");
    const keyExtractor = item => item.name;
    const getLincenseList = async () => {
        try {
            const data = await (await fetch(`${baseURI}license.json`)).json();
            console.log(data)
            setLicense(data);
        } catch(err) {
            throw err;
        }
    }
    useEffect(() => { getLincenseList(); }, []);

    const item = ({item}) => (
        <TouchableOpacity 
            style={licenseStyle.list} onPress={() => Linking.openURL(item.agreement)}>
            <Text style={licenseStyle.name}>
                {item.name}
            </Text>
            <Text style={licenseStyle.license}>
                License : {item.license}
            </Text>
        </TouchableOpacity>
    )
    return (
        <View style={{flex: 1, backgroundColor: colorPalette.backgroundColor}}>
            <FlatList 
                data={license.license}
                keyExtractor={keyExtractor}
                renderItem={item}
            />
        </View>
        )
}
License.navigationOptions = {
    title: "오픈소스 라이선스"
}




export default License;