import React, {useEffect, useState} from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import colorPalette from '../../../../styles/colorPalette';
import { normalize } from 'react-native-elements';
import Keychain from 'react-native-keychain';

const LoginBar = ({onPress}) => {
    return (
        <View style={styles.container}>
            <Text style={{...styles.loginText}}>아직 로그인하지 않으셨습니다.</Text>
            <TouchableOpacity {...{onPress}}>
                <Text style={{...styles.loginText}}>로그인하기</Text>
            </TouchableOpacity>
        </View>
    )
}

const LogonBar = ({onPress, name}) => {
    return (
        <View style={styles.logonContainer}>
            <View style={styles.nameContainer}>
                <Text style={{...styles.logonText, fontWeight: 'bold'}}>{name}</Text>
                <Text style={styles.logonText}>님 안녕하세요!</Text>
            </View>
            <TouchableOpacity {...{onPress}}>
                <Text style={{...styles.logonText, fontWeight: 'bold'}}>로그아웃</Text>
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
        alignItems: 'center',
    },
    loginText: {
        fontSize: normalize(12),
        color: colorPalette.cardBackgroundColor,
        fontWeight: 'bold',
    },
    logonContainer: {
        borderTopWidth: 0.5,
        borderBottomWidth: 0.5,
        borderColor: colorPalette.cardBorderColor,
        backgroundColor: colorPalette.cardBackgroundColor,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
    },  
    nameContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    logonText: {
        fontSize: normalize(12),
        color: colorPalette.mainColor,
    }
})


export { LoginBar, LogonBar };