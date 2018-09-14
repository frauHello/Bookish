import React from 'react';
import { View, Image, StyleSheet, TouchableWithoutFeedback, Keyboard,KeyboardAvoidingView } from 'react-native';
import _ from 'lodash';
import CustomButton from "../../components/UI/CustomButton/CustomButton";
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';
import firebase from 'react-native-firebase';
import facebookLogin from "../../utility/facebook/facebookLogin";
import {connect} from 'react-redux';
import {saveInRedux} from "../../store/actions/index";
class twoFactor extends React.Component {
   

      Authfactor=()=>{
       firebase.auth().fetchProvidersForEmail(this.state.email.value).then((auth)=>{
        let facebook= _.find(auth, (element) => {
           return element=="facebook.com"
            })
            let email= _.find(auth, (element) => {
                return element=="password"
                 })
                 if (email&&!(facebook))  {
                  this.props.navigation.navigate('Auth',{authMode:'login',email:this.state.email.value})
                 }     
                
                 if (email&&facebook)  {
               this.props.navigation.navigate('Auth',{authMode:'login',email:this.state.email.value})
                 }   
                 if (!(email)&&facebook)  {
                   // console.warn('facebookonly');
                facebookLogin(this.props.onFacebookLogin)
                 }  
               else {this.props.navigation.navigate('Auth',{authMode:'signup',email:this.state.email.value})}

           }) 
      

      }
    updateInputState = (value) => {
        isValid = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(value);
        this.setState({
            email:{
            value: value,
            valid: isValid,
            touched: true
           }   })

    }


    state = {
       email: {
            value: "",
            valid: false,
            validationRules: { isEmail: true },
            touched: false
        }
    };

    render() {
        return (
            <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
                
            <View style={styles.container}>
           
                <Image style={styles.Image} source={require('../../assets/images/my_logo_b.png')} />
               
                    <KeyboardAvoidingView style={styles.textInput} behavior="padding">
                        <DefaultInput placeholder="E-mail Address"
                            value={this.state.email.value}
                            onChangeText={(val) => { this.updateInputState(val) }}
                            valid={this.state.email.valid}
                            touched={this.state.email.touched}
                            autoCapitilize='none'
                            autoCorrect={false}
                            keyboardType="email-address"
                        />
                        <CustomButton onPress={this.Authfactor.bind(this)}
                            color="#bb5538"
                            textcolor="#e7e7d6"
                        
                            disabled={!this.state.email.valid}>Continue
                          </CustomButton>
                    </KeyboardAvoidingView>
               
            </View>
            </TouchableWithoutFeedback>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: "#e7e7d6",
        alignSelf: "stretch"
    },
    Image: {

     //   marginTop: 35,
    },
    textInput: {
        width: "80%",
       

    }
})
const mapDispatchToProps = dispatch => {
    return {
       onFacebookLogin:(picture,name)=>dispatch(saveInRedux(picture,name))
        
    };
};
const mapStateToProps = state => {
    return {
       


    };

};
export default connect(mapStateToProps, mapDispatchToProps)(twoFactor);