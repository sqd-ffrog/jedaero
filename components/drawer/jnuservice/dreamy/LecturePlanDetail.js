import React, {useState, useEffect} from 'react'
import { View, Text } from 'react-native';
import { getLecturePlanDetail } from '../../../../service/jedaeroService';

const LecturePlanDetail = ({navigation}) => {
    const [ plan, setPlan ] = useState(null);
    const {year, semester, classCode, lectureCode} = navigation.state.params;
    const getPlan = async () => setPlan(await getLecturePlanDetail({year, semester, lecture: {classCode, lectureCode}}));
    useEffect(() => {
        getPlan();
    }, []);
    return (
        <View>
            <Text>상세 ㅎㅇ</Text>
        </View>
    )
}

export default LecturePlanDetail;