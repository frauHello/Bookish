import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList,ActivityIndicator,Image } from 'react-native';
import BookmarkItem from './BookmarkItem';
import AnimatedHeader from 'react-native-animated-header';
import firebase from 'react-native-firebase';

export default class MySpace extends Component {
  state = {
    bookmarks: [],
    loading: true,
  }

  constructor() {
    super();
    
    this.unsubscribe = null;
    const { currentUser } = firebase.auth();
    this.userRef = firebase.firestore().collection('users').doc(currentUser.uid);
    this.bookMarkRef = this.userRef.collection("bookmarks");
  }

//   onClick=()=>{
//    firebase.auth().fetchProvidersForEmail("noura-pretty17@hotmail.com").then((signIn)=>{
// console.warn(signIn)

//     }) 
//   }

componentDidMount() {

  this.unsubscribe = this.bookMarkRef.onSnapshot(this.onCollectionUpdate)
}

componentWillUnmount() {
  this.unsubscribe();
}
onCollectionUpdate = (querySnapshot) => {
  console.warn("Inside collection update")
  const bookmarks = [];
 
  querySnapshot.forEach((doc) => {
const { title, author, description, cover } = doc.data();
bookmarks.push({
        key: doc.id,
        doc, // DocumentSnapshot
        title,
        author,
        description,
        cover
      });
this.setState({
      bookmarks,
      loading: false,
    });


  })}
render() {
      if(this.state.loading) {
        return (

          <View style={styles.loading}>
            <ActivityIndicator size="large" />
          </View>


        );

      }
  else {
        return(

      

       <AnimatedHeader 
      style = { styles.container }
      
      title = 'Bookmarks'
    renderLeft = {() => (<Image
      style={{ width: 70, height: 80 }}
      source={require('../../assets/images/bookmark.png')} />)
    }
      backStyle = {{ marginLeft: 80, marginRight: 100 }}
titleStyle = {{ fontSize: 30, left: 1, bottom: 20, color: '#e7e7d6', fontWeight: "bold" }}
headerMaxHeight = { 100}
imageSource = { require('../../assets/images/header2.jpg') }
toolbarColor = '#357180'
disabled = {false}
>

 <FlatList
  data={this.state.bookmarks}
  renderItem={({ item }) => <BookmarkItem navigation={this.props.navigation} item={item} />}
/> 

    </AnimatedHeader >
      


    );
  }
}
}



const styles = StyleSheet.create({

container: {

  flex: 1,
  alignItems: 'center',
  backgroundColor: "#e7e7d6",


},

loading: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: "#e7e7d6"
},


});

