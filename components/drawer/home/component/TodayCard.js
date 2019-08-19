import React from 'react';
import { View, Text, TouchableOpacity} from 'react-native';
import { mainScreen } from '../../../styles/busStyle';
import colorPallette from '../../../styles/colorPalette';


const TodayCard = ({name = '', headerRight = null, onPressContainer = () => {}, children, containerStyle = undefined}) => {
    return (
        <View style={mainScreen.blockView}>
            <View style={{...mainScreen.blockViewTitle, backgroundColor: colorPallette.mainColor}} >
                <Text style={mainScreen.blockViewTitleText}>{name}</Text>
                {headerRight}
            </View>
            <View>
                <TouchableOpacity onPress={onPressContainer}>
                    <View style={{...mainScreen.foodViewBlockContainer, ...containerStyle}}>
                        {children}
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default TodayCard;