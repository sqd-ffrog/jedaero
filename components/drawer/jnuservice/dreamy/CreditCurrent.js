
import React, { useState, useEffect } from 'react' 
import { View, Text } from 'react-native'
import { getCreditCurrentData } from '../../../../service/jedaeroService';

const CreditCurrent = ({navigation}) => {
    const [CreditCurrent, setCreditCurrent] = useState(null);
    const getCreditCurrent = async() => {
        setCreditCurrent(await getCreditCurrentData());
    }
    useEffect(() => {getCreditCurrent()}, []);
    console.log(CreditCurrent);     
    return (  
       <View>  
           <Text>현재 학기 성적 조회</Text>
       </View>
    );  
};  
 
CreditCurrent.navigationOptions = {
    title: "현재 학기 성적조회"
}
export default CreditCurrent;