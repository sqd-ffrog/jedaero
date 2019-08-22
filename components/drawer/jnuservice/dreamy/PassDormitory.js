import React, {useState, useEffect} from 'react'
import { View, Text, ActivityIndicator, StyleSheet, FlatList } from 'react-native'
import colorPalette from '../../../styles/colorPalette';
import { isPassDormitory } from '../../../../service/jedaeroService';
import { normalize } from 'react-native-elements';

const PassCard = ({item: {title, content}}) => !!content.trim() && (
    <View style={styles.cardContainer}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardContent}>{content}</Text>
    </View>
)

const PassDormitory = () => {
    const [result, setResult] = useState(null);
    const getResult = async () => setResult(await isPassDormitory());
    useEffect(() => { getResult() }, []);
    return !result ? (
        <View style={{alignItems: 'center', paddingTop:20, flex:1}}>
            <ActivityIndicator size='large' color={colorPalette.mainColor}/>
        </View>
    ) :
    (result === {} ? (<View><Text>오류가 있어요 ㅠ 다시 시도해주세요</Text></View>) : (
        <FlatList 
            data={[
                {title: "상세", content: result.description},
                {title: "모집명", content: result.collectTitle},
                {title: "신청장소", content: result.appliedPlace},
                {title: "배정장소", content: result.allocatedPlace},
                {title: "배정 방 번호", content: result.allocatedRoomNo},
                {title: "신청자", content: result.name},
                {title: "입주학생번호", content: result.id},
            ]}
            renderItem={PassCard}
            keyExtractor={item => item.title}
        />
    ))
}

PassDormitory.navigationOptions = {
    title: '생활관 합격 조회'
}

const styles = StyleSheet.create({
    cardContainer: {
        marginHorizontal: 16,
        marginVertical: 12,
        padding: 16,
        borderRadius: 8,
        borderColor: colorPalette.cardBorderColor,
        borderWidth: 0.5,
        backgroundColor: colorPalette.cardBackgroundColor,
    },
    cardTitle: {
        fontSize: normalize(14),
        fontWeight: 'bold',
        color: colorPalette.mainColor,
        marginBottom: 16,
    },
    cardContent: {
        fontSize: normalize(11),
    }
})
export default PassDormitory;