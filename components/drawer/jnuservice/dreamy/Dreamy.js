import React, {useEffect, useState} from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
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
    }, [timeTable])
    return (
        <View>
            <TouchableOpacity  style={styles.selectCalendar} onPress={() => setOverlayVisible(true)}>
                <Icon style={{marginRight: 10}}name="calendar-month" size={24} color={colorPalette.mainColor} />
                <Text style={styles.selectCalendarText}>{day.year}년 {day.month}월 {day.day}일</Text>
            </TouchableOpacity>
            
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
        </View>
    )
}
DreamyHome.navigationOptions = {
    title: '하영드리미'
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
        marginRight: 0,
        padding: 16,
        flexDirection: 'row',
        backgroundColor: colorPalette.cardBackgroundColor,
    },
    selectCalendarText: {
        fontSize: normalize(16)
    }
})
export default DreamyHome;