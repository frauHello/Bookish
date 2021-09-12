import React from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";


const CustomButton= props => {
    const content = (
        <View style={[styles.button, { backgroundColor: props.color,width:props.width,elevation:props.elevation,marginTop:props.marginTop}, props.disabled ? styles.disabled : null]}>
            <Text style= {[styles.buttonText, { color: props.textcolor },props.disabled ? styles.disabledText:null]}>{props.children}  </Text>
        </View>
    );

    if (props.disabled) {
        return content;
      }

      return( 
     
      <TouchableOpacity onPress={props.onPress}>{content}</TouchableOpacity>
  
  
      )


}

const styles = StyleSheet.create({

    button: {
     
        
        alignItems:"center",
       
        marginTop:10,
        padding:20,
        height:20,
        justifyContent: "center",
        alignItems: "center"
        

    },
    disabled: {
        
        backgroundColor:"#e5d8ca",
       
        
 },
 buttonText:
 {
color:"#27636d",
fontWeight:"bold"




 },
 disabledText:{

    color: "#8f8f8f"


 }


});
export default CustomButton;