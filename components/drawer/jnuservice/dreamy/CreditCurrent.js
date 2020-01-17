
import React, { useState, useEffect } from 'react'; 
import { View, Text, ActivityIndicator,ScrollView, FlatList, StyleSheet } from 'react-native';
import colorPalette from '../../../styles/colorPalette';
import { getCreditCurrentData, getEvlStateData } from '../../../../service/jedaeroService';
import { normalize } from 'react-native-elements';
import elevationShadowStyle from '../../../../tool/elevationShadow';


const CreditCurrent = ({navigation}) => {
    const [evlState, setEvlState] = useState(null); 
    const [creditCurrent, setCreditCurrent] = useState(null);  

    const getEvlState = async () => {
        setEvlState(await getEvlStateData());
    }
    const getCreditCurrent = async() => {
        setCreditCurrent(await getCreditCurrentData());
    }

    useEffect(() => {getEvlState()}, []);
    useEffect(() => {getCreditCurrent()}, []); 
    console.log(evlState);  
    console.log(creditCurrent);  
    
    const CreditHeader = () => {
        const { totalCredit: {applyCnt, applyCredit, year, getCredit, semester, average} }  = creditCurrent;
        return (
            <View style={styles.summary}>
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
            <View style={styles.summaryFooterContainer}>
                <Text style={styles.summaryText}>의 평점을 받으셨습니다.</Text>
            </View>
        </View>
        );
    }  
    const listHeader = () => (
        <View style={styles.lectureHeader}>
            <Text style={{...styles.lectureHeaderText, flex: 2}}>이수구분</Text>
            <Text style={{...styles.lectureHeaderText, flex: 1}}>학점</Text>
            <Text style={{...styles.lectureHeaderText, flex: 3}}>과목명</Text>
            <Text style={{...styles.lectureHeaderText, flex: 1}}>평점</Text>
            <Text style={{...styles.lectureHeaderText, flex: 1}}>등급</Text>
        </View>
    )
    const renderCreditRow = ({item: {takeName, grade, credit, mark, subjectName}}) => (
        <View style={styles.lectureRow}>
        <Text style={{...styles.lectureRowText, flex: 2,}}>{takeName}</Text>
        <Text style={{...styles.lectureRowText, flex: 1,}}>{credit}</Text>
        <Text style={{...styles.lectureRowText, flex: 3}}>{subjectName}</Text>
        <Text style={{...styles.lectureRowText, flex: 1}}>{mark}</Text>
        <Text style={{...styles.lectureRowText, flex: 1, fontWeight: 'bold'}}>{grade}</Text>
    </View>
    ) 
    
    if( !creditCurrent ) {
        return  ( 
            <View style={{alignItems: 'center', paddingTop:20, flex:1}}>
                <ActivityIndicator size='large' color={colorPalette.mainColor}/>
            </View> 
           )
    }else { 
        return (
            <ScrollView>
            <CreditHeader />
            <FlatList  
                data={creditCurrent.mstList}
                ListHeaderComponent={listHeader}
                renderItem={renderCreditRow}
                nestedScrollEnabled={true} 
                    contentContainerStyle={styles.container} />
            </ScrollView>
        )
    }
  
};  
 
CreditCurrent.navigationOptions = {
    title: "현재 학기 성적조회"
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
export default CreditCurrent;