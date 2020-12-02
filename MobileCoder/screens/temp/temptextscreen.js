import React, {Component, useState} from 'react';
import HighlightrView from 'react-native-highlightr'
import {
  Button,
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';

import firebase from "../../environment/config";

import "firebase/auth";
import "firebase/firestore";
import UserService from '../../services/UserService';

export default function TempTextEditingScreen(props){
    let {file, user, wid} = props.route.params
    let [highlightrText, setHighlightrText] = useState(file.contents);
    let goBack = () => props.navigation.goBack();
    let languages = {'.js': 'Javascript', '.swift': 'Swift', '.java': 'Java', '.md': 'Markdown'}
    let fileLang = languages[file.extension]
    let db = firebase.firestore()
    //let fileRef = db.collection("users").doc(props.route.params.user.uid).collection("workspaces").doc(props.route.params.workspace).collection("files").doc(file.fid);
    let saveFile = () => {
        UserService.updateUserWorkspaceFile(user.uid, wid, file.fid, highlightrText, () => {
            console.log("saved!");
        })
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
                    <Button title="< Back" onPress={goBack}/>
                    <Text style={{color: "#f0f0f0", fontSize: 25,
                    alignSelf: 'center', marginLeft: "auto", marginRight: "auto"}}>
                        {file.name + file.extension}
                    </Text>
                    <Button title="Save" onPress={saveFile}/>
                </View>
                    <HighlightrView 
                        style={{flex: 1, backgroundColor: "#202328"}}
                        value={highlightrText}
                        theme={'atom-one-dark'}
                        language={fileLang}
                        onChangeText={(text) => {
                            setHighlightrText(text)
                            console.log(highlightrText)
                        }}
                        />
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
        padding: 5,
        backgroundColor: "rgba(0, 0, 0, 0.2)"
    }


})