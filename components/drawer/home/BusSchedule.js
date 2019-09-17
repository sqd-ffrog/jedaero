import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Platform, FlatList } from 'react-native'
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { mainScreen } from '../../styles/busStyle';
import { foodMenuListStyles } from '../../styles/jedaeroCSS';
import BusTb from '../../../jsons/busscheduleDetail.json';
import colorPalette from '../../styles/colorPalette';

const entrie_B = BusTb.routeName.B
const entrie_A = BusTb.routeName.A
const sliderWidth = 220;
const itemWidth = 320;

 st=0
const BusSchedule = () => {
    
    return (
        
        <View style={mainScreen.busscheduleMain}>
            <View style={mainScreen.busscheduleContainer}>               
                <View style={mainScreen.busschedulename}>
                <Text style={mainScreen.blockTitle}>A</Text>
                <Text style={mainScreen.busWay}>반시계방향</Text>
        
                </View>
        
                <Carousel
                data={entrie_A}
                renderItem={_renderItem_A}
                sliderWidth={sliderWidth}
                itemWidth={itemWidth}
                />
            </View>
            <View style={mainScreen.busscheduleContainer}>     
                <View style={mainScreen.busschedulename}>          
                <Text style={mainScreen.blockTitle}>B</Text>
                <Text style={mainScreen.busWay}>시계방향</Text>
        
                </View>
        
                <Carousel
                data={entrie_B}
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
    st = index
    return (
        
        <View style={{flex: 1, backgroundColor: colorPalette.backgroundColor, paddingHorizontal:10}}>
            <Text style={mainScreen.blockTitle}>{item}</Text>
            <FlatList
                contentContainerStyle={{flexDirection: 'column', justifyContent: 'space-between'}}
                data={BusTb.timeTable.A[item]}
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
                renderItem={_busrender_b}
            />
        </View>
        
    );
}
export default BusSchedule;