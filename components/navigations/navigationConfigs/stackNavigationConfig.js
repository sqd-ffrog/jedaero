const stackNavigationOptions = {
    mode: 'modal',
    headerMode:'float',
    headerTransitionPreset: 'uikit',
    navigationOptions : () => ({
      headerTitle: "ㅇㄹㅇㄹ",
      headerTintColor: '#ffffff',
      headerStyle: {
          backgroundColor:'#ffffff',
          borderWidth: 0,
          elevation: 0,
      },
      headerTitleStyle: {
          fontSize: normalize(20),
      },
      gestureEnabled: true,
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
}

export default stackNavigationOptions;