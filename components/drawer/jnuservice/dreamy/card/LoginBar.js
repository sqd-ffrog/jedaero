import React, {useEffect, useState} from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import colorPalette from '../../../../styles/colorPalette';
import { normalize } from 'react-native-elements';

const LoginBar = ({onPress}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.containerText}>아직 로그인하지 않으셨습니다.</Text>
            <TouchableOpacity {...{onPress}}>
                <Text style={styles.containerText}>로그인하기</Text>
            </TouchableOpacity>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderBottomColor: colorPalette.cardBorderColor,
        borderBottomWidth: 0.5,
        backgroundColor: colorPalette.mainColor,
        padding: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    containerText: {
        fontSize: normalize(12),
        fontWeight: 'bold',
        color: colorPalette.cardBackgroundColor
    }
})


export default LoginBar;