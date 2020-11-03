import React from 'react';
//import 'react-native-gesture-handler';
//import * as React from 'react';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ExampleScreen from './screens/example'
import AdminScreen from './screens/admin/admin'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

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

function App(){
  return (
    <NavigationContainer theme={DarkTheme}>
      <StatusBar barStyle="light-content"/>
      <Tab.Navigator 
      screenOptions={{headerShown: false}} 
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}
      initialRouteName="Example">
      <Tab.Screen name="Files" component={ExampleScreen}/>
      <Tab.Screen name="Admin" component={AdminScreen}/>
      </Tab.Navigator>
      </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  title: {
    backgroundColor: "#1E2127",
    color: "#ABB2BF",
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center"
  },
  text: {
    color: "#ABB2BF",
    margin: "auto",
    alignSelf: "center",
    fontSize: 50
  }
});

export default App;
