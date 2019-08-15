import React, { useState, Fragment, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Picker, {defaultStyles} from 'react-native-picker-select';
import BusTb from '../../../../jsons/busschedule.json';
import BusA from '../../../../tool/busA';
import BusB from '../../../../tool/busB';
import BusRoute from '../../../../jsons/bus_stop.json';
import { mainScreen } from '../../../styles/busStyle.js';
import busCardStyle from '../../../styles/busCardStyle.js';
import TodayCard from '../component/TodayCard.js';
import Icon from 'react-native-vector-icons/Ionicons'
import colorPalette from '../../../styles/colorPalette.js';

const BusTime = () => {
    const data = BusRoute.routeName.A;

    const [ selectedIndex, setSelectedIndex ] = useState(0);
    const [ A, setA ] = useState(BusA(BusTb.timeTable.A, 0));
    const [ B, setB ] = useState(BusB(BusTb.timeTable.B, 0));

    

    const onChangeBusRoute = (item) => {
        setSelectedIndex(item);
    }

    useEffect(() => {
        setA(BusA(BusTb.timeTable.A, selectedIndex));
        setB(BusB(BusTb.timeTable.B, selectedIndex));
    }, [selectedIndex]);
    const BusPicker = () => (
        <Fragment>
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
        </Fragment>
    )

    return (
        <TodayCard name="버스 시간" headerRight={<BusPicker />} containerStyle={{flexDirection: 'row'}}>
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
      fontSize: 16,
      paddingVertical: 12,
      paddingHorizontal: 10,
      color: '#ffffff',
      paddingRight: 24, // to ensure the text is never behind the icon
    },
    inputAndroid: {
      fontSize: 16,
      paddingHorizontal: 10,
      paddingVertical: 8,
      color: '#ffffff',
      paddingRight: 24, // to ensure the text is never behind the icon
    },
    iconContainer: {
        top: 10,
    },
});

export default BusTime;