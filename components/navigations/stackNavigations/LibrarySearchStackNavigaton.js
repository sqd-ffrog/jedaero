import React, { Component } from 'react'
import { createStackNavigator } from 'react-navigation';

import LibrarySearch from '../../drawer/library/LibrarySearch';
import LibrarySearchDetail from '../../drawer/library/LibrarySearchDetail';
import BookDetail from '../../drawer/library/BookDetail';
import {stackNavigationOptions} from '../navigationConfigs';

export default LibraryStackNavigator = createStackNavigator({
    LibrarySearchHome: {
        screen: LibrarySearch,
    },
    LibrarySearchDetail: {
        screen: LibrarySearchDetail,
    },
    BookDetail: {
        screen: BookDetail,
    }
}, stackNavigationOptions);

// class LibrarySearchStackNavigator extends Component {
//     static router = LibraryStackNavigator.router;
//     static navigationOptions = {
//         headerTitle: "도서검색"
//     }

//     constructor(props) {
//         super(props);
//     }

//     render() {
//         return <LibraryStackNavigator navigation={this.props.navigation} />
//     }
// }