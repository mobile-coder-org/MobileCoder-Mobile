import React from 'react';
import { SafeAreaView, StyleSheet, View, Text } from 'react-native';

export default function Example(props){
    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.heading}>
            <Text style={styles.textStyle}>This is an example screen</Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        backgroundColor: "#1E2127",
        //color: "#ABB2BF",
    },
    textStyle: {
        fontWeight: '500',
        fontSize: 30,
        color: "#FF0000",
    },
    heading: {
        width: "90%",
        height: "20%",
        display: 'flex',
        flexDirection: "row",
        justifyContent: "center",
        margin: 20
    }
})


