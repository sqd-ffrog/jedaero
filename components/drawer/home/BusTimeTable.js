import React, {useState, useEffect, Fragment} from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { mainScreen } from '../../styles/busStyle';
import Swiper from 'react-native-swiper';
// import BusTb from '../../../jsons/busscheduleDetail.json';
import colorPalette from '../../styles/colorPalette';
import { foodMenuListStyles } from '../../styles/jedaeroCSS';
import RNFetchBlob from 'rn-fetch-blob';
import { ActivityIndicator } from 'react-native-paper';

const BusTimeTable = () => {
    const [busTb, setBusTb] = useState(null);
    useEffect(() => {
        (async () => {
            const data = (await RNFetchBlob.fetch('GET', 'https://raw.githubusercontent.com/jnuro/database/master/busscheduleDetail.json')).json();
            setBusTb(data);
        })();
    })
    // const [routeA, setRouteA] = useState(null);
    // const [routeB, setRouteB] = useState(null);

    // useEffect(() => {
    //     setRouteA(BusTb.routeName.A);
    //     setRouteB(BusTb.routeName.B);
    // }, []);

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
                    data={busTb.timeTable.A[item]}
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
                    data={busTb.timeTable.B[index]}
                    keyExtractor={(item, index) => item+index}
                    renderItem={_busrender_b}
                />
            </View>
            
        );
    }

    return (
        <Fragment>
            <View style={mainScreen.busScheduleContainer}>               
                <View style={mainScreen.busScheduleName}>
                    <Text style={mainScreen.blockTitle}>A</Text>
                    <Text style={mainScreen.busWay}>반시계방향</Text>
                </View>
                {busTb && (
                    <Swiper {...swiperStyle}>
                        {busTb.routeName.A.map(_renderItem_A)}
                    </Swiper>
                )}
                
            </View>
            <View style={mainScreen.busScheduleContainer}>     
                <View style={mainScreen.busScheduleName}>          
                    <Text style={mainScreen.blockTitle}>B</Text>
                    <Text style={mainScreen.busWay}>시계방향</Text>
                </View>
                {busTb && (
                    <Swiper {...swiperStyle}>
                        {busTb.routeName.B.map(_renderItem_B)}
                    </Swiper>
                )}
                
            </View>
        </Fragment>
    )
}

BusTimeTable.navigationOptions = () => ({
    title: "버스시간표"
})


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
    showsButtons: false,
    loadMinimal: true,
    loop: false,
    // loadMinimalSize: 2,
    loadMinimalLoader: (<Fragment/>),
    style: styles.swiperStyle,
    containerStyle: styles.swiperContainerStyle
}

export default BusTimeTable;