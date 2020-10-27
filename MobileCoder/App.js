/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const App: () => React$Node = () => {
  return (
    <>
      <StatusBar barStyle="light-content" />
        <View style={styles.title}>
        <Text style={styles.text}>Mobile Coder</Text>
        </View>
    </>
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
