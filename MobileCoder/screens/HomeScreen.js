import React from 'react'
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native'
import * as firebase from 'firebase'

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

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>{this.state.email} </Text>

                <TouchableOpacity style={{marginTop: 32}} onPress={this.signOutUser}>
                    <Text style={styles.text}>Logout</Text>
                </TouchableOpacity>
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
        color: "#fff",
        margin: "auto",
        alignSelf: "center",
        fontSize: 18
      }
})