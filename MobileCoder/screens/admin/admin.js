import React from 'react';
import { TouchableOpacity, SafeAreaView, StyleSheet, View, Text } from 'react-native';


export default function Admin(props){
    let demoUser = {};
    demoUser.name = "demo";
    demoUser.email = "demo@demo.com";
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.heading}>
                <Text style={styles.textStyle}>
                    Username: {demoUser.name}
                </Text>
            <Text style={styles.textStyle}>
                Email: {demoUser.email}
                </Text>
            </View>
            <TouchableOpacity style={{alignSelf: 'center', marginTop: 'auto', marginBottom: 100}}>
            <View style={styles.button}>
            <Text style={styles.buttonText}>Sign Out</Text>
            </View>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        backgroundColor: "#1E2127",
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start'
        //color: "#ABB2BF",
    },
    button: {
        backgroundColor: "#FF0000",
        height: 80,
        width: 100,
        display: 'flex',
        justifyContent: 'center',
        borderRadius: 10
    },
    buttonText: {
        color: "#FFFFFF",
        fontSize: 16,
        alignSelf: 'center'
    },
    textStyle: {
        fontWeight: '500',
        color: "#ABB2BF",
        fontSize: 30,
        //color: "#BB86FC",
    },
    heading: {
        width: "90%",
        height: "20%",
        display: 'flex',
        flexDirection: "column",
        justifyContent: "center",
        margin: 20,
    }
})


