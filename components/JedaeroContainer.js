/**
 * Aerain
 */

import React, { useEffect } from 'react'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack';
import MainBottomTabNavigation from './navigations/MainBottomTabNavigation';
import InfoHome from './info/InfoHome';
import { stackNavigationConfig } from './navigations/navigationConfigs';
import Developer from './info/Developer';
import License from './info/License';
import Login from './info/Login';
import getConfig from '../tool/config';
import { connect } from 'react-redux';

const MainStackNavigator = createStackNavigator({
    Jedaero: {
        screen: MainBottomTabNavigation,
        navigationOptions: () => ({
            headerShown: false
        })
    },
    Info: {
        screen: InfoHome,
    },
    Developer : {
        screen: Developer
    },
    License: {
        screen: License
    },
}, stackNavigationConfig)

const JedaeroAppContainer = createAppContainer(MainStackNavigator);

function JedaeroContainer ({setConfigStore}) {
    useEffect(() => {
        doSetConfig();
    }, []);

    async function doSetConfig() {
        const data = await getConfig();
        console.debug("remote switch config: ", data);
        setConfigStore(data);
    }
    return <JedaeroAppContainer />;
}

export default connect(
    store => ({}), 
    dispatch => ({
        setConfigStore: payload => dispatch({
            type: 'SET_CONFIG',
            payload
        }),
    }),
)(JedaeroContainer);