import React, { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-community/async-storage';
import { Text, TouchableOpacity } from 'react-native';
import { mainScreen } from '../../../styles/busStyle';
import busCardStyle from '../../../styles/busCardStyle';
import TodayCard from '../component/TodayCard';
import getWeek from '../../../../tool/getWeek';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { normalize } from 'react-native-elements';
import colorPalette from '../../../styles/colorPalette';
import { HaksikAPI } from '../../../../tool/jedaero';

const HaksikCard = ({navigation}) => {
    const [food, setFood] = useState(null);

    const getHaksik = async (isRefresh = false) => {
        let haksikItem = await AsyncStorage.getItem('storedHaksik');
        const week = getWeek(new Date());
        if(isRefresh || haksikItem === null) {
            const data = await HaksikAPI();
            await AsyncStorage.setItem('storedHaksikWeek', week.toString());
            await AsyncStorage.setItem('storedHaksik', JSON.stringify(data));
            haksikItem = await AsyncStorage.getItem('storedHaksik');
        }
        const meal = JSON.parse(haksikItem);
        setFood(buildData(meal));
    }

    const buildData = meal => {
        if(meal) {
            const currentDate = new Date().getDay();
            let food;
            switch(currentDate) {
                case 1: food = meal.mealMon; break;
                case 2: food = meal.mealTue; break;
                case 3: food = meal.mealWed; break;
                case 4: food = meal.mealThu; break;
                case 5: food = meal.mealFri; break;
                case 6: food = meal.mealSat ? meal.mealSat : meal.mealMon; break;
                case 0: food = meal.mealSun ? meal.mealSun : meal.mealMon; break;
                default: food = meal.mealMon; break;
            }
            let combo = food.combo.split("\n");
            let special = food.special.split("\n");
            let dinner = food.dinner.split("\n");
            let western = food.western.split("\n");
            return {
                combo: combo.join(' '),
                special: special.join(' '),
                dinner: dinner.join(' '),
                western: western.join(' ')
            };
        }
        return {};
    }

    // componentDidMount
    useEffect(() => {getHaksik()}, []);

    const onPressContainer = () => navigation.navigate(['HaksikMon', 'HaksikMon', 'HaksikTue', 'HaksikWed', 'HaksikThu', 'HaksikFri', 'HaksikMon'][new Date().getDay()]);

    const RefreshComponent = () => (
        <TouchableOpacity onPress={getHaksik}>
            <Icon name="refresh" color={colorPalette.cardBackgroundColor} size={normalize(16)} />
        </TouchableOpacity>
    )

    return (
        <TodayCard name="오늘의 학식" onPressContainer={onPressContainer} headerRight={<RefreshComponent />} containerStyle={{flexDirection: 'column'}}>
            <Text style={mainScreen.foodBlockContainerTitle}>정식 </Text><Text numberOfLines={1} style={busCardStyle.foodBlockContainerText}>{food? food.combo : '없어요'}</Text>
            <Text style={mainScreen.foodBlockContainerTitle}>특식 </Text><Text numberOfLines={1} style={busCardStyle.foodBlockContainerText}>{food? food.special : '없어요'}</Text>
            <Text style={mainScreen.foodBlockContainerTitle}>양식 </Text><Text numberOfLines={1} style={busCardStyle.foodBlockContainerText}>{food? food.western : '없어요'}</Text>
            <Text style={mainScreen.foodBlockContainerTitle}>저녁 </Text><Text numberOfLines={1} style={busCardStyle.foodBlockContainerText}>{food? food.dinner : '없어요'}</Text>
        </TodayCard>
    )

}

export default HaksikCard;
