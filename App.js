import React, {Component} from 'react';
import { StyleSheet,TextInput,Button, Text, View} from 'react-native';
import firebase from 'react-native-firebase';

const FBSDK = require('react-native-fbsdk');

const {LoginButton,AccessToken} = FBSDK;



export default class App extends Component {

  state = { email: '', 
  password: '', 
  errorMessage: null }

  onLoginOrRegister = () => {
    LoginManager.logInWithReadPermissions(['public_profile', 'email'])
      .then((result) => {
        if (result.isCancelled) {
          return Promise.reject(new Error('The user cancelled the request'));
        }
        // Retrieve the access token
        return AccessToken.getCurrentAccessToken();
      })
      .then((data) => {
        // Create a new Firebase credential with the token
        const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);
        // Login with the credential
        return firebase.auth().signInWithCredential(credential);
      })
      .then((user) => {
        // If you need to do anything with the user, do it here
        // The user will be logged in automatically by the
        // `onAuthStateChanged` listener we set up in App.js earlier
      })
      .catch((error) => {
        const { code, message } = error;
        // For details of error codes, see the docs
        // The message contains the default Firebase string
        // representation of the error
      });
  }
handleSignUp = () => {
    firebase
    .auth()
    .createUserWithEmailAndPassword(this.state.email, this.state.password)
   //.then(() => this.props.navigation.navigate('Main'))
    .catch(error => this.setState({ errorMessage: error.message }))
  console.log('handleSignUp')
}

  render() {

    return (
      <View style={styles.containerrr}>
      {/* <Text>Sign Up</Text>
      {this.state.errorMessage &&
        <Text style={{ color: 'red' }}>
          {this.state.errorMessage}
        </Text>}
      <TextInput
        placeholder="Email"
        autoCapitalize="none"
        style={styles.textInput}
        onChangeText={email => this.setState({ email })}
        value={this.state.email}
      />
      <TextInput
        secureTextEntry
        placeholder="Password"
        autoCapitalize="none"
        style={styles.textInput}
        onChangeText={password => this.setState({ password })}
        value={this.state.password}
      />
      <Button title="Sign Up" onPress={this.handleSignUp} />
      <Button
        title="Already have an account? Login"
        //onPress={() => this.props.navigation.navigate('Login')}
      /> */}
      <LoginButton

onLoginFinished={(error, result) => {

if (error) {

  console.log("login has error: " + result.error);

} else if (result.isCancelled) {

  console.log("login is cancelled.");

} else {

  AccessToken.getCurrentAccessToken().then(

    (data) => {

      console.log(data);
      onLoginOrRegister();
      

    }

  )

}

}}

onLogoutFinished={() => console.log("logout.")}/>
    </View> 
    );}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  containerrr: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textInput: {
    height: 40,
    width: '90%',
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 8
  }
});
