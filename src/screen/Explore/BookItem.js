import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Avatar } from "react-native-elements";

export default class BookItem extends Component {
 
 





  render() {


    return (
      <View style={styles.container}>

        <Avatar
          xlarge
          source={ {uri:this.props.cover} }
          activeOpacity={0.7}
        />

        <Text style={styles.Text}>Title: {this.props.title}</Text>
        <Text style={styles.Text}>Author: {this.props.author}</Text>
        <Text style={styles.Text}>Description: {this.props.description}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    borderRightColor: '#27636d',
    borderLeftColor: '#27636d',
    borderBottomColor: '#27636d',
    borderTopColor: '#27636d',
    borderRightWidth: 2,
    borderLeftWidth: 2,
    borderBottomWidth: 2,
    borderTopWidth: 2,
    marginTop: 20,
    width: "80%"


  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  }

});