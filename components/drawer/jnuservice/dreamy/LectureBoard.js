import React, {useState, useEffect} from 'react'
import { View, TouchableOpacity, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { getLectureBoardData } from '../../../../service/jedaeroService';
import colorPalette from '../../../styles/colorPalette';
import { normalize } from 'react-native-elements';

const LectureBoard = ({navigation}) => {
    const [lectureBoard, setLectureBoard] = useState(null);
    const [year, setYear] = useState(2014);
    const [semester, setSemester] = useState(20);
    const getLectureBoard = async () => {
        setLectureBoard(await getLectureBoardData(year, semester));
    }
    useEffect(() => {
        getLectureBoard();
    }, []);
    
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
    const renderLecture = ({item: {classCode, lectureName}}) => (
        <TouchableOpacity style={styles.lectureItemContainer} onPress={() => navigation.navigate("LectureItemBoard", { lectureName, classCode, year, semester })}>
            <View style={styles.itemLeftContainer}>
                <Text style={{...styles.lectureItemText, color: colorPalette.cardBackgroundColor}}>{classCode}</Text>
            </View>
            <View style={styles.itemRightContainer}>
                <Text style={styles.lectureItemText}>{lectureName}</Text>
            </View>
        </TouchableOpacity>
    )

    return !lectureBoard ? (
        <View style={{alignItems: 'center', paddingTop:20, flex:1}}>
            <ActivityIndicator size='large' color={colorPalette.mainColor}/>
        </View>
    ) :
    (lectureBoard === {} ? (
        <View><Text>오류가 있어유</Text></View>
    ) : (
        <FlatList
            data={lectureBoard.lectures}
            keyExtractor={item => item.classCode}
            renderItem={renderLecture}
            contentContainerStyle={styles.lectureListContainer}
            ListHeaderComponent={renderLectureHeader}
        />
    ))
}

LectureBoard.navigationOptions = {
    title: '수강게시판'
}

const styles = StyleSheet.create({
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
    }
})
export default LectureBoard