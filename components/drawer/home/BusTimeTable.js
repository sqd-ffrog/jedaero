import React, {useState, useEffect, Fragment} from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { mainScreen } from '../../styles/busStyle';
import Swiper from 'react-native-swiper';
import BusTb from '../../../jsons/busscheduleDetail.json';
import colorPalette from '../../styles/colorPalette';
import { foodMenuListStyles } from '../../styles/jedaeroCSS';

const BusTimeTable = () => {
    const [routeA, setRouteA] = useState(null);
    const [routeB, setRouteB] = useState(null);

    useEffect(() => {
        setRouteA(BusTb.routeName.A);
        setRouteB(BusTb.routeName.B);
    }, []);
    return (
        <Fragment>
            <View style={mainScreen.busScheduleContainer}>               
                <View style={mainScreen.busScheduleName}>
                    <Text style={mainScreen.blockTitle}>A</Text>
                    <Text style={mainScreen.busWay}>반시계방향</Text>
                </View>
                {routeA && (
                    <Swiper {...swiperStyle}>
                        {routeA.map(_renderItem_A)}
                    </Swiper>
                )}
                
            </View>
            <View style={mainScreen.busScheduleContainer}>     
                <View style={mainScreen.busScheduleName}>          
                    <Text style={mainScreen.blockTitle}>B</Text>
                    <Text style={mainScreen.busWay}>시계방향</Text>
                </View>
                {routeB && (
                    <Swiper {...swiperStyle}>
                        {routeB.map(_renderItem_B)}
                    </Swiper>
                )}
                
            </View>
        </Fragment>
    )
}

BusTimeTable.navigationOptions = () => ({
    title: "버스시간표"
})
const _busrender_a = ({item, index}) => (
    <View style={foodMenuListStyles.container}>
        <Text> {index+1}회 </Text>
        <Text style={foodMenuListStyles.labelStyle}>{item}</Text>
    </View> 
)
const _renderItem_A = (item, index) => {
    // st = index
    return (
        <View key={index} style={{flex: 1, paddingHorizontal:16}}>
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

const _busrender_b = ({item, index}) => (
    <View style={foodMenuListStyles.container}>
        <Text> {index+1}회 </Text>
        <Text style={foodMenuListStyles.labelStyle}>{item}</Text>
    </View> 
)
const _renderItem_B = (item, index) => {
    return (
        <View key={index} style={{flex: 1, paddingHorizontal:10}}>
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

const styles = {
    swiperStyle: {
        paddingTop: 8
    },
    swiperContainerStyle: {
        overflow: 'hidden'
        
    }
}
const swiperStyle = {
    showsPagination: false,
    loadMinimal: true,
    loadMinimalSize: 1,
    loadMinimalLoader: (<Fragment/>),
    style: styles.swiperStyle,
    containerStyle: styles.swiperContainerStyle
}

export default BusTimeTable;