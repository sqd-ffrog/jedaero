import React from 'react';
import { View, Text, TouchableOpacity} from 'react-native';
import { mainScreen } from '../../../styles/busStyle';
import colorPallette from '../../../styles/colorPalette';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { normalize } from 'react-native-elements';

const TodayCard = ({name = '', onPressRefreshButton = () => {}, onPressContainer = () => {}, children}) => {
    return (
        <View style={mainScreen.blockView}>
            <View style={{...mainScreen.blockViewTitle, backgroundColor: colorPallette.mainColor}} >
                <Text style={mainScreen.blockViewTitleText}>{name}</Text>
                <TouchableOpacity onPress={onPressRefreshButton}>
                    <Icon name="refresh" color={colorPallette.cardBackgroundColor} size={normalize(16)} />
                </TouchableOpacity>
            </View>
            <View>
                <TouchableOpacity onPress={onPressContainer}>
                    <View style={{...mainScreen.foodViewBlockContainer, flexDirection: 'column'}}>
                        {children}
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default TodayCard;