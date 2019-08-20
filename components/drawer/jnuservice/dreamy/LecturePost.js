import React, {useState, useEffect} from 'react';
import { View, Text } from 'react-native';
import { getLecturePostData } from '../../../../service/jedaeroService';

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
    return (
        <View><Text>hi</Text></View>
    )
}

export default LecturePost;