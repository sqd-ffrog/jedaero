import React, { useEffect } from 'react';
import { ScrollView, Platform, Dimensions, PixelRatio, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { mainScreen } from '../../styles/busStyle';
import DormCard from './card/DormCard';
import HaksikCard from './card/HaksikCard';
import Bustime from './card/BusTime';
import TodayCard from './component/TodayCard'
import { InterstitialAd, BannerAd, BannerAdSize, TestIds, AdEventType } from '@react-native-firebase/admob';
import Banner from '../../banner/Banner';

const Bus = ({navigation}) => (
    <ScrollView contentContainerStyle={mainScreen.busView} >
        {/* <SmartBlock name="스마트 출첵" /> */}
        <TodayCard name="개발자에게 힘이 되는 광고vV" containerStyle={{flexDirection: 'column', paddingHorizontal: 0, paddingVertical: 0, alignItems: 'center'}}>
            <View style={{alignContent:'flex-start', marginBottom:16}}><Banner /></View>
        </TodayCard>
        <Bustime name="버스 시간" navigation={navigation}/>
        <HaksikCard navigation={navigation}/>
        
        <DormCard navigation={navigation}/>
    </ScrollView>
)

Bus.navigationOptions = ({ navigation }) => ({
    headerTitle: '홈',
    headerRight: () => (
        <Icon.Button 
            name="settings"
            onPress={() => navigation.navigate("Info")}
            color="#000000"
            backgroundColor="transparent"
            size={24}
            underlayColor="#00000022"
            iconStyle={{marginRight: 0}}
        />
    ),
})

export default Bus;

