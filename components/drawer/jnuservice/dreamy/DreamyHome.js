import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, Alert, FlatList, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import LoginBar from './card/LoginBar';
import AsyncStorage from '@react-native-community/async-storage';
import DreamyCard from './components/DreamyCard';
import colorPalette from '../../../styles/colorPalette';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { normalize } from 'react-native-elements';
import * as Keychain from 'react-native-keychain';
import { checkLogin } from '../../../../service/jedaeroService';
import { withNavigationFocus } from 'react-navigation';

const totalMenu = [
    {
        icon: 'attachment',
        name: '수강 게시판',
        routeName: 'LectureBoard'
    },
    {
        icon: 'office-building',
        name: '생활관 입주',
        routeName: 'PassDormitory'
    },
    {
        icon: 'book-open-outline',
        name: '공결 승인',
        routeName: null,
    },
]

const itemMaxSize = Dimensions.get('window').width / 3;

const MenuHeader = () => (
    <View style={styles.totalMenuHeader}>
        <Text style={styles.totalMenuHeaderTitle}>기타 메뉴</Text>
    </View>
)
const DreamyHome = ({navigation, isFocused}) => {
    const [isLogin, setLogin] = useState(true);
    const [numColumns, setNumColumns] = useState(3);

    const afterLogin = async (success) => {
        if(!isLogin) {
            Alert.alert("로그인을 먼저 해주세요.");
            return;
        }
        success();
    }

    const onLayout = () => {
        const {width} = Dimensions.get('window')
        const itemWidth = 109;
        const numColumns = Math.floor(width/itemWidth)
        setNumColumns(numColumns);
    }

    const MenuItem = ({item: {icon, name, routeName}}) => (
        <TouchableOpacity style={{...styles.totalMenuItem}} onPress={() => afterLogin(() => navigation.navigate(routeName))}>
            <Icon name={icon} size={48} style={{flex: 1, justifyContent: 'center', alignItems: 'center'}} />
            <Text style={styles.itemText}>{name}</Text>
        </TouchableOpacity>
    )

    useEffect(() => {
        isFocused && (async function() {
            setLogin(await checkLogin());
        })();
    }, [isFocused]);

    return (
        <ScrollView onLayout={onLayout}>
            {!isLogin && <LoginBar onPress={() => {navigation.navigate("NestedLogin");}}/>}
            <DreamyCard title="지금 내 시간표는?" onPress={() => afterLogin(() => navigation.navigate("TimeTable"))}>
                <Text>사간표를 확인하실 수 있습니다.</Text>
            </DreamyCard>
            <DreamyCard title="내 평점 확인" onPress={() => afterLogin(() => navigation.navigate("Credit"))}>
                <Text>전체 성적을 조회하실 수 있습니다.</Text>
            </DreamyCard>
            {isLogin && <FlatList
                ListHeaderComponent={MenuHeader}
                numColumns={numColumns}
                data={totalMenu}
                key={numColumns}
                keyExtractor={item => item.name}
                renderItem={MenuItem}
                contentContainerStyle={styles.totalMenuContainer}
            />}
        </ScrollView>
    )
}

DreamyHome.navigationOptions = {
    title: '하영드리미'
}

const styles = StyleSheet.create({
    totalMenuHeader: {
        marginTop: 32,
        marginBottom: 8,
    },
    totalMenuHeaderTitle: {
        fontSize: normalize(14),
        color: colorPalette.textColor,
        fontWeight: 'bold',
    },
    totalMenuContainer: {
        flexDirection: 'column',
        alignItems: 'center'
    },
    totalMenuItem: {
        backgroundColor: colorPalette.cardBackgroundColor,
        minWidth: 109,
        height: 109,
        borderWidth:0.5,
        borderColor:colorPalette.cardBorderColor,
        padding: 16,
        // justifyContent: 'space-between',
        alignItems: 'center',
    },
    itemText: {
        fontSize: normalize(12),
        fontWeight: 'bold',
        textAlign: 'center'
    }
})

export default withNavigationFocus(DreamyHome);