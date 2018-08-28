import React, { Component } from 'react';

import {StyleSheet,Text,View} from 'react-native';

export default class MySpace extends Component {

  render() {

    return (

      <View style={styles.container}>

        <Text style={styles.title}>

         HERE YOU CAN VIEW YOUR VIDEO DOWNLOADS AND SUMMARY DOWNLOADS FROM OTHER USERS 

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