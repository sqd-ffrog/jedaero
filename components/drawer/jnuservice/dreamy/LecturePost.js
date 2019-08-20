import React, {useState, useEffect} from 'react';
import { View, Text, ScrollView, ActivityIndicator, StyleSheet, TouchableOpacity, Platform, Alert, FlatList } from 'react-native';
import { getLecturePostData } from '../../../../service/jedaeroService';
import colorPalette from '../../../styles/colorPalette';
import { normalize } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const PostHeader = ({title, author, date}) => (
    <View style={{...styles.card, ...styles.postHeader}}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.authorContainer}>
            <Text style={styles.author}>{author}</Text>
            <Text style={styles.date}>{date}</Text>
        </View>
    </View>
)

const PostContent = ({content}) => (
    <View style={styles.card}>
        <Text>{content}</Text>
    </View>
)

const PostFooter = ({count, email}) => (
    <View style={styles.card}>
        <Text style={styles.count}>조회수 {count}</Text>
    </View>
)

const PostFile = ({file}) => {
    const downloadFile = () => {
        if(Platform.OS == 'ios') Alert.alert("현재 iOS에서는 다운로드 기능을 지원하지 않아요 ㅠㅠ")
        else Alert.alert("다운로드 준비")
    }

    const fileHeader = () => (
        <Text style={styles.fileTitle}>첨부 파일</Text>
    )

    const renderItem = ({item}) => (
        <TouchableOpacity style={styles.fileItem} onPress={downloadFile}>
            <Text style={styles.file}>{item.name}</Text>
            <Icon name="download" size={normalize(12)} color={colorPalette.mainColor} />
        </TouchableOpacity>
    )

    return (<FlatList 
        data={file}
        renderItem={renderItem}
        ListHeaderComponent={fileHeader}
        nestedScrollEnabled={true}
        contentContainerStyle={styles.card}
        keyExtractor={item => item.encoded}
    />)
}


const LecturePost = ({navigation: {state: {params: {year, semester, root, num, classCode}}}}) => {
    const [post, setPost] = useState(null);
    const getPost = async () => {
        setPost(await getLecturePostData(year, semester, classCode, num, root));
    }

    useEffect(() => {
        getPost();
    }, []);

    useEffect(() => {
        console.log(post);
    }, [post]);

    return !post ? (
        <View style={{alignItems: 'center', paddingTop:20, flex:1}}>
            <ActivityIndicator size='large' color={colorPalette.mainColor}/>
        </View>
    ) : (post === {} ? (
        <View><Text>오류가 있어유</Text></View>
    ) : (
        <ScrollView>
            <PostHeader title={post.title} author={post.author} date={post.date}/>
            {post.content.trim() !== "" && <PostContent content={post.content} />}
            <PostFooter count={post.count} email={post.email} />
            {post.file && Array.isArray(post.file) && post.file.length > 0 && <PostFile file={post.file} />}
        </ScrollView>
    ))
}

const styles = StyleSheet.create({
    
    card: {
        backgroundColor: colorPalette.cardBackgroundColor,
        borderColor: colorPalette.cardBorderColor,
        borderTopWidth: 0.5,
        borderBottomWidth: 0.5,
        marginVertical: 8,
        padding: 16,
    },
    postHeader: {
        
    },
    authorContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        marginTop: 16,
    },
    title: {
        fontSize: normalize(18),
        fontWeight: 'bold',
    },
    author: {
        fontSize: normalize(12),
        paddingRight: 16,
    },
    date: {
        fontSize: normalize(8),
        color: colorPalette.subTextColor
    },
    fileTitle: {
        fontSize: normalize(14),
        fontWeight: 'bold',
        paddingVertical: 8,
    },
    count: {
        color: colorPalette.subTextColor,
    },
    fileItem: {
        paddingVertical: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    file: {
        fontSize: normalize(12),
        color: colorPalette.mainColor
    }
})
export default LecturePost;