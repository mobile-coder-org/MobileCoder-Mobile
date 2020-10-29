import React, { Component } from 'react';

import { StyleSheet, Text, View, Alert } from 'react-native';

export default class App extends Component<{}> {
  

  SampleFunction=(item)=>{
	var fs= require('react-native-fs');
    
    
    fs.readFile(item, 'utf8', function(err, data) {
    if (err) throw err;
    console.log(data);
	});
  }
  

 render() {

  var SampleNameArray = [ "test1.txt","test2.txt","test3.txt"];
  
   return (
     <View style={styles.MainContainer}>

         { SampleNameArray.map((item, key)=>(
         <Text key={key} style={styles.TextStyle} onPress={ this.SampleFunction.bind(this, item) }> { item } </Text>)
         )}

     </View>
   );
 }
}

const styles = StyleSheet.create({
 
 MainContainer: {
    backgroundColor: "#1E2127",
    color: "#ABB2BF",
    height: "100%",
    width: "100%",
    display: "flex",
    justifyContent: "center"
   
 },

 TextStyle:{
    color: "#ABB2BF",
    margin: "auto",
    alignSelf: "center",
    fontSize: 50
 }

});

