import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity,Image,Alert } from 'react-native';
import firebase from 'react-native-firebase';
import { connect } from 'react-redux';
 import { selectBook } from '../../store/actions/index';
 import { deleteBookmark } from '../../store/actions/index';
import { Card,Icon } from 'react-native-elements';




class BookmarkItem extends Component {
  constructor(props) {
    super(props);
    const { currentUser } = firebase.auth();
    this.userRef= firebase.firestore().collection('users').doc(currentUser.uid);
    this.bookMarkRef= this.userRef.collection("bookmarks");
   
  }
 


  render() {
    let { navigation, item, onSelectBook,onDeleteBookmark} = this.props
    let { author, key, title, description, cover } = item
  
  
    return (
   
       


<Card
wrapperStyle={styles.container}
containerStyle={styles.card}
>
<View style={styles.data}>
<TouchableOpacity onPress={() => {
    navigation.navigate('BookPreview');
    onSelectBook(key, title, author, description, cover);
  }}>

<Image   source={{uri:cover}} style={styles.cover}     />
</TouchableOpacity>
 </View>
 <View style={styles.data}>      
 <Text style={styles.title}>{title}</Text> 
   
<Text style={styles.author}>by. {author}</Text>

 <View style={styles.Button}>
 <TouchableOpacity onPress={() => {
 //  console.warn("inside button",key)
 onDeleteBookmark(key);
   this.bookMarkRef.doc(key).delete()}}>
       <Icon
         reverse
         name='bookmark-remove'
          type="material-community"
         color='#357180'
       />
        </TouchableOpacity>
   <TouchableOpacity onPress={() => {
    navigation.navigate('BookPreview');
   // console.warn(navigation)
    onSelectBook(key, title, author, description, cover);
  }}>

<Icon
  reverse
  name='open-book'
  type='entypo'
  color='#357180'
/>
 </TouchableOpacity>

   </View>



  </View>
 
</Card>






    );
  
}}
const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: "#e7e7d6",
    flexDirection:"row",
     borderBottomColor:"#357180",
    borderTopColor:"#357180",
    borderRightColor:"#357180",
    borderLeftColor:"#357180",
    borderWidth:1
   

  },
  card:{
    flex: 1,
    backgroundColor: "#e7e7d6",
    alignItems:"center",
    justifyContent:"center",
   

  },
  data:{


backgroundColor: "#e7e7d6",
width:"50%",
marginTop:2,
marginBottom:2,
marginLeft:2,
marginRight:2

  },
  author:{
  
color:"#b9b9ba",
fontSize:14
  },
  title:{
  
    color:"#357180",
    fontSize:20,
    fontWeight:"bold",

      },

  Button:{

    alignItems:"flex-end",
    marginTop:90,
    flexDirection:"row"
    
   },
   cover:{
   width:150,
   height:200


   },
 

});

function mapDispatchToProps(dispatch) {
  return {
    onSelectBook: (bookId, title, author, description, cover) => dispatch(selectBook(bookId, title, author, description, cover)),
    onDeleteBookmark: (bookId) => dispatch(deleteBookmark(bookId)),
 
  };
};

const mapStateToProps = state => {
  return {
  
  };

};


export default connect(mapStateToProps, mapDispatchToProps)(BookmarkItem);
