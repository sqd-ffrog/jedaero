import React, { useState, useEffect, Fragment } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator, SectionList } from 'react-native';
import Picker from 'react-native-picker-select';
import colorPalette from '../../../styles/colorPalette';
import { Input, Button } from 'react-native-elements';
import semesterData from '../../../../jsons/semesterMap';
import Icon from 'react-native-vector-icons/Ionicons';
import { getNonMeetingLecturesModelList } from '../../../../service/jedaeroService';
import elevationShadowStyle from '../../../../tool/elevationShadow';


function NonMeetingLectureModel( {navigation} ) {
    const date = new Date();
    const [ year, setYear ] = useState(date.getFullYear().toString());
    const [ semester, setSemester ] = useState([21, 10, 10, 10, 10, 10, 11, 20, 20, 20, 20, 20][date.getMonth()]);
    const [ model, setModel ] = useState([]);
    const [ isLoading, setLoading ] = useState(false);
    const [ size, setSize ] = useState(0);
    const getNonMeetingLectureModel = async () => {
        if(!year.trim()) {
            Alert.alert("검색어를 정확히 입력해주세요.");
            return;
        }
        await setLoading(true);
        const model = await getNonMeetingLecturesModelList({year, semester});
        await setSize(model.size);
        await setModel(model.data);
        await setLoading(false);
    }

    useEffect(() => {
        getNonMeetingLectureModel();
    }, [])
    const ModelItem = ({item: { openDepartmentName, classCode, lectureName }}) => (
        <TouchableOpacity style={styles.lecture} onPress={() => navigation.navigate("NonMeetingLectureModelDetail", { year, semester, classCode, lectureName })}>
            <View style={styles.lectureHeader}>
                <Text style={styles.lectureHeaderText}>{openDepartmentName}</Text>
            </View>
            <Text style={styles.lectureClassCode}>{classCode}</Text>
            <Text style={styles.lectureName}>{lectureName}</Text>
        </TouchableOpacity>
    )
    const ListEmptyComponent = () => (
        <View style={styles.listEmptyComponent}>
            <Text>현재 리스트가 없어요!</Text>
        </View>
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
                <TouchableOpacity style={{backgroundColor: colorPalette.mainColor, paddingVertical: 8, paddingHorizontal: 16, borderRadius: 4,}} onPress={() => getNonMeetingLectureModel()}>
                    <Text style={{fontSize: 14, color: colorPalette.cardBackgroundColor, fontWeight: 'bold'}}>조회</Text>
                </TouchableOpacity>
            </View>
            {isLoading ? (
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <ActivityIndicator style={{alignSelf: "center"}} size="large" color="#334955" />
                </View>
            ) : (
                <FlatList 
                    data={model}
                    keyExtractor={item => item.classCode}
                    renderItem={ModelItem}
                    // contentContainerStyle={styles.listContentContainerStyle}
                    ListEmptyComponent={ListEmptyComponent}
                />
            )}
        </Fragment>
    )
}

NonMeetingLectureModel.navigationOptions = props => ({
    headerTitle: "비대면 강의모델"  
})

const styles = StyleSheet.create({
    header: {
        paddingHorizontal: 16,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        borderBottomColor: colorPalette.cardBorderColor,
        borderBottomWidth: 0.5,
    },
    listEmptyComponent: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    listContentContainerStyle: {
        flex: 1,
    },
    lecture: {
        marginHorizontal: 16,
        marginVertical: 8,
        borderRadius: 8,
        borderColor: colorPalette.cardBorderColor,
        borderWidth: 0.5,
        backgroundColor: colorPalette.cardBackgroundColor,
        padding: 16,
        ...elevationShadowStyle(5),
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
export default NonMeetingLectureModel;