import React, {useEffect, useState, createRef} from 'react';
import { View, Text, TextInput, StyleSheet, Button, Animated, Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
import { normalize } from 'react-native-elements';
import colorPalette from '../styles/colorPalette';
import { Dreamy } from '../../tool/jedaero';
import { StackActions, NavigationActions } from 'react-navigation';
import { getBaseInfo } from '../../service/jedaeroService';

const Border = ({width = '50%'}) => (
    <Animated.View style={{...styles.border, width}} />
)

const interpolate = {
    inputRange: [0, 0.5, 1],
    outputRange: ['10%', '70%', '100%']
}
const Login = ({navigation}) => {
    const [account, setAccount] = useState('');
    const [password, setPassword] = useState('');
    const [isSubmitting, toggleSubmit] = useState(false);
    const [focusAccountValue] = useState(new Animated.Value(0));
    const [focusPasswordValue] = useState(new Animated.Value(0));
    const accountRef = createRef();
    const passwordRef = createRef();

    useEffect(() => { accountRef.current.focus() }, []);

    const submitToDreamy = async () => {
        await toggleSubmit(true);
        const isValidate = await Dreamy.isValidAccount(account, password);
        if(!isValidate) {
            Alert.alert("아이디나 비밀번호를 확인해주세요.");
            await toggleSubmit(false);
        } else {
            await AsyncStorage.setItem('account', account);
            await AsyncStorage.setItem('password', password);
            const baseInfo = await getBaseInfo(account);
            for(key in baseInfo) {
                await AsyncStorage.setItem(key, baseInfo[key]);
            }
            Alert.alert("로그인되었습니다.");
            await toggleSubmit(false);

            navigation.state.params && navigation.state.params.callback && navigation.state.params.callback();
            navigation.goBack();
                // const redirectAction = StackActions.reset({
                //     index: 0,
                //     actions: [NavigationActions.navigate({ routeName: 'Jedaero'})]
                // })
                // navigation.dispatch(redirectAction);
            // } else {
                // navigation.goBack();
            // }
            
        }
        
    }

    const focusAccount = () => {
        if(focusPasswordValue._value !== 0) {
            Animated.timing(
                focusPasswordValue, {
                    toValue: 0
                }
            ).start();
        }
        Animated.timing(
            focusAccountValue, {
                toValue: 1
            },
        ).start();
    }

    const focusPassword = () => {
        if(focusAccountValue._value !== 0) {
            Animated.timing(
                focusAccountValue, {
                    toValue: 0
                }
            ).start();
        }
        Animated.timing(
            focusPasswordValue, {
                toValue: 1
            }
        ).start();
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>학번</Text>
            <TextInput 
                ref={accountRef}
                style={styles.textinput}
                placeholder="학번을 입력하세요"
                value={account}
                onChangeText={value => setAccount(value)}
                autoFocus
                onFocus={focusAccount}
                onSubmitEditing={() => passwordRef.current.focus()}
            />
            <Border width={focusAccountValue.interpolate(interpolate)}/>
            <Text style={styles.text}>비밀번호</Text>
            <TextInput
                ref={passwordRef}
                style={styles.textinput}
                secureTextEntry={true}
                placeholder="비밀번호를 입력하세요"
                value={password}
                onFocus={focusPassword}
                onChangeText={value => setPassword(value)}
            />
            <Border width={focusPasswordValue.interpolate(interpolate)}/>
            <Button
                onPress={submitToDreamy}
                style={styles.button}
                title="로그인"
                disabled={isSubmitting}
                color={colorPalette.mainColor}
                accessibilityLabel="로그인 버튼"
            />
        </View>
    )
}
 
Login.navigationOptions = {
    title: '로그인'
}

const styles = StyleSheet.create({
    container: {
        padding: 32
    },
    text: {
        fontSize: normalize(20),
        fontWeight: 'bold',
        marginTop: 16,
        marginBottom: 8
    }, 
    textinput: {
        fontSize: normalize(24),
        paddingVertical: 8,
    },
    button: {
        marginVertical: 16,
        paddingVertical: 16
    },
    border: {
        borderWidth: 1,
        borderColor: colorPalette.mainColor
    }
})

export default Login;