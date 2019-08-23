import React, {useState, useEffect} from 'react'
import { View, Text, ScrollView, FlatList, ActivityIndicator } from 'react-native';
import { TextInput, Button } from 'react-native-elements';
import { getLecturePlanList } from '../../../../service/jedaeroService';
import colorPalette from '../../../styles/colorPalette';

const LectureItem = () => (<View><Text>하나의 아이템</Text></View>)
const SearchHeader = () => (<View><Text>대굴빡</Text></View>)
const LecturePlan = () => {
    const date = new Date();
    // const [year, setYear] = useState(date.getFullYear());
    const [year, setYear] = useState(2018);
    // const [semester, setSemester] = useState([21, 10, 10, 10, 10, 10, 11, 20, 20, 20, 20, 20][date.getMonth()])
    const [semester, setSemester] = useState(10)
    const [classCode, setClassCode] = useState('');
    const [professorName, setProfessorName] = useState('');
    const [lectureName, setLectureName] = useState('머신러닝');
    const [data, setData] = useState([]);
    const [isLoading, setLoading] = useState(false);

    const getData = async () => {
        await setLoading(false);
        await setData(await getLecturePlanList({year, semester, search:{classCode, professorName, lectureName}}));
        await setLoading(false);
    }
    useEffect(() => {
        getData();
    }, []);
    useEffect(() => {Array.isArray(data) && data.length > 0 && console.log(data)}, [data])
    return isLoading ? (
        <View style={{alignItems: 'center', paddingTop:20, flex:1}}>
            <ActivityIndicator size='large' color={colorPalette.mainColor}/>
        </View>
    ) : (
        <FlatList 
            data={data}
            ListHeaderComponent={<SearchHeader {...{setYear, setSemester, setClassCode, setProfessorName, setLectureName}} />}
            renderItem = {LectureItem}
        />
    )
}

LecturePlan.navigationOptions = {
    title: "교수계획서"
}
export default LecturePlan;