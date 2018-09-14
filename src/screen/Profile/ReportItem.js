import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Avatar } from "react-native-elements";
import firebase from 'react-native-firebase';
class ReportItem extends Component {
  constructor(props) {
    super(props);
  
 
  }
  state={
deleted:false,


  }

  render() {
    let { navigation, item } = this.props
    let { author, key, title, description, cover,username,text,bookId } = item
    let deleteControl=null;
    if (this.state.deleted===false){
    deleteControl=( <TouchableOpacity 
        onPress={()=>{
          //  console.warn(bookId)
            firebase.firestore().collection('books').doc(bookId).delete();
            firebase.firestore().collection("Reports").doc(key).delete();
            this.setState({
            
            deleted:true    
            });
            

        }}
        style={styles.Button}
        >
     
        
        <Text>Delete</Text>
       
        </TouchableOpacity>
  );

}
else {
    
    deleteControl=(

    <Text>deleted</Text>
    );

}
    return (
   
        <View style={styles.container}>
         <Text style={styles.Title}>Reported by {username}  </Text>
         <Text style={styles.Title}>Saying that  {text}  </Text>
         <Text style={styles.Title}> {title}</Text>

          <Avatar
            xlarge
            source={{ uri: cover }}
            activeOpacity={0.7}
          />
          
        <View style={styles.Author}>
          <Text style={styles.Text}>Author: </Text>
          <Text style={styles.Text}>{author}</Text>
          </View>
          
     {deleteControl}
  </View>

//   <Card
//   titleStyle={styles.Title}
//   title={title}
//   imageStyle={{width: 100, height: 100}}
//   wrapperStyle={styles.container}
//   image={{ uri: cover }}>
//   <Text style={{marginBottom: 10}}>
//     Author:{author}
//   </Text>
//   <Button
//     icon={<Icon name='open-book'type='entypo' color='#e7e7d6' />}
//     backgroundColor='#bb5538'
//     buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
//     title='View' />
// </Card>




    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    //  marginTop: 20,
    width: "90%",
    justifyContent:"center",
    shadowColor:"#bb5538",
    shadowOpacity:0.6,
    backgroundColor:"#e7e7d6",
    height:"100%"



  },
  Text: {
    fontSize: 14,
    textAlign: 'center',
    margin: 10,
    color:"#357180"
  },
  Author:{
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 5
  },
  Title:{
  fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color:"#357180"



  },
  Button:{

    backgroundColor:"#bb5538"

  }

});




export default ReportItem;