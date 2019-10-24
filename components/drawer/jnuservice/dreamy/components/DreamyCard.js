import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import colorPalette from '../../../../styles/colorPalette';
import { normalize } from 'react-native-elements';
import elevationShadowStyle from '../../../../../tool/elevationShadow';

const DreamyCard = ({title, children, onPress}) => {
    return (
        <TouchableOpacity style={styles.container} {...{onPress}}>
            <View style={styles.header}>
                <Text style={styles.headerText}>{title}</Text>
            </View>
            <View style={styles.content}>
                {children}
            </View>
            
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 16,
        marginVertical: 12,
        borderColor: colorPalette.cardBorderColor,
        backgroundColor: colorPalette.cardBackgroundColor,
        borderRadius: 16,
        ...elevationShadowStyle(3)
    },
    header: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        backgroundColor: colorPalette.mainColor,
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerText: {
        fontSize: normalize(16),
        fontWeight: 'bold',
        color: colorPalette.cardBackgroundColor
    },
    content: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 8,
    }
})
export default DreamyCard;