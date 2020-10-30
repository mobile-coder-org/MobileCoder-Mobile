import React from 'react';
//import 'react-native-gesture-handler';
//import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ExampleScreen from './screens/example'

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

const Stack = createStackNavigator();

function App(){
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content"/>
      <Stack.Navigator 
      screenOptions={{headerShown: false}} 
      initialRouteName="Example">
      <Stack.Screen name="Example" component={ExampleScreen}/>
      </Stack.Navigator>
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
