import React, {useEffect, useState} from 'react'
import { View, Text, TouchableOpacity, FlatList, ScrollView, ActivityIndicator, StyleSheet} from 'react-native';
import { getCreditData } from '../../../../service/jedaeroService';
import colorPalette from '../../../styles/colorPalette';
import { normalize } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import elevationShadowStyle from '../../../../tool/elevationShadow';

const Credit = ({navigation}) => {
    const [credit, setCredit] = useState(null);
    const getCredit = async () => {
        setCredit(await getCreditData());
    }
    useEffect(() => {getCredit()}, []); 
    const accumulatedCredit = () => {
        const { personalData: {name}, summary: {average, convertedAverage, applyCredit, getCredit, markCredit, totalMark}} = credit;
        return (
            <View style={styles.summary}>
                <View style={styles.summaryNameContainer}>
                    <Text style={styles.summaryName}>{name}</Text>
                    <Text style={styles.summaryText}>님은 현재</Text>
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
    }
    const renderCreditRow = ({item: {year, semester, outsideSeq, semesterName, totalCredit, average}}) => (
        <TouchableOpacity style={styles.rowContainer} onPress={() => navigation.navigate("CreditDetail", { name: credit.personalData.name, data: {
            year, semester, outsideSeq, groupGb: credit.personalData.groupGb
        }})}>
            <Text style={styles.itemTitleText}>{year}년 {semesterName}</Text>
            <View style={styles.itemRight}>
                <Text style={styles.itemSubTitle}>학점</Text>
                <Text style={styles.itemSubText}>{totalCredit}</Text>
                <Text style={styles.itemSubTitle}>평점</Text>
                <Text style={styles.itemSubText}>{average}</Text>
            </View>
            <Icon name="chevron-right" size={24} color={colorPalette.mainColor} />
        </TouchableOpacity>
    )
    return !credit ? (
        <View style={{alignItems: 'center', paddingTop:20, flex:1}}>
            <ActivityIndicator size='large' color={colorPalette.mainColor}/>
        </View>
    ) : (
        credit === {} ? (
            <View><Text>없어유</Text></View>
        ) : (
            <FlatList 
                data={credit.credits}
                keyExtractor={item => `${item.year}${item.semester}`}
                ListHeaderComponent={accumulatedCredit}
                renderItem={renderCreditRow} />
        )
    )
}

Credit.navigationOptions = {
    title: "전체성적조회"
}

const styles = StyleSheet.create({
    summary: {
        padding: 16,
        marginHorizontal: 16,
        borderRadius: 8,
        marginVertical: 8,
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

    summaryCreditContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        marginBottom: 16,
        
    },
    summaryText: {
        fontSize: normalize(12),
        color: colorPalette.textColor
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
    rowContainer: {
        borderRadius: 8,
        backgroundColor: colorPalette.cardBackgroundColor,
        borderColor: colorPalette.cardBorderColor,
        borderWidth: 0.5,
        padding: 16,
        marginHorizontal: 16,
        marginVertical: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        ...elevationShadowStyle(3)
    },
    itemTitleText: {
        fontSize: normalize(12),
        fontWeight: 'bold',
        color: colorPalette.textColor
    },
    itemRight: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    itemSubTitle: {
        paddingHorizontal: 4,
        color: colorPalette.mainColor,
    },
    itemSubText: {
        color: colorPalette.textColor,
    }
})

export default Credit;