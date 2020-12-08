import React, {Component, useState, useEffect} from 'react';
import HighlightrView from 'react-native-highlightr'
import {
  Button,
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
  Text, 
  KeyboardAvoidingView,
  Keyboard,
  Animated
} from 'react-native';

import firebase from "../../environment/config";

import "firebase/auth";
import "firebase/firestore";
import UserService from '../../services/UserService';
import HighlightrService from '../../services/HighlightrService'

export default function TempTextEditingScreen(props){
    let {file, user, wid, onGoBack} = props.route.params
    let [highlightrText, setHighlightrText] = useState(file.contents);
    let goBack = () => {
        onGoBack(); 
        props.navigation.goBack();
    };

    let languages = HighlightrService.languages;
    let ext = file.extension.toLowerCase();
    let fileLang = languages[ext] ? languages[ext] : "Markdown";
    let [language, setLanguage] = useState(fileLang);

    let db = firebase.firestore();
    let keyboardHeight = new Animated.Value(0);
    let [keyboardOffset, setKeyboardOffset] = useState(0);
    //let fileRef = db.collection("users").doc(props.route.params.user.uid).collection("workspaces").doc(props.route.params.workspace).collection("files").doc(file.fid);
    let saveFile = () => {
        UserService.updateUserWorkspaceFile(user.uid, wid, file.fid, highlightrText, () => {
            console.log("saved!");
        })
    }

    useEffect(() => {
        /*
        keyboardWillShowSub = Keyboard.addListener('keyboardWillShow', keyboardWillShow);
        keyboardWillHideSub = Keyboard.addListener('keyboardWillHide', keyboardWillHide);
        return (() => {
            keyboardWillShowSub.remove();
            keyboardWillHideSub.remove();
        })
        */
    })
    function keyboardWillShow(event){
        setKeyboardOffset(event.endCoordinates.height);
        console.log(keyboardOffset)
        /*
        Animated.timing(keyboardHeight, {
               duration: event.duration, 
               toValue: event.endCoordinates.height,
               useNativeDriver: true 
        }).start()
        */
    }

    function keyboardWillHide(event){
        setKeyboardOffset(0);
        /*
        Animated.timing(keyboardHeight, {
            duration: event.duration, 
            toValue: 0,
            useNativeDriver: true 
        }).start()
        */
    }

    

    return(
        <View style={styles.container}>
            <View style={{height: 50, backgroundColor: "rgba(0, 0, 0, 0.2)"}}></View>
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    {/*
                    <TouchableOpacity onPress={goBack}>
                        <Text style={{color: "#7041ff", fontSize: 20}}>{"< Back"}</Text>
                    </TouchableOpacity>
                    */}
                    <Button title="< Back" onPress={goBack} color="#9B51E0"/>
                    <Text style={{color: "#f0f0f0", fontSize: 25,
                    alignSelf: 'center', marginLeft: "auto", marginRight: "auto"}}>
                        {file.name + file.extension}
                    </Text>
                    <Button title="Save" onPress={saveFile} color="#9B51E0"/>
                </View>
                <KeyboardAvoidingView
                    behavior="padding"
                    style={{flex: 1}}
                    keyboardVerticalOffset={20}
                >
                    <HighlightrView 
                        style={{flex: 1, backgroundColor: "#202328"}}
                        value={file.contents}
                        theme={'atom-one-dark'}
                        language={fileLang}
                        onChangeText={(text) => {
                            setHighlightrText(text)
                            console.log(highlightrText)
                        }}
                        />
                        <View style={{flexGrow: 0, flexBasis: 50, backgroundColor: "#363941"}}></View>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        flex: 1,
        backgroundColor: "#363941",
        //color:"#9B51E0" 
//        justifyContent: "flex-end"       
    },
    header: {
        height: 50,
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        padding: 5,
        backgroundColor: "rgba(0, 0, 0, 0.2)"
    }


})