import React from 'react';
import { View, Text, ActivityIndicator,Image, StyleSheet } from 'react-native';
import firebase from 'react-native-firebase';
export default class Loading extends React.Component {
    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
        this.props.navigation.navigate(user ? 'Main' : 'Auth')
        })
      }
  render() {
    return (
      <View style={styles.container}>
      <Image style={styles.Image} source = {require('../../assets/my_logo_b.png')} />
        <Text>Loading</Text>
        <ActivityIndicator size="large" />
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#e7e7d6"
  },
  Image:{

    marginTop:20,
  }
})