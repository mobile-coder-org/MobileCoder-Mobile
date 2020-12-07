import React from 'react';
import {useState, useEffect } from "react";
import { Modal, FlatList, 
  SafeAreaView, StatusBar, StyleSheet, 
  Text, TouchableOpacity, SectionList, 
  View, Image,Icon, KeyboardAvoidingView, Alert } from "react-native";
import BottomBar from '../../components/BottomBar'
import { Container, Header, Content, Footer, FooterTab, Button} from 'native-base';
import UserService from '../../services/UserService'
import { TextInput } from 'react-native-gesture-handler';
import CreateWorkspaceModal from '../../components/CreateWorkspaceModal'
import CreateFileModal from '../../components/CreateFileModal'
import Swipeout from 'react-native-swipeout';



export default function FilesScreen(props){
  let navigation = props.navigation;
  let user = props.route.params.user;
  let workspacePlusIcon = <TouchableOpacity onPress={addWorkspacePressed}>
    <Image source={require('../../assets/icons/PlusButton/PlusButton.png')} style={styles.item}/>
    </TouchableOpacity>

  let filePlusIcon = <TouchableOpacity style={{marginHorizontal: 10, display: "flex", height: 40, width: 40, marginLeft:"auto"}} onPress={addFilePressed}>
    <Image source={require('../../assets/icons/PlusButton/PlusButton.png')} 
    style={{height: "100%", width: "100%", flex: 1}} resizeMode="contain"/>
    </TouchableOpacity>

  const [selectedInd, setSelectedInd] = useState(0);
  const [workspaces, setWorkspaces] = useState(user.workspaces);
  const [workspaceModalVisible, setWorkspaceModalVisible] = useState(false);
  const [fileModalVisible, setFileModalVisible] = useState(false);
  const [refreshingWorkspaces,setRefreshingWorkspaces]=useState(false);
  const [refreshingFiles,setRefreshingFiles]=useState(false);

  let refresh = () => {
    if(workspaces.length <= 0){
      return;
    }
    UserService.getUserWorkspaceFiles(user.uid, workspaces[selectedInd].wid, (files) => {
      //refresh files
      let copyWorkspaces = workspaces.slice();
      let copyFiles = files;
      copyWorkspaces[selectedInd].files = copyFiles
      setWorkspaces(copyWorkspaces)
    })
  }

  function addWorkspacePressed(){
    setWorkspaceModalVisible(true);
  }

  function addFilePressed(){
    if(workspaces.length > 0){
      setFileModalVisible(true);
    }
  }

  function createWorkspace(name){
    UserService.getUserWorkspaces(user.uid, (workspaces) => {
      let duplicateFound = false;
      for(let workspace of workspaces){
        if(workspace.name.trim() === name.trim()){
          duplicateFound = true;
          console.log(workspace.name.trim());
        }
      }

      if(duplicateFound){
        alert("A workspace with this name already exists.");
      }
      else{
        UserService.createUserWorkspace(user.uid, name.trim(), String(Date.now()), (workspace) => {
          console.log("Success adding workspace");
          let copyWorkspaces = workspaces.slice();
          copyWorkspaces.push(workspace)
          setWorkspaces(copyWorkspaces);
        })
      }
    })
  }
  const WorkspaceComponent = ({ item, index, onPress, style }) =>{ 
    let removeCurrentWorkspace = () => {
          if(selectedInd === index){
            setSelectedInd(0)
          }
          let copyWorkspaces = workspaces.slice();
          copyWorkspaces.splice(index, 1);
          setWorkspaces(copyWorkspaces);
    }
    let workspaceSwipeoutButtons = [
      {
        text: "x",
        backgroundColor: "#FF0000",
        onPress: () => { 
          console.log("delete tapped")
          Alert.alert("Do you want to delete this workspace?", "deleting your workspace will delete all its files",
           [{
            text: "Cancel",
           },
           {
            text: "Delete",
            style: "destructive",
            onPress: () => {
                UserService.deleteUserWorkspace(user.uid, workspaces[index].wid, (didDelete) =>{
                  if(didDelete){
                    removeCurrentWorkspace();
                  }
                  else {
                    alert("An error occured while deleting your workspace");
                  }
                })
            }
           }
          ])
        } 
      }
    ]
    return (
    <Swipeout style={{backgroundColor:"rgba(0,0,0, 0.0)"}} right={workspaceSwipeoutButtons}>
    <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
      <Text style={styles.title} adjustsFontSizeToFit={true}>{item.name}</Text>
    </TouchableOpacity>
    </Swipeout>
)};

  function createFile(name, extension){
    let createFileHelper = () => {
      UserService.createUserWorkspaceFile(user.uid, workspaces[selectedInd].wid, name.trim(), extension.trim(), "", "", (file) => {
      let copyWorkspaces = workspaces.slice();
      let copyFiles =  copyWorkspaces[selectedInd].files.slice()
      copyFiles.push(file);
      copyWorkspaces[selectedInd].files = copyFiles
      setWorkspaces(copyWorkspaces)
    })
   }

   UserService.getUserWorkspaceFiles(user.uid, workspaces[selectedInd].wid, (files) => {
      let duplicateFound = false;
      let dupInd = -1;
      let duplicate;
      //refresh files
      let copyWorkspaces = workspaces.slice();
      let copyFiles = files;
      copyWorkspaces[selectedInd].files = copyFiles
      setWorkspaces(copyWorkspaces)

      //check for duplicates
      for(let i = 0; i < workspaces[selectedInd].files.length; i++){
        let file = workspaces[selectedInd].files[i];
        if(file.name.toLowerCase().trim() == name.toLowerCase().trim() && file.extension.toLowerCase().trim() == extension.toLowerCase().trim()){
          duplicateFound = true;
          duplicate = file;
          dupInd = i;
        }
      }
      if(duplicateFound){
        Alert.alert("A duplicate file was found", "Would you like to overwrite the existing file?", [
          {
            text: "Cancel",
          },
          {
            text: "Overwrite",
            style: "destructive",
            onPress: () => {
              UserService.overwriteFile(user.uid, workspaces[selectedInd].wid, duplicate, (file) => {
                //refresh files
                console.log("refreshing")
                console.log(file)
                let copyWorkspaces = workspaces.slice();
                copyWorkspaces[selectedInd].files.splice(dupInd, 1);
                copyWorkspaces[selectedInd].files.push(file);
                setWorkspaces(copyWorkspaces)
              })
            }
          }
        ])
      }
      else {
        createFileHelper();
      }
    })
  }


  const FileComponent = ({ name, index}) => {
    let removeCurrentFile = () => {
          let copyFiles = workspaces[selectedInd].files.slice();
          let copyWorkspaces = workspaces.slice();
          copyFiles.splice(index, 1);
          copyWorkspaces[selectedInd].files = copyFiles;
          setWorkspaces(copyWorkspaces);
        }

    var fileSwipeoutBtns = [
      {
        text: "x",
        backgroundColor: "#FF0000",
        onPress: () => {
           Alert.alert("Do you want to delete this file?", "Deleting a file will remove it from your workspace", [
             {
            text: "Cancel" 
            },
            {
              text: "Delete",
              style: "destructive",
              onPress: () => {
                UserService.deleteUserWorkspaceFile(user.uid, workspaces[selectedInd].wid, workspaces[selectedInd].files[index].fid, (didDelete) =>{
                  if(didDelete){
                    removeCurrentFile()
                  }
                  else {
                    alert("error deleting file");
                  }
                })
              }
            }
         ])
        }
      }
    ] 
    return (
    <Swipeout style={{backgroundColor: "rgba(0,0,0,0.0)"}}right={fileSwipeoutBtns}>
    <TouchableOpacity onPress={() => {
      //updateFile("console.log('Hello World')", index)
      let wid = workspaces[selectedInd].wid
      navigation.navigate('TempTextEditing', {user: user, wid: wid, file: workspaces[selectedInd].files[index], onGoBack: refresh})
      }}>
    <View style={styles.file}>
      <Text style={styles.titlePurple}>{name}</Text>
    </View>
    </TouchableOpacity>
    </Swipeout>
  )};

  function updateFile(contents, fileInd) {
    let fid = workspaces[selectedInd].files[fileInd].fid
    UserService.updateUserWorkspaceFile(user.uid, workspaces[selectedInd].wid, fid, contents, (didUpdate) => {
      if (didUpdate) {
        console.log("file updated");
      }
    })
  }
 
  const renderWorkspace = ({ item, index}) => {
    //const backgroundColor = index === selectedId ? "#9B51E0" : "#73A2FF";
    let selectedStyle = index === selectedInd ? 
    {backgroundColor:"#73A2FF", borderWidth: 4, borderColor: "rgb(240, 240,240)"} : {backgroundColor:"#73A2FF"};

    return (
      <WorkspaceComponent
        item={item}
        index={index}
        onPress={() => setSelectedInd(index)}
        style={selectedStyle}
      />
    );
  };

  return (
        <View style={[styles.superContainer, {opacity: workspaceModalVisible || fileModalVisible ? 0.5: 1}]}>
        {
        <CreateWorkspaceModal visible={workspaceModalVisible} setModalVisible={setWorkspaceModalVisible} 
            createWorkspace={createWorkspace}
        />
        }
        {
        <CreateFileModal visible={fileModalVisible} setModalVisible={setFileModalVisible} 
            createFile={createFile}
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
            extraData={selectedInd}
            ListFooterComponent={workspacePlusIcon}
     		refreshing={refreshingFiles}
      		onRefresh={()=>{
      		setRefreshingWorkspaces(true);
      		setRefreshingFiles(false);
      		UserService.getUserWorkspaces(user.uid, (workspaces) =>{
    			setRefreshingWorkspaces(false);
      			setWorkspaces(workspaces);	
	  			});
	  		}
        }
        />
        </View>
      {/*pass selectedID to data to get just the selected data's files*/}
      <View style={styles.fileList}>
        <View style={styles.filesHeader}>
            <Text style={styles.filesHeaderText}>Files</Text>
            {filePlusIcon}
        </View>
        {/**/}
    <FlatList
      data={workspaces.length > 0 ? workspaces[selectedInd].files: []}
      keyExtractor={(item, index) => `file-${index}`}
      renderItem={({ item, index}) => <FileComponent name={item.name + item.extension} index={index}/>}
      refreshing={refreshingFiles}
      onRefresh={()=>{
      	setRefreshingFiles(true);
      	setRefreshingWorkspaces(false);
      	UserService.getUserWorkspaceFiles(user.uid, workspaces[selectedInd].wid, (files) =>{
    			setRefreshingFiles(false);
    			let copyWorkspaces = workspaces.slice();//makes a copy of the workspaces
      		copyWorkspaces[selectedInd].files = files;
      		setWorkspaces(copyWorkspaces);
	  });
      	
      }/*view documentation*/}
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
    alignItems: 'flex-end',
    justifyContent: "flex-start"
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


