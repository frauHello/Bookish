import React from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { Icon } from "react-native-elements";
const EditProfileItem = props => (
<View  style={styles.mainContainer}>
    <View style={styles.listItem}>

        <Icon

            name={props.name}
            type={props.type}
            color={props.color}
            size={23}

        />
        <Text style={styles.Text}>{props.children}</Text>
        </View>
        <TextInput
           // underlineColorAndroid="#27636d"
            returnKeyType="done"
            keyboardType={props.keyboardType}
            maxLength={props.maxLength}
            onChangeText={props.onChangeText}
            style={styles.input}
            defaultValue={props.defaultValue}
          
            


        />
    </View>

);

const styles = StyleSheet.create({
    Text: {
        fontSize: 14,
        color: "#27636d",
        marginLeft:5
        
        
    },
    listItem: {
        width: "30%",
      marginTop: 25,
       // padding: 10,
        
       
    alignItems: "flex-start",
    flexDirection:"row",


    },
    input:{
        width:"70%",
        marginLeft:5,
        borderBottomColor:"#27636d",
        borderBottomWidth:2,
        color:"#27636d"
        },
        mainContainer:{
            marginBottom: 8, 
          
            flexDirection:"row",
            alignItems: "flex-start",
            justifyContent:"center",
            padding: 5,
            width:"100%",
        }
    
});

export default EditProfileItem;
