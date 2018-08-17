import React from 'react';
import {TextInput, StyleSheet} from 'react-native';


const DefaultInput= props=>(

<TextInput 
underlineColorAndroid="transparent"
{...props}
style={[styles.input,props.style, !props.valid && props.touched ? styles.invalid:null]}
/>

);

const styles=StyleSheet.create({

   
    input:{
   
    borderWidth:1,
    
    alignSelf:'stretch',
    height:40,
    
    marginBottom:20,
    borderBottomColor:"#27636d",
    borderBottomWidth:1,
    color:"#27636d",
    borderColor:"#e7e7d6"



  
    },
   invalid:{
backgroundColor:'#b9b9ba',
borderColor:"#bb5538"



   }
        
    
    
    
    });


export default DefaultInput;
