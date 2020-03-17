import { HeaderBlurView, LightColor } from "@sqd-ffrog/components";
import { StackNavigationOptions } from "@react-navigation/stack";

const screenOptions: StackNavigationOptions = {
  headerTitle: "",
  headerTransparent: true,
  headerBackground: HeaderBlurView,
  cardStyle: {
    backgroundColor: LightColor.backgroundColor
  }
};

export default screenOptions;
