import React, { Component } from 'react';
import { View, ActivityIndicator, StyleSheet, ImageBackground, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback } from 'react-native';
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';
import { connect } from 'react-redux';
import backgroundImage from "../../assets/backg.jpg";
import CustomButton from "../../components/UI/CustomButton/CustomButton";
import validate from '../../utility/Validation';
import { Provider } from 'react-redux';
import { tryAuth } from "../../store/actions/index";
import configureStore from '../../store/ConfigureStore';
import { resetPassw } from "../../store/actions/index";
const FBSDK = require('react-native-fbsdk');
const {LoginButton,AccessToken,LoginManager} = FBSDK;
import firebase from 'react-native-firebase';

export let navigatorRef=null;
const store = configureStore();
class AuthScreen extends Component {


    componentDidMount() {
        navigatorRef = this.props.navigation;
        console.log('MypropIssue',navigatorRef);
      }
      ForgotPasswordHandler=()=>{

        const requiredMail = {
        email: this.state.controls.email.value
         };
         this.props.onResetPassw(requiredMail,"login");
        
            }
    AuthHandler = () => {
        const authData = {

            email: this.state.controls.email.value,
            password: this.state.controls.password.value
        };
        this.props.onTryAuth(authData,this.state.authMode);
        //this.props.navigation.navigate('Second');
    }
    state = {
        authMode: "login",
        controls: {
            email: {
                value: "",
                valid: false,
                validationRules: {

                    isEmail: true
                },
                touched: false


            },
            password: {
                value: "",
                valid: false,
                validationRules: {

                    minLength: 6
                },
                touched: false
            },
            confirmPassword: {
                value: "",
                valid: false,
                validationRules: {

                    equalTo: 'password'
                },
                touched: false

            }
        }



    };



    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {
                authMode: prevState.authMode === 'login' ? 'signup' : 'login'};
        });
};


    updateInputState = (key, value) => {
        let connectedValue = {};

        if (this.state.controls[key].validationRules.equalTo) {
            const equalControl = this.state.controls[key].validationRules.equalTo;
            const equalValue = this.state.controls[equalControl].value;
            connectedValue = {

                ...connectedValue,
                equalTo: equalValue


            };



        }
        if (key === 'password') {

            connectedValue = {

                ...connectedValue,
                equalTo: value


            }
        }

        this.setState(prevState => {

            return {

                controls: {
                    ...prevState.controls,
                    confirmPassword: {
                        ...prevState.controls.confirmPassword,
                        valid: key === 'password' ? validate(prevState.controls.confirmPassword.value, prevState.controls.confirmPassword.validationRules, connectedValue) : prevState.controls.confirmPassword.valid


                    },
                    [key]: {
                        ...prevState.controls[key],
                        value: value,
                        valid: validate(value, prevState.controls[key].validationRules, connectedValue),
                        touched: true


                    }



                }

            };

        });





    }

    render() {
        let confirmPasswordControl = null;
         let forgotPasswordControl =null;
         let facebookControl =null;

        let submitButton = (<CustomButton onPress={this.AuthHandler.bind(this)}
            color="#29aaf4"
            disabled={!this.state.controls.confirmPassword.valid && this.state.authMode === 'signup' || !this.state.controls.email.valid || !this.state.controls.password.valid}
        >Submit</CustomButton>);
        if (this.state.authMode === 'signup') {

            confirmPasswordControl = (
                <View>
                    <DefaultInput placeholder="Confirm Password" style={styles.input}
                        value={this.state.controls.confirmPassword.value}
                        onChangeText={(val) => { this.updateInputState('confirmPassword', val) }}
                        valid={this.state.controls.confirmPassword.valid}
                        touched={this.state.controls.confirmPassword.touched}
                        secureTextEntry
                    />
                </View>
            );
        };
        if (this.state.authMode === 'login') {

            forgotPasswordControl = (
                <View>
                   <CustomButton color="#29aaf4" onPress={()=>{this.ForgotPasswordHandler()}}>Did you forgot your password
                        </CustomButton>  
                </View>
            );
        };
        if (this.state.authMode === 'login') {

            facebookControl = (
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
                      LoginManager.logInWithReadPermissions(['public_profile', 'email'])
                      .then((result) => {
                        if (result.isCancelled) {
                          return Promise.reject(new Error('The user cancelled the request'));
                        }
                        //Retrieve the access token
                        return AccessToken.getCurrentAccessToken();
                      })
                      .then((data) => {
                        //Create a new Firebase credential with the token
                        const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);
                        //Login with the credential
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
                
                  )
                
                }
                
                }}
                
                onLogoutFinished={() => console.log("logout.")}/>
            );
        };
        if (this.props.isLoading) { submitButton = <ActivityIndicator /> }
        return (
            <Provider store={store}>
                <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
                    <KeyboardAvoidingView style={styles.container} behavior="padding">

                        
                        <CustomButton color="#29aaf4" onPress={this.switchAuthModeHandler}>Switch to{this.state.authMode === 'login' ? " Sign Up" : " Log In"}
                        </CustomButton>
                        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                            <View style={styles.textInput} >
                                <DefaultInput placeholder="Your E-mail Address"
                                    style={styles.input} value={this.state.controls.email.value}
                                    onChangeText={(val) => { this.updateInputState('email', val) }}
                                    valid={this.state.controls.email.valid}
                                    touched={this.state.controls.email.touched}
                                    autoCapitilize='none'
                                    autoCorrect={false}
                                    keyboardType="email-address"

                                />
                                <DefaultInput placeholder="Password" style={styles.input}
                                    value={this.state.controls.password.value}
                                    onChangeText={(val) => { this.updateInputState('password', val) }}
                                    valid={this.state.controls.password.valid}
                                    touched={this.state.controls.password.touched}
                                    secureTextEntry
                                />
                                <View>
                                    {confirmPasswordControl}
                                    {forgotPasswordControl}
                                    {facebookControl}
                                </View>
                               
                               
                            </View>
                        </TouchableWithoutFeedback >

                        {submitButton}
                    </KeyboardAvoidingView>
                </ImageBackground>
            </Provider>

        );
    }
}


const styles = StyleSheet.create({

    container: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1
    },
    input: {
        backgroundColor: "#eee",
        borderColor: "#bbb"
    },
    textInput: {
        width: "80%"
    },
    textHeading: {
        fontWeight: "bold",
        fontSize: 28

    },
    backgroundImage: {
        width: "100%",
        flex: 1

    },




});



const mapDispatchToProps = dispatch => {
    return {
        onTryAuth: (authData,authMode)=> dispatch(tryAuth(authData,authMode)),
        onResetPassw:(requiredMail,authMode)=>dispatch(resetPassw(requiredMail,authMode))
    };
};
const mapStateToProps = state => {
    return {
        isLoading: state.ui.isLoading



    };

};
export default connect(mapStateToProps, mapDispatchToProps)(AuthScreen);


