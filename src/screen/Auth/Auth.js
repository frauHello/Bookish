import React, { Component } from 'react';
import { View, Image,ActivityIndicator, Button,StyleSheet, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback } from 'react-native';
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';
import { connect,Provider } from 'react-redux';
import CustomButton from "../../components/UI/CustomButton/CustomButton";
import validate from '../../utility/Validation';
import { tryAuth } from "../../store/actions/index";
import {resetPassw } from "../../store/actions/reset";
import facebookLogin from "../../utility/facebook/facebookLogin";
import FacebookButton from "../../components/UI/CustomButton/FacebookButton";
import configureStore from '../../store/ConfigureStore';
import {saveInRedux} from "../../store/actions/index";
import firebase from 'react-native-firebase';


const store = configureStore();

export let navigatorRef = null;

class AuthScreen extends Component {

    constructor(props) {
        super(props);
         this.authMode=this.props.navigation.state.params.authMode;
        this.state.controls.email.value=this.props.navigation.state.params.email;
     
     }
 

state = {
//authMode: "",
token:'',
controls: {
    email: {
    value:this.email ,
    valid: false,
    validationRules: { isEmail: true},
    touched: false
            },
    password: {
    value: "",
    valid: false,
    validationRules: {minLength: 6},
    touched: false
              },
    confirmPassword:{
    value: "",
    valid: false,
    validationRules: {equalTo: 'password' },
    touched: false

                    }  
        } };

    componentDidMount() {
        navigatorRef = this.props.navigation;
        firebase.messaging().getToken()
        .then((token) => {
          //  console.warn('Device FCM Token: ', token);
            this.setState({
                token:token,
            });
      });
       
    }
    ForgotPasswordHandler = () => {

        const requiredMail = {
            email: this.state.controls.email.value
        };
        this.props.resetPassw(requiredMail, "login");

    }
    
    AuthHandler = () => {
        const authData = {

            email: this.state.controls.email.value,
            password: this.state.controls.password.value,
            token:this.state.token,
        };
       // console.warn("authdata.token",authData.token);
        this.props.onTryAuth(authData, this.authMode);
        
    }

    facebookLoginHandler=()=>{
    this.props.onFacebookLogin();


    }
    
 


    switchAuthModeHandler = () => {


    this.authMode= this.authMode === 'login' ? 'signup' : 'login';
    this.forceUpdate();

        
      
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
  }  } };
 });
}

    render() {
        let confirmPasswordControl = null;
        let forgotPasswordControl = null;
        let facebookControl = null;
        let SignUpControl=null;
        let submitButton = (<CustomButton onPress={this.AuthHandler.bind(this)}
        color="#bb5538"
       textcolor="#e7e7d6"
       disabled={!this.state.controls.confirmPassword.valid && this.authMode === 'signup' || !this.state.controls.email.valid || !this.state.controls.password.valid}
        >{this.authMode === 'login' ? "Log In" : "Sign Up"}
        </CustomButton>);
        if (this.authMode === 'signup') {
           
            confirmPasswordControl = (
                <View>
                    <DefaultInput placeholder="Confirm Password"
                        value={this.state.controls.confirmPassword.value}
                        onChangeText={(val) => { this.updateInputState('confirmPassword', val) }}
                        valid={this.state.controls.confirmPassword.valid}
                        touched={this.state.controls.confirmPassword.touched}
                        secureTextEntry
                    />
                </View>
            );
        };
        if (this.authMode === 'login'||this.authMode === 'signup') {
            SignUpControl=(<CustomButton 
                textcolor="#27636d"
               onPress={this.switchAuthModeHandler}>
             SWITCH TO {this.authMode === 'login' ? "SIGN UP":"LOG IN"}
            </CustomButton>);
            }
if (this.authMode === 'login'){
            forgotPasswordControl = (
                <View>
                    <CustomButton 
                    textcolor="#27636d"
                    onPress={() => { this.ForgotPasswordHandler() 
                        }}>
                    FORGOTTEN PASSWORD?
                    </CustomButton>
                    

                </View>
                
            );
        };
        if (this.authMode === 'login'||this.authMode === 'signup') {

             facebookControl = (  
              <View>
               <FacebookButton onPress={()=>facebookLogin(this.props.onFacebookLogin) }
               
                 textcolor="#27636d" >
                 CONTINUE WITH FACEBOOK
                 
                 </FacebookButton>
           </View> 
        
           );

        };
        if (this.props.isLoading) { 
            submitButton = <ActivityIndicator /> 
        }
        return (
         
      <Provider store={store}>
                <View style={styles.MainContainer}>
                
                <Image style={styles.Image} source = {require('../../assets/images/my_logo_s.png')} />
                  
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={styles.textInput}>
                       
                  
                            <DefaultInput placeholder="E-mail Address"
                                value={this.state.controls.email.value}
                                onChangeText={(val) => { this.updateInputState('email', val) }}
                                valid={this.state.controls.email.valid}
                                touched={this.state.controls.email.touched}
                                autoCapitilize='none'
                                autoCorrect={false}
                                keyboardType="email-address"
                            />
                            <DefaultInput placeholder="Password"
                                value={this.state.controls.password.value}
                                onChangeText={(val) => { this.updateInputState('password', val) }}
                                valid={this.state.controls.password.valid}
                                touched={this.state.controls.password.touched}
                                secureTextEntry
                            />
                           
                                {confirmPasswordControl}
                                {submitButton}
                                {forgotPasswordControl}
                                {facebookControl}
                                {SignUpControl}

                                 </View> 
                        
                    </TouchableWithoutFeedback >

                    
                     

                </View>
                </Provider>

        );
    }
}


const styles = StyleSheet.create({
    MainContainer: {
        alignSelf: "stretch",
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        backgroundColor: "#e7e7d6"


    },


    container: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1,


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
    Image:{
    marginTop:20,
  },
  facebook:{
    width: "80%"

}

});



const mapDispatchToProps = dispatch => {
    return {
        onTryAuth: (authData, authMode) => dispatch(tryAuth(authData, authMode)),
        resetPassw:(requiredMail,authMode)=>dispatch(resetPassw(requiredMail,authMode)),
        onFacebookLogin:(picture,name)=>dispatch(saveInRedux(picture,name))
        
    };
};
const mapStateToProps = state => {
    return {
        isLoading: state.ui.isLoading



    };

};
export default connect(mapStateToProps, mapDispatchToProps)(AuthScreen);


