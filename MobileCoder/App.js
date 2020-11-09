import React from 'react';
//import 'react-native-gesture-handler';
import SplashScreen from './screens/SplashScreen'
import SignupScreen from './screens/SignupScreen'
import LoginScreen from './screens/LoginScreen'
import HomeScreen from './screens/HomeScreen'
import { NavigationContainer, DarkTheme} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AdminScreen from './screens/admin/admin'
import FilesScreen from './screens/files/files'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as firebase from 'firebase'
import 'firebase/firestore'

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App(){
  return (
    <NavigationContainer theme={DarkTheme}>
      <StatusBar barStyle="light-content"/>
      <Stack.Navigator 
      screenOptions={{
        headerShown: false,
        animationEnabled: false,
        headerStyle: { backgroundColor: "#2B2E34"}
      }} 
      initialRouteName="Login">
      <Stack.Screen options={{headerShown: true}}name="Login" component={LoginScreen}/>
      <Stack.Screen options={{headerShown: true}} name="Signup" component={SignupScreen}/>
      <Stack.Screen name="Files" component={FilesScreen}/>
      <Stack.Screen name="Admin" component={AdminScreen}/>
      </Stack.Navigator>
      </NavigationContainer>
  );
};


/*
const AppStack = createStackNavigator({
  Home : HomeScreen
});

const AuthStack = createStackNavigator({
  Login: LoginScreen,
  Signup: SignupScreen
});
*/

/*
export default createAppContainer(
  createSwitchNavigator(
    {
      Splash: SplashScreen,
      App: AppStack,
      Auth: AuthStack
    },
    {
      initialRouteName: 'Splash'
    }
  )
);
*/

