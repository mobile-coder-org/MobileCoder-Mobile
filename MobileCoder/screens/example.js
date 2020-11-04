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
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
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
    width:'20%',
    backgroundColor:"#2F333A"
  },
 s_container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    width:'75%',
  },
  item: {
    padding: 20,
    marginVertical: 20,
    marginHorizontal:'10%',
	borderRadius:10,
    width:'70%',
    height:'90%',
    flex:1,
    flexDirection:"column",
    alignItems:'center'
    
  },
    v_container: {
    flex: 1,
    //padding: 8,
    flexDirection: "row", // main axis
    justifyContent: "space-around", // main axis
    //alignItems: "flex-start", // cross axis
    backgroundColor: '#363941',
  },
  title: {
    fontSize: 13,
    fontWeight: 'bold',
    color:'white'
  },
});


