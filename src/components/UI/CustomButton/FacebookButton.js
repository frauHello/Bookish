import React from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import Entypo from "react-native-vector-icons/Entypo";

const FacebookButton= props => {
    return(
    <TouchableOpacity onPress={props.onPress}>
        <View style={[styles.button, { backgroundColor: props.color }]}>
        <Entypo name="facebook" size={20} color="#27636d" />
    <Text style= {[styles.buttonText, { color: props.textcolor }]}> 
    
    {props.children}
        </Text>
        </View>
   </TouchableOpacity>);
 
}

const styles = StyleSheet.create({

    button: {
     
        
     alignItems:"center",
       flexDirection:"row",
       
        padding:20,
        height:20,
        justifyContent: "center",
        alignItems: "center"
     

    },
    
 buttonText:
 {
color:"#27636d",
fontWeight:"bold",
width:"80%"
},


image:{
width:"20%"


}
 

});
export default FacebookButton;
