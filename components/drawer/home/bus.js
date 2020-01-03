import React, {  } from 'react';
import { ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { mainScreen } from '../../styles/busStyle';
import DormCard from './card/DormCard';
import HaksikCard from './card/HaksikCard';
import { withNavigationFocus } from 'react-navigation';
import Bustime from './card/BusTime';
import SmartBlock from './card/SmartBlock';
import { checkLogin } from '../../../service/jedaeroService';

const Bus = ({navigation}) => (
    <ScrollView contentContainerStyle={mainScreen.busView} >
        {/* <SmartBlock name="스마트 출첵" /> */}
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

