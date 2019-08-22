import React, {useState, useEffect} from 'react'
import { View, TouchableOpacity, Text, StyleSheet, SectionList, Linking } from 'react-native'
import colorPalette from '../styles/colorPalette';
import { normalize } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const developerList = [
    {
        name: '이청길',
        uri: 'https://github.com/aerain',
    },
    {
        name: '최원범',
        uri: 'https://github.com/WonBeomChoi',
    },
    {
        name: '오현규',
        uri: 'https://github.com/rbrbrb7290',
    },
    {
        name: '김승현',
        uri: 'https://github.com/wkdlfhtm1',
    }
]

const sectionHeader = ({section: {title}}) => (
    <View style={styles.sectionHeader}>
        <Text style={styles.sectionHeaderText}>{title}</Text>
    </View>
)
const contributorItem = ({item, index, section}) => (<Text key={index}>{item}</Text>)
const developerItem = ({item: {name, uri}, index}) => (
    <TouchableOpacity key={index} style={styles.developerItem} onPress={() => Linking.openURL(uri)}>
        <Icon name="github-circle" size={normalize(30)} color={colorPalette.mainColor} />
        <View style={{flex: 1, flexDirection: 'column', marginHorizontal: 16}}>
            <Text style={styles.developerNameText}>{name}</Text>
            <Text>{uri}</Text>
        </View>
        <Icon name="chevron-right" size={18} color={colorPalette.mainColor} />
    </TouchableOpacity>
)
const Developer = () => {
    const [contributors, setContributors] = useState([]);
    const getContributorList = async () => {
        const uri = 'https://raw.githubusercontent.com/jnuro/database/master/contributor.json';
        try {
            const { data } = await (await fetch(uri)).json();
            setContributors(data);
        } catch(err) {
            throw err;
        }
    }

    useEffect(() => {
        getContributorList();
    }, []);

    return (
        <View style={{flex: 1, backgroundColor: colorPalette.backgroundColor}}>
            <SectionList
                renderItem={contributorItem}
                keyExtractor={(item, index) => index}
                sections={[
                    { title: 'Developers', data: developerList, renderItem: developerItem},
                    { title: 'Contributors', data: contributors}
                ]}
                contentContainerStyle={styles.sectionListStyle}
                renderSectionHeader={sectionHeader}
            />
        </View>
    )
    }

Developer.navigationOptions = {
    title: "개발자 정보"
}

const styles = StyleSheet.create({
    sectionListStyle: {
        paddingHorizontal: 16,
    },
    sectionHeader: {
        marginTop: 32,
        marginBottom: 16,
    },
    sectionHeaderText: {
        fontSize: normalize(20),
        fontWeight: 'bold'
    },
    developerItem: {
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: colorPalette.cardBackgroundColor,
        borderRadius: 8,
        marginBottom: 12,
        paddingHorizontal: 8,
        paddingVertical: 12,
        borderWidth: 0.5,
        borderColor: colorPalette.cardBorderColor
    },
    developerNameText: {
        fontSize: normalize(16),
    }
})

export default Developer;