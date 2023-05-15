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
import AllFile from '../Screens/AllFile/AllFile';
import PDFFile from '../Screens/PDFFile/PDFFile';
import DocFile from '../Screens/DocFile/DocFile';
import ExcelFile from '../Screens/ExcelFile/ExcelFile';
import PPTFile from '../Screens/PPTFile/PPTFile';
import TXTFile from '../Screens/TXTFile/TXTFile';
import ImageFile from '../Screens/ImageFile/ImageFile';

//View File
import ViewPDF from '../Screens/ViewFile/ViewPDF';
import ViewExcel from '../Screens/ViewFile/ViewExcel';


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
        <HomeStack.Screen name="MyTabs" component={MyTabs} />
        <HomeStack.Screen name='AllFile' component={AllFile} />
        <HomeStack.Screen name='PDFFile' component={PDFFile} />
        <HomeStack.Screen name='DocFile' component={DocFile} />
        <HomeStack.Screen name='ExcelFile' component={ExcelFile} />
        <HomeStack.Screen name='PPTFile' component={PPTFile} />
        <HomeStack.Screen name='TXTFile' component={TXTFile} />
        <HomeStack.Screen name='ImageFile' component={ImageFile} />
        <HomeStack.Screen name='ViewPDF' component={ViewPDF} />
        <HomeStack.Screen name='ViewExcel' component={ViewExcel} />

        
      </HomeStack.Navigator>
    // </NavigationContainer>
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