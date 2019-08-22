import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { Text } from 'react-native';
import { mainScreen } from '../../../styles/busStyle';
import busCardStyle from '../../../styles/busCardStyle';
import TodayCard from '../component/TodayCard';
import getWeek from '../../../../tool/getWeek';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { normalize } from 'react-native-elements';
import colorPalette from '../../../styles/colorPalette';
import { DormitoryAPI } from '../../../../tool/jedaero';

const DormCard = ({navigation}) => {
    const [food, setFood] = useState(null);

    const getDormitory = async (isRefresh = false) => {
        let dormitoryItem = await AsyncStorage.getItem('storedDormitory');
        const week = getWeek(new Date());
        if(isRefresh || dormitoryItem === null) {
            const data = await DormitoryAPI();
            await AsyncStorage.setItem('storedDormitoryWeek', week.toString());
            await AsyncStorage.setItem('storedDormitory', JSON.stringify(data));
            dormitoryItem = await AsyncStorage.getItem('storedDormitory');
        }
        const meal = JSON.parse(dormitoryItem);
        setFood(buildData(meal));
    }
    const buildData = meal => {
        if(meal) {
            let currentDate = new Date().getDay();
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

            let dawn = food.dawn.split('\n');
            let breakfast = food.breakfast.split('\n');
            let lunch = food.lunch.split('\n');
            let dinner = food.dinner.split('\n');
            return {
                dawn: dawn.join(' '),
                breakfast: breakfast.join(' '),
                lunch: lunch.join(' '),
                dinner: dinner.join(' ')
            };
        }
        return {};
    }
    // componentDidMount
    useEffect(() => {getDormitory()}, [])

    const onPressContainer = () => navigation.navigate(['dormMon', 'dormMon', 'dormTue', 'dormWed', 'dormThu', 'dormFri', 'dormSat'][new Date().getDay()]);
    
    const RefreshComponent = () => (
        <TouchableOpacity onPress={getDormitory}>
            <Icon name="refresh" color={colorPalette.cardBackgroundColor} size={normalize(16)} />
        </TouchableOpacity>
    )

    return (
        <TodayCard name="오늘의 숙사밥" onPressContainer={onPressContainer} headerRight={<RefreshComponent />} containerStyle={{flexDirection: 'column'}}>
            <Text style={mainScreen.foodBlockContainerTitle}>조기 </Text>
            <Text numberOfLines={1} style={busCardStyle.foodBlockContainerText}>{food? food.dawn : '없어요'}</Text>
            <Text style={mainScreen.foodBlockContainerTitle}>아침 </Text>
            <Text numberOfLines={1} style={busCardStyle.foodBlockContainerText}>{food? food.breakfast : '없어요'}</Text>
            <Text style={mainScreen.foodBlockContainerTitle}>점심 </Text>
            <Text numberOfLines={1} style={busCardStyle.foodBlockContainerText}>{food? food.lunch : '없어요'}</Text>
            <Text style={mainScreen.foodBlockContainerTitle}>저녁 </Text>
            <Text numberOfLines={1} style={busCardStyle.foodBlockContainerText}>{food? food.dinner : '없어요'}</Text>
        </TodayCard>
    )
}

export default DormCard;