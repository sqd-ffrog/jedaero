import React, { Fragment } from 'react'
import { View, Text } from 'react-native';

function NonMeetingLectureModel() {
    return (
        <Fragment>
            <View>
                <Text>hihhii</Text>
            </View>
        </Fragment>
    )
}

NonMeetingLectureModel.navigationOptions = props => ({
    headerTitle: "비대면 강의모델"  
})
export default NonMeetingLectureModel;