import React from 'react';
import {useState } from "react";
import { FlatList, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity } from "react-native";

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "Project 1",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Project 2",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Project 3",
  },
];

const Item = ({ item, onPress, style }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
    <Text style={styles.title} adjustsFontSizeToFit={true}>{item.title}</Text>
  </TouchableOpacity>
);


export default function Example(props){
  const [selectedId, setSelectedId] = useState(null);

  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? "#9B51E0" : "#73A2FF";

    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.id)}
        style={{ backgroundColor }}
      />
    );
  };

  return (
    <SafeAreaView style={styles.v_container}>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        extraData={selectedId}
        style={styles.container}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    width:'25%',
    backgroundColor:"#2F333A"
  },
  item: {
    padding: 20,
    marginVertical: 20,
    marginHorizontal:5,
	borderRadius:10,
    width:'90%',
    height:'90%',
    flex:1,
    flexDirection:"column",
    alignItems:'center'
    
  },
    v_container: {
    flex: 1,
    //padding: 8,
    flexDirection: "column", // main axis
    justifyContent: "space-around", // main axis
    //alignItems: "flex-start", // cross axis
    backgroundColor: '#363941',
  },
  title: {
    fontSize: 13,
    fontWeight: 'bold'
    
  },
});


