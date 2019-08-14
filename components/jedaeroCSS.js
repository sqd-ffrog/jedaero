import { StyleSheet, Animated, Easing } from 'react-native';
import { normalize } from 'react-native-elements';
import './css/busStyle'

let stackNavigationOptions = {
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

let jedaeroStyles = StyleSheet.create({

})

let foodMenuListStyles = StyleSheet.create({
    container: {
        // marginHorizontal: 5,
        // marginVertical: 5,
        paddingHorizontal: 20,
        paddingVertical: 15,
        // borderBottomWidth:0.5,
        borderBottomWidth: 0.5,
        borderColor: '#e7e7e7',
        borderRadius: 4,

        // justifyContent: 'flex-end',
    },
    labelStyle: {
        fontSize:normalize(16),
        color: '#000000'
    }
})

let foodTabStyles = StyleSheet.create({
    listTitleStyle: {
      textAlign: 'center',
      fontSize: normalize(20),
      color: '#000000',
    },
    listSubtitleStyle: {
      textAlign:'center',
      color: '#7d7d7d',
      fontSize: normalize(10)
    },
    listContainerStyle: {
      paddingTop:24,
      paddingBottom:16,
      backgroundColor:'white',
      borderWidth: 0.5,
      borderColor:'#e7e7e7',
      marginHorizontal:10,
      marginBottom:16,
      borderRadius:4,
      overflow:'hidden'
    }
})

let foodTabNavStyles = StyleSheet.create({
    scrollContainer: {
      paddingTop:8,
      backgroundColor: '#f7f7f7',
    },
    container: {
      flex:1,
      backgroundColor:'#ffffff',
      borderRadius:4,
      borderColor:'#e7e7e7',
      borderWidth:0.5,
      overflow:'hidden',
      marginHorizontal:8,
      marginBottom: 16,
    },
    title: {
      justifyContent:'center',
      alignItems:'center'
    },
    foodlist: {
      fontSize: normalize(14), 
      textAlign:'left', 
      color: '#000000', 
      width:'70%', 
      paddingLeft: 20
    },
    foodtime: {
      fontSize: normalize(8),
      fontWeight: 'bold',
      fontStyle: 'italic',
      textAlign:'left', 
      color: '#000000',
      paddingLeft: 12, 
      borderLeftWidth: 0.3, 
      borderColor:"#D3D3D3",
      width: '30%' 
    },
    foodlistContainer: {
      paddingVertical:4,
    },
    foodlistTitle: {
      textAlign:'center',
      fontSize: normalize(20),
      color:'white',
    },
    subContainer: {
      paddingVertical:8,
      flexDirection: 'row'
    }
});

let jedaeroBottomTabNavigatorConfig = {
  labeled: false,
  barStyle: {
    backgroundColor: '#ffffff',
  }
}

let libsearchStyles = StyleSheet.create({
    container: {
      paddingHorizontal: 16,
      paddingBottom:32,
    },
    textContainer: {
      fontSize:normalize(24),  
      paddingVertical:8, 
      textAlign:'center', 
      borderBottomWidth:0.5, 
      borderBottomColor:'black',
    }
  })

let menuTopTabOptions = {
    backBehavior: 'none',
    tabBarPosition: 'top',
    lazy: false,
    tabBarOptions: {
        showIcon:false,
        activeTintColor: "#000000",
        inactiveTintColor:'#d7d7d7',
        tabStyle:{
            justifyContent:'center',
            alignItems:'center',
        },
        labelStyle: {
            fontSize: normalize(20),
        },
        style: {
          backgroundColor:'#ffffff',
          borderBottomWidth:0.5,
          borderBottomColor:'#d7d7d7',
          elevation:0
        },
        indicatorStyle: {
          marginBottomWidth:0,
          height:0
        },
        // safeAreaInset: {bottom:'never', top:'never'}
    },

  }
export { stackNavigationOptions, jedaeroStyles, foodMenuListStyles, foodTabStyles, foodTabNavStyles, jedaeroBottomTabNavigatorConfig, libsearchStyles, menuTopTabOptions }