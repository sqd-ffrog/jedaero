import colorPalette from "../../styles/colorPalette";
import elevationShadowStyle from "../../../tool/elevationShadow";

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
      },
    },
}

export default jedaeroBottomTabNavigationConfig;