import React, {useState} from 'react';
import { TouchableOpacity, SafeAreaView, StyleSheet, View, Text, Image } from 'react-native';
import BottomBar from '../../components/BottomBar'
import { Container, Header, Content, Footer, Icon, FooterTab, Button} from 'native-base';


export default function Admin({route, navigation}){
    
    const [user, setUser] = useState(route.params.user);

    const logoutPressed = () => {
        //temporary transition for testing
        navigation.navigate("Login");
    }
    return (
        <View style={styles.superContainer}>
        <View style={{height: 50, backgroundColor: "rgba(0, 0, 0, 0.2)"}}></View>
        <Container style={styles.container}>
            <Content>
                <View style={styles.profileInfo}>
                    <Image 
                    style={styles.profileImage}
                    source={require('../../assets/images/ProfileImage/ProfileImage.png')}/>
                    <Text style={styles.username}>{user.name}</Text>
                    <Text style={styles.username}>{user.email}</Text>
                </View>
                <View style={styles.logout}>
                    <TouchableOpacity onPress={logoutPressed}>
                    <Text style={styles.logoutText}>logout</Text>
                    </TouchableOpacity>
                </View>
            </Content>
            <BottomBar 
            location="admin"
            leftClick={()=> navigation.navigate('Files', {user: user})}
            rightClick= {() => navigation.navigate('Admin', {user: user})}
             />
        </Container>
        </View>
    )
}

const styles = StyleSheet.create({
    superContainer: {
        height: '100%',
        width: '100%',
        backgroundColor: "#363941",
    },
    container: {
        height: '100%',
        width: '100%',
        backgroundColor: "#363941",
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start'
        //color: "#ABB2BF",
    },
    profileInfo: {
        backgroundColor: "rgba(36, 36, 36, 0.42)",
        height: 217,
        width: "100%",
        padding: 15,
    },
    profileImage: {
        height: 96,
        width: 96
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
    heading: {
        backgroundColor: "rgba(0, 0, 0, 0.2)",
    },
    username: {
        marginTop: 10,
        fontSize: 25,
        color: "#EDEDED",
        textAlign: 'left',
        width: '90%' 
    },
    logout: {
        marginTop: 50,
        height: 60,
        backgroundColor: "rgba(36, 36, 36, 0.42)",
        padding: 10 
    },
    logoutText: {
        textAlign: 'center',
        fontSize: 30,
        color: "#D85D5D"
    }
})


