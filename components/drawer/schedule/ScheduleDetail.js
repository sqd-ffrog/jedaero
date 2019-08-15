import React, { Component } from 'react'
import { Text, View, FlatList } from 'react-native'
import { normalize } from 'react-native-elements';
import colorPalette from '../../styles/colorPalette';

const ScheduleDetail = ({navigation}) => {
    const _keyExtractor = (item, index) => item.haksa;
    const _renderItem = ({item, index}) => (
        <View style={{paddingVertical: 16, paddingHorizontal: 8, borderBottomColor:'#d7d7d7', borderBottomWidth: 0.5}}>
            <Text style={{textAlign:'center', fontSize:(index % 2 == 0 ? normalize(18) : normalize(14))}}>{item.haksa}</Text>
        </View>
    )
    const schedule = navigation.getParam('schedule');
    return (
        <View style={{flex: 1, backgroundColor:colorPalette.backgroundColor}}>
            <FlatList 
                keyExtractor={_keyExtractor}
                data={schedule}
                renderItem={_renderItem}
            />
        </View>
    )
}

ScheduleDetail.navigationOptions = ({navigation}) => ({ title: navigation.getParam('month_title') })

export default ScheduleDetail;