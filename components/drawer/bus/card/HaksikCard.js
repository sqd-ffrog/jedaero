import React, { useState, useEffect } from 'react'
import { View, Text } from 'react-native';
import { mainScreen } from '../../../styles/busStyle';
import busCardStyle from '../../../styles/busCardStyle';
import TodayCard from '../component/TodayCard';

const HaksikCard = ({name, navigation, meal, onRefresh}) => {
    const [food, setFood] = useState(null);
    const buildData = meal => {
        if(meal) {
            let currentDate = new Date();
            currentDate = currentDate.getDay();
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

            return { food: {
                combo: combo.join(' '),
                special: special.join(' '),
                dinner: dinner.join(' '),
                western: western.join(' ')
            }};
        }
        return {};
    }

    // componentDidMount
    useEffect(() => setFood(buildData(meal).food), []);
    // componentWillReceiveProps
    useEffect(() => setFood(buildData(meal).food), [meal]);

    const onPressContainer = () => navigation.navigate(['HaksikMon', 'HaksikMon', 'HaksikTue', 'HaksikWed', 'HaksikThu', 'HaksikFri', 'HaksikMon'][new Date().getDay()]);

    return (
        <TodayCard name={name} onPressContainer={onPressContainer} onPressRefreshButton={onRefresh}>
            <Text style={mainScreen.foodBlockContainerTitle}>정식 </Text><Text numberOfLines={1} style={busCardStyle.foodBlockContainerText}>{food? food.combo : '없어요'}</Text>
            <Text style={mainScreen.foodBlockContainerTitle}>특식 </Text><Text numberOfLines={1} style={busCardStyle.foodBlockContainerText}>{food? food.special : '없어요'}</Text>
            <Text style={mainScreen.foodBlockContainerTitle}>양식 </Text><Text numberOfLines={1} style={busCardStyle.foodBlockContainerText}>{food? food.western : '없어요'}</Text>
            <Text style={mainScreen.foodBlockContainerTitle}>저녁 </Text><Text numberOfLines={1} style={busCardStyle.foodBlockContainerText}>{food? food.dinner : '없어요'}</Text>
        </TodayCard>
    )

}

export default HaksikCard;
