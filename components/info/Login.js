import React, {useEffect, useState, createRef} from 'react';
import { View, Text, TextInput, StyleSheet, Animated, Alert, ScrollView } from 'react-native';
import { normalize, Button } from 'react-native-elements';
import colorPalette from '../styles/colorPalette';
import { Dreamy } from '../../tool/jedaero';
import { getBaseInfo, checkLogin, logoutDreamy } from '../../service/jedaeroService';
import * as Keychain from 'react-native-keychain';

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
            const baseInfo = await getBaseInfo(account, password);
            await Keychain.setGenericPassword(account, JSON.stringify({password, ...baseInfo}));
            Alert.alert("로그인되었습니다.");
            await toggleSubmit(false);
            navigation.state.params && navigation.state.params.callback && navigation.state.params.callback();
            navigation.goBack();
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
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.text}>학번</Text>
            <TextInput 
                ref={accountRef}
                style={styles.textinput}
                placeholder="학번을 입력하세요"
                placeholderTextColor="#777777"
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
                placeholderTextColor="#777777"
                secureTextEntry={true}
                placeholder="비밀번호를 입력하세요"
                value={password}
                onFocus={focusPassword}
                onChangeText={value => setPassword(value)}
            />
            <Border width={focusPasswordValue.interpolate(interpolate)}/>
            <Button
                onPress={submitToDreamy}
                buttonStyle={styles.button}
                titleStyle={styles.buttonText}
                title="로그인"
                disabled={isSubmitting}
                color={colorPalette.mainColor}
                accessibilityLabel="로그인 버튼"
                type="solid"
            />
        </ScrollView>
    )
}
 
Login.navigationOptions = {
    title: '로그인'
}

const styles = StyleSheet.create({
    container: {
        padding: 32,
        justifyContent: 'center',
    },
    text: {
        fontSize: normalize(16),
        fontWeight: 'bold',
        marginTop: 16,
        marginBottom: 8
    }, 
    textinput: {
        fontSize: normalize(20),
        color: colorPalette.textColor,
        paddingVertical: 8,
    },
    button: {
        marginVertical: 16,
        paddingVertical: 16,
        minHeight: 48,
        backgroundColor: colorPalette.mainColor
    },
    buttonText: {
        fontSize: normalize(18)
    },
    border: {
        borderWidth: 1,
        borderColor: colorPalette.mainColor,
        marginBottom: 16,
    }
})

export default Login;