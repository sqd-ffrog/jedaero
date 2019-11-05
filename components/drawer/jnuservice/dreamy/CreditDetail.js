import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { getCreditDetailData } from '../../../../service/jedaeroService';
import colorPalette from '../../../styles/colorPalette';
import { ScrollView } from 'react-native-gesture-handler';
import { normalize } from 'react-native-elements';
import elevationShadowStyle from '../../../../tool/elevationShadow';

const CreditDetailHeader = ({name, creditDetail: {average, convertedAverage, applyCredit, getCredit, year, semester, markCredit, totalMark}}) => (
    <View style={styles.summary}>
            <View style={styles.summaryNameContainer}>
                <Text style={styles.summaryName}>{name}</Text>
                <Text style={styles.summaryText}>님은 </Text>
                <Text style={styles.summarySemesterValue}>{year}년 {semester}</Text>
                <Text style={styles.summaryText}>에</Text>
            </View>
            <View style={styles.summaryCreditContainer}>
                <Text style={styles.summaryText}>신청하신 </Text>
                <Text style={styles.summaryCreditValue}>{applyCredit}</Text>
                <Text style={styles.summaryText}>학점 중 </Text>
                <Text style={styles.summaryCreditValue}>{getCredit}</Text>
                <Text style={styles.summaryText}>학점을 취득하셨고</Text>
            </View>
            <View style={styles.summaryMarkContainer}>
                <Text style={styles.summaryText}>4.3 기준</Text>
                <Text style={styles.summaryMarkValue}>{average}</Text>
            </View>
            <View style={styles.summaryMarkContainer}>
                <Text style={styles.summaryText}>4.5 기준</Text>
                <Text style={styles.summaryMarkValue}>{convertedAverage}</Text>
            </View>
            <View style={styles.summaryFooterContainer}>
                <Text style={styles.summaryText}>의 평점을 받으셨습니다.</Text>
            </View>
        </View>
)

const CreditDetail = ({navigation: { state: { params: {name, data: { year, semester, outsideSeq, groupGb }}}}}) => {
    const [ creditDetail, setCreditDetail ] = useState(null);
    const getCreditDetail = async () => {
        setCreditDetail(await getCreditDetailData(year, semester, outsideSeq, groupGb));
    }
    useEffect(() => {
        getCreditDetail();
    }, [])
    
    const listHeader = () => (
        <View style={styles.lectureHeader}>
            <Text style={{...styles.lectureHeaderText, flex: 2}}>이수구분</Text>
            <Text style={{...styles.lectureHeaderText, flex: 1}}>학점</Text>
            <Text style={{...styles.lectureHeaderText, flex: 3}}>과목명</Text>
            <Text style={{...styles.lectureHeaderText, flex: 1}}>평점</Text>
            <Text style={{...styles.lectureHeaderText, flex: 1}}>등급</Text>
        </View>
    )
    const renderCreditDetailRow = ({item: { takeName, grade, credit, mark, subjectName}}) => (
        <View style={styles.lectureRow}>
            <Text style={{...styles.lectureRowText, flex: 2,}}>{takeName}</Text>
            <Text style={{...styles.lectureRowText, flex: 1,}}>{credit}</Text>
            <Text style={{...styles.lectureRowText, flex: 3}}>{subjectName}</Text>
            <Text style={{...styles.lectureRowText, flex: 1}}>{mark}</Text>
            <Text style={{...styles.lectureRowText, flex: 1, fontWeight: 'bold'}}>{grade}</Text>
        </View>
    )
    return !creditDetail ? (
        <View style={{alignItems: 'center', paddingTop:20, flex:1}}>
            <ActivityIndicator size='large' color={colorPalette.mainColor}/>
        </View>
    ) : (
        creditDetail === {} ? (
            <View><Text>없어유</Text></View>
        ) : (
            <ScrollView>
                <CreditDetailHeader {...{name, creditDetail: creditDetail.creditDetail}}/>
                <FlatList 
                    data={creditDetail.lectures}
                    keyExtractor={({subjectId }) => subjectId}
                    ListHeaderComponent={listHeader}
                    renderItem={renderCreditDetailRow}
                    nestedScrollEnabled={true} 
                    contentContainerStyle={styles.container}
                    />
            </ScrollView>
        )
    )
}

const styles = StyleSheet.create({
    summary: {
        padding: 16,
        marginHorizontal: 16,
        marginVertical: 8,
        borderRadius: 8,
        backgroundColor: colorPalette.cardBackgroundColor,
        ...elevationShadowStyle(3)
    },    
    summaryName: {
        fontSize: normalize(16),
        // fontWeight: 'bold',
    },
    summaryNameContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        marginBottom: 16,
    },
    summarySemesterValue: {
        color:colorPalette.mainColor,
        fontSize: normalize(16)
    },
    summaryCreditContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        marginBottom: 16,
    },
    summaryText: {
        fontSize: normalize(12),
        color: colorPalette.textColor,
    },
    summaryCreditValue: {
        // fontWeight: 'bold',
        fontSize: normalize(16),
        color: colorPalette.mainColor
    },
    summaryMarkValue: {
        // fontWeight: 'bold',
        fontSize: normalize(20),
        color: colorPalette.mainColor,
        paddingLeft: 16,
    },
    summaryMarkContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        marginBottom: 16,
    },

    container: {
        backgroundColor: colorPalette.cardBackgroundColor,
        borderBottomWidth: 0.5,
        borderRightWidth: 0.5,
        borderColor: colorPalette.cardBorderColor,
        borderRadius: 8,
        marginHorizontal: 16,
        marginVertical: 12,
        overflow: 'hidden',
    },
    lectureHeader: {
        backgroundColor: colorPalette.mainColor,
        flexDirection: 'row',
        paddingVertical: 8,
    },
    lectureHeaderText: {
        color: colorPalette.cardBackgroundColor,
        fontSize: 11,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    lectureRow: {
        paddingVertical: 16,
        flexDirection: 'row',
    },
    lectureRowText: {
        fontSize: 12,
        textAlign: 'center',
    }
})

export default CreditDetail;