import { normalize } from "react-native-elements";
import { Easing, Animated } from 'react-native'
import colorPalette from "../../styles/colorPalette";

const stackNavigationConfig = {
    mode: 'modal',
    headerMode:'float',
    headerTransitionPreset: 'uikit',
    defaultNavigationOptions : () => ({
        headerTintColor: colorPalette.mainColor,
        headerStyle: {
            backgroundColor: colorPalette.backgroundColor,
            elevation: 0,
            borderBottomWidth: 0,
        },
        headerTitleStyle: {
            fontSize: normalize(18),
            fontWeight: 'bold',
            color: colorPalette.textColor
        },
        gestureEnabled: true,
        gestureDirection: "default"
    }),
    transitionConfig: () => ({
        transitionSpec: {
            duration: 500,
            easing: Easing.out(Easing.poly(4)),
            timing: Animated.timing,
        },
        screenInterpolator: sceneProps => {
            const { layout, position, scene } = sceneProps;
            const { index } = scene;
            
            const Width = layout.initWidth;
            const translateX = position.interpolate({
                inputRange: [index - 1, index, index + 1],
                outputRange: [Width, 0, 0]
            });

            const opacity = position.interpolate({
                inputRange: [index - 1, index - 0.99, index],
                outputRange: [0, 1, 1],
            });
            
            return { opacity, transform: [{ translateX }]}
        },
    }),
    cardStyle: {
        backgroundColor: colorPalette.backgroundColor
    }
}

export default stackNavigationConfig;