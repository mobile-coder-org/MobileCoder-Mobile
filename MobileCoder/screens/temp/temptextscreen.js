import { WebView } from 'react-native-webview';
import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
  Text,
  StatusBar,
} from 'react-native';


export default function TempTextEditingScreen(props){
    let {file} = props.route.params
    let goBack = () => props.navigation.goBack();
    return(
        <View style={styles.container}>
            <View style={{height: 50, backgroundColor: "rgba(0, 0, 0, 0.2)"}}></View>
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={goBack}>
                        <Text style={{color: "#7041ff", fontSize: 20}}>{"< Back"}</Text>
                    </TouchableOpacity>
                <Text style={{color: "#f0f0f0", fontSize: 30,
                 marginLeft: "auto", marginRight: "auto"}}>{file.name + file.extension}</Text>
                </View>
            </SafeAreaView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        flex: 1,
        backgroundColor: "#363941"
        //backgroundColor: "#FFFFFF"
    },
    header: {
        height: 50,
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        padding: 5
    }


})