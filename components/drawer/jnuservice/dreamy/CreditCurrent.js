
import React from 'react' 
import { View, Text } from 'react-native'
import CreditDetail from './CreditDetail'

const CreditCurrent = ({navigation}) => {
    return ( 
       <View>
           <Text>성적조회란</Text>
       </View>
    );  
};  
 
CreditCurrent.navigationOptions = {
    title: "현재 학기 성적조회"
}
export default CreditCurrent;