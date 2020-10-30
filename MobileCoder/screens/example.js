import React from 'react';
import { SafeAreaView, StyleSheet, View, Text } from 'react-native';

export default function Example(props){
    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.heading}>
            <Text style={styles.textStyle}>This is an example</Text>
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
        fontSize: 50,
        color: "#BB86FC",
    },
    heading: {
        width: "100%",
        height: "20%",
        display: 'flex',
        flexDirection: "row",
        justifyContent: "center"
    }
})


