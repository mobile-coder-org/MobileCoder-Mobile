import React from 'react';
import { SafeAreaView, StyleSheet, View, Text } from 'react-native';
import BottomBar from '../components/BottomBar'
import { Container, Header, Content, Footer, FooterTab, Button } from 'native-base';

export default function Example(props){
    let navigation = props.navigation;
    return(
        <Container style={styles.container}>
            <Content>
                <Text style={styles.textStyle}>Example</Text>
            </Content>
            <BottomBar 
            location={"files"}
            leftClick={()=> navigation.navigate('Example')}
            rightClick= {() => navigation.navigate('Admin')}
             />
        </Container>
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
        color: "#ABB2BF",
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


