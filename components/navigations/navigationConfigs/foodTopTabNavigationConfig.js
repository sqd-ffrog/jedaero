const foodTopTabNavigationConfig = {
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
    },
}

export default foodTopTabNavigationConfig;