import { mainColor as activeColor, backgroundColor } from '../../styles/colorPalette';

const jedaeroBottomTabNavigationConfig = {
    labeled: true,
    shifting: true,
    activeColor,
    backBehavior: 'none',
    barStyle: {
        backgroundColor,
    },
};

export default jedaeroBottomTabNavigationConfig;
