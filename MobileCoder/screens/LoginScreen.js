import React from 'react'
import {View, StyleSheet, Text, TextInput, TouchableOpacity} from 'react-native'
//import * as firebase from 'firebase'
import firebase from '../environment/config'
import { User } from '../models/models'
import UserService from '../services/UserService'

export default class LoginScreen extends React.Component {
    state = {
        email: '',
        password: '',
        error: null
    }

    handleLogin = () => {
        const {email, password} = this.state

        firebase
        .auth()
        .signInWithEmailAndPassword(email, password).then(()=> {
            UserService.getUser(firebase.auth().currentUser.uid, (user) =>{
                this.props.navigation.navigate("Files", {user: user});
            })
        })
        .catch(error => this.setState({error:error.message}))
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Welcome back!</Text>

                <View style={styles.error}>
                    {this.state.error && <Text style={{color: '#fff'}}>{this.state.error}</Text>}
                </View>

                <View style={styles.form}>
                    <View>
                        <Text style={styles.title}>Email Address</Text>
                        <TextInput 
                            style={styles.input} 
                            autoCapitalize="none" 
                            keyboardAppearance="dark"
                            onChangeText={email => this.setState({email})}
                            value={this.state.email}
                        ></TextInput>
                    </View>

                    <View style={{marginTop: 32}}>
                        <View>
                            <Text style={styles.title}>Password</Text>
                            <TextInput 
                                style={styles.input} 
                                keyboardAppearance="dark"
                                secureTextEntry= {true}
                                autoCapitalize="none"
                                onChangeText={password => this.setState({password})}
                                value={this.state.password}
                            ></TextInput>
                        </View>
                    </View>
                </View>

                <TouchableOpacity style={styles.button} onPress={this.handleLogin}>
                    <Text style= {{color: '#fff', fontWeight: '600'}}>Sign in</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={{alignSelf:'center', marginTop: 32}}
                    onPress={() => this.props.navigation.navigate("Signup")}
                >
                    <Text style={{color: '#fff', fontSize: 13}}>New to Mobile Coder? <Text>Sign up</Text></Text>
                </TouchableOpacity>
            </View>
        );
    }   
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#36393e',
        flex: 1,
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