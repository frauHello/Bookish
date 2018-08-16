import firebase from 'react-native-firebase';
import {Alert} from 'react-native';


export const resetPassw = (requiredMail, authMode) => {
    return () => {

if (authMode === 'login'){

   
    if ( requiredMail.email){
        var actionCodeSettings =null;
          
            firebase.auth().sendPasswordResetEmail(
                requiredMail.email, actionCodeSettings)
                .then(function() {
                    Alert.alert(
                    'Reset your Password',
                    'check your email inbox for resetting password ',
                    [
                      {text: 'Ok', 
                     // onPress: () => console.warn('NO Pressed'),
                       style: 'cancel'}
                    ]
                  );
                  
                })
                .catch(function(error) {
                    console.log(error);
                    alert(error);
                });}
                else {
        
                    alert('Please fill the email field and try again');
                }

  }
  }
}