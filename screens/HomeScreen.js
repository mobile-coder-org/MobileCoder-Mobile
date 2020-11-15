import React from 'react'
import {View, StyleSheet, Text, TouchableOpacity, Image, Alert} from 'react-native'
import * as firebase from 'firebase'
import {WebView} from 'react-native-webview'

export default class HomeScreen extends React.Component {
    state = {
        email: '',
        displayName: ''
    }

    componentDidMount() {
        const {email, displayName} = firebase.auth().currentUser;
        this.setState({email, displayName});
    }

    signOutUser = () => {
        firebase.auth().signOut();
    }

    toTextEditScreen = () => {
        this.props.navigation.navigate('Edit');
    }

    render() {
        return (
            <>
             {/* <WebView
                source={{ uri: 'https://infinite.red' }}
                style={{ marginTop: 20 }}
            /> */}
            <View style={styles.container}>
                <Text style={styles.text}>{this.state.email} </Text>

                <TouchableOpacity style={{marginTop: 32}} onPress={this.signOutUser}>
                    <Text style={styles.text}>Logout</Text>
                </TouchableOpacity>
            </View>
             

            <View style={styles.container}>
          {/* place to hold the folder button and admin botton */}
          {/* <RichEditor
            ref={(r) => this.richtext = r}
            initialContentHTML={'Hello <b>World</b> <p>this is a new paragraph</p> <p>this is another new paragraph</p>'}
            editorInitializedCallback={() => this.onEditorInitialized()}
          /> */}
          <View style={styless.bottomTab}>
            <TouchableOpacity 
              style={styless.button}
              onPress={this.toTextEditScreen}>
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
        </View>
        </>
        );
    }   
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: '#1E2127',
        flex: 1,
        justifyContent: 'center'
    },
    text: {
        color: "#fff",
        margin: "auto",
        alignSelf: "center",
        fontSize: 18
      }
})

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