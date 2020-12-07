import React from 'react'
import {View, StyleSheet, Text, TextInput, TouchableOpacity, Alert} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
//import * as firebase from 'firebase'
import firebase from '../environment/config'
import UserService from '../services/UserService'
import { User } from '../models/models'

export default class SignupScreen extends React.Component {
    state = {
        name: '',
        email: '',
        password: '',
        error: null
    }

    handleSignup = () => {
        let uid = ""
        firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(userCredentials => {
            uid = userCredentials.user.uid;
            return userCredentials.user.updateProfile({
                displayName: this.state.name
            });
        })
        .then(() =>{
            UserService.createUser(uid, this.state.name, this.state.email, (user) =>{
                Alert.alert(
                    "User Created",
                    "welcome to MobileCoder",
                    [{
                        text: "Ok",
                        onPress: () => {this.props.navigation.navigate("Files", {user: user});}
                    }]
                )
            })
        })
        .catch(error => this.setState({error:error.message}));
    }

    render() {
        return (
            <KeyboardAwareScrollView
                resetScrollToCoords={{ x: 0, y: 0 }}
                contentContainerStyle={styles.container}
                scrollEnabled={false}>
                <View style={styles.container}>
                    <Text style={styles.text}>Create an account</Text>
                    <View style={styles.error}>
                        {this.state.error && <Text style={{color: '#fff'}}>{this.state.error}</Text>}
                    </View>
                    <View style={styles.form}>
                        <View>
                            <Text style={styles.title}>Name</Text>
                            <TextInput 
                                keyboardAppearance="dark"
                                style={styles.input} 
                                autoCapitalize="none" 
                                onChangeText={name => this.setState({name})}
                                value={this.state.name}
                                ref={(r) => { this._textInputRef = r; }}
                            ></TextInput>
                        </View>
                        <View style={{marginTop: 32}}>
                            <Text style={styles.title}>Email Address</Text>
                            <TextInput 
                                keyboardAppearance="dark"
                                style={styles.input} 
                                autoCapitalize="none" 
                                onChangeText={email => this.setState({email})}
                                value={this.state.email}
                                ref={(r) => { this._textInputRef = r; }}
                            ></TextInput>
                        </View>
                        <View style={{marginTop: 32}}>
                            <View>
                                <Text style={styles.title}>Password</Text>
                                <TextInput 
                                    keyboardAppearance="dark"
                                    style={styles.input} 
                                    secureTextEntry={true}
                                    autoCapitalize="none"
                                    onChangeText={password => this.setState({password})}
                                    value={this.state.password}
                                    ref={(r) => { this._textInputRef = r; }}
                                ></TextInput>
                            </View>
                        </View>
                    </View>

                    <TouchableOpacity style={styles.button} onPress={this.handleSignup}>
                        <Text style= {{color: '#fff', fontWeight: '600'}}>Sign up</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={{alignSelf:'center', marginTop: 32}}
                        onPress={() => this.props.navigation.navigate("Login")}>
                        <Text style={{color: '#fff', fontSize: 13}}>Already have an account? <Text>Log in</Text></Text>
                    </TouchableOpacity>
                </View>
                </KeyboardAwareScrollView>
        );
    }   
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#36393e',
        flex: 1
    },
    text: {
        alignSelf: 'center',
        color: '#fff',
        fontSize: 26,
        fontWeight: '600',
        marginTop: 70
    },
    error: {
        alignItems: 'center',
        height: 72,
        justifyContent: 'center',
        marginHorizontal: 30
    },
    form: {
        marginBottom: 48,
        marginHorizontal: 30
    },
    title: {
        color: '#ddd',
        fontSize: 12,
        textTransform: 'uppercase'
    },
    input: {
        borderBottomColor: '#ababab',
        borderBottomWidth: StyleSheet.hairlineWidth,
        color: '#fff',
        height: 40,
        fontSize: 16
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#7041ff',
        height: 50,
        justifyContent: 'center',
        borderRadius: 8,
        marginHorizontal: 120
    }
});