import colorPalette from "../../styles/colorPalette";
import elevationShadowStyle from "../../../tool/elevationShadow";
import { normalize } from "react-native-elements";
import { Platform } from 'react-native';

const jedaeroBottomTabNavigationConfig = {
    backBehavior: 'none',
    lazy: true,
    resetOnBlur: true,
    tabBarOptions: {
      activeTintColor: colorPalette.mainColor,
      showLabel: true,
      showIcon: true,
      style: {
        backgroundColor: colorPalette.backgroundColor,
        ...elevationShadowStyle(12),
        borderTopWidth: 0,
        minHeight:normalize(48),
        height: normalize(Platform.OS === 'ios' ? 40 : 48),
        paddingVertical:8,
      },
    },
}

export default jedaeroBottomTabNavigationConfig;