import React,{useContext, useEffect} from 'react';
import { Image , View, Dimensions, Platform, Text, Alert, TouchableOpacity} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ContextState from '../Core/ContextState';
import Icon from 'react-native-vector-icons/Ionicons';
import theme from '../Core/theme';
const { icons, colors, images, font } = theme;
const {height, width} = Dimensions.get('window')
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
// Splash Screen
import Splash from '../Screens/Splash/Splash';

// Carousel Screen
//import Carousel from '../Screens/CarouselScreen/Carousel';



//Bottom Tab Screen
import Home from '../Screens/Home/Home';


//HomeNavigation



import { navigationRef } from './RootNavigation';




const Stack = createStackNavigator();

const MainNavigation = (props) => {

  
  return(
    <NavigationContainer  ref={navigationRef}>
      <ContextState>
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="Splash" component={Splash}/>
        
        <Stack.Screen name="HomeNavigation" component={HomeNavigation} />
        
      </Stack.Navigator>
     
      </ContextState>
    </NavigationContainer>
  )
}






const HomeStack = createStackNavigator();
const HomeNavigation =() =>{
  return(
    // <NavigationContainer>
      <HomeStack.Navigator screenOptions={{headerShown:false}}>

        {/* Home Screens */}
        <HomeStack.Screen name="DrawerNavigation" component={DrawerNavigation} />
        

        
      </HomeStack.Navigator>
    // </NavigationContainer>
  )
}

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      
      <DrawerItem
        label="Trang chủ"
        labelStyle={{color: '#1D252D', fontSize: 16, fontFamily: font.medium}}
        onPress={() => props.navigation.navigate('Home')}
        
        /* icon={()=>(<Image resizeMode='contain' style={{width: width*0.07, height: width*0.07}} source={icons.ic_profile} />)} */
      />
      
      
    </DrawerContentScrollView>
  );
}
const Drawer = createDrawerNavigator();
const DrawerNavigation = () => {
  return (
    <Drawer.Navigator initialRouteName="Home"
    drawerContent={(props) => <CustomDrawerContent {...props} />}
    screenOptions={{headerShown:false,
      tabBarHideOnKeyboard: true,

      //tabBarShowLabel:true, 
      tabBarStyle:{height:Dimensions.get('window').height*0.08}}}
    >
        <Drawer.Screen name="Home" component={Home} />
        
    </Drawer.Navigator>
  )
}

const Tab = createBottomTabNavigator();
function MyTabs() {

    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={{headerShown:false,
                tabBarHideOnKeyboard: true,
      
                //tabBarShowLabel:true, 
                tabBarStyle:{height:Dimensions.get('window').height*0.08}}}>

      
            <Tab.Screen 
                name="Home" 
                component={Home} 
                options={{
                    tabBarLabel: ({ focused })=>(
                      focused?(<Text style={{color: colors.mainText, fontSize: 11}}>Trang chủ</Text> ):(
                      <Text style={{color: "#A9A9A9", fontSize: 11}}>Trang chủ</Text>
                    )),
                    tabBarIcon: ({ focused }) => (
                        focused?(<Icon name='folder' size={28} color={colors.mainBackgroundColor} /> ):(
                        <Icon name='folder' /> 
                    )),
                }}
            />
      

        </Tab.Navigator>
  );
}
 
const mapStateToProps = (state) => { 
  return {
          
      
  } 
}   
const mapStateToDispatch = (dispatch)   => {
  return {
    initAuth: (data) => { 
          dispatch(initAuthStart(data));
      },
      
  }
}

export default MainNavigation;