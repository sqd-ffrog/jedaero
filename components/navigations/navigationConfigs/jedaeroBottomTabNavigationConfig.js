import colorPalette from "../../styles/colorPalette";
import elevationShadowStyle from "../../../tool/elevationShadow";
import { normalize } from "react-native-elements";
import { Platform } from 'react-native';

const jedaeroBottomTabNavigationConfig = {
    backBehavior: 'none',
    lazy: true,
    resetOnBlur: true,
    tabBarOptions: {
      adaptive: true,
      activeTintColor: colorPalette.mainColor,
      showLabel: true,
      showIcon: true,
      labelPosition: 'below-icon',
      style: {
        backgroundColor: colorPalette.backgroundColor,
        ...elevationShadowStyle(12),
        // minHeight:normalize(40),
        // paddingBottom: 8,
        // height: normalize(Platform.OS === 'ios' ? 40 : 48),
        height: normalize(48),
        borderTopWidth: 0,
        // paddingTop: 8,
        // paddingBottom: 4,
        alignItems: 'center',
        justifyContent: 'center'
      },
      tabStyle: {
        alignItems: 'center',
        paddingTop: normalize(8),
        height: normalize(56),
      },
      labelStyle: {
        paddingBottom: normalize(12)
      }
    },
}

export default jedaeroBottomTabNavigationConfig;