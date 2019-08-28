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
        <ScrollView>
            {
                foodMenu.map(({name, subtitle, _clickFood}, key) => (
                        <ListItem
                            key={key}
                            title={name}
                            subtitle={subtitle}
                            titleStyle={foodTabStyles.listTitleStyle}
                            subtitleStyle={foodTabStyles.listSubtitleStyle}
                            containerStyle={foodTabStyles.listContainerStyle}
                            onPress={_clickFood}
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



