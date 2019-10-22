import React, { Component, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator, RefreshControl } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { HaksikAPI } from '../../../../tool/jedaero';
import { foodTabNavStyles } from '../../../styles/jedaeroCSS';
import { foodTopTabNavigationConfig } from '../../../navigations/navigationConfigs'
import getWeek from '../../../../tool/getWeek';
import h_time from '../../../../jsons/h_time.json';
import colorPalette from '../../../styles/colorPalette';

const Haksik = ({meal, onRefresh}) => {
    const [isRefresh, setRefresh] = useState(false);
    return !meal ? (
        <View style={{alignItems: 'center', paddingTop:20, flex:1}}>
            <ActivityIndicator size='large' color={colorPalette.mainColor}/>
        </View>
    ) : (
        <ScrollView 
            contentContainerStyle={foodTabNavStyles.scrollContainer}
            refreshControl= {
                <RefreshControl 
                    refreshing={isRefresh}
                    onRefresh={async () => {
                        await setRefresh(true);
                        await onRefresh();
                        await setRefresh(false);
                    }}
                />
            }
        >
            <HaksikList title="정식" food={meal.combo} time={h_time.combo} color={colorPalette.mainColor} />
            <HaksikList title="특식" food={meal.special} time={h_time.special} color={colorPalette.mainColor} />
            <HaksikList title="양식" food={meal.western} time={h_time.chinese} color={colorPalette.mainColor} />
            <HaksikList title="중식" food={meal.chinese} time={h_time.chinese} color={colorPalette.mainColor} />
            <HaksikList title="정식 저녁" food={meal.dinner} time={h_time.dinner} color={colorPalette.mainColor}/>
        </ScrollView>
    )
}

const HaksikList = ({title, color, food, time}) => (
    <View style={foodTabNavStyles.container}>
        <TouchableOpacity style={foodTabNavStyles.list} activeOpacity={0.8}>
        <View style={{...foodTabNavStyles.foodlistContainer, backgroundColor: color}}>
            <Text style={foodTabNavStyles.foodlistTitle}>{title}</Text>
        </View>
        <View style={foodTabNavStyles.subContainer}>
            <Text style={foodTabNavStyles.foodlist}>{food}</Text>
            <Text style={foodTabNavStyles.foodtime}>*Time{'\n'}{time.times}</Text>
        </View>
        </TouchableOpacity>
    </View>
)


const HaksikTabNavigator = createMaterialTopTabNavigator({
    HaksikMon: {
        screen: props => <Haksik DoW="mon" navigation={props.navigation} meal={props.screenProps.meal.mealMon} onRefresh={props.screenProps.onRefresh} />,
        navigationOptions: {
            title:'월'
        }
    }, 
    HaksikTue: {
        screen: props => <Haksik DoW="tue" navigation={props.navigation} meal={props.screenProps.meal.mealTue} onRefresh={props.screenProps.onRefresh}/>,
        navigationOptions: {
            title:'화'
        }
    }, 
    HaksikWed: {
        screen: props => <Haksik DoW="wed" navigation={props.navigation} meal={props.screenProps.meal.mealWed} onRefresh={props.screenProps.onRefresh}/>,
        navigationOptions: {
            title:'수'
        }
    }, 
    HaksikThu: {
        screen: props => <Haksik DoW="thu" navigation={props.navigation} meal={props.screenProps.meal.mealThu} onRefresh={props.screenProps.onRefresh}/>,
        navigationOptions: {
            title:'목'
        }
    }, 
    HaksikFri: {
        screen: props => <Haksik DoW="fri" navigation={props.navigation} meal={props.screenProps.meal.mealFri} onRefresh={props.screenProps.onRefresh}/>,
        navigationOptions: {
            title:'금'
        }
    }, 
}, foodTopTabNavigationConfig);

const HakSikMain = ({navigation}) => {
    const [ data, setData ] = useState({});
    const onRefresh = async (currentWeekToString) => {
        const crawl = await HaksikAPI();
        await AsyncStorage.setItem('storedHaksikWeek', currentWeekToString);
        await AsyncStorage.setItem('storedHaksik', JSON.stringify(crawl));
        const data = await AsyncStorage.getItem('storedHaksik');
        await setData(JSON.parse(data));
    }
    const getHaksikData = async (currentWeek = "-1") => {
        const storedWeek = await AsyncStorage.getItem('storedHaksikWeek');
        if(currentWeek === "-1" || storedWeek == null || storedWeek !== currentWeek) {
            await onRefresh(currentWeek);
        } else {
            const data = await AsyncStorage.getItem('storedHaksik');
            setData(JSON.parse(data));
        }
    }

    useEffect(() => {
        getHaksikData(getWeek(new Date()).toString());
    }, [])

    return <HaksikTabNavigator navigation={navigation} screenProps={{ meal: data, onRefresh: () => {onRefresh(getWeek(new Date()).toString())} }}/>
}

HakSikMain.navigationOptions = {
    headerTitle: '백두관 식당',
};
HakSikMain.router = HaksikTabNavigator.router;

export default HakSikMain;