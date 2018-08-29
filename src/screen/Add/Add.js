import React, { Component } from 'react';
import firebase from 'react-native-firebase';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import ImagePicker from "react-native-image-picker";
import { Avatar } from "react-native-elements";
import CustomButton from "../../components/UI/CustomButton/CustomButton";
export default class AddBookProfile extends Component {

  constructor() {
    super();
    this.ref = firebase.firestore().collection('books');


  }
  state = {
    cover: null,
    title: "",
    description: "",
    author: "",
    uri: "",
    url: ""

  }
  addBook = () => {
  this.uploadCover(this.state.uri);
    this.ref.add({
      title: this.state.title,
      author: this.state.author,
      description: this.state.description,
      cover: this.state.url

    });
    console.warn(this.state.url)
   
    this.setState({
      title: '',
      author: '',
      description: '',
      uri: '',
      url: ''

    });
    console.warn("done")
  }


  imageEditedHandler = image => {
    this.setState({
      cover: image,
    }
    );
  }
  uploadCover = (uri) => {
    const storage = firebase.storage();
    const directoryRef = storage.ref('Images');
    const imageRef = directoryRef.child('CoverImages');
    const currentRef = imageRef.child(uri);
    currentRef.putFile(uri).then(() => {
// console.warn("hii after then putfile")
// console.warn(uri)
      currentRef.getDownloadURL().then((url) => {
        // console.warn("hi after then the get dw url");
        // console.warn(url)
        this.setState({
          url: url
        }
        );
      }).catch()
    });



  }

  titleChanged = val => {

    this.setState({
      title: val

    });
  }
  descriptionChanged = val => {

    this.setState({
      description: val

    });
  }
  authorChanged = val => {

    this.setState({
      author: val

    });
  }
  addImageHandler = () => {
    ImagePicker.showImagePicker({ title: "Pick a picture" }, res => {
      if (res.didCancel) {
        console.warn("User cancelled!");
      } else if (res.error) {
        console.warn("Error", res.error);
      } else {

        this.setState({
          uri: res.uri

        });

        this.imageEditedHandler({ uri: res.uri, base64: res.data });

      }
    });
  }

  render() {


    return (

      <View style={styles.container}>

        <Text style={styles.title}>
          Here you can add a  book with it's cover, author,description, and title
 </Text>
        <Avatar
          xlarge
          source={this.state.cover}
          activeOpacity={0.7}
        />
        <TouchableOpacity onPress={this.addImageHandler}>
          <Text style={styles.add}>Add book cover</Text>
        </TouchableOpacity>
        <Text style={styles.Text}>Title</Text>
        <TextInput
          onChangeText={this.titleChanged}
          style={styles.input}
          placeholder='title'
        />
        <Text style={styles.Text}>Author</Text>
        <TextInput
          onChangeText={this.authorChanged}
          style={styles.input}
          placeholder='author'
        />
        <Text style={styles.Text}>Description</Text>
        <TextInput
          onChangeText={this.descriptionChanged}
          style={styles.input}
          placeholder='description'
        />
        <CustomButton color="#bb5538"
          onPress={this.addBook}
          textcolor="#e7e7d6">Add</CustomButton>


      </View>


    );
  }
}



const styles = StyleSheet.create({

  container: {

    flex: 1,



    alignItems: 'center',

    backgroundColor: '#e7e7d6',

  },

  title: {

    fontSize: 20,

    textAlign: 'center',

    margin: 10,
    color: "#27636d"

  },
  Text: {
    fontSize: 14,
    color: "#27636d",
    marginTop: 20


  },
  input: {


    borderBottomColor: "#27636d",
    borderBottomWidth: 2,
    color: "#27636d",
    width: "80%",
    alignItems: "center"
  },
  add: {
    fontSize: 12,
    color: "#27636d",

  }

});














