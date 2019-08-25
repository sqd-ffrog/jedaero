import React, {useState, useEffect} from 'react'
import { View, Text, ActivityIndicator, ScrollView, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { getLecturePlanDetail, downloadLecturePlanFile } from '../../../../service/jedaeroService';
import colorPalette from '../../../styles/colorPalette';
import elevationShadowStyle from '../../../../tool/elevationShadow';
import { normalize } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { requestDownloadPermission } from '../../../../tool/requestPermission';
import RNFetchBlob from 'rn-fetch-blob';
import getMimeType from '../../../../tool/openFile';

const Card = ({children}) => (
    <View style={styles.cardContainer}>
        {children}
    </View>
)
const renderHeader = ({item: {title, description}}) => (
    <View style={styles.headerItem}>
        <Text style={styles.headerTitle}>{title}</Text>
        <Text style={styles.headerDescription}>{description}</Text>
    </View>
)

const Book = ({item: {author, name, publish, year}}) => (
    <View>
        <Text>{author}</Text>
        <Text>{name}</Text>
        <Text>{publish}</Text>
        <Text>{year}</Text>
    </View>
)

const Week = ({item: week}) => (
    <View style={{paddingVertical: 8, borderBottomWidth: 0.5, borderBottomColor: colorPalette.mainColor, flexDirection: 'row',}}>
        <View style={{flexBasis: normalize(40), paddingRight: 8, borderRightColor: colorPalette.mainColor, borderRightWidth: 0.5, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{fontSize: normalize(9)}}>{week.week}주차</Text>
        </View>
        <View style={{paddingLeft: 8}}>
            <Text style={{fontSize: normalize(10)}}>{week.title}</Text>
            {!!week.plan && <Text style={{fontSize: normalize(9)}}>{week.plan}</Text>}
        </View>
    </View>
)
const Task = ({item: task}) => (
    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text numberOfLines={1} style={{fontSize: normalize(10)}}>{task.name}</Text>
        <Text style={{fontSize: normalize(10), marginLeft: 8}}>{task.description}</Text>
    </View>
)

const LecturePlanDetail = ({navigation}) => {
    const [ plan, setPlan ] = useState(null);
    const {year, semester, classCode, lectureCode} = navigation.state.params;
    const getPlan = async () => setPlan(await getLecturePlanDetail({year, semester, lecture: {classCode, lectureCode}}));
    useEffect(() => {getPlan()}, []);
    useEffect(() => {plan && console.log(plan), [plan]});

    const downloadFile = async ({fileName, encoded}) => {
        if(Platform.OS === 'android' && !(await requestDownloadPermission())) {
            Alert.alert("권한이 없어 다운로드가 불가능합니다.");
            return;
        }
        try {
            const res = await downloadLecturePlanFile({fileName, encoded, classCode, year, semester, lectureName: plan.lectureName})
            console.log(res);
            try {
                !!res && Platform.select({
                    ios: () => RNFetchBlob.ios.openDocument(res.path()),
                    android: () => RNFetchBlob.android.actionViewIntent(res.path(), getMimeType(fileName))
                })();
            } catch(err) {
                Alert.alert("다운로드했습니다.")
            }
        } catch (err) {
            Alert.alert("다운로드에 실패하였습니다. 다시 시도해 주세요.");
        }
    }

    const File = ({item: {fileName, encoded}}) => (
        <TouchableOpacity style={styles.fileItem} onPress={() => downloadFile({fileName, encoded})}>
            <Text numberOfLines={1} style={styles.fileName}>{fileName}</Text>
            <Icon name="download" size={normalize(12)} color={colorPalette.mainColor} style={{marginLeft: 4,}} />
        </TouchableOpacity>
    )

    return !plan ? (
        <View style={{alignItems: 'center', paddingTop:20, flex:1}}>
            <ActivityIndicator size='large' color={colorPalette.mainColor}/>
        </View>
    ) : (Object.keys(plan).length === 0 ? (
        <Card><Text>오류가 있거나 강의계획이 없습니다.</Text></Card>
    ) : (
        <ScrollView>
            <Card>
                <FlatList 
                    data={[
                        {title: "수강반번호", description: plan.classCode},
                        {title: "과목명", description: plan.lectureName},
                        {title: "담당교수", description: plan.professorName},
                        {title: "학점", description: plan.credit},
                    ]}
                    keyExtractor={item=>item.title}
                    renderItem={renderHeader}
                />
            </Card>
            {!!plan.lecturePlan && (
                <Card>
                    <Text style={styles.cardTitle}>교수 개요 및 학습 목표</Text>
                    <Text style={styles.planText}>{plan.lecturePlan}</Text>
                </Card>
            )}
            {!!plan.note && (
                <Card>
                    <Text style={styles.cardTitle}>참고사항</Text>
                    <Text style={styles.planText}>{plan.lecturePlan}</Text>
                </Card>
            )}
            {!!plan.book.name && (
                <Card>
                    <Text style={styles.cardTitle}>교재</Text>
                    <Book item={plan.book} />
                </Card>
            )}
            {plan.references.length > 0 && (
                <Card>
                    <Text style={styles.cardTitle}>참고도서</Text>
                    <FlatList 
                        data={plan.references}
                        renderItem={Book}
                        keyExtractor={(item, index) => index.toString()}
                        nestedScrollEnabled={true}
                    />
                </Card>
            )}
            {plan.weekList.length > 0 && (
                <Card>
                    <Text style={styles.cardTitle}>주차별 교수계획서</Text>
                    <FlatList 
                        data={plan.weekList}
                        renderItem={(Week)}
                        keyExtractor={(item, index) => item.week}
                        nestedScrollEnabled={true}
                    />
                </Card>
            )}
            <Card>
                <Text style={styles.cardTitle}>평가방법</Text>
                <View>
                    <View style={{flexDirection: 'row', paddingVertical: 4, borderBottomColor: colorPalette.mainColor, borderBottomWidth:0.5,}}>
                        <Text style={styles.rate}>출석</Text>
                        <Text style={styles.rate}>중간고사</Text>
                        <Text style={styles.rate}>기말고사</Text>
                        <Text style={styles.rate}>과제물</Text>
                        <Text style={styles.rate}>수시고사</Text>
                        <Text style={styles.rate}>기타</Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={styles.rate}>{plan.attendanceRate}</Text>
                        <Text style={styles.rate}>{plan.middleRate}</Text>
                        <Text style={styles.rate}>{plan.finalRate}</Text>
                        <Text style={styles.rate}>{plan.assignmentRate}</Text>
                        <Text style={styles.rate}>{plan.frequentRate}</Text>
                        <Text style={styles.rate}>{plan.etcetraRate}</Text>
                    </View>
                </View>
            </Card>
            {plan.tasks.length > 0 && (
            <Card>
                <Text style={styles.cardTitle}>과제</Text>
                <FlatList 
                    data={plan.tasks}
                    renderItem={Task}
                    keyExtractor={item => item.name}
                />
            </Card>
            )}
            {plan.fileList.length > 0 && (
            <Card>
                <Text style={styles.cardTitle}>첨부파일</Text>
                <FlatList 
                    data={plan.fileList}
                    renderItem={File}
                    keyExtractor={item => item.encoded}
                />
            </Card>
            )}
        </ScrollView>
    ))
}

const styles = StyleSheet.create({
    cardContainer: {
        marginVertical: 12,
        marginHorizontal: 16,
        paddingVertical: 16,
        paddingHorizontal: 12,
        borderRadius: 16,
        borderWidth: 0.5,
        borderColor: colorPalette.cardBorderColor,
        backgroundColor: colorPalette.cardBackgroundColor,
        ...elevationShadowStyle(5),
    },
    headerItem: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginVertical: 4,
    },
    headerTitle: {
        fontSize: normalize(12),
        color: colorPalette.mainColor,
        fontWeight: 'bold',
        flexBasis: 100,
    },
    headerDescription: {
        fontSize: normalize(12),
    },
    planText: {
        fontSize: normalize(11),
        lineHeight: normalize(14),
    },  
    cardTitle: {
        color: colorPalette.mainColor,
        fontSize: normalize(14),
        fontWeight: 'bold',
        marginBottom: 16,
    },
    fileItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 8,
    },
    fileName: {
        fontSize: normalize(10),
        color: colorPalette.mainColor,
        flex: 1,
    },
    rate: {
        flex: 1,
        textAlign: 'center',
        fontSize: normalize(10)
    }
})

export default LecturePlanDetail;