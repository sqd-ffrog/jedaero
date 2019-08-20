import React, {useState, useEffect} from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { getLectureItemBoardData } from '../../../../service/jedaeroService';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colorPalette from '../../../styles/colorPalette';

const LectureItemBoard = ({navigation}) => {
    const [board, setBoard] = useState(null);
    const getBoard = async () => {
        const { year, semester, classCode } = navigation.state.params;
        setBoard(await getLectureItemBoardData(year, semester, classCode));
    }

    useEffect(() => {
        getBoard();
    }, []);

    const renderHeader = () => (
        <View style={styles.headerContainer}>
            <View style={styles.itemNumContainer} />
            <View style={styles.itemTitleContainer}>
                <Text numberOfLines={1} style={styles.headerText}>제목</Text>
            </View>
            <View style={styles.itemDateContainer}>
                <Text style={styles.headerText}>날짜</Text>
            </View>
            <View style={styles.itemAuthorContainer}>
                <Text style={styles.headerText}>작성자</Text>
            </View>
            <View style={styles.itemCountContainer}>
                <Text style={styles.headerText}>조회</Text>
            </View>
        </View>
    )
    const renderItem = ({item: {num, root, uploadDate, count, title, author, reply}}) => (
        <TouchableOpacity style={styles.itemContainer} onPress={() => {
            const { year, semester, classCode } = navigation.state.params;
            navigation.navigate("LecturePost", {year, semester, root, num, classCode});
        }}>
            <View style={styles.itemNumContainer}>
                {!reply && <Text style={styles.itemText}>{num}</Text>}
            </View>
            <View style={styles.itemTitleContainer}>
                {reply && <Icon name="subdirectory-arrow-right" size={16} />}
                <Text numberOfLines={1} style={styles.itemTitleText}>{title}</Text>
            </View>
            <View style={styles.itemDateContainer}>
                <Text style={styles.itemText}>{uploadDate}</Text>
            </View>
            <View style={styles.itemAuthorContainer}>
                <Text style={styles.itemText}>{author}</Text>
            </View>
            <View style={styles.itemCountContainer}>
                <Text style={styles.itemText}>{count}</Text>
            </View>
        </TouchableOpacity>
    )
    return (
        <FlatList 
            data={board}
            ListHeaderComponent={renderHeader}
            renderItem={renderItem}
            keyExtractor={item => item.num}
            contentContainerStyle={styles.listContainer}
        />
    )
}
LectureItemBoard.navigationOptions = ({navigation: {state: {params: { lectureName }}}}) => ({
     title: lectureName
});

const styles = StyleSheet.create({
    listContainer: {
        borderWidth: 0.5,
        borderColor: colorPalette.cardBorderColor,
        backgroundColor: colorPalette.cardBackgroundColor,
        borderRadius: 8,
        overflow: 'hidden',
        marginTop: 32,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colorPalette.mainColor,
    },
    headerText: {
        flex: 1,
        textAlign: 'center',
        color: colorPalette.cardBackgroundColor,
    },
    itemContainer: {
        borderTopColor: colorPalette.cardBorderColor,
        borderTopWidth: 0.5,
        flexDirection: 'row',
        alignItems: 'center',
    },
    itemNumContainer: {
        flexBasis: 28,
        paddingVertical: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemText: {
        flex: 1,
        textAlign: 'center'
    },
    itemTitleContainer: {
        flex: 1,
        paddingVertical: 8,
        paddingLeft: 4,
        flexDirection: 'row',
        alignItems: 'center',
        borderLeftWidth: 0.5,
        borderLeftColor: colorPalette.cardBorderColor
    },
    itemTitleText: {
        flex: 1,
    },  
    itemDateContainer: {
        flexBasis: 100,
        paddingVertical: 8,
        borderLeftWidth: 0.5,
        borderLeftColor: colorPalette.cardBorderColor
    },
    itemAuthorContainer: {
        flexBasis: 56,
        borderLeftWidth: 0.5,
        borderLeftColor: colorPalette.cardBorderColor,
        textAlign: 'center',
        paddingVertical: 8,
    },
    itemCountContainer: {
        flexBasis: 35,
        paddingVertical: 8,
        borderLeftWidth: 0.5,
        borderLeftColor: colorPalette.cardBorderColor
    }
})
export default LectureItemBoard;