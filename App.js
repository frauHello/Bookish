import React, {Component} from 'react';
import { StyleSheet,TextInput,Button,TouchableOpacity, Text, View} from 'react-native';
//import firebase from 'react-native-firebase';

//const FBSDK = require('react-native-fbsdk');

//const {LoginButton,AccessToken,LoginManager} = FBSDK;


import { Provider } from 'react-redux';
import MainSwitchNavigator from './src/screen/Navigator/MainSwitchNavigator';

import configureStore from './src/store/ConfigureStore';
const store = configureStore();

export default class App extends Component {
  


//   state = { email: '', 
//   password: '', 
//   errorMessage: null }

//   onLoginOrRegister = () => {
//     LoginManager.logInWithReadPermissions(['public_profile', 'email'])
//       .then((result) => {
//         if (result.isCancelled) {
//           return Promise.reject(new Error('The user cancelled the request'));
//         }
//         // Retrieve the access token
//         return AccessToken.getCurrentAccessToken();
//       })
//       .then((data) => {
//         // Create a new Firebase credential with the token
//         const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);
//         // Login with the credential
//         return firebase.auth().signInWithCredential(credential);
//       })
//       .then((user) => {
//         // If you need to do anything with the user, do it here
//         // The user will be logged in automatically by the
//         // `onAuthStateChanged` listener we set up in App.js earlier
//       })
//       .catch((error) => {
//         const { code, message } = error;
//         // For details of error codes, see the docs
//         // The message contains the default Firebase string
//         // representation of the error
//       });
//   }
// handleSignUp = () => {
//     firebase
//     .auth()
//     .createUserWithEmailAndPassword(this.state.email, this.state.password)
//    //.then(() => this.props.navigation.navigate('Main'))
//     .catch(error => this.setState({ errorMessage: error.message }))
//   console.log('handleSignUp')
// }

  render() {

    return ( 
      <Provider store={store}>
      <MainSwitchNavigator />
      </Provider>

   
    )}}
     ///<View style={styles.container}>
     
     //// {/* <Text>Sign Up</Text>
      // this.state.errorMessage &&
      //   <Text style={{ color: 'red' }}>
      //     {this.state.errorMessage}
      //   </Text>
      // <TextInput
      //   placeholder="Email"
      //   autoCapitalize="none"
      //   style={styles.textInput}
      //   onChangeText={email => this.setState({ email })}
      //   value={this.state.email}
      // />
      // <TextInput
      //   secureTextEntry
      //   placeholder="Password"
      //   autoCapitalize="none"
      //   style={styles.textInput}
      //   onChangeText={password => this.setState({ password })}
      //   value={this.state.password}
      // />
      // <Button title="Sign Up" onPress={this.handleSignUp} />
      // <Button
      //   title="Already have an account? Login"
      //   onPress={() => this.props.navigation.navigate('Login')}
      // /> 
     {/* <LoginButton

onLoginFinished={(error, result) => {

if (error) {

  console.log("login has error: " + result.error);

} else if (result.isCancelled) {

  console.log("login is cancelled.");

} else {

  AccessToken.getCurrentAccessToken().then(

    (data) => {

      console.log(data);
      LoginManager.logInWithReadPermissions(['public_profile', 'email'])
      .then((result) => {
        if (result.isCancelled) {
          return Promise.reject(new Error('The user cancelled the request'));
        }
        Retrieve the access token
        return AccessToken.getCurrentAccessToken();
      })
      .then((data) => {
        Create a new Firebase credential with the token
        const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);
        Login with the credential
        return firebase.auth().signInWithCredential(credential);
      })
      .then((user) => {
        If you need to do anything with the user, do it here
        The user will be logged in automatically by the
        `onAuthStateChanged` listener we set up in App.js earlier
      })
      .catch((error) => {
        const { code, message } = error;
        For details of error codes, see the docs
        The message contains the default Firebase string
        representation of the error
      });
      

    }

  )

}

}}

onLogoutFinished={() => console.log("logout.")}/> */}

    

{/* <View style={styles.container1}>

<TextInput style={styles.inputBox} 

    underlineColorAndroid='rgba(0,0,0,0)' 

    placeholder="Email"

    placeholderTextColor = "#ffffff"

    selectionColor="#fff"

    keyboardType="email-address"

    onSubmitEditing={()=> this.password.focus()}

    />

<TextInput style={styles.inputBox} 

    underlineColorAndroid='rgba(0,0,0,0)' 

    placeholder="Password"

    secureTextEntry={true}

    placeholderTextColor = "#ffffff"

    ref={(input) => this.password = input}

    />  

 <TouchableOpacity style={styles.button}>

   <Text style={styles.buttonText}>{this.props.type}</Text>

 </TouchableOpacity>     

</View> */}
// </View>
//     );}


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
  },
  container1 : {

    flexGrow: 1,

    justifyContent:'center',

    alignItems: 'center'

  },



  inputBox: {

    width:300,

    backgroundColor:'rgba(255, 255,255,0.2)',

    borderRadius: 25,

    paddingHorizontal:16,

    fontSize:16,

    color:'#ffffff',

    marginVertical: 10

  },

  button: {

    width:300,

    backgroundColor:'#1c313a',

     borderRadius: 25,

      marginVertical: 10,

      paddingVertical: 13

  },

  buttonText: {

    fontSize:16,

    fontWeight:'500',

    color:'#ffffff',

    textAlign:'center'

  }
});
