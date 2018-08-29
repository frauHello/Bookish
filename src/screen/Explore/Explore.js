import React, { Component } from 'react';
import firebase from 'react-native-firebase';
import { StyleSheet, FlatList, Text, View, ActivityIndicator } from 'react-native';
import BookItem from './BookItem'




export default class Explore extends Component {
  state = {
    books: [],
    loading: true
  }
  constructor() {
    super();
    this.ref = firebase.firestore().collection('books');
    this.unsubscribe = null;
  }
  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate)
  }

  componentWillUnmount() {
    this.unsubscribe();
  }
  onCollectionUpdate = (querySnapshot) => {
    const books = [];
    querySnapshot.forEach((doc) => {
      const { title, author, description,cover } = doc.data();
      books.push({
        key: doc.id,
        doc, // DocumentSnapshot
        title,
        author,
        description,
        cover
      });
    });
    this.setState({
      books,
      loading: false,
    });


  }
  render() {
    if (this.state.loading) {
      return (

        <View style={styles.loading}>
          <ActivityIndicator size="large" />
        </View>


      );

    }
    else {
      return (

        <View style={styles.container}>

          <Text style={styles.title}>
            Here you can view already added books
          </Text>
          <FlatList
            data={this.state.books}
            renderItem={({ item }) => <BookItem {...item} />}
          />
        </View>


      );
    }
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

  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#e7e7d6"
  },

});