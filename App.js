import {createAppContainer, createSwitchNavigator} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import SplashScreen from './screens/SplashScreen'
import SignupScreen from './screens/SignupScreen'
import LoginScreen from './screens/LoginScreen'
import HomeScreen from './screens/HomeScreen'
import TextEditScreen from './screens/TextEditScreen'

import * as firebase from 'firebase'
import 'firebase/firestore'

var firebaseConfig = {
  apiKey: "AIzaSyDid2QqX_FubeW8euEBE-iMnWmLJCh5eqk",
  authDomain: "mobilecoder-cf2ea.firebaseapp.com",
  databaseURL: "https://mobilecoder-cf2ea.firebaseio.com",
  projectId: "mobilecoder-cf2ea",
  storageBucket: "mobilecoder-cf2ea.appspot.com",
  messagingSenderId: "409368131515",
  appId: " 1:409368131515:web:ad9bb0eb12dd518cfb769e",
  measurementId: "G-LSBZPKF91D"
};

firebase.initializeApp(firebaseConfig);

const AppStack = createStackNavigator({
  Home : HomeScreen,
  Edit : {
    screen : TextEditScreen
  } 
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