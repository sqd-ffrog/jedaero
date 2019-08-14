import { StyleSheet } from 'react-native';
import { normalize } from 'react-native-elements';
import colorPalette from './colorPalette';

export default StyleSheet.create({
    container: {
        paddingHorizontal: 5,
        paddingBottom: 16,
        backgroundColor: colorPalette.backgroundColor,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent:'flex-start',
        alignItems: 'center'
    },
    listContainer: {
        backgroundColor:colorPalette.cardBackgroundColor
    },
    onLoading: {
        alignItems: 'center', paddingTop:20, flex:1, backgroundColor:colorPalette.backgroundColor
    },
    calendarBlock: {
        paddingVertical: 15,
        marginHorizontal: '1%',
        marginBottom: 20,
        backgroundColor: colorPalette.cardBackgroundColor,
        borderWidth: 0.5,
        borderColor: colorPalette.cardBorderColor,
        borderRadius: 4,
        justifyContent:'flex-start',
        alignItems:'center',
        flexDirection:'column',
        flexGrow: 0,
        flexShrink: 1,
        flexBasis: '31.3%'
    },
    calendarMonth: {
        fontSize: normalize(24),
        fontWeight: 'bold'
    }
})