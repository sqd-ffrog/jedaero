import React, {useEffect, useState} from 'react'
import { FlatList, Text, StyleSheet, TouchableOpacity, ActivityIndicator, View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { StackActions, NavigationActions } from 'react-navigation';
import { getTimeTable } from '../../../../service/jedaeroService';
import { Overlay, normalize } from 'react-native-elements';
import { Calendar, CalendarList, Agenda , LocaleConfig} from 'react-native-calendars';
import colorPalette from '../../../styles/colorPalette';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'


LocaleConfig.locales['kr'] = {
    monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
    monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
    dayNames: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
    dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
    today: '오늘'
}

LocaleConfig.defaultLocale = 'kr'

const DreamyHome = ({navigation}) => {
    const [ timeTable, setTimeTable ] = useState(null);
    const date = new Date("2018-11-01");
    const [ day, setDay ] = useState({
        year: date.getFullYear(),
        month: date.getMonth()+1,
        day: date.getDate(),
    });
    const [ isOverlayVisible, setOverlayVisible ] = useState(false);

    const hasAccount = async () => {
        const id = await AsyncStorage.getItem("account", err => null);
        const pwd = await AsyncStorage.getItem("password", err => null);
        if(!id || !pwd) {
            const loginAction = StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'Login', params: { redirectRouteName: 'DreamyHome'}})]
            });
            navigation.dispatch(loginAction);
        }
    }

    useEffect(() => {
        (async function() {
            await hasAccount();
        })();
        
    }, [])

    useEffect(() => {
        (async function() {
            await setTimeTable(await getTimeTable(day.year,day.month,day.day));
        })();
    }, [day])

    useEffect(() => {
        console.log(timeTable);
    }, [timeTable]);

    const scheduleRow = ({item, index}) => {
        const week = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
        return (
            <View style={styles.scheduleRow}>
                <Text style={styles.rowHead}>{item.period}</Text>
                { week.map(date => {
                    const prevLectureName = index > 0 ? timeTable.schedule[index === 10 ? index - 2 : index - 1][date].name : " ";
                    const currLectureName = item[date].name;
                    const isFirstLecture = prevLectureName === " " && currLectureName !== " ";
                    const isLectures = !isFirstLecture && currLectureName !== " " && currLectureName === prevLectureName;
                    const displayName = isFirstLecture || isLectures ? currLectureName : "";
                    const isClass = isFirstLecture || isLectures;
                    return (
                        <TouchableOpacity style={{
                            ...styles.scheduleItem, 
                            backgroundColor: isClass ? colorPalette.mainColor: colorPalette.cardBackgroundColor ,
                            borderTopWidth: isFirstLecture? 5: 0,
                            borderTopColor: colorPalette.cardBorderColor, 
                        }}>
                            <Text style={{
                                // color: isClass ? colorPalette.cardBackgroundColor : colorPalette.textColor, 
                                color: '#000000'
                            }} key={date}>
                                {displayName}
                            </Text>
                        </TouchableOpacity>
                    )
                })}
            </View>
        )
    }

    const keyExtractor = (item, index) => item.time;

    return !timeTable ? (
        <View style={{alignItems: 'center', paddingTop:20, flex:1}}>
            <ActivityIndicator size='large' color={colorPalette.mainColor}/>
        </View>
    ) : (
        timeTable === {} ? (
            <View><Text>시간표가 없어유.</Text></View>
        ) : 
        (
        <React.Fragment>
            <TouchableOpacity  style={styles.selectCalendar} onPress={() => setOverlayVisible(true)}>
                <Icon style={{marginRight: 10}}name="calendar-month" size={24} color={colorPalette.mainColor} />
                <Text style={styles.selectCalendarText}>{day.year}년 {day.month}월 {day.day}일</Text>
            </TouchableOpacity>
            <FlatList 
                data={timeTable.schedule}
                renderItem={scheduleRow}
                keyExtractor={keyExtractor}
                contentContainerStyle={styles.scheduleContainer}
            />
            <Overlay isVisible={isOverlayVisible} 
                onBackdropPress={() => setOverlayVisible(false)}
                width="auto"
                height="auto"
                overlayStyle={styles.overlay}
            >
                <Calendar
                    horizontal={true}
                    onDayPress={day => {
                        setDay(day);
                        setOverlayVisible(false);
                    }}
                    monthFormat="yyyy MMMM"
                    theme={{
                        todayTextColor: colorPalette.smartCheckColor,
                        selectedDayTextColor: colorPalette.backgroundColor,
                        selectedDayBackgroundColor: colorPalette.mainColor,
                        selectedDotColor: colorPalette.mainColor,
                        arrowColor: colorPalette.mainColor,
                    }}
                    markingType={'period'}
                />
            </Overlay>
        </React.Fragment>
    ))
}
DreamyHome.navigationOptions = {
    title: '금주 시간표'
}

const styles = StyleSheet.create({
    overlay: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    selectCalendar: {
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: colorPalette.cardBorderColor,
        alignSelf: 'flex-start',
        alignItems: 'center',
        marginRight: 0,
        paddingHorizontal: 16,
        paddingVertical: 8,
        flexDirection: 'row',
        backgroundColor: colorPalette.cardBackgroundColor,
    },
    selectCalendarText: {
        fontSize: normalize(12),
        fontWeight: 'bold',
    },
    scheduleContainer: {
        backgroundColor: colorPalette.cardBackgroundColor,
        borderWidth: 0.5,
        borderColor: colorPalette.cardBorderColor,
        marginHorizontal: 8,
        marginTop: 8,
    },
    scheduleRow: {
        flexDirection: 'row',
        borderBottomWidth: 0.5,
        borderBottomColor: colorPalette.cardBorderColor,
    },
    rowHead: {
        textAlign:'right',
        paddingRight: 8,
        flexWrap: 'wrap',
        fontSize: normalize(9),
        flexBasis: 24
    },
    scheduleItem: {
        flex: 1,
        padding: 4,
        minHeight: 70,
    },
    scheduleItemText: {
        flexWrap: "wrap",
        fontSize: normalize(11),
    }
})
export default DreamyHome;