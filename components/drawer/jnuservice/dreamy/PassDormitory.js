import React, {useState, useEffect} from 'react'
import { View, Text, ActivityIndicator } from 'react-native'
import colorPalette from '../../../styles/colorPalette';
import { isPassDormitory } from '../../../../service/jedaeroService';

const PassDormitory = () => {
    const [result, setResult] = useState(null);
    const [resultDetail, setResultDetail] = useState('');
    const getResult = async () => setResult(await isPassDormitory());
    useEffect(() => { getResult() }, []);
    useEffect(() => { if(!result) {
        const { resultCode, collectTitle, appliedPlace, allocatedPlace, allocatedRoomNo, name, id, rank, competitor } = result;
        let resultDetail;
        switch(resultCode) {
            case 1:
                resultDetail = `축하합니다! ${appliedPlace}에 합격하셨습니다! 돈 꼭 내세요!`;
                break;
            case 2:
                resultDetail = `축하합니다! ${appliedPlace}에 합격하셨습니다! ${allocatedPlace} ${allocatedRoomNo}에 배정받으셨습니다`;
                break;
            case 3:
                resultDetail = `현재 ${appliedPlace} ${competitor} 대기 순번 ${rank} 입니다!`;
                break;
            case 4:
                resultDetail = `서류미제출로 불합격하셨습니다.`;
                break;
            case 5:
                resultDetail = `불합격하셨습니다.`;
                break;
            case 6:
                resultDetail = `현재 합격자 발표 기간이 아닙니다.`;
                break;
            case 7:
                resultDetail = `현재 합격자 발표 기간이 아닙ㄴ다.`;
                break;

            
        }
    }}, [ result ])
    return !result ? (
        <View style={{alignItems: 'center', paddingTop:20, flex:1}}>
            <ActivityIndicator size='large' color={colorPalette.mainColor}/>
        </View>
    ) :
    (
        <View><Text>{resultDetail}</Text></View>
    )
}