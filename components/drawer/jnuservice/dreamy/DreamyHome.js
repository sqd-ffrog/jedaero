import React, { useState, useEffect, Fragment } from 'react'
import { View, Text, ScrollView, Alert, FlatList, StyleSheet, Dimensions, TouchableOpacity, SectionList} from 'react-native'
import { LoginBar, LogonBar } from './card/LoginBar';
import DreamyCard from './components/DreamyCard';
import colorPalette from '../../../styles/colorPalette';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { normalize } from 'react-native-elements';
import { checkLogin, logoutDreamy } from '../../../../service/jedaeroService';
import { withNavigationFocus } from 'react-navigation';
import { getGenericPassword }from 'react-native-keychain';

const totalMenu = [
    {
        title: "전체 메뉴",
        data: [
            {
                icon: 'attachment',
                name: `강의${'\n'}게시판`,
                routeName: 'LectureBoard'
            },
            {
                icon: 'office-building',
                name: `생활관 ${'\n'}합격조회`,
                routeName: 'PassDormitory'
            },
            {
                icon: 'book-open-outline',
                name: `교수계획서 ${'\n'}조회`,
                routeName: "LecturePlan",
            },
            {
                icon: 'book-open-outline',
                name: `교수계획서 ${'\n'}조회`,
                routeName: "LecturePlan",
            },
        ]
    }
]

const DreamyHome = ({navigation, isFocused}) => {
    const [isLogin, setLogin] = useState(true);
    const [name, setName] = useState('');
    const [numColumns, setNumColumns] = useState(3);

    const getLogin = () => isLogin;
    const afterLogin = async (success) => {
        if(!getLogin()) {
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

    const MenuHeader = ({section: {title}}) => (
        <View style={styles.totalMenuHeader}>
            <Text style={styles.totalMenuHeaderTitle}>{title}</Text>
        </View>
    )

    const MenuItem = ({section, index}) => {
        if(index % numColumns !== 0) return null;

        const items = [];
        for(let i = index; i < index + numColumns; i++) {
            if( i >= section.data.length) break;
            let {icon, name, routeName} = section.data[i];
            items.push((
                <TouchableOpacity style={{...styles.totalMenuItem}} onPress={afterLogin.bind(null, () => navigation.navigate(routeName))}>
                    <Icon name={icon} size={48} style={styles.menuItemIcon} />
                    <Text numberOfLines={2} style={styles.itemText}>{name}</Text>
                </TouchableOpacity> 
            ))
        }
        return (
            <View style={{
                flexDirection: 'row',
                justifyContent: 'center'
            }}>
                {items}
            </View>
        )
    }

    useEffect(() => {
        isFocused && (async function() {
            const isLogin = await checkLogin();
            setLogin(isLogin);
            if(isLogin) {
                const { password: baseInfo } = await getGenericPassword();
                const { name } = JSON.parse(baseInfo);
                setName(name);
            }
        })();
    }, [isFocused]);

    const logout = async () => {
        try {
            await logoutDreamy();
            Alert.alert("로그아웃에 성공하셨습니다.")
            setLogin(false);
        } catch(err) {
            Alert.alert("로그아웃에 실패하셨습니다.")
        }
    }

    const ListHeaderComponent = () => (
        <Fragment>
            {!isLogin ? <LoginBar onPress={() => {navigation.navigate("NestedLogin");}} /> : <LogonBar onPress={() => logout()} name={name} />}
            <DreamyCard title="지금 내 시간표는?" onPress={() => afterLogin(() => navigation.navigate("TimeTable"))}>
                <Text>사간표를 확인하실 수 있습니다.</Text>
            </DreamyCard>
            <DreamyCard title="내 평점 확인" onPress={() => afterLogin(() => navigation.navigate("Credit"))}>
                <Text>전체 성적을 조회하실 수 있습니다.</Text>
            </DreamyCard>
        </Fragment>
    )

    return (
        <SectionList
            ListHeaderComponent={ListHeaderComponent}
            numColumns={numColumns}
            sections={totalMenu}
            key={numColumns}
            keyExtractor={(item, index) => item.name + index}
            renderItem={MenuItem}
            renderSectionHeader={MenuHeader}
            // contentContainerStyle={styles.totalMenuContainer}
        />
    )
}

DreamyHome.navigationOptions = {
    title: '하영드리미'
}

const styles = StyleSheet.create({
    totalMenuHeader: {
        marginTop: 32,
        marginBottom: 8,
        alignSelf: 'center'
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
        width: 109,
        borderWidth:0.5,
        borderColor:colorPalette.cardBorderColor,
        padding: 16,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    itemText: {
        fontSize: 12,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    menuItemIcon: { flex: 1, justifyContent: 'center', alignItems: 'center' }
})

export default withNavigationFocus(DreamyHome);