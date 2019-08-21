import React, { Component } from 'react'
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert, BackHandler } from 'react-native';
import colorPalette from '../styles/colorPalette';
import { normalize } from 'react-native-elements';
import { logoutDreamy } from '../../service/jedaeroService';

const list = [
    {
        name: "개발자 정보",
        routeName: "Developer"
    },
    {
        name: "오픈소스 라이선스",
        routeName: "License"
    },
    {
        name: '드리미 로그인',
        routeName: "Login"
    }
]

const renderLogout = () => {
    return (
        <TouchableOpacity style={styles.item} onPress={async () => {
            if(await logoutDreamy()) {
                Alert.alert("로그아웃 되었습니다.");
                BackHandler.exitApp();
            }else {
                Alert.alert("다시 시도해주세요.")
            }
        }}>
            <Text style={styles.itemText}>로그아웃</Text>
        </TouchableOpacity>
    )
}

const Info = ({navigation}) => {

    const keyExtractor = item => item.routeName;
    const renderDeveloperItem = ({item, index}) => (
        <TouchableOpacity key={index} style={styles.item} onPress={() => navigation.navigate({routeName: item.routeName})}>
            <Text style={styles.itemText}>{item.name}</Text>
        </TouchableOpacity>
    )
    
    return (
        <FlatList 
            data={list}
            keyExtractor={keyExtractor}
            renderItem={renderDeveloperItem}
            ListFooterComponent={renderLogout}
        />
    )
}

Info.navigationOptions = () => ({
    title: '정보',
});

const styles = StyleSheet.create({
    container: {flex: 1, backgroundColor: colorPalette.backgroundColor},
    item: {
        padding: 16,
        borderBottomWidth: 0.5,
        borderBottomColor: colorPalette.cardBorderColor
    },
    itemText: {
        fontSize: normalize(16)
    }
})
export default Info;