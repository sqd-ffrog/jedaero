import React from 'react'
import { TouchableOpacity, View, Text, Linking, StyleSheet } from 'react-native';
import { mainScreen } from '../../../styles/busStyle';
import { normalize } from 'react-native-elements';
import colorPalette from '../../../styles/colorPalette';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

// const SmartBlock = () => (
//     <TouchableOpacity style={mainScreen.blockView} onPress = {() => Linking.openURL("https://elearning.jejunu.ac.kr/")}>
//         <View style={{justifyContent:'center', alignItems:'center', paddingVertical: 10}}>
//         <Text style={{ fontWeight: 'bold', fontSize: normalize(16), color:"#021E44"}}>스마트 출첵</Text>
//         </View>
//     </TouchableOpacity>
// )

const SmartBlock = () => (
    <TouchableOpacity style={styles.container}>
        <Text style={styles.text}>스마트출첵</Text>
        <Icon name="chevron-right" size={normalize(16)} color={colorPalette.cardBackgroundColor}/>
    </TouchableOpacity>
)
const styles = StyleSheet.create({
    container: {
        backgroundColor: colorPalette.smartCheckColor,
        // marginHorizontal: 10,
        marginBottom: 15,
        padding: 10,
        flexDirection: 'row'
    },
    text: {
        color: colorPalette.cardBackgroundColor,
        fontSize: normalize(16),
        fontWeight: 'bold',
        flex: 1
    }
})
export default SmartBlock;