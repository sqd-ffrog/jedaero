import { createStackNavigator } from 'react-navigation-stack';

import LibrarySearch from '../../drawer/library/LibrarySearch';
import LibrarySearchDetail from '../../drawer/library/LibrarySearchDetail';
import BookDetail from '../../drawer/library/BookDetail';
import {stackNavigationConfig} from '../navigationConfigs';

const LibraryStackNavigator = createStackNavigator({
    LibrarySearchHome: {
        screen: LibrarySearch,
    },
    LibrarySearchDetail: {
        screen: LibrarySearchDetail,
    },
    BookDetail: {
        screen: BookDetail,
    }
}, stackNavigationConfig);

export default LibraryStackNavigator;