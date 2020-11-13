import React from 'react';
import {useState } from "react";
import { FlatList, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, SectionList, View, Image,Icon } from "react-native";
import BottomBar from '../../components/BottomBar'
import { Container, Header, Content, Footer, FooterTab, Button} from 'native-base';

const DATA = [
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

const WorkspaceComponent = ({ item, onPress, style }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
    <Text style={styles.title} adjustsFontSizeToFit={true}>{item.title}</Text>
  </TouchableOpacity>
);

const FileComponent = ({ title }) => (
  <TouchableOpacity>
  <View style={styles.file}>
    <Text style={styles.titlePurple}>{title}</Text>
  </View>
  </TouchableOpacity>
);

export default function FilesScreen(props){
  let navigation = props.navigation;
  let plusIcon = <TouchableOpacity><Image source={require('../../assets/icons/PlusButton/PlusButton.png')} style={styles.item}/></TouchableOpacity>

  const [selectedId, setSelectedId] = useState(0);
  
  const renderProject = ({ item, index}) => {
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
        <View style={styles.superContainer}>
        <View style={{height: 50, backgroundColor: "rgba(0, 0, 0, 0.2)"}}></View>
        <Container style={{overflow: 'hidden'}}>
        <View style={{height:'100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start'}}>
        <View style={[styles.container, {flex: 1, display: 'flex', flexDirection: 'row'}]}>
        <View style={styles.workspaceList}>
        <FlatList
            data={DATA}
            renderItem={renderProject}
            keyExtractor={(item) => item.title}
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
      data={DATA.length > 0 ? DATA[selectedId].data : []}
      keyExtractor={(item, index) => `file-${index}`}
      renderItem={({ item }) => <FileComponent title={item}/>}
    />
    </View>
    </View>
    <BottomBar 
    location="files"
    leftClick={()=> navigation.navigate('Files')}
    rightClick= {() => navigation.navigate('Admin')}
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
    padding: 15,
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
    marginVertical: 20,
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
    fontSize: 13,
    fontWeight: 'bold',
    color:'white'
  },
    titlePurple: {
    fontSize: 13,
    fontWeight: 'bold',
    color:"#9B51E0" 
  },
});


