import React from 'react';
import { View, Text, TouchableOpacity} from 'react-native';
import { mainScreen } from '../../../styles/busStyle';
import colorPallette from '../../../styles/colorPalette';


const TodayCard = ({name = '', headerRight = null, onPressContainer = null, children, containerStyle = undefined, description = ""}) => {
    return (
        <View style={mainScreen.blockView}>
            <View style={{...mainScreen.blockViewTitle, backgroundColor: colorPallette.mainColor}} >
                <Text style={mainScreen.blockViewTitleText}>{name}</Text>
                {headerRight}
            </View>
            {!!onPressContainer ? (
                <TouchableOpacity onPress={onPressContainer}>
                    <View style={{...mainScreen.foodViewBlockContainer, ...containerStyle}}>
                        {children}
                    </View>
                    {
                        !!description && (
                            <View style={mainScreen.foodViewDescription}>
                                <Text style={mainScreen.foodViewDescriptionText}>{description}</Text>
                            </View>
                        )
                    }
                </TouchableOpacity>
            ) : (
                <View>
                    <TouchableOpacity onPress={onPressContainer}>
                        <View style={{...mainScreen.foodViewBlockContainer, ...containerStyle}}>
                            {children}
                        </View>
                        {
                            !!description && (
                                <View style={mainScreen.foodViewDescription}>
                                    <Text style={mainScreen.foodViewDescriptionText}>{description}</Text>
                                </View>
                            )
                        }
                    </TouchableOpacity>
                </View>
            )}
            
        </View>
    )
}

export default TodayCard;