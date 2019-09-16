import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Platform } from 'react-native'
import Picker from 'react-native-picker-select';
import BusTb from '../../../../jsons/busschedule.json';
import BusA from '../../../../tool/busA';
import BusB from '../../../../tool/busB';
import Bus_holy from '../../../../jsons/bus_holy.json';
import BusRoute from '../../../../jsons/bus_stop.json';
import { mainScreen } from '../../../styles/busStyle.js';
import TodayCard from '../component/TodayCard.js';
import Icon from 'react-native-vector-icons/Ionicons'

const BusTime = ({navigation}) => {
    const data = BusRoute.routeName.A;
    const [ selectedIndex, setSelectedIndex ] = useState(0);
    const [ A, setA ] = useState(BusA(BusTb.timeTable.A, 0,Bus_holy));
    const [ B, setB ] = useState(BusB(BusTb.timeTable.B, 0,Bus_holy));
    const onChangeBusRoute = (item) => {
        setSelectedIndex(item);
    }
    useEffect(() => {
        setA(BusA(BusTb.timeTable.A, selectedIndex, Bus_holy));
        setB(BusB(BusTb.timeTable.B, selectedIndex, Bus_holy));
    }, [selectedIndex]);
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
        <TodayCard name="버스 시간" headerRight={<BusPicker />} containerStyle={{flexDirection: 'row'}} onPressContainer={onPressContainer}>
        {/* A버스 시간 안내 */}
            <View style={mainScreen.blockViewContainerMain}>
                <Text style={mainScreen.blockTitle}>A</Text>
                <Text style={mainScreen.busWay}>반시계방향</Text>
            </View>
            <View style={mainScreen.blockViewContainerSub}>
                <Text style={mainScreen.blockText}>{A}</Text>
            </View>
        {/* B버스 시간 안내 */}     
            <View style={mainScreen.blockViewContainerMain}>
                <Text style={mainScreen.blockTitle}>B</Text>
                <Text style={mainScreen.busWay}>시계방향</Text>
            </View>
            <View style={mainScreen.blockViewContainerSub}>
                <Text style={mainScreen.blockText}>{B}</Text>
            </View>
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
      color: '#ffffff',
      paddingRight: 24, // to ensure the text is never behind the icon
    },
    inputAndroidContainer: {
        height: null,
    },
    // headlessAndroidPicker: {
    //     height: null,
    // },
    headlessAndroidContainer: {
        height: '100%'
    },
    iconContainer: {
        top: Platform.select({ios: 0, android: 10})
    },
});

export default BusTime;