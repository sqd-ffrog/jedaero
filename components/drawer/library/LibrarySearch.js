import React, { useState } from 'react'
import { ScrollView, View, TextInput } from 'react-native'
import { normalize, Button, } from 'react-native-elements';
import { libsearchStyles } from '../../styles/jedaeroCSS';
import LibrarySeat from './LibrarySeat';
import colorPalette from '../../styles/colorPalette';

const LibrarySearch = ({navigation}) => {
  const [search, setSearch] = useState("");
  return (
    <View style={{flex: 1, backgroundColor:colorPalette.backgroundColor}}>
      <ScrollView contentContainerStyle={libsearchStyles.container}>
        <View style={{padding: 8, borderRadius: 8}}>
          <TextInput 
          placeholder="책 제목을 입력하세요"
          style={libsearchStyles.textContainer}
          onChangeText={search => setSearch(search)}
          />
          <Button
          title="검색"
          onPress={() => {
            if(search.trim() !== '') navigation.navigate('LibrarySearchDetail', {search: search})}
          }
          buttonStyle={{backgroundColor:'transparent', elevation:0, paddingVertical:16,}}
          titleStyle={{color:colorPalette.mainColor, fontSize:normalize(16)}}
          />
        </View>
        <LibrarySeat />
      </ScrollView>
    </View>
  )
}

LibrarySearch.navigationOptions = {
  headerTitle: "도서관"
}

export default LibrarySearch;