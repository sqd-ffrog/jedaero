
import React, { useState, useEffect } from 'react'; 
import { View, Text, ActivityIndicator } from 'react-native';
import colorPalette from '../../../styles/colorPalette';
import { getCreditCurrentData, getEvlStateData } from '../../../../service/jedaeroService';

const CreditCurrent = ({navigation}) => {
    const [CreditCurrent, setCreditCurrent] = useState(null);
    const [EvlState, setEvlState] = useState(null);

    const getCreditCurrent = async() => {
        setCreditCurrent(await getCreditCurrentData());
    }
    const getEvlState = async () => {
        setEvlState(await getEvlStateData());
    }
   
    useEffect(() => {getCreditCurrent(), getEvlState()}, []);
    console.log(CreditCurrent); 
    console.log(EvlState);
    return (EvlState === 'Y') ? (  
        <View>
            <Text>강의평가 먼저 완료 해주세오!</Text>
        </View>
    ): ( 
        CreditCurrent === { } ? (
            <View style={{alignItems: 'center', paddingTop:20, flex:1}}>
                <ActivityIndicator size='large' color={colorPalette.mainColor}/>
            </View>
        ) : (  
            <View>
                <Text>성적나가유~</Text>
            </View>
        )
    ) 
};  
 
CreditCurrent.navigationOptions = {
    title: "현재 학기 성적조회"
}
export default CreditCurrent;