import React, { Fragment } from 'react';
import { ScrollView, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { mainScreen } from '../../styles/busStyle';
import DormCard from './card/DormCard';
import HaksikCard from './card/HaksikCard';
import Bustime from './card/BusTime';
import { BannerAd, BannerAdSize, TestIds } from '@react-native-firebase/admob';

const Bus = ({navigation}) => (
    <Fragment>
        <ScrollView contentContainerStyle={mainScreen.busView} >
            {/* <SmartBlock name="스마트 출첵" /> */}
            <Bustime name="버스 시간" navigation={navigation}/>
            <HaksikCard navigation={navigation}/>
            <DormCard navigation={navigation}/>
        </ScrollView>
        <BannerAd
                unitId={TestIds.BANNER}
                // unitId={Platform.select({
                //     ios: 'ca-app-pub-7776918773440986/1968606849',
                //     android: 'ca-app-pub-7776918773440986/8729198188'
                // })}
                size={BannerAdSize.FULL_BANNER}
                requestOptions={{
                    requestNonPersonalizedAdsOnly: true,
                }}
                onAdLoaded={() => {
                    console.log('Advert loaded');
                }}
                onAdFailedToLoad={(error) => {
                    console.error('Advert failed to load: ', error);
                }}
        />
    </Fragment>
    
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

