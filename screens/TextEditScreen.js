import React from 'react'
import {View, StyleSheet, Text, TouchableOpacity, Image, Alert} from 'react-native'
import {WebView} from 'react-native-webview'

const screenHTML = require('./index.html');

export default class TextEditScreen extends React.Component {
    render (){
        return (
            <>
            <WebView
                source = {screenHTML}
            />
            <View style={styless.bottomTab}>
            <TouchableOpacity 
              style={styless.button}
              onPress={() => Alert.alert("folder botton is pressed")}>
              <Image
                source={require("./MobileCoder-MobileUI/FileIconOff.png")}
                style={styless.button}
                title="thisIsAFolder"
              />
              <Text style={styless.folderText}>
                Folder
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styless.admin} 

              onPress={() => Alert.alert('admin button pressed')}>
              <Image
                source={require("./MobileCoder-MobileUI/person_outline_24px.png")}
                style={styless.button}
                title="thisIsAFolder"
              />
              <Text style={styless.adminText}>
                Admin
              </Text>
            </TouchableOpacity>
          </View>
        
        </>
        )
    }
}
const styless = StyleSheet.create({
    title: {
      backgroundColor: "#1E2127",
      color: "#ABB2BF",
      height: "100%",
      width: "100%",
      display: "flex",
      justifyContent: "center"
    },
    text: {
      color: "#ABB2BF",
      margin: "auto",
      alignSelf: "center",
      fontSize: 50
    },
    button: {
      position: "absolute",
      bottom: 12,
      width: 50,
      height: 50,
      left: "15%"
      // right: "8.33%"
    },
    bottomTab: {
      position: "absolute",
      width: "100%",
      height: 90,
      left: 0,
      bottom: 0,
      backgroundColor: "#202020",
    },
    admin: {
      position: "absolute",
      bottom: 12,
      width: 50,
      height: 50,
      right: "15%"
    },
    folderText: {
      color: "#696969",
      position: "absolute",
      bottom: 0,
      fontSize: 15,
      left: "22%"
    },
    adminText: {
      color: "#696969",
      position: "absolute",
      bottom: 0,
      fontSize: 15,
      right: 0
    }
  });