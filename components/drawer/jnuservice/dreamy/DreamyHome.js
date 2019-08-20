import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, Alert } from 'react-native'
import LoginBar from './card/LoginBar';
import AsyncStorage from '@react-native-community/async-storage';
import DreamyCard from './components/DreamyCard';

const DreamyHome = ({navigation}) => {
    const [isLogin, setLogin] = useState(true);
    
    const checkLogin = async () => {
        const account = await AsyncStorage.getItem('account');
        const password = await AsyncStorage.getItem('password');
        setLogin(!!account && !!password);
    }

    const login = async () => {
        checkLogin();
    }
    
    const afterLogin = (success) => {
        if(isLogin) success();
        else Alert.alert("로그인을 먼저 해주세요.");
    }

    useEffect(() => {login()}, []);

    return (
        <ScrollView>
            {!isLogin && <LoginBar onPress={() => {navigation.navigate("NestedLogin", { callback: login });}}/>}
            <DreamyCard title="지금 내 시간표는?" onPress={() => afterLogin(() => navigation.navigate("TimeTable"))}>
                <Text>사간표를 확인하실 수 있습니다.</Text>
            </DreamyCard>
            <DreamyCard title="내 평점 확인" onPress={() => afterLogin(() => navigation.navigate("TimeTable"))}>
                <Text>전체 성적을 조회하실 수 있습니다.</Text>
            </DreamyCard>
        </ScrollView>
    )
}

DreamyHome.navigationOptions = {
    title: '하영드리미'
}

export default DreamyHome;