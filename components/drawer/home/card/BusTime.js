import React, { useState, useEffect, Fragment } from 'react'
import { View, Text, StyleSheet, Platform } from 'react-native'
import Picker from 'react-native-picker-select';
import BusTb from '../../../../jsons/busschedule.json';
import BusA from '../../../../tool/busA';
import BusB from '../../../../tool/busB';
import BusHoly from '../../../../jsons/bus_holy.json';
import BusRoute from '../../../../jsons/bus_stop.json';
import { mainScreen } from '../../../styles/busStyle.js';
import TodayCard from '../component/TodayCard.js';
import { withNavigationFocus } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons'

const BusFragment = ({title, description, routeFunction, selectedIndex}) => {
    const [time, setTime] = useState("");
    const [intervalId, setIntervalId] = useState(null);

    const setTimeRepeatedly = () => {
        routeFunction(BusTb.timeTable[title], selectedIndex, BusHoly, (res) => {
            console.log(res);
            setTime(res);
        })
    }
    useEffect(() => {
        if(!!intervalId) clearInterval(intervalId);
        routeFunction(BusTb.timeTable[title], selectedIndex, BusHoly, (res) => {
            setTime(res)
            setIntervalId(setInterval(setTimeRepeatedly, 5000));
            // setCancelRefresh(() => clearInterval.bind(null, intervalId))
        })
        return () => clearInterval.bind(null, intervalId);
    }, [selectedIndex])

    return (
        <Fragment>
            <View style={mainScreen.blockViewContainerMain}>
                <Text style={mainScreen.blockTitle}>{title}</Text>
                <Text style={mainScreen.busWay}>{description}</Text>
            </View>
            <View style={mainScreen.blockViewContainerSub}>
                <Text style={mainScreen.blockText}>{time}</Text>
            </View>
        </Fragment>
    )
}

const BusTime = ({navigation}) => {
    const data = BusRoute.routeName.A;
    const [selectedIndex, setSelectedIndex] = useState(0);

    const onChangeBusRoute = (item) => {
        setSelectedIndex(item);
    }
    const BusPicker = () => (
        <Picker
            placeholder={{}}
            items={data}
            value={selectedIndex}
            onValueChange={onChangeBusRoute}
            style={pickerSelectStyles}
            // style={{width: 50, height: 50, backgroundColor: colorPalette.backgroundColor}}
            useNativeAndroidPickerStyle={false}
            Icon={() => (<Icon name="md-arrow-dropdown" size={24} color="#ffffff" />)}
        />
    )
    
    const onPressContainer = () => {navigation.navigate('BusSchedule')}
    return (
        <TodayCard name="버스 시간" headerRight={<BusPicker />} containerStyle={{flexDirection: 'row'}} onPressContainer={onPressContainer} description={`* 버스 시간 카드를 터치하면 버스 시간표가 나옵니다!\n* 표시되는 시간은 버스시간표를 기준으로 안내중이며 시간대 별로 상이할 수 있습니다.`}>
        {/* A버스 시간 안내 */}
            <BusFragment title="A" description="반시계 반향" routeFunction={BusA} selectedIndex={selectedIndex} />
        {/* B버스 시간 안내 */}    
            <BusFragment title="B" description="시계 반향" routeFunction={BusB} selectedIndex={selectedIndex} /> 
        </TodayCard>
    )
}

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
      fontSize: 14,
      paddingVertical: 4,
      paddingHorizontal: 10,
      color: '#ffffff',
      paddingRight: 24, // to ensure the text is never behind the icon
    },
    inputAndroid: {
      fontSize: 14,
      paddingHorizontal: 12,
      height: '100%',
      color: '#d7d7d7',
      paddingRight: 24, // to ensure the text is never behind the icon
    },
    inputAndroidContainer: {

    },
    // headlessAndroidPicker: {
    //     height: null,
    // },
    headlessAndroidContainer: {
        position: 'absolute',
        right: 12,
    },
    viewContainer: {
        position: 'absolute',
        right: 12,    
        top: 8,
    },
    iconContainer: {
        top: Platform.select({ios: 0, android: 10})
    },
});

export default withNavigationFocus(BusTime);