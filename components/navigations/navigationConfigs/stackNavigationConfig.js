import { normalize } from "react-native-elements";
import { Easing, Animated } from 'react-native'
import colorPalette from "../../styles/colorPalette";
import { TransitionSpecs, CardStyleInterpolators, HeaderStyleInterpolators, TransitionPresets } from "react-navigation-stack";

const stackNavigationConfig = {
    mode: 'card',
    headerMode: 'float',
    // headerTransitionPreset: 'uikit',
    defaultNavigationOptions : () => ({
        headerTintColor: colorPalette.mainColor,
        headerStyle: {
            backgroundColor: colorPalette.backgroundColor,
            elevation: 0,
            shadowRadius: 0,
            shadowOffset: {
                height: 0,
            },
            shadowColor: 'transparent',
            borderBottomWidth: 0,
        },
        headerTitleStyle: {
            fontSize: normalize(18),
            fontWeight: 'bold',
            color: colorPalette.textColor
        },
        gestureEnabled: true,
        gestureDirection: "horizontal",
        cardStyle: {
            borderWidth: 0,
            borderBottomWidth:0,
            backgroundColor: colorPalette.backgroundColor
        },
        transitionSpec: {
            open: TransitionSpecs.TransitionIOSSpec,
            close: TransitionSpecs.TransitionIOSSpec,
        },
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        headerStyleInterpolator: HeaderStyleInterpolators.forUIKit
    }),
}

export default stackNavigationConfig;