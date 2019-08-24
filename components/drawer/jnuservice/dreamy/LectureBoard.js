import React, {useState, useEffect} from 'react'
import { View, TouchableOpacity, Text, FlatList, StyleSheet, ActivityIndicator, ScrollView, TextInput} from 'react-native';
import { getLectureBoardData } from '../../../../service/jedaeroService';
import colorPalette from '../../../styles/colorPalette';
import { normalize, Input } from 'react-native-elements';
import Picker from 'react-native-picker-select';
import Icon from 'react-native-vector-icons/Ionicons';
import semesterData from '../../../../jsons/semesterMap';

const getSemester = (month) => {
    if(month === 0) return 21;
    else if(month >= 1 && month <= 5) return 10;
    else if(month === 6) return 11;
    else if(month >= 7 && month <= 11) return 20;
    else return 0;
}

const LectureBoard = ({navigation}) => {
    const [lectureBoard, setLectureBoard] = useState(null);
    const today = new Date();
    const [year, setYear] = useState(today.getFullYear().toString());
    const [semester, setSemester] = useState(getSemester(today.getMonth()));
    const getLectureBoard = async () => {
        setLectureBoard(await getLectureBoardData(year, semester));
    }
    useEffect(() => { getLectureBoard(); }, []); 
    const renderLectureHeader = () => (
        <View style={styles.lectureItemContainer}>
           <View style={styles.itemLeftContainer}>
                <Text style={{...styles.lectureItemText, color: colorPalette.cardBackgroundColor}}>수강반</Text>
            </View>
            <View style={styles.itemRightContainer}>
                <Text style={styles.lectureItemText}>과목명</Text>
            </View>
        </View>
    )
    const renderLecture = ({item: {classCode, lectureName, professorName, professorCode, lectureCode}}) => (
        <TouchableOpacity style={styles.lectureItemContainer} onPress={() => navigation.navigate("LectureItemBoard", { lectureDetail: {lectureCode, professorName, professorCode, lectureName}, lectureName, classCode, year, semester })}>
            <View style={styles.itemLeftContainer}>
                <Text style={{...styles.lectureItemText, color: colorPalette.cardBackgroundColor}}>{classCode}</Text>
            </View>
            <View style={styles.itemRightContainer}>
                <Text style={styles.lectureItemText}>{lectureName}</Text>
            </View>
        </TouchableOpacity>
    )

    const renderEmpty = () => (
        <Text style={styles.emptyItem}>과목이 없어요</Text>
    )

    return !lectureBoard ? (
        <View style={{alignItems: 'center', paddingTop:20, flex:1}}>
            <ActivityIndicator size='large' color={colorPalette.mainColor}/>
        </View>
    ) :
    (lectureBoard === {} ? (
        <View><Text>오류가 있어유</Text></View>
    ) : (
        <ScrollView>
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
                <TouchableOpacity style={{backgroundColor: colorPalette.mainColor, paddingVertical: 8, paddingHorizontal: 16, borderRadius: 4,}} onPress={() => getLectureBoard()}>
                    <Text style={{fontSize: 14, color: colorPalette.cardBackgroundColor, fontWeight: 'bold'}}>조회</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={lectureBoard.lectures}
                keyExtractor={item => item.classCode}
                renderItem={renderLecture}
                contentContainerStyle={styles.lectureListContainer}
                ListHeaderComponent={renderLectureHeader}
                nestedScrollEnabled={true}
                ListEmptyComponent={renderEmpty}
            />
        </ScrollView>
    ))
}

LectureBoard.navigationOptions = {
    title: '수강게시판'
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
    yearInput: {
        fontSize: normalize(14),
        paddingHorizontal: 8,
        paddingVertical: 12,
        backgroundColor: colorPalette.cardBackgroundColor,
    },
    submitButton: {
        fontSize: normalize(14),
        fontWeight: 'bold',
    },  
    lectureListContainer: {
        borderRadius: 8,
        overflow: 'hidden',
        marginHorizontal: 16,
        marginTop: 32,
        borderColor: colorPalette.cardBorderColor,
        borderWidth: 0.5,
    },
    lectureItemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colorPalette.cardBackgroundColor,
        borderBottomWidth: 0.5,
        borderBottomColor: colorPalette.cardBorderColor,
    },
    lectureItemText: {
        fontSize: normalize(14),
        textAlign: 'center'
    },
    itemLeftContainer: {
        flex: 1,
        backgroundColor: colorPalette.mainColor,
        paddingVertical: 16,
    },
    itemRightContainer: {
        flex: 3,
        paddingVertical: 16,
    },
    emptyItem: {
        fontSize: normalize(14),
        textAlign: 'center',
        paddingVertical: 32,
    }
})

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

export default LectureBoard