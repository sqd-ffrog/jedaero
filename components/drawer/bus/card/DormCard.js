import React, {useState, useEffect} from 'react';
import { Text } from 'react-native';
import { mainScreen } from '../../../styles/busStyle';
import busCardStyle from '../../../styles/busCardStyle';
import TodayCard from '../component/TodayCard';

const DormCard = ({name, navigation, meal, onRefresh}) => {
    const [food, setFood] = useState(null);
    const buildData = meal => {
        console.log(meal);
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
            return {food: {
                dawn: dawn.join(' '),
                breakfast: breakfast.join(' '),
                lunch: lunch.join(' '),
                dinner: dinner.join(' ')
            }};
        }
        return {};
    }

    // componentDidMount
    useEffect(() => setFood(buildData(meal).food), [])
    // componentWillReceiveProps
    useEffect(() => setFood(buildData(meal).food), [meal])

    const onPressContainer = () => navigation.navigate(['dormMon', 'dormMon', 'dormTue', 'dormWed', 'dormThu', 'dormFri', 'dormSat'][new Date().getDay()]);
    
    return (
        <TodayCard name={name} onPressContainer={onPressContainer} onPressRefreshButton={onRefresh}>
            <Text style={mainScreen.foodBlockContainerTitle}>조기 </Text><Text numberOfLines={1} style={busCardStyle.foodBlockContainerText}>{food? food.dawn : '없어요'}</Text>
            <Text style={mainScreen.foodBlockContainerTitle}>아침 </Text><Text numberOfLines={1} style={busCardStyle.foodBlockContainerText}>{food? food.breakfast : '없어요'}</Text>
            <Text style={mainScreen.foodBlockContainerTitle}>점심 </Text><Text numberOfLines={1} style={busCardStyle.foodBlockContainerText}>{food? food.lunch : '없어요'}</Text>
            <Text style={mainScreen.foodBlockContainerTitle}>저녁 </Text><Text numberOfLines={1} style={busCardStyle.foodBlockContainerText}>{food? food.dinner : '없어요'}</Text>
        </TodayCard>
    )
}

export default DormCard;