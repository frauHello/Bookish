import React, { Component } from 'react';

import {
  StatusBar,
  StyleSheet,
  FlatList,
 
  View
} from 'react-native';

import BookItem from '../../components/ExploreItem/BookItem';



export default class Explore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [
        {
          id: 1,
          title: 'Harry Potter and the Goblet of Fire',
          author: 'J. K. Rowling',
          thumbnail: 'https://covers.openlibrary.org/w/id/7984916-M.jpg'
        },
        {
          id: 2,
          title: 'The Hobbit',
          author: 'J. R. R. Tolkien',
          thumbnail: 'https://covers.openlibrary.org/w/id/6979861-M.jpg'
        },
        {
          id: 3,
          title: '1984',
          author: 'George Orwell',
          thumbnail: 'https://covers.openlibrary.org/w/id/7222246-M.jpg'
        }
      ]
    }
  }

  _renderItem = ({item}) => (
    <BookItem
      id={item.id}
      title={item.title}
      author={item.author}
      thumbnail={item.thumbnail}
    />
  );

  _keyExtractor = (item, index) => item.id;
  render() {

    return (

      <View style={styles.container}>

         <StatusBar
          barStyle="light-content"
        />
        <FlatList
          data={this.state.books}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
        />
 </View>

    );}}



const styles = StyleSheet.create({

  container: {

    flex: 1,

    justifyContent: 'center',

    alignItems: 'center',

    backgroundColor: '#e7e7d6',

  },

  title: {

    fontSize: 20,

    textAlign: 'center',

    margin: 10,
    color:"#27636d"

  }

});