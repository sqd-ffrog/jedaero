import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, ScrollView, RefreshControl } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { createMaterialTopTabNavigator } from 'react-navigation';
import { DormitoryAPI } from '../../../../tool/jedaero';
import { foodTabNavStyles } from '../../../styles/jedaeroCSS';
import { foodTopTabNavigationConfig } from '../../../navigations/navigationConfigs';
import getWeek from '../../../../tool/getWeek';
import d_time from '../../../../jsons/d_time.json';
import colorPalette from '../../../styles/colorPalette';

const Dorm = ({meal, onRefresh}) => {
  const [isRefresh, setRefresh] = useState(false);

  return !meal ? (
    <View style={{ flex: 1, alignItems: 'center', paddingTop: 20, backgroundColor:colorPalette.backgroundColor }}>
      <ActivityIndicator size='large' color='#344955' />
    </View>
  ) : (
    <View style={{flex: 1, backgroundColor: colorPalette.backgroundColor}}>
      <ScrollView contentContainerStyle={foodTabNavStyles.scrollContainer}
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
        <DormList title="조기" food={meal.dawn} time={d_time.dawn} color={colorPalette.mainColor}/>
        <DormList title="아침" food={meal.breakfast} time={d_time.breakfast} color={colorPalette.mainColor}/>
        <DormList title="점심" food={meal.lunch} time={d_time.lunch} color={colorPalette.mainColor} />
        <DormList title="저녁" food={meal.dinner} time={d_time.dinner} color={colorPalette.mainColor}/>
      </ScrollView>
    </View>
  )
}

const DormList = ({title, food, time, color}) => (
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

const DormTap = createMaterialTopTabNavigator(
  {
    dormMon: {
      screen: (props) => <Dorm DoW="mon" navigation={props.navigation} meal={props.screenProps.meal.mealMon} onRefresh={props.screenProps.onRefresh}/>,
      navigationOptions: {
        title: "월"
      }
    },
    dormTue: {
      screen: (props) => <Dorm DoW="tue" navigation={props.navigation} meal={props.screenProps.meal.mealTue} onRefresh={props.screenProps.onRefresh}/>,
      navigationOptions: {
        title: "화"
      }
    },
    dormWed: {
      screen: (props) => <Dorm DoW="wed" navigation={props.navigation} meal={props.screenProps.meal.mealWed} onRefresh={props.screenProps.onRefresh}/>,
      navigationOptions: {
        title: "수"
      }
    },
    dormThu: {
      screen: (props) => <Dorm DoW="thu" navigation={props.navigation} meal={props.screenProps.meal.mealThu} onRefresh={props.screenProps.onRefresh}/>,
      navigationOptions: {
        title: "목"
      }
    },
    dormFri: {
      screen: (props) => <Dorm DoW="fri" navigation={props.navigation} meal={props.screenProps.meal.mealFri} onRefresh={props.screenProps.onRefresh}/>,
      navigationOptions: {
        title: "금"
      }
    },
    dormSat: {
      screen: (props) => <Dorm DoW="sat" navigation={props.navigation} meal={props.screenProps.meal.mealSat} onRefresh={props.screenProps.onRefresh}/>,
      navigationOptions: {
        title: "토"
      }
    },
  }, foodTopTabNavigationConfig
);

const DormitoryMain = ({navigation}) => {
  const [data, setData] = useState({});
  const onRefresh = async (currentWeek) => {
    const crawl = await DormitoryAPI();
    await AsyncStorage.setItem('storedDormitoryWeek', currentWeek);
    await AsyncStorage.setItem('storedDormitory', JSON.stringify(crawl));
    const data = await AsyncStorage.getItem('storedDormitory');
    setData(JSON.parse(data));
  }

  const getDormitoryFood = async (currentWeek = "-1") => {
    const storedWeek = await AsyncStorage.getItem('storedDormitoryWeek');
    if(currentWeek === "-1" || storedWeek == null || storedWeek !== currentWeek) {
      await onRefresh(currentWeek);
    } else {
      const data = await AsyncStorage.getItem('storedDormitory');
      setData(JSON.parse(data))
    }
  }

  useEffect(() => {
    getDormitoryFood(getWeek(new Date()).toString());
  }, [])

  return <DormTap navigation={navigation} screenProps={{meal: data, onRefresh: () => {onRefresh(getWeek(new Date()).toString())}}}/>
}

DormitoryMain.navigationOptions = {
  title:"기숙사 식당"
}
DormitoryMain.router = DormTap.router;

export default DormitoryMain;