import React from 'react'
import { TextInput,View } from 'react-native'

 export default  TextArea =(props)=>
(  <View style={styles.textAreaContainer} >
    <TextInput
      style={styles.textArea}
      underlineColorAndroid="transparent"
      placeholder="Type something"
      placeholderTextColor="grey"
      //numberOfLines={10}
      multiline={true}
    />
  </View>
);
const styles = StyleSheet.create({
    textAreaContainer: {
      
      borderWidth: 1,
      padding: 5
    },
    textArea: {
      height: 150,
      justifyContent: "flex-start"
    }
  })