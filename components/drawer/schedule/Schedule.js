import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import haksaStyles from '../../styles/haksaStyle'

import { HaksaAPI }  from '../../../tool/jedaero';
import colorPalette from '../../styles/colorPalette';

const Schedule = ({navigation}) => {
    const [dataSource, setDataSource] = useState(null);

    useEffect(() => {
        (async function() {
            try {
                const dataSource = await HaksaAPI();
                setDataSource(dataSource);
            } catch(err) {
                console.error(err);
            }
        })();
    }, []);

    const _renderItem = (item, index) => {
        let isNextYear = parseInt(index / 12) ? true : false;
        let month = index % 12 + 1;
        return (
            <TouchableOpacity 
                key={index} 
                style={haksaStyles.calendarBlock}
                onPress={() => navigation.navigate('ScheduleDetail', item)}
            >
                <Text style={haksaStyles.calendarMonth}>{month}</Text>
                <Text>월</Text>
                {(isNextYear) && (<Text>{new Date().getFullYear() + 1}년</Text>)}
            </TouchableOpacity>
        )
    }
    return (!dataSource) 
        ? (
        <View style={haksaStyles.onLoading}>
            <ActivityIndicator size='large' color={colorPalette.mainColor}/>
        </View>
        ) : (
            <View style={{flex: 1, backgroundColor: colorPalette.backgroundColor}}>
                <ScrollView contentContainerStyle={haksaStyles.container}>
                    { dataSource.month.map(_renderItem) }
                </ScrollView>
            </View>
        
        )
}
Schedule.navigationOptions = {
    title: '학사일정'
};

export default Schedule;