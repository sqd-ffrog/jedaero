import React, { Component } from 'react'
import { View, Text,Image,TouchableOpacity } from 'react-native';
import Comu from 'react-native-communications';
import { normalize } from 'react-native-elements';
import PinchZoom from 'react-native-pinch-zoom-view';
import colorPalette from '../../../styles/colorPalette';

const CallBlock = ({tel}) => tel !== "" && (
    <TouchableOpacity style = {{flex:1, opacity:0.7, backgroundColor:colorPalette.mainColor, justifyContent:'center', alignItems:'center'}}onPress={()=> Comu.phonecall(tel,true)}>
        <Text style={{color:'#ffffff', fontSize:normalize(20)}}>전화걸기</Text>
    </TouchableOpacity>
)

const DetailMenu = ({navigation}) => {
    const item = navigation.state.params;
    return (
        <View style={{flex: 1}}>
                <PinchZoom style={{flex : 6}}>
                    <Image 
                    style={{width:'100%', height:'100%', resizeMode: 'contain'}}
                    source={{uri:item.images}}/>
                </PinchZoom>
                   <CallBlock tel={item.tel} />
                
        </View>
    )
}

DetailMenu.navigationOptions = ({navigation}) => {
    return {
        title: navigation.getParam('name', "정보 없음")
    }
};

export default DetailMenu;

