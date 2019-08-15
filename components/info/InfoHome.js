import React, { Component } from 'react'
import { View, Text } from 'react-native';

const Info = () => {
    return (
        <View>
            <Text>hi</Text>
        </View>
    )
}

Info.navigationOptions = () => ({
    title: '정보',
});
export default Info;