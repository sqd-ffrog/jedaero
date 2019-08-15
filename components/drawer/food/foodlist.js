import React, { Component } from 'react';

import { StyleSheet, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { ListItem, normalize } from 'react-native-elements';

import menuList from './menuList';
import { foodTabStyles } from '../../styles/jedaeroCSS';
import colorPalette from '../../styles/colorPalette';

const FoodList = ({navigation}) => {
    const foodMenu = menuList(destination => navigation.navigate(destination));
    return (
        <View style={{flex:1, backgroundColor:colorPalette.backgroundColor}}>
            <ScrollView>
                {
                    foodMenu.map((item, key) => (
                            <ListItem
                                key={key}
                                title={item.name}
                                subtitle={item.subtitle}
                                titleStyle={foodTabStyles.listTitleStyle}
                                subtitleStyle={foodTabStyles.listSubtitleStyle}
                                containerStyle={foodTabStyles.listContainerStyle}
                                onPress={item._clickFood}
                                underlayColor="rgba(0,0,0,0)"
                                hideChevron={true}
                            />
                        ))
                }
            </ScrollView>
        </View>
    )
}
FoodList.navigationOptions = {
    headerTitle: "뭐먹을까"
}
export default FoodList;



