import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, TouchableOpacity, StyleSheet, Image, Linking} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { normalize } from 'react-native-elements';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { HaksikAPI, DormitoryAPI } from '../../../tool/jedaero';
import getWeek from '../../../tool/getWeek';

import { mainScreen } from '../../styles/busStyle';
import busCardStyle from '../../styles/busCardStyle';
import DormCard from './card/DormCard';
import HaksikCard from './card/HaksikCard';
import Bustime from './card/BusTime';
import colorPalette from '../../styles/colorPalette';

const Bus = ({navigation}) => (
    <View style={{flex: 1, backgroundColor: colorPalette.backgroundColor}}>
        <ScrollView contentContainerStyle={mainScreen.busView} >
            <SmartBlock name="스마트 출첵" />
            <Bustime name="버스 시간" />
            <HaksikCard navigation={navigation}/>
            <DormCard navigation={navigation}/>
        </ScrollView>
    </View>
)

Bus.navigationOptions = ({ navigation }) => ({
    headerTitle: '홈',
    //TODO 개발자정보& 띄우기
    headerRight: (
        <View style={{flexDirection:"row"}}>
        {/* <TouchableOpacity>
            <Image style={{width:30, height:30, marginRight:15, marginTop:5}}
                source={require('../../../images/share.png')}      
            />
        </TouchableOpacity>  */}
        <TouchableOpacity  onPress={() => {
            navigation.navigate(`Info`);
        }}> 
            <Image 
            style={{width:30, height:32, marginRight:15, marginTop:5}}
            source={require('../../../images/Info.png')}/>
        </TouchableOpacity>
        </View>
    ),
})

const SmartBlock = () => (
    <TouchableOpacity style={mainScreen.blockView} onPress = {() => Linking.openURL("https://elearning.jejunu.ac.kr/")}>
        <View style={{borderColor:"#021E44",borderWidth:1.2, borderRadius:10, overflow: 'hidden'}}>
        
          <View style={{justifyContent:'center', alignItems:'center', paddingVertical: 10}}>
            <Text style={{ fontWeight: 'bold', fontSize: normalize(10), color:"#021E44"}}>스마트 출첵</Text>
          </View>
        </View>
    </TouchableOpacity>
)

export default Bus;

