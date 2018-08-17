import React, { Component } from 'react';
import { View, Image,ActivityIndicator, StyleSheet, ImageBackground, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback } from 'react-native';
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';
import { connect } from 'react-redux';
import CustomButton from "../../components/UI/CustomButton/CustomButton";
import validate from '../../utility/Validation';
import { Provider } from 'react-redux';
import { tryAuth } from "../../store/actions/index";
import configureStore from '../../store/ConfigureStore';
import { resetPassw } from "../../store/actions/index";
const FBSDK = require('react-native-fbsdk');
const {AccessToken,GraphRequest, GraphRequestManager } = FBSDK;
import facebookLogin from '../../utility/facebook/facebookLogin';


export let navigatorRef = null;

const store = configureStore();
class AuthScreen extends Component {

state = {
authMode: "login",
controls: {
    email: {
    value: "",
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
        console.log('MypropIssue', navigatorRef);
    }
    ForgotPasswordHandler = () => {

        const requiredMail = {
            email: this.state.controls.email.value
        };
        this.props.onResetPassw(requiredMail, "login");

    }
    
   
      async FBLoginCallback(error, result) {
        if (error) {
          this.setState({
            showLoadingModal: false,
            //notificationMessage: I18n.t(‘welcome.FACEBOOK_GRAPH_REQUEST_ERROR’)
          });
        } else {
          // Retrieve and save user details in state. In our case with 
          // Redux and custom action saveUser
          this.props.saveUser({
            id: result.id,
            email: result.email,
            image: result.picture.data.url
          });
        }
      }
      async FBGraphRequest(fields, callback) {
        const accessData = await AccessToken.getCurrentAccessToken();

        // Create a graph request asking for user information
        const infoRequest = new GraphRequest('/me', {
          accessToken: accessData.accessToken,
          parameters: {
            fields: {
              string: fields
            }
          }
        }, callback.bind(this));
        // Execute the graph request created above
        new GraphRequestManager().addRequest(infoRequest).start();
      }
    AuthHandler = () => {
        const authData = {

            email: this.state.controls.email.value,
            password: this.state.controls.password.value
        };
        this.props.onTryAuth(authData, this.state.authMode);
        
    }
    



    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {
                authMode: prevState.authMode === 'login' ? 'signup' : 'login'
            };
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
       disabled={!this.state.controls.confirmPassword.valid && this.state.authMode === 'signup' || !this.state.controls.email.valid || !this.state.controls.password.valid}
        >{this.state.authMode === 'login' ? "Log In" : "Sign Up"}
        </CustomButton>);
        if (this.state.authMode === 'signup') {
           
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
        if (this.state.authMode === 'login') {
            SignUpControl=(<CustomButton 
                textcolor="#27636d"
                onPress={this.switchAuthModeHandler}>
                CREATE NEW BOOKISH ACCOUNT 
            </CustomButton>);

            forgotPasswordControl = (
                <View>
                    <CustomButton 
                    textcolor="#27636d"
                    onPress={() => { this.ForgotPasswordHandler() }}>
                    FORGOTTEN PASSWORD?
                    </CustomButton>
                </View>
            );
        };
        if (this.state.authMode === 'login') {

             facebookControl = (  
              <View>
               <CustomButton onPress={()=>facebookLogin()}
               textcolor="#27636d" >
                 CONTINUE WITH FACEBOOK
                 
                 </CustomButton>
           </View> 
           );

        };
        if (this.props.isLoading) { 
            submitButton = <ActivityIndicator /> 
        }
        return (
            <Provider store={store}>
                <View style={styles.MainContainer}>
                
                <Image style={styles.Image} source = {require('../../assets/my_logo_s.png')} />
                  
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
        onResetPassw: (requiredMail, authMode) => dispatch(resetPassw(requiredMail, authMode))
    };
};
const mapStateToProps = state => {
    return {
        isLoading: state.ui.isLoading



    };

};
export default connect(mapStateToProps, mapDispatchToProps)(AuthScreen);


