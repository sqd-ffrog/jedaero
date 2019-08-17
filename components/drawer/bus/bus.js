import React, {  } from 'react';
import { ScrollView, View, Text, TouchableOpacity, Image, Linking} from 'react-native';
import { normalize } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { mainScreen } from '../../styles/busStyle';
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
    headerRight: (
        <Icon.Button 
            name="information-outline"
            onPress={() => navigation.navigate("Info")}
            color="#000000"
            backgroundColor="transparent"
            size={24}
            underlayColor="#00000022"
            iconStyle={{marginRight: 0}}
        />
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

