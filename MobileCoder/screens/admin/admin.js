import React from 'react';
import { TouchableOpacity, SafeAreaView, StyleSheet, View, Text } from 'react-native';
import BottomBar from '../../components/BottomBar'
import { Container, Header, Content, Footer, Icon, FooterTab, Button} from 'native-base';


export default function Admin({navigation}){
    let demoUser = {};
    demoUser.name = "demo";
    demoUser.email = "demo@demo.com";
    return (
        <Container style={styles.container}>
            <Content>
                <Text style={styles.textStyle}>Admin</Text>
            </Content>
            <BottomBar 
            location="admin"
            leftClick={()=> navigation.navigate('Example')}
            rightClick= {() => navigation.navigate('Admin')}
             />
        </Container>
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


