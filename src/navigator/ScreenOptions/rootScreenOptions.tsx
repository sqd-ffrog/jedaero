import { HeaderView, LightColor } from "@sqd-ffrog/components";
import { StackNavigationOptions } from "@react-navigation/stack";

const screenOptions: StackNavigationOptions = {
  headerTitle: "",
  headerTransparent: true,
  headerBackground: HeaderView,
  cardStyle: {
    backgroundColor: LightColor.backgroundColor
  }
};

export default screenOptions;
