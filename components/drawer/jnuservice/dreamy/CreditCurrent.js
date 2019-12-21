
import React, { useState, useEffect } from 'react'; 
import { View, Text, ActivityIndicator, FlatList } from 'react-native';
import colorPalette from '../../../styles/colorPalette';
import { getCreditCurrentData, getEvlStateData } from '../../../../service/jedaeroService';

const CreditCurrent = ({navigation}) => {
    const [creditCurrent, setCreditCurrent] = useState(null);  
    const [evlState, setEvlState] = useState(null); 

    const getCreditCurrent = async() => {
        setCreditCurrent(await getCreditCurrentData());
    }
    //TODO year , semester 받아서 넘겨야함  
    const getEvlState = async () => {
        setEvlState(await getEvlStateData());
    }
   
    useEffect(() => {getCreditCurrent() ,console.log(creditCurrent);}, []);
    useEffect(() => {getEvlState(), console.log(evlState);}, []);
     
    
    const creditHeader = () => {
        const { userInfo: {name , major, eName, number} }  = creditCurrent;
        return (
            <View>
                <Text>{name}</Text>
                <Text>{major}</Text>
                <Text>{eName}</Text> 
                <Text>{number}</Text>
            </View>
        );
    }  
    const renderCreditRow = ({item: {name, eName, major, number}}) => (
        <View>
            <Text>{name}</Text>
            <Text>{major}</Text>
            <Text>{eName}</Text>
            <Text>{number}</Text> 
        </View>
    )
 
   return !evlState && !creditCurrent ? (
         <View style={{alignItems: 'center', paddingTop:20, flex:1}}>
            <ActivityIndicator size='large' color={colorPalette.mainColor}/>
        </View>
       ) : (   
        <FlatList 
        data={creditCurrent.userInfo}  
        keyExtractor={item => `${item.name}${item.eName}`}
        ListHeaderComponent={creditHeader}
        renderItem={renderCreditRow} 
        />   
       )
};  
 
CreditCurrent.navigationOptions = {
    title: "현재 학기 성적조회"
}
export default CreditCurrent;