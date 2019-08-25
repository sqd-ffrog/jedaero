import { StyleSheet } from 'react-native';
import { normalize } from 'react-native-elements';
import colorPalette from './colorPalette';
import elevationShadowStyle from '../../tool/elevationShadow';

const mainScreen = StyleSheet.create({
    busView: {
        // flex:1, 
        minHeight: '100%',
        flexDirection: 'column', 
        justifyContent: 'flex-start',
    },
    blockView: {
        height:"auto",
        borderRadius: 16,
        borderColor: colorPalette.cardBorderColor,
        marginHorizontal: 16,
        marginVertical: 12,
        backgroundColor: colorPalette.cardBackgroundColor,
        // overflow: 'hidden',
        ...elevationShadowStyle(5),
    },
    blockViewTitle: {
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 15,
        paddingRight: 15,
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems: 'center',
    },
    blockViewTitleText: {
        fontSize: normalize(16),
        fontWeight: 'bold',
        color:'#ffffff',
    },
    blockViewHelpText: {
        fontSize: normalize(11),
        color: '#ffffff',
    },
    blockViewContainer: {
        // paddingTop: 10,
        // paddingBottom: 10,
        // paddingLeft: 15,
        // paddingRight: 15,
        borderLeftWidth: 0.5,
        borderRightWidth: 0.5,
        borderBottomWidth: 1,
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16,
        borderColor: '#e7e7e7',
        overflow: 'hidden',
    },
    blockViewContainerSub: {
        flex: 1,
        textAlign: 'center',
        paddingTop: 20,
        paddingBottom: 20,
        justifyContent:'center', 
        alignItems:'center',
        borderColor:'#e7e7e7'
    },
    blockViewContainerMain: {
        textAlign: 'center',
        marginVertical: 20,
        paddingHorizontal: 10,
        borderRightWidth: 0.5,
        justifyContent:'center',
        alignItems:'center',
        borderColor: '#e7e7e7'
    },
    blockTitle: {
        fontSize: normalize(24),
        fontWeight: 'bold',
        color: '#000000',
        // paddingVertical:8,
        // paddingHorizontal:15,
        // borderRightWidth:0.5,
        borderColor:"#e7e7e7",
    },
    blockText: {
        fontSize: normalize(13),
        color: '#000000',
        
    },
    busWay: {
        fontSize: normalize(8),
        marginTop: -5

    },
    swiperStyle: {
        flex: null
    },
    swiperContainerStyle: {
        flex: null
    },
    
    foodBlockContainerTitle: {
        fontWeight: 'bold',
        fontSize: normalize(12),
        lineHeight: normalize(16),
    },
    foodBlockContainerText: {
        fontSize: normalize(12),
        lineHeight: normalize(16)
    },
    foodViewBlockContainer: {
        borderLeftWidth: 0.5,
        borderRightWidth: 0.5,
        borderBottomWidth: 0.5,
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16,
        borderColor: '#e7e7e7',
        paddingHorizontal: 12,
        paddingVertical: 16,
        overflow: 'hidden',
    }
})

export { mainScreen }