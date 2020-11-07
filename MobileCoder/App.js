import React from 'react';
//import 'react-native-gesture-handler';
//import * as React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation'
import SplashScreen from './screens/SplashScreen'
import SignupScreen from './screens/SignupScreen'
import LoginScreen from './screens/LoginScreen'
import HomeScreen from './screens/HomeScreen'
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ExampleScreen from './screens/example'
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

var firebaseConfig = {
  apiKey: "AIzaSyDid2QqX_FubeW8euEBE-iMnWmLJCh5eqk",
  authDomain: "mobilecoder-cf2ea.firebaseapp.com",
  databaseURL: "https://mobilecoder-cf2ea.firebaseio.com",
  projectId: "mobilecoder-cf2ea",
  storageBucket: "mobilecoder-cf2ea.appspot.com",
  messagingSenderId: "409368131515",
  appId: " 1:409368131515:web:ad9bb0eb12dd518cfb769e",
  measurementId: "G-LSBZPKF91D"
}


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function App(){
  return (
    <NavigationContainer theme={DarkTheme}>
      <StatusBar barStyle="light-content"/>
      <Stack.Navigator 
      screenOptions={{
        headerShown: false,
        animationEnabled: false
      }} 
      initialRouteName="Files">
      <Stack.Screen name="Files" component={FilesScreen}/>
      <Stack.Screen name="Admin" component={AdminScreen}/>
      </Stack.Navigator>
      </NavigationContainer>
  );
};

firebase.initializeApp(firebaseConfig);

const AppStack = createStackNavigator({
  Home : HomeScreen
});

const AuthStack = createStackNavigator({
  Login: LoginScreen,
  Signup: SignupScreen
});

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

