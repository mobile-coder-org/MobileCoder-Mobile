import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, View, Image } from 'react-native';
import { Container, Header, Content, Footer, Icon, FooterTab, Button, Text } from 'native-base';


export default class BottomBar extends Component {

    constructor(props){
        super(props);
        this.state = {
            location: props.location
        }
    }

    render(){
        let filesIcon = <Image source={require('../assets/icons/FileIconOff/FileIconOff.png')}/>
        let filesText = <Text>Files</Text>;
        let adminIcon = <Image source={require('../assets/icons/AdminIconOff/AdminIconOff.png')}/>
        let adminText = <Text>Admin</Text>
        if(this.state.location == 'files'){
            filesIcon = <Image source={require('../assets/icons/FileIconOn/FileIconOn.png')} />
            filesText = <Text style={{color:"#FDFBFB"}}>Files</Text>;
        }
        else if(this.props.location == 'admin'){
            adminIcon = <Image source={require('../assets/icons/AdminIconOn/AdminIconOn.png')}/>
            adminText = <Text style={{color:"#FDFBFB"}}>Admin</Text>
        }
        
        return (
        <Footer style={footerStyles.container} >
            <FooterTab >
                <Button vertical onPress={this.props.leftClick}>
                    {filesIcon}
                    {filesText}
                 </Button>
                 <Button vertical onPress={this.props.rightClick}>
                     {adminIcon}
                     {adminText}
                </Button>
            </FooterTab>
        </Footer>
    );
   }
}

const footerStyles = StyleSheet.create({
    container: {
        backgroundColor: "#202020",
        borderTopWidth: 0,
        marginBottom: 'auto',
        flex: 0, 
        flexBasis: 50
    }
})