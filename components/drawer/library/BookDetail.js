import React, { Component, useState, useEffect } from 'react'
import { Text, View, ScrollView, StyleSheet } from 'react-native'
import { lightText } from '../../styles/jedaeroCSS';
import { normalize } from 'react-native-elements';
import {LibraryBookDetailAPI} from '../../../tool/jedaero';
import colorPalette from '../../styles/colorPalette';

const BookDetail = ({navigation}) => {
    const [data, setData] = useState([]);
    const {getParam} = navigation;

    getBookData = async () => {
        try {
            const { data } = await LibraryBookDetailAPI(getParam('id'));
            setData(data);
        } catch(err) {
            throw err;
        }
        
    }
    useEffect(() => { getBookData(); }, []);

    return (
        <ScrollView contentContainerStyle={bookdetailStyles.container} style={bookdetailStyles.container}>
            <Text style={bookdetailStyles.title}>도서정보</Text>
            <View style={{...bookdetailStyles.innerContainer, borderWidth: 0.5, borderColor: colorPalette.cardBorderColor, overflow: 'hidden', borderRadius: 4}}>
                <BookRow left="자료유형" right={getParam('biblioType').name} />
                <BookRow style={{fontWeight:'bold'}} left="도서명" right={getParam('titleStatement')} />
                <BookRow left="저자" right={getParam('author')} />
                <BookRow left="출판" right={getParam('publication')} />
                <BookRow left="청구기호" right={getParam('branchVolumes')[0] ? getParam('branchVolumes')[0].volume : ""} />
            </View>
            <Text style={bookdetailStyles.title}>소장정보</Text>
            <StoreBook data={data} branchVolumes={getParam('branchVolumes')[0] ? getParam('branchVolumes')[0] : ""}/>
        </ScrollView>
        )
}

BookDetail.navigationOptions = {
    title: '도서상세'
}

const StoreBook = ({data, branchVolumes}) => data && data.length !== 0 && branchVolumes !== null ? (
    <View style={bookdetailStyles.innerContainer}>
        {
            data[branchVolumes.id].map((item, index) => (
                <View key={index} style={bookdetailStyles.storebook}>
                    <BookRow left="등록번호" right={item.barcode} />
                    <BookRow left="소장위치" right={item.location.name} />
                    <BookRow left="청구기호" right={item.callNo} />
                    <BookRow left="상태" right={item.circulationState !== null && item.circulationState.name !== null ? item.circulationState.name : "알 수 없음"} style={{color:(item.circulationState !== null && item.circulationState.name !== null ? (item.circulationState.name === '대출불가' ? 'red' : 'green') : 'red')}}/>
                </View>
            ))
        }
    </View>
) : (
    <Text style={{...bookdetailStyles.text, fontSize:normalize(18), lineHeight:normalize(18) * 1.5, textAlign:'center'}}>소장 정보 없음</Text>  
)

const BookRow = ({left, right, style}) => (
    <View style={{flexDirection:'row', backgroundColor:'#ffffff'}}>
        <View style={{flex:1, padding: 8}}>
            <Text style={{...bookdetailStyles.text, textAlign:'right'}}>{left}</Text>
        </View>
        <View style={{flex:3, padding: 8}}>
            <Text style={{...bookdetailStyles.text, ...style}}>{right}</Text>
        </View>
    </View>
    
)

const bookdetailStyles = StyleSheet.create({
    container: {
        paddingTop:16,
        paddingHorizontal:8,        
    },
    title: {
        fontSize:normalize(24),
        lineHeight: normalize(24) * 1.5,
        ...lightText,
        marginBottom:16,
    },
    innerContainer: {
        marginBottom:16,
        justifyContent: 'center',
    },
    text: {
        ...lightText,
        fontSize: normalize(14),
        lineHeight: normalize(14) * 1.5,
    },
    storebook: {
        borderWidth: 0.5,
        borderColor: '#e7e7e7',
        marginBottom: 16,
        borderRadius: 4
    }
});

export default BookDetail;