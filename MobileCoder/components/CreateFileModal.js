import React from 'react';
import {useState } from "react";
import { Modal, FlatList, 
  SafeAreaView, StatusBar, StyleSheet, 
  Text, TouchableOpacity, SectionList, 
  View, Image,Icon, KeyboardAvoidingView } from "react-native";
import { Container, Header, Content, Footer, FooterTab, Button} from 'native-base';
import { TextInput } from 'react-native-gesture-handler';

const CreateFileModal = ({visible, setModalVisible, createFile}) => {
  const [fileName, setFileName] = useState("");
  const [fileExtension, setFileExtension] = useState("");
  //const [modalVisible, setModalVisible] = useState(visible);
  
  return (
  <Modal
    animationType="slide"
    visible={visible}
    transparent={true}
    onRequestClose={() => {
      Alert.alert("Modal has been closed.");
    }}
     >
  <KeyboardAvoidingView
    behavior="position"
    style={styles.modalView}
  >
    <View style={{alignItems: 'center', height: '100%', width: '100%', backgroundColor:"#363941" }}>

    <View style={styles.modalHeader}>
    <Text style={styles.modalHeaderText}>Create File</Text>
    <TouchableOpacity style={styles.modalHeaderExit}
      onPress={() => setModalVisible(false)}
    >
      <Text style={styles.modalHeaderText}>X</Text>
    </TouchableOpacity>
    </View>

    <View style={styles.modalBody}>
      <TextInput
        placeholder="Enter File Name (without extension)"
        placeholderTextColor="#7A767E"
        keyboardAppearance="dark"
        value={fileName}
        onChangeText = {(text) => setFileName(text)}
        style={{ borderRadius: 8,
                margin: 15,
                backgroundColor: "rgba(31, 31, 31, 0.35)", 
                height: 60,
                width: 300, 
                padding: 10,
                color: "#F0F0F0",
                fontSize: 15
          }}
      />

      <TextInput
        placeholder="Enter File Extension (ex. '.js')"
        placeholderTextColor="#7A767E"
        keyboardAppearance="dark"
        value={fileExtension}
        onChangeText = {(text) => setFileExtension(text)}
        style={{ borderRadius: 8,
                margin: 15,
                backgroundColor: "rgba(31, 31, 31, 0.35)", 
                height: 60,
                width: 300, 
                padding: 10,
                color: "#F0F0F0",
                fontSize: 15
          }}
      />

      <TouchableOpacity onPress={() => {
        let languages = [".js", ".java", ".py", ".md"];
        if(fileName !== "" && fileExtension !== "" && (/^[a-zA-Z_0-9]+$/.test(fileName)) && (languages.indexOf(fileExtension) != -1) && fileName.length <= 50){
          createFile(fileName, fileExtension);
          setModalVisible(false);
        } else if (fileName == "" || fileExtension == ""){
          alert("Your file needs a name and extension")
        } else if (languages.indexOf(fileExtension) < 0){
          alert("Invalid file extension")
        } else {
          alert("File name has 50 character limit")
        }
        }}>
        <View style={{
          borderRadius: 10,
          alignItems: 'center', 
          justifyContent: 'center',
          height: 50, width: 100, 
          backgroundColor: "#9B51E0", margin: 15}}>
        <Text style={{textAlign: 'center', color: "#F0F0F0", fontSize: 15, fontWeight: '500'}}>create</Text>
        </View>
        </TouchableOpacity>
      </View>
    </View>
  </KeyboardAvoidingView>
  </Modal>
)};

export default CreateFileModal;


const styles = StyleSheet.create({
  superContainer: {
    flex: 1,
    width:'100%',
    height: '100%',
    backgroundColor: "#363941",
    flex: 1,
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    backgroundColor: "#363941",
  },
  workspaceList: {
    flex: 1,
    height: '100%',
    backgroundColor: "#2F333A",
  },
  fileList: {
      flex: 3,
      height: '100%',
      padding: 5
  },
  filesHeader: {
    backgroundColor: 'rgba(36, 36, 36, 0.42)',
    height: '13%',
    margin: -5,
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  filesHeaderText: {
    fontSize: 30,
    color: 'rgb(240, 240, 240)',
  },
  item: {
    padding: 5,
    marginVertical: 10,
    marginHorizontal:'15%',
	borderRadius:10,
    width: 70,
    height: 70,
    flex:1,
    flexDirection:"column",
    alignItems:'center'
    
  },
  file: {
    padding: 20,
    marginVertical: 10,
    //marginRight:'100%',
	borderRadius:10,
    width:'100%',
    height:'30%',
    flex:1,
    flexDirection:"column",
    alignItems:'center',
    backgroundColor: 'rgba(31, 31, 31, 0.35)',
  },
  title: {
    fontSize: 12,
    fontWeight: 'bold',
    color:'white',
    width: '90%',
  },
    titlePurple: {
    fontSize: 13,
    fontWeight: 'bold',
    color:"#9B51E0" 
  },
  modalHeader: {
    backgroundColor: "#202020",
    width: "100%",
    height: "20%",
    justifyContent: 'flex-start',
    alignItems: "center",
    paddingHorizontal: 10,
    display: 'flex',
    flexDirection: 'row',
  },
  modalHeaderText: {
    fontSize: 20,
    color: "#F0F0F0",
  },
  modalHeaderExit: {
    fontSize: 20,
    color: "#F0F0F0",
    marginLeft: "auto"
  },
  modalBody: {
    width: "100%",
    height: "50%",
    alignItems: 'center',
    //justifyContent: 'center',
    margin: 10,
  },
  modalView: {
    position: 'absolute',
    width: '100%',
    height: '40%',
    bottom: 0,
    //margin: 20,
    backgroundColor: "#363941",
    borderRadius: 20,
    //padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
});