import React, {useState, useEffect, Fragment} from 'react'
import { View, Text, ScrollView, FlatList, ActivityIndicator, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import { Input, Button } from 'react-native-elements';
import { getLecturePlanList } from '../../../../service/jedaeroService';
import colorPalette from '../../../styles/colorPalette';
import Picker from 'react-native-picker-select';
import semesterData from '../../../../jsons/semesterMap';
import Icon from 'react-native-vector-icons/Ionicons';

const LecturePlan = ({navigation}) => {
    const date = new Date();
    const [year, setYear] = useState(date.getFullYear().toString());
    const [semester, setSemester] = useState([21, 10, 10, 10, 10, 10, 11, 20, 20, 20, 20, 20][date.getMonth()]);
    const [classCode, setClassCode] = useState('');
    const [professorName, setProfessorName] = useState('');
    const [lectureName, setLectureName] = useState('보안시스템개론');
    const [data, setData] = useState([]);
    const [isLoading, setLoading] = useState(false);

    const getData = async () => {
        if(!(year.trim() && (professorName.trim() || lectureName.trim() || classCode.trim()))) {
            Alert.alert("검색어를 정확히 입력해주세요.");
            return;
        }
        await setLoading(true);
        await setData(await getLecturePlanList({year, semester, search:{classCode, professorName, lectureName}}));
        await setLoading(false);
    }

    useEffect(() => {
        getData()
    } ,[]);

    const LectureItem = ({item: {classCode, credit, professorName, takeName, lectureCode, lectureName, time}}) => (
        <TouchableOpacity style={styles.lecture} onPress={() => navigation.navigate("LecturePlanDetail", { year, semester, classCode, lectureCode })}>
            <View style={styles.lectureHeader}>
                <Text style={styles.lectureHeaderText}>{takeName}</Text>
                <View style={{flex: 1, justifyContent: 'flex-end' ,flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={styles.lectureHeaderTextTitle}>학점</Text>
                    <Text style={styles.lectureHeaderText}>{credit}</Text>
                    <Text style={styles.lectureHeaderTextTitle}>강의실</Text>
                    <Text style={styles.lectureHeaderText}>{time}</Text>
                </View>
            </View>
            <Text style={styles.lectureClassCode}>{classCode}</Text>
            <View style={styles.lectureContent}>
                <Text style={styles.lectureName}>{lectureName}</Text>
                <Text style={styles.lectureProfessor}>{professorName}{!/폐강/.exec(professorName) && " 교수님"}</Text>
            </View>
        </TouchableOpacity>
    )

    return (
        <Fragment>
            <View style={styles.header}>
                <Text style={{fontSize: 14}}>수강학기</Text>
                <Input 
                    value={year}
                    onChangeText={year => setYear(year)}
                    maxLength={4}
                    inputStyle={{fontSize: 14, textAlign: 'center', minHeight: undefined}}
                    inputContainerStyle={{borderBottomWidth: 0.5, borderBottomColor: colorPalette.mainColor, width: 56, backgroundColor: colorPalette.cardBackgroundColor}}
                    containerStyle={{width: undefined}}
                    underlineColorAndroid={colorPalette.mainColor}
                />
                <Text>년</Text>
                <Picker 
                    placeholder={{}}
                    items={semesterData}
                    value={semester}
                    onValueChange={item => setSemester(item)}
                    style={pickerSelectStyles}
                    useNativeAndroidPickerStyle={false}
                    Icon={() => (<Icon name="md-arrow-dropdown" size={24} color={colorPalette.mainColor} style={{marginRight: 5}} />)}
                />
            </View>
            {
                isLoading ? (
                    <View style={{alignItems: 'center', paddingTop:20, flex:1}}>
                        <ActivityIndicator size='large' color={colorPalette.mainColor}/>
                    </View>
                ) : (<ScrollView>
                        <View style={styles.searchHeader}>
                            <Input label="수강반번호" value={classCode} onChangeText={classCode => setClassCode(classCode)} labelStyle={styles.label} containerStyle={styles.searchContainer} inputStyle={styles.searchInput}/>
                            <Input label="교수이름" value={professorName} onChangeText={professorName => setProfessorName(professorName)} labelStyle={styles.label} containerStyle={styles.searchContainer} inputStyle={styles.searchInput}/>
                            <Input label="강의명" value={lectureName} onChangeText={lectureName => setLectureName(lectureName)} labelStyle={styles.label} containerStyle={styles.searchContainer} inputStyle={styles.searchInput}/>
                            <Button title="조회" type="solid" color={colorPalette.mainColor} buttonStyle={{backgroundColor: colorPalette.mainColor, margin: 8}} onPress={getData}/>
                        </View>
                        <FlatList 
                            data={data}
                            renderItem = {LectureItem}
                            keyExtractor={item => item.classCode}
                            nestedScrollEnabled={true}
                        />
                    </ScrollView>
                )
            }
        </Fragment>
        
    )
}

LecturePlan.navigationOptions = {
    title: "교수계획서"
}

const styles = StyleSheet.create({
    header: {
        paddingHorizontal: 16,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        borderBottomColor: colorPalette.cardBorderColor,
        borderBottomWidth: 0.5,
    },
    label: {
        fontSize: 12,
        color: colorPalette.mainColor
    },
    searchContainer: {
        paddingVertical: 8,
    },
    searchInput: {
        fontSize: 14
    },
    lecture: {
        marginHorizontal: 16,
        marginVertical: 8,
        borderRadius: 8,
        borderColor: colorPalette.cardBorderColor,
        borderWidth: 0.5,
        backgroundColor: colorPalette.cardBackgroundColor,
        padding: 16,
    },
    lectureHeader: {
        paddingBottom: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    lectureHeaderText: {
        fontSize: 11,
        marginRight: 8,
    },
    lectureHeaderTextTitle: {
        fontSize: 11,
        marginRight: 4,
        color: colorPalette.mainColor
    },
    lectureClassCode: {
        fontSize: 12,
        color: colorPalette.subTextColor,
    },
    lectureContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    lectureName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    lectureProfessor: {
        fontSize: 14
    },
    searchHeader: {
        marginHorizontal: 16,
        borderRadius: 8,
        backgroundColor: colorPalette.cardBackgroundColor,
        borderColor: colorPalette.cardBorderColor,
        borderWidth: 0.5,
        overflow: 'hidden',
        marginVertical: 4,
    }
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
      fontSize: 14,
      paddingVertical: 12,
      paddingHorizontal: 10,
      color: colorPalette.mainColor,
      paddingRight: 24, // to ensure the text is never behind the icon
    },
    inputAndroid: {
      fontSize: 14,
      paddingHorizontal: 10,
      paddingVertical: 8,
      color: colorPalette.mainColor,
      paddingRight: 24, // to ensure the text is never behind the icon
    },
    iconContainer: {
        top: 10,
    },
});
export default LecturePlan;