import React, { Component } from 'react';
import { ScrollView, View, Text, TouchableOpacity, StyleSheet, Image, Linking} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { normalize } from 'react-native-elements';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { HaksikAPI, DormitoryAPI } from '../../../tool/jedaero';
import getWeek from '../../../tool/getWeek';
import BusTb from '../../../jsons/busschedule.json';
import BusA from '../../../tool/busA';
import BusB from '../../../tool/busB';
import BusRoute from '../../../jsons/bus_stop.json';
import { mainScreen } from '../../styles/busStyle';
import busCardStyle from '../../styles/busCardStyle';
import DormCard from './card/DormCard';

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
                    <FoodBlock name="오늘의 학식" navigation={this.props.navigation} food={this.state.haksik} onRefresh={() => this.getHaksik(true)}/>
                    <DormCard name="오늘의 숙사밥" navigation={this.props.navigation} meal={this.state.dormitory} onRefresh={() => this.getDormitory(true)}/>
                {/* </Swiper> */}
            </ScrollView>
        )
    }
}


class Bustime extends Component {
    constructor(props) {
        super(props);
        this.state= {
            selectedIndex: 0,
            //버스시간 알고리즘 리턴 값
            A: BusA(BusTb.timeTable.A, 0),
            B: BusB(BusTb.timeTable.B, 0),
            // bustop: BusTb.routeName.A
        };
        //정거장 목록
        this.data = BusRoute.routeName.A
       
    }
 
    // componentDidMount = () => this.buscheck();

    buscheck = () => {
        setInterval( () => {
            this.setState({
                A: BusA(BusTb.timeTable.A, this.state.value),
                B: BusB(BusTb.timeTable.B, this.state.value)})
            
        }, 25000)
    }

    render() {
        return(
            <View style={mainScreen.blockView}>
               <View style={{...mainScreen.blockViewTitle, backgroundColor: '#334955',}}>
                  <Text style={mainScreen.blockViewTitleText}>
                        <Text style={{color: '#d6ecfa'}}>{this.data[this.state.selectedIndex].name}</Text> {this.props.name}
                  </Text>
                  {/* <Picker 
                    ref={instance => this.dropDownPicker = instance} 
                    data={this.data} 
                    label={'name'} 
                    value={'value'}
                    onValueChange={(value, selectedIndex) => {
                          this.setState({
                            selectedIndex,
                            value,
                            A: BusA(BusTb.timeTable.A, value),
                            B: BusB(BusTb.timeTable.B, value)
                         })
                            this.buscheck()
                        }
                    }/> */}
                  <TouchableOpacity onPress={() => this.dropDownPicker.setModalVisible(true)}>
                     <Text style={busCardStyle.busStopViewer}>정류장별 보기</Text>
                  </TouchableOpacity>
                </View>
                <View style={{...mainScreen.blockViewContainer, flexDirection: 'row',}}>
                {/* A버스 시간 안내 */}
                    <View style={mainScreen.blockViewContainerMain}>
                        <Text style={mainScreen.blockTitle}>A</Text>
                        <Text style={mainScreen.busWay}>반시계방향</Text>
                    </View>
                    <View style={mainScreen.blockViewContainerSub}>
                        <Text style={mainScreen.blockText}>{this.state.A}</Text>
                    </View>
                {/* B버스 시간 안내 */}     
                    <View style={mainScreen.blockViewContainerMain}>
                        <Text style={mainScreen.blockTitle}>B</Text>
                        <Text style={mainScreen.busWay}>시계방향</Text>
                    </View>
                    <View style={mainScreen.blockViewContainerSub}>
                        <Text style={mainScreen.blockText}>{this.state.B}</Text>
                    </View>
                </View>
            </View>
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

class FoodBlock extends Component {
    constructor(props) {
        super(props);
        this.state={};
    }


    static getDerivedStateFromProps = (nextProps, prevState) => {
        return FoodBlock.buildData(nextProps.food)
    }

    static buildData(meal) {
        if(meal) {
            let currentDate = new Date();
            currentDate = currentDate.getDay();
            let food;
            switch(currentDate) {
                case 1:
                    food = meal.mealMon;
                    break;
                case 2:
                    food = meal.mealTue;
                    break;
                case 3:
                    food = meal.mealWed;
                    break;
                case 4:
                    food = meal.mealThu;
                    break;
                case 5:
                    food = meal.mealFri;
                    break;
                case 6:
                    food = meal.mealSat ? meal.mealSat : meal.mealMon;
                    break;
                case 0:
                    food = meal.mealSun ? meal.mealSun : meal.mealMon;
                default:
                    food = meal.mealMon;
                    break;
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

    componentDidMount = () => {
        this.setState(FoodBlock.buildData(this.props.food));
    }

    render() {
        const week = new Array('HaksikMon', 'HaksikMon', 'HaksikTue', 'HaksikWed', 'HaksikThu', 'HaksikFri', 'HaksikMon');
        let today = new Date().getDay();
        let day = week[today];

        const { navigation } = this.props;
        return (
            <View style={mainScreen.blockView}>
                <View style={{...mainScreen.blockViewTitle, backgroundColor: '#334955',}}>
                    <Text style={mainScreen.blockViewTitleText}>{this.props.name}</Text>
                    <TouchableOpacity
                        onPress={this.props.onRefresh}
                    >
                        <Icon name="refresh" color="#ffffff" size={normalize(16)} />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress = {() => {navigation.navigate(day)}}>
                <View style={{...mainScreen.foodViewBlockContainer, flexDirection: 'column',}}>
                    <Text style={mainScreen.foodBlockContainerTitle}>정식 </Text><Text numberOfLines={1} style={busCardStyle.foodBlockContainerText}>{this.state.food? this.state.food.combo+'\n' : '없어요\n'}</Text>
                    <Text style={mainScreen.foodBlockContainerTitle}>특식 </Text><Text numberOfLines={1} style={busCardStyle.foodBlockContainerText}>{this.state.food? this.state.food.special+'\n' : '없어요\n'}</Text>
                    <Text style={mainScreen.foodBlockContainerTitle}>양식 </Text><Text numberOfLines={1} style={busCardStyle.foodBlockContainerText}>{this.state.food? this.state.food.western+'\n' : '없어요\n'}</Text>
                    <Text style={mainScreen.foodBlockContainerTitle}>저녁 </Text><Text numberOfLines={1} style={busCardStyle.foodBlockContainerText}>{this.state.food? this.state.food.dinner+'\n' : '없어요\n'}</Text>
                </View>
                </TouchableOpacity>
            </View>
        )
    }
}
