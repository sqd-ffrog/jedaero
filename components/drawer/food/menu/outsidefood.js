import React, { Component, useState, useEffect } from 'react';
import { TouchableOpacity,  View, Text, FlatList } from 'react-native';
import { foodMenuListStyles } from '../../../styles/jedaeroCSS';
import colorPalette from '../../../styles/colorPalette';

const baseURI = 'https://github.com/jnuro/database/raw/master/'

const OutSideFood = ({list, navigation}) => {
    const [foodMenu, setFoodMenu] = useState(null);
    const _keyExtractor = (item, index) => item.name
    const getFoodList = async () => {
        try {
            const data = await (await fetch(`${baseURI}${list}.json`)).json();
            setFoodMenu(data);
        } catch(err) {
            throw err;
        }
    }
    const _renderItem = ({item}) => (
        <TouchableOpacity
            onPress={() => {navigation.navigate("DetailMenu", item)}}
        >
            <View style={foodMenuListStyles.container}>
                <Text style={foodMenuListStyles.labelStyle}>{item.name}</Text>
            </View> 
        </TouchableOpacity>
    )
    useEffect(() => { getFoodList(); }, []);
    return (
        <View style={{flex: 1, backgroundColor: colorPalette.backgroundColor, paddingHorizontal:10}}>
            <FlatList
                contentContainerStyle={{flexDirection: 'column', justifyContent: 'space-between'}}
                data={foodMenu}
                renderItem={_renderItem}
                keyExtractor={_keyExtractor}
            />
        </View>
    )
}
export default OutSideFood;

