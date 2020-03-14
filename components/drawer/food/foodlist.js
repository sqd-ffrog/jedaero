import React, { Component } from 'react';

import { StyleSheet, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { ListItem, normalize } from 'react-native-elements';

import menuList from './menuList';
import { foodTabStyles } from '../../styles/jedaeroCSS';
import colorPalette from '../../styles/colorPalette';
import Banner from '../../banner/Banner';

const FoodList = ({navigation}) => {
    const foodMenu = menuList(destination => navigation.navigate(destination));
    return (
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
    )
}
FoodList.navigationOptions = {
    headerTitle: "뭐먹을까"
}
export default FoodList;



