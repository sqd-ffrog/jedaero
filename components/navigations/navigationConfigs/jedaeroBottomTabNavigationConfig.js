import colorPalette from "../../styles/colorPalette";
import elevationShadowStyle from "../../../tool/elevationShadow";

const jedaeroBottomTabNavigationConfig = {
    backBehavior: 'none',
    lazy: true,
    resetOnBlur: true,
    tabBarOptions: {
      activeTintColor: colorPalette.mainColor,
      showLabel: false,
      tabStyle: {
        backgroundColor: colorPalette.backgroundColor,
        ...elevationShadowStyle(5),
        borderWidth: 0
      },
    },
}

export default jedaeroBottomTabNavigationConfig;