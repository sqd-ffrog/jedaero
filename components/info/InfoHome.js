import React, { Component } from 'react'
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import colorPalette from '../styles/colorPalette';
import { normalize } from 'react-native-elements';

const list = [
    {
        name: "개발자 정보",
        routeName: "Developer"
    },
    {
        name: "오픈소스 라이선스",
        routeName: "License"
    }
]

const Info = ({navigation}) => {

    const keyExtractor = item => item.routeName;
    const renderDeveloperItem = ({item, index}) => (
        <TouchableOpacity key={index} style={styles.item} onPress={() => navigation.navigate(item.routeName)}>
            <Text style={styles.itemText}>{item.name}</Text>
        </TouchableOpacity>
    )
    return (
        <View style={styles.container}>
            <FlatList 
                data={list}
                keyExtractor={keyExtractor}
                renderItem={renderDeveloperItem}
            />
        </View>
    )
}

Info.navigationOptions = () => ({
    title: '정보',
});

const styles = StyleSheet.create({
    container: {flex: 1, backgroundColor: colorPalette.backgroundColor},
    item: {
        padding: 16,
        borderBottomWidth: 0.5,
        borderBottomColor: colorPalette.cardBorderColor
    },
    itemText: {
        fontSize: normalize(16)
    }
})
export default Info;