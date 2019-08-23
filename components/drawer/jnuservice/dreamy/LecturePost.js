import React, {useState, useEffect} from 'react';
import { View, Text, ScrollView, ActivityIndicator, StyleSheet, TouchableOpacity, Platform, Alert, FlatList } from 'react-native';
import { getLecturePostData, downloadLecturePostFile } from '../../../../service/jedaeroService';
import colorPalette from '../../../styles/colorPalette';
import { normalize } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { requestDownloadPermission } from '../../../../tool/requestPermission';
import RNFetchBlob from 'rn-fetch-blob';
import getMimeType from '../../../../tool/openFile';

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

const PostFile = ({post: {author, count, date, email, title, file}, lectureDetail: {classCode, year, semester, root, num, reply, lectureCode, lectureName, professorCode, professorName }}) => {
    const downloadFile = async ({fileName, encoded}) => {
        console.log({author, count, date, email, title, classCode, year, semester, root, num, reply, lectureCode, lectureName, professorCode, professorName });
        if(Platform.OS === 'android' && !(await requestDownloadPermission())) {
            Alert.alert("권한이 없어 다운로드가 불가능합니다.");
            return;
        }
        try {
            const res = await downloadLecturePostFile(classCode, professorCode, year, semester, lectureCode, lectureName, professorName, encoded, fileName, num, root, reply, email, title, author, date, count);
            !!res && Platform.select({
                ios: () => RNFetchBlob.ios.openDocument(res.path()),
                android: () => RNFetchBlob.android.actionViewIntent(res.path(), getMimeType(fileName))
            })();
        } catch (err) {
            console.warn(err);
            Alert.alert("다운로드에 실패하였습니다. 다시 시도해 주세요.");
        }
    }

    const fileHeader = () => (
        <Text style={styles.fileTitle}>첨부 파일</Text>
    )

    const renderItem = ({item}) => (
        <TouchableOpacity style={styles.fileItem} onPress={() => downloadFile(item)}>
            <Text style={styles.file}>{item.fileName}</Text>
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


const LecturePost = ({navigation: {state: {params: {year, semester, root, num, reply, classCode, lectureDetail}}}}) => {
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
            {post.file && Array.isArray(post.file) && post.file.length > 0 && <PostFile lectureDetail={{...lectureDetail, classCode, year, semester, root, num, reply}} post={post}/>}
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