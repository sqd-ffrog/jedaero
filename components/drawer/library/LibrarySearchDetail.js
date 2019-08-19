import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, FlatList } from 'react-native'
import { normalize, ListItem } from 'react-native-elements';
import {LibraryBookListAPI} from '../../../tool/jedaero';
import colorPalette from '../../styles/colorPalette';

const LibrarySearchDetail = ({navigation}) => {
    const [list, setList] = useState([]);
    const [offset, setOffset] = useState(0);
    const [totalCount, setTotalCount] = useState(null);

    const getData = async () => {
        if(!totalCount || totalCount > offset) {
            try {
                const { data } = await LibraryBookListAPI(navigation.getParam('search'), offset);
                setTotalCount(data.totalCount)
                setList(list => {
                    Array.prototype.push.apply(list, data.list);
                    return list;
                })
                setOffset(prevOffset => prevOffset + 20)
            } catch( err) {
                throw err;
            }
        }
    }

    const _renderItem = ({item}) => {
        let status = (item.branchVolumes[0]) ? `${item.branchVolumes[0].name} [${item.branchVolumes[0].volume}]` : '';
        let cState = item.branchVolumes[0] ? item.branchVolumes[0].cState : '';
        return (
            <ListItem
                key={item.id}
                title={item.titleStatement}
                subtitle={
                    <View>
                        <Text style={libdetailStyles.subtitleStyle}>{item.author}</Text>
                        <Text style={libdetailStyles.subtitleStyle}>{item.publication}</Text>
                        <Text style={libdetailStyles.subtitleStyle}>{status} <Text style={{color: (cState === '대출불가' ? 'red' : 'green')}}>{cState}</Text></Text>
                    </View>    
                }
                titleStyle={{fontSize:normalize(16), fontWeight:'bold'}}
                containerStyle={{borderWidth: 0.5, borderColor:colorPalette.cardBorderColor, marginHorizontal: 10, marginBottom: 8, borderRadius: 4}}
                onPress={() => navigation.navigate('BookDetail', item)}
                chevron
            />
        )
    }

    useEffect(() => { getData(); }, [])
    
    return (
        <React.Fragment>
            {
                (list.length !== 0) && (
                    <Text style={libdetailStyles.textStyle}>
                        <Text style={{fontSize:normalize(14)}}>{totalCount}</Text> 건
                    </Text>
                )
            }
            <FlatList 
                data={list}
                renderItem={_renderItem}
                onEndReached={getData}
                // style={{borderTopWidth:0.5, borderTopColor:'#d7d7d7'}}
            />
        </React.Fragment>
        )

}

LibrarySearchDetail.navigationOptions = ({navigation}) => ({
    title: navigation.getParam('search', 'none'),
});

const libdetailStyles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 8
    },

    textStyle: {marginHorizontal: 8, marginBottom: 4, fontSize:normalize(12), textAlign:'right',color: colorPalette.textColor},
    subtitleStyle: {fontSize:normalize(12),}
})

export default LibrarySearchDetail