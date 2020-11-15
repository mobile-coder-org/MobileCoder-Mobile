import React from 'react';
import {useState } from "react";
import { Modal, FlatList, 
  SafeAreaView, StatusBar, StyleSheet, 
  Text, TouchableOpacity, SectionList, 
  View, Image,Icon, KeyboardAvoidingView } from "react-native";
import BottomBar from '../../components/BottomBar'
import { Container, Header, Content, Footer, FooterTab, Button} from 'native-base';
import UserService from '../../services/UserService'
import { TextInput } from 'react-native-gesture-handler';

/*
const workspaces = [
  {
    title: "Project 1",
    data: ["F1_P1.txt", "F2_P1.txt", "F3_P1.txt"]
  },
  {
    title: "Project 2",
    data: ["F1_P2.txt", "F2_P2.txt", "F3_P2.txt"]
  },
  {
    title: "Project 3",
    data: ["F1_P3.txt", "F2_P3.txt", "F3_P3.txt"]
  }
];
*/

const WorkspaceComponent = ({ item, onPress, style }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
    <Text style={styles.title} adjustsFontSizeToFit={true}>{item.name}</Text>
  </TouchableOpacity>
);

const FileComponent = ({ name}) => (
  <TouchableOpacity>
  <View style={styles.file}>
    <Text style={styles.titlePurple}>{name}</Text>
  </View>
  </TouchableOpacity>
);

const CreateWorkspaceModal = ({visible, setModalVisible, createWorkspace}) => {
  const [workspaceName, setWorkspaceName] = useState("");
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
    <Text style={styles.modalHeaderText}>Create Workspace</Text>
    <TouchableOpacity style={styles.modalHeaderExit}
      onPress={() => setModalVisible(false)}
    >
      <Text style={styles.modalHeaderText}>X</Text>
    </TouchableOpacity>
    </View>

    <View style={styles.modalBody}>
      <TextInput
        placeholder="Enter Workspace Name"
        placeholderTextColor="#7A767E"
        keyboardAppearance="dark"
        value={workspaceName}
        onChangeText = {(text) => setWorkspaceName(text)}
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
        if(workspaceName !== ""){
          createWorkspace(workspaceName);
          setModalVisible(false);
        }
        else{
          alert("Your workspace needs a name")
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

export default function FilesScreen(props){
  let navigation = props.navigation;
  let user = props.route.params.user;
  let plusIcon = <TouchableOpacity onPress={addWorkspacePressed}>
    <Image source={require('../../assets/icons/PlusButton/PlusButton.png')} style={styles.item}/>
    </TouchableOpacity>

  const [selectedId, setSelectedId] = useState(0);
  const [workspaces, setWorkspaces] = useState(user.workspaces);
  const [modalVisible, setModalVisible] = useState(false);

  function addWorkspacePressed(){
    setModalVisible(true);
    /*
    UserService.createUserWorkspace(user.uid, "demo_workspace", String(Date.now()), (workspace) => {
      console.log("Success adding workspace");
      let copyWorkspaces = workspaces.slice();
      copyWorkspaces.push(workspace)
      setWorkspaces(copyWorkspaces);
    })
    */
  }
  function createWorkspace(name){
      UserService.createUserWorkspace(user.uid, name, String(Date.now()), (workspace) => {
        console.log("Success adding workspace");
        let copyWorkspaces = workspaces.slice();
        copyWorkspaces.push(workspace)
        setWorkspaces(copyWorkspaces);
      })
  }

  
  const renderWorkspace = ({ item, index}) => {
    //const backgroundColor = index === selectedId ? "#9B51E0" : "#73A2FF";
    let selectedStyle = index === selectedId ? 
    {backgroundColor:"#73A2FF", borderWidth: 4, borderColor: "rgb(240, 240,240)"} : {backgroundColor:"#73A2FF"};

    return (
      <WorkspaceComponent
        item={item}
        onPress={() => setSelectedId(index)}
        style={selectedStyle}
      />
    );
  };

  return (
        <View style={[styles.superContainer, {opacity: modalVisible ? 0.5: 1}]}>
        {
        <CreateWorkspaceModal visible={modalVisible} setModalVisible={setModalVisible} 
            createWorkspace={createWorkspace}
        />
        }
        <View style={{height: 50, backgroundColor: "rgba(0, 0, 0, 0.2)"}}></View>
        <Container style={{overflow: 'hidden'}}>
        <View style={{height:'100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start'}}>
        <View style={[styles.container, {flex: 1, display: 'flex', flexDirection: 'row'}]}>
        <View style={styles.workspaceList}>
        <FlatList
            data={workspaces}
            renderItem={renderWorkspace}
            keyExtractor={(item, index) => item.name + index}
            extraData={selectedId}
            ListFooterComponent={plusIcon}
        />
        </View>
      {/*pass selectedID to data to get just the selected data's files*/}
      <View style={styles.fileList}>
        <View style={styles.filesHeader}>
            <Text style={styles.filesHeaderText}>Files</Text>
        </View>
        {/**/}
    <FlatList
      data={workspaces.length > 0 ? workspaces[selectedId].files: []}
      keyExtractor={(item, index) => `file-${index}`}
      renderItem={({ item }) => <FileComponent name={item.name + item.extension}/>}
    />
    </View>
    </View>
    <BottomBar 
    location="files"
    leftClick={()=> navigation.navigate('Files', {user: user})}
    rightClick= {() => navigation.navigate('Admin', {user: user})}
        />
        </View>
    </Container>
    </View>
  );
}

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
    height: '30%',
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


