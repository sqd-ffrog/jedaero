import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Platform, FlatList } from 'react-native'
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { mainScreen } from '../../styles/busStyle';
import { foodMenuListStyles } from '../../styles/jedaeroCSS';
import BusTb from '../../../jsons/busscheduleDetail.json';
import colorPalette from '../../styles/colorPalette';

const sliderWidth = 220;
const itemWidth = 320;


const BusSchedule = () => {
    const [routeA, setRouteA] = useState(BusTb.routeName.A);
    const [routeB, setRouteB] = useState(BusTb.routeName.B)
    return (
        <View style={mainScreen.busScheduleMain}>
            <View style={mainScreen.busScheduleContainer}>               
                <View style={mainScreen.busScheduleName}>
                    <Text style={mainScreen.blockTitle}>A</Text>
                    <Text style={mainScreen.busWay}>반시계방향</Text>
                </View>
                <Carousel
                    data={routeA}
                    renderItem={_renderItem_A}
                    // sliderWidth={sliderWidth}
                    // itemWidth={itemWidth}
                />
            </View>
            <View style={mainScreen.busScheduleContainer}>     
                <View style={mainScreen.busScheduleName}>          
                    <Text style={mainScreen.blockTitle}>B</Text>
                    <Text style={mainScreen.busWay}>시계방향</Text>
                </View>
                <Carousel
                    data={routeB}
                    renderItem={_renderItem_B}
                    sliderWidth={sliderWidth}
                    itemWidth={itemWidth}
                />
            </View>
        </View>
    );
}
const _busrender_a = ({item, index}) => (
    <View style={foodMenuListStyles.container}>
        <Text> {index+1}회 </Text>
        <Text style={foodMenuListStyles.labelStyle}>{item}</Text>
    </View> 
)
const _renderItem_A = ({item, index}) => {
    // st = index
    return (
        
        <View style={{flex: 1, backgroundColor: colorPalette.backgroundColor, paddingHorizontal:10}}>
            <Text style={mainScreen.blockTitle}>{item}</Text>
            <FlatList
                contentContainerStyle={{flexDirection: 'column', justifyContent: 'space-between'}}
                data={BusTb.timeTable.A[item]}
                keyExtractor={(item, index) => item+index}
                renderItem={_busrender_a}
            />
        </View>
    );
}
//이거 해야댐
const make_time = (time,index) =>{
    let _time = time.split(':');
    return _time[0]+':'+ (Number(_time[1])+index)
}
const _busrender_b = ({item, index}) => (
        <View style={foodMenuListStyles.container}>
            <Text> {index+1}회 </Text>
            <Text style={foodMenuListStyles.labelStyle}>{item}</Text>
        </View> 
)
const _renderItem_B = ({item, index}) => {
    st = index
    return (
        
        <View style={{flex: 1, backgroundColor: colorPalette.backgroundColor, paddingHorizontal:10}}>
            <Text style={mainScreen.blockTitle}> {item} </Text>
            <FlatList
                contentContainerStyle={{flexDirection: 'column', justifyContent: 'space-between'}}
                data={BusTb.timeTable.B[index]}
                keyExtractor={(item, index) => item+index}
                renderItem={_busrender_b}
            />
        </View>
        
    );
}
export default BusSchedule;