import React, { Component } from 'react';
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

export default class Bus extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
        
    }

    static navigationOptions = ({ navigation }) => {
        return {
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
                    navigation.navigate(`Detail`);
                }}> 
                   <Image 
                    style={{width:30, height:32, marginRight:15, marginTop:5}}
                    source={require('../../../images/Info.png')}/>
                </TouchableOpacity>
                </View>
            ),
        } 
    }

    getHaksik = async (isRefresh = false) => {
        let haksikItem = await AsyncStorage.getItem('storedHaksik');
        let week = getWeek(new Date());
        if(isRefresh || haksikItem === null) {
            let data = await HaksikAPI();
            await AsyncStorage.setItem('storedHaksikWeek', week.toString());
            await AsyncStorage.setItem('storedHaksik', JSON.stringify(data));
            haksikItem = await AsyncStorage.getItem('storedHaksik');
        }
        let haksikJson = JSON.parse(haksikItem);
        this.setState({haksik: haksikJson})
    }

    getDormitory = async (isRefresh = false) => {
        let dormitoryItem = await AsyncStorage.getItem('storedDormitory');
        let week = getWeek(new Date());
        if(isRefresh || dormitoryItem === null) {
            let data = await DormitoryAPI();
            await AsyncStorage.setItem('storedDormitoryWeek', week.toString());
            await AsyncStorage.setItem('storedDormitory', JSON.stringify(data));
            dormitoryItem = await AsyncStorage.getItem('storedDormitory');
        }
        let dormitoryJson = JSON.parse(dormitoryItem);
        this.setState({dormitory: dormitoryJson});
    }

    componentDidMount = async () => {
        this.getHaksik();
        this.getDormitory();
    }

    render = () => {
        return (
            <ScrollView contentContainerStyle={mainScreen.busView} >
            <SmartBlock name="스마트 출첵" />
            <Bustime name="버스 시간" />
                {/* <Swiper style={mainScreen.swiperStyle} containerStyle={mainScreen.swiperContainerStyle} showsPagination={false}> */}
                    <HaksikCard name="오늘의 학식" navigation={this.props.navigation} meal={this.state.haksik} onRefresh={() => this.getHaksik(true)}/>
                    <DormCard name="오늘의 숙사밥" navigation={this.props.navigation} meal={this.state.dormitory} onRefresh={() => this.getDormitory(true)}/>
                {/* </Swiper> */}
            </ScrollView>
        )
    }
}

class SmartBlock extends Component {
    constructor(props) {
        super(props);
        this.state={};
    }
    
render() {
    return (
        <TouchableOpacity style={mainScreen.blockView} onPress = {() => Linking.openURL("https://elearning.jejunu.ac.kr/")}>
        {/* <View style={mainScreen.blockView}>
        <Text style={mainScreen.blockViewTitleText}>{this.props.name}</Text>
            <View style={{...mainScreen.blockViewTitle, backgroundColor: '#ffffff'}}>
              
            </View>
            <View style={mainScreen.blockViewContainer}>
                 <Text style={{textAlign:"center", height:70}}>출첵하러 가기!</Text>
            </View>
        </View> */}
    
        <View style={{borderColor:"#021E44",borderWidth:1.2, borderRadius:10}}>
        
          <View style={{justifyContent:'center', alignItems:'center', paddingVertical: 10}}>
            <Text style={{ fontWeight: 'bold', fontSize: normalize(10), color:"#021E44"}}>스마트 출첵</Text>
          </View>
        </View>
        </TouchableOpacity>
        )
    }
}

