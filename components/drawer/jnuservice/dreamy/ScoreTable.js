
import React from 'react' 
import { View, Text } from 'react-native'
import CreditDetail from './CreditDetail'

const ScoreTable = ({navigation}) => {
    return ( 
       <View>
           <Text>성적조회란</Text>
       </View>
    );  
}; 
 
ScoreTable.navigationOptions = {
    title: "현재 학기 성적조회"
}
export default ScoreTable;