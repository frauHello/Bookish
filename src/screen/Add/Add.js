import React, { Component } from 'react';

import {StyleSheet,Text,View} from 'react-native';

export default class Add extends Component {

  render() {

    return (

      <View style={styles.container}>

        <Text style={styles.title}>

         HERE YOU CAN ADD YOUR VIDEOS AND YOUR SUMMARIES FOR ALREADY EXISTING BOOKS OR CREATE NEW BOOKS

        </Text>
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














