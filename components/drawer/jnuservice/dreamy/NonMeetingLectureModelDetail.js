import React, {useEffect, useState, Fragment} from 'react'
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native'
import colorPalette from '../../../styles/colorPalette';
import { getNonMeetingLectureModelDetail } from '../../../../service/jedaeroService';
import elevationShadowStyle from '../../../../tool/elevationShadow';

function NonMeetingLectureModelDetail ({ navigation }) {
    const { year, semester, classCode } = navigation.state.params;
    const [ model, setModel ] = useState([]);
    const [ isLoading, setLoading ] = useState(false);
    
    const getNonMeetingLectureModelDetailApi = async () => {
        await setLoading(true);
        const model = await getNonMeetingLectureModelDetail({year, semester, classCode});
        console.debug(model);
        await setModel(model.data);
        await setLoading(false);
    }

    useEffect(() => {
        getNonMeetingLectureModelDetailApi();
    }, []);

    const ModelHeaderComponent = () => (
        <View><Text>header</Text></View>
    )

    const renderDetailItem = ({item: { coronaDeal, lectureDate, lessonTime, dayOfWeek, week, lectureName, professorName, startTime, endTime}}) => (
        <View style={styles.lecture}>
            <View style={styles.lectureHeader}>
                <Text style={styles.lectureHeaderText}>{week}주차</Text>
                <Text style={styles.lectureHeaderText}>{professorName} 교수님</Text>
            </View>
            <View style={styles.lectureHeader}>
                <Text style={styles.lectureHeaderText}>{lectureDate}</Text>
            </View>
            <Text style={styles.lectureClassCode}>{classCode}</Text>
            <Text style={styles.lectureName}>{lectureName}</Text>
            <Text style={styles.lectureName}>{coronaDeal}</Text>
            <View style={styles.lectureHeader}>
                <Text style={styles.lectureName}>{dayOfWeek} {lessonTime}</Text>
                <Text style={styles.lectureName}>{startTime} - {endTime}</Text>
            </View>
            
        </View>
    )

    const ListEmptyComponent = () => (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>해당 강의는 비대면 강의에 대한 정보가 없어요. 🤔</Text>
        </View>
    )
    return isLoading ? (
        <View style={{alignItems: 'center', paddingTop:20, flex:1}}>
            <ActivityIndicator size='large' color={colorPalette.mainColor}/>
        </View>
    ) : (
        <Fragment>
            <FlatList 
                data={model}
                renderItem={renderDetailItem}
                keyExtractor={item => `${item.week}${item.dayOfWeek}${item.startTime}`}
                ListEmptyComponent={ListEmptyComponent}
            />
        </Fragment>
    )
}

NonMeetingLectureModelDetail.navigationOptions = {
    title: "상세조회"
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
export default NonMeetingLectureModelDetail