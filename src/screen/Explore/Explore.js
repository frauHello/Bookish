import React, { Component } from 'react';
import firebase from 'react-native-firebase';
import { StyleSheet, FlatList, View, ActivityIndicator } from 'react-native';
import BookItem from './BookItem';
import AnimatedHeader from 'react-native-animated-header';
import { Icon } from 'react-native-elements';

import _ from 'lodash';



export default class Explore extends Component {
  state = {
    books: [],
    bookmarkedBooks: [],
    loading: true,

  }
  constructor() {
    super();
    this.ref = firebase.firestore().collection('books');
    this.unsubscribe = null;
    const { currentUser } = firebase.auth();
    this.userRef = firebase.firestore().collection('users').doc(currentUser.uid);
    this.bookMarkRef = this.userRef.collection("bookmarks");
  }
  componentDidMount() {
    this.getBookmarkedBooks();
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate)
  }

  componentWillUnmount() {
    this.unsubscribe();
  }
  onCollectionUpdate = (querySnapshot) => {
    console.warn("Inside collection update")
    const books = [];
    // let bookmarked = false;
    // let numberOfBooks = querySnapshot.docs.length
    querySnapshot.forEach((doc) => {
      const { title, author, description, cover } = doc.data();

    //  console.warn(doc.id);
      books.push({
        key: doc.id,
        doc, // DocumentSnapshot
        title,
        author,
        description,
        cover,
      });
      this.setState({
        books,
        loading: false,
      }, () => {
        //  this.getBookmarkedBooks()
      });
    })
  }

  getBookmarkedBooks() {
    // let books= this.state.books;
    let booksAfterBookmark = []
    const ref = this.bookMarkRef.get().then((snap) => {
      snap.forEach(doc => {
        let id = doc.id;
        booksAfterBookmark.push(id)
        //let bookIndex=_.findIndex(books, (oneBook)=>{
        // return oneBook.id==id;
        //})
        //if(bookIndex>-1){
        //  booksAfterBookmark[bookIndex].bookmarked=true
        //}

      })
      this.setState({ bookmarkedBooks: booksAfterBookmark })
    });
  }


  renderBook(item) {
    let { bookmarkedBooks } = this.state;
    let isBookmarked = _.find(this.state.bookmarkedBooks, (oneBook) => {
      return oneBook.id == item.id;
    })

    return <BookItem isBookmarked={isBookmarked} navigation={this.props.navigation} item={item} />
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



        <AnimatedHeader
          style={styles.container}

          title='Find Books'
          renderLeft={() => (<View style={{ justifyContent: "flex-end" }}><Icon name='open-book' size={37} type="entypo" color="#e7e7d6" /></View>)
          }
          backStyle={{ marginLeft: 80, marginRight: 100 }}
          titleStyle={{ fontSize: 30, left: 1, bottom: 20, color: '#e7e7d6', fontWeight: "bold" }}
          headerMaxHeight={150}
          imageSource={require('../../assets/images/header.jpg')}
          toolbarColor='#bb5538'
          disabled={false}
        >

          <FlatList
            data={this.state.books}
            renderItem={({ item }) => this.renderBook(item)}
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

