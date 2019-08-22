import React from 'react'
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Linking } from 'react-native'
import license from '../../jsons/license';
import { normalize } from 'react-native-elements';
import colorPalette from '../styles/colorPalette';

const keyExtractor = item => item.name;

const item = ({item}) => (
    <TouchableOpacity 
        style={styles.list} onPress={() => Linking.openURL(item.agreement)}>
        <Text style={styles.name}>
            {item.name}
        </Text>
        <Text style={styles.license}>
            License : {item.license}
        </Text>
    </TouchableOpacity>
)

const License = () => (
    <View style={{flex: 1, backgroundColor: colorPalette.backgroundColor}}>
        <FlatList 
            data={license.license}
            keyExtractor={keyExtractor}
            renderItem={item}
        />
    </View>
)
License.navigationOptions = {
    title: "오픈소스 라이선스"
}

const styles = StyleSheet.create({

    list: {
        paddingTop:24,
        paddingBottom:16,
        borderWidth: 0.5,
        borderColor: colorPalette.cardBorderColor,
        marginHorizontal:10,
        marginBottom:16,
        borderRadius:4,
        overflow:'hidden'
    },
    name: {textAlign: 'center',fontSize: normalize(20), color: colorPalette.textColor},
    license: { textAlign:'center', color: colorPalette.subTextColor, fontSize: normalize(10)}
})


export default License;