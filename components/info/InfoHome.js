import React, { useState, useEffect } from 'react'
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert, BackHandler } from 'react-native';
import colorPalette from '../styles/colorPalette';
import { normalize } from 'react-native-elements';
import { logoutDreamy, checkLogin } from '../../service/jedaeroService';
import { withNavigationFocus } from 'react-navigation';

const Info = ({navigation, isFocused}) => {
    const [ isLogin, setLogin ] = useState(false);
    const getLogin = async () => {
        setLogin(await checkLogin());
    }

    useEffect(() => {
        isFocused && getLogin();
    }, [isFocused])

    const list = [
        {
            name: "개발자 정보",
            routeName: "Developer",
        },
        {
            name: "오픈소스 라이선스",
            routeName: "License",
        },
        {
            name: isLogin ? '다른 사용자로 로그인' : '드리미 로그인',
            routeName: "Login",
        }
    ]

    const keyExtractor = item => item.routeName;
    const renderDeveloperItem = ({item, index}) => (
        <TouchableOpacity key={index} style={styles.item} onPress={() => navigation.navigate({routeName: item.routeName})}>
            <Text style={styles.itemText}>{item.name}</Text>
        </TouchableOpacity>
    )

    const renderLogout = () => {
        return isLogin && (
            <TouchableOpacity style={styles.item} onPress={async () => {
                if(await logoutDreamy()) {
                    Alert.alert("로그아웃 되었습니다.");
                    navigation.goBack();
                }else {
                    Alert.alert("다시 시도해주세요.")
                }
            }}>
                <Text style={styles.itemText}>로그아웃</Text>
            </TouchableOpacity>
        )
    }
    
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
export default withNavigationFocus(Info);