import React from 'react'
import {ActivityIndicator, View, StyleSheet, Text} from 'react-native'
import * as firebase from 'firebase'

export default class SplashScreen extends React.Component {
    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            this.props.navigation.navigate(user ? "App" : "Auth");
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Mobile Coder</Text>
                <ActivityIndicator size="large"></ActivityIndicator>
            </View>
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
        color: "#ABB2BF",
        margin: "auto",
        alignSelf: "center",
        fontSize: 50,
        paddingBottom: 10
      }
})