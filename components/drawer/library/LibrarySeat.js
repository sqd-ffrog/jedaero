import React, { Component, Fragment, useState, useEffect } from 'react'
import { ScrollView, View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { normalize } from 'react-native-elements';
import { LibrarySeatAPI } from '../../../tool/jedaero';
import Icon from 'react-native-vector-icons/SimpleLineIcons'
import colorPalette from '../../styles/colorPalette';

const LibrarySeat = () => {
    const [data, setData] = useState(null);
    const getLibrarySeatData = async () => {
        setData(await LibrarySeatAPI())
    }
    const _renderItem = ({item, key}) => (
        <TableRow key={key} left={item['table1']} right={`${item['table3']} / ${item['table2']}`} />
    )
    const _keyExtractor = (item, index) => item['table0'];
    useEffect(() => { getLibrarySeatData(); }, [])
    return !data ? (
        <View style={{justifyContent:'center', alignItems:'center'}}>
            <ActivityIndicator size="large" />
        </View>
    ) : (
        <Fragment>
            <Text style={styles.titleText}>도서관 잔여 좌석 수 </Text>
            <TouchableOpacity
            style={{
                flexDirection:'row',
                justifyContent:'flex-end',
                borderRadius:8,
                paddingHorizontal:8,
                paddingVertical:4,
                borderWidth:0.5,
                borderColor:colorPalette.cardBorderColor,
                backgroundColor:colorPalette.cardBackgroundColor
            }}
            onPress={getLibrarySeatData}
            >
            <Icon name="refresh" size={normalize(14)} color={colorPalette.textColor}/>
            <Text style={{fontSize:normalize(14), color:colorPalette.textColor}}> 새로고침</Text>
            </TouchableOpacity>
            <FlatList 
                keyExtractor={_keyExtractor}
                contentContainerStyle={styles.listContainer}
                data={data.row}
                renderItem={_renderItem}
            />
        </Fragment>
    )
}

class TableRow extends Component {
    constructor(props) {
        super(props);
        this.state={};
    }

    render () {
        return (
            <TouchableOpacity style={styles.rowUnit}>
                <View style={styles.rowUnitLeft}>
                    <Text style={styles.rowUnitTextLeft}>{this.props.left}</Text>
                </View>
                <View style={styles.rowUnitRight}>
                    <Text style={styles.rowUnitTextRight}>{this.props.right}</Text>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    listContainer: {
        borderRadius:8,
        overflow:'hidden',
        borderWidth: 0.5,
        borderColor:'#d7d7d7',
        borderBottomWidth:0,
        marginVertical:8,
    },
    titleText: {
        color:'#334955',
        fontSize:normalize(20),
        marginBottom: 16,
        fontWeight:'bold'
    },
    rowUnit: {
        flexDirection:'row',
        borderBottomWidth:0.5,
        borderColor:'#d7d7d7',
        backgroundColor: colorPalette.cardBackgroundColor,
    },
    rowUnitLeft: {
        flex:2.5,
        paddingHorizontal:8,
        paddingVertical: 6,
        justifyContent:'center'
    },
    rowUnitRight: {
        paddingHorizontal:8,
        paddingVertical:4,
        justifyContent:'center',
        flex: 1,
        backgroundColor:colorPalette.mainColor,
    },
    rowUnitTextLeft: {
        fontSize:normalize(16),
        color:'#000000'
    },
    rowUnitTextRight: {
        fontSize:normalize(16),
        color:'#ffffff',
        textAlign:'center'
    }
})


export default LibrarySeat;
// export default class LibrarySeat extends Component {
//     constructor(props) {
//         super(props);
//         this.state={};
//     }

//     componentDidMount = () => this.getData();
    
//     getData = async () => {
//         let data = await LibrarySeatAPI();
//         this.setState({data});

//     }

//     _renderItem = ({item, key}) => (
//         <TableRow key={key} left={item['table1']} right={`${item['table3']} / ${item['table2']}`} />
//     )

//     _keyExtractor = (item, index) => item['table0'];

//     render() {
//         if (!this.state.data) {
//             return (
//                 <View style={{justifyContent:'center', alignItems:'center'}}>
//                     <ActivityIndicator size="large" />
//                 </View>
//             )
           
//         } else {
//             return (
//                 <Fragment>
//                     <Text style={styles.titleText}>도서관 잔여 좌석 수 </Text>
//                     <TouchableOpacity
//                     style={{
//                         flexDirection:'row',
//                         justifyContent:'flex-end',
//                         borderRadius:8,
//                         paddingHorizontal:8,
//                         paddingVertical:4,
//                         borderWidth:0.5,
//                         borderColor:'#d7d7d7',
//                         backgroundColor:'#d7d7d7'
//                     }}
//                     onPress={this.getData}
//                     >
//                     <Icon name="refresh" size={normalize(14)} color='#000000'/>
//                     <Text style={{fontSize:normalize(14), color:'#000000'}}> 새로고침</Text>
//                     </TouchableOpacity>
//                     <FlatList 
//                         keyExtractor={this._keyExtractor}
//                         contentContainerStyle={styles.listContainer}
//                         data={this.state.data.row}
//                         renderItem={this._renderItem}
//                     />
//                 </Fragment>
//             )
//         }
//     }
// }

