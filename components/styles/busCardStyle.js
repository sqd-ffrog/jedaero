import { StyleSheet } from 'react-native';
import { normalize } from 'react-native-elements';

const busCardStyle = StyleSheet.create({
    foodBlock: {
        borderWidth:0.5,
        borderColor:'#d7d7d7',
        // marginBottom:16,
        // marginHorizontal:8,
        borderRadius:8,
        overflow:'hidden',
        elevation: 1,
    },
    foodBlockTitle: {
        backgroundColor:'#ffffff',
        paddingHorizontal:16,
        paddingVertical:8,
        justifyContent:'space-between',
        flexDirection:'row',
    },
    foodBlockTitleText: {
        color:'#252c41',
        fontSize:normalize(16),
    },
    foodBlockContainer: {
        backgroundColor:'#ffffff',
        paddingHorizontal: 14,
        paddingVertical: 16,
        paddingTop:9
        // flexDirection: "row",
    },
    foodBlockContainerText: {
        color:'#000000',
        // fontSize:normalize(12),
    },
    foodBlockContainerLeft: {
        fontSize:normalize(10),
        lineHeight:normalize(15),
        color:'#334955',
        fontWeight:'bold',
        // width: "10%",
        // flexWrap: "wrap",
        // position: "absolute",
        // marginHorizontal: 14,
        // marginVertical: 12,

    },
    busStopViewer: {
        paddingHorizontal:6,
        fontSize: normalize(11),
        color: '#f4f7f7',
    },
});

export default busCardStyle;
