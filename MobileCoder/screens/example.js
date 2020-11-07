import React from 'react';
import {useState } from "react";
import { FlatList, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, SectionList, View } from "react-native";

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



const Project = ({ item, onPress, style }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
    <Text style={styles.title} adjustsFontSizeToFit={true}>{item.title}</Text>
  </TouchableOpacity>
);

const Files = ({ title }) => (
  <View style={styles.file}>
    <Text style={styles.titlePurple}>{title}</Text>
  </View>
);

export default function Example(props){

  const [selectedId, setSelectedId] = useState('');
  
  const renderProject = ({ item }) => {
    const backgroundColor = item.title === selectedId ? "#9B51E0" : "#73A2FF";

    return (
      <Project
        item={item}
        onPress={() => setSelectedId(item.title)}
        style={{ backgroundColor }}
      />
    );
  };
  return (
    <SafeAreaView style={styles.v_container}>
      <FlatList
        data={DATA}
        renderItem={renderProject}
        keyExtractor={(item) => item.title}
        extraData={selectedId}
        style={styles.container}
      />
      {/*pass selectedID to data to get just the selected data's files*/}
      
	
    <SectionList
      sections={DATA}
      keyExtractor={(item, index) => item + index}
      renderItem={({ item }) => <Files title={item}/>}
      style={styles.s_container}
    />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    width:'100%',
    
    backgroundColor:"#2F333A",
    flex: 1,
    //padding: 8,
    //flexDirection: "column", // main axis
    //justifyContent: "space-around", // main axis
  },
 s_container: {
    flex: 3,
    marginTop: StatusBar.currentHeight || 0,
    width:'100%',
    marginRight:'15%',
    padding:10
  },
  item: {
    padding: 15,
    marginVertical: 20,
    marginHorizontal:'15%',
	borderRadius:10,
    width:'40%',
    height:'40%',
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
    backgroundColor: '#1F1F1F',
    
  },
    v_container: {
    width: '100%',
    height: '100%',
    display:'flex',
    backgroundColor: '#363941',
    flexDirection:"row",
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


