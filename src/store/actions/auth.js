
import { uiStartLoading, uiStopLoading } from './index';
import firebase from 'react-native-firebase';
import { navigatorRef } from '../../screen/Auth/Auth';




export const tryAuth = (authData, authMode) => {
 return(dispatch => {

  dispatch(uiStartLoading());
  if (authMode === 'signup'){
    firebase
    .auth()
    .createUserWithEmailAndPassword(authData.email, authData.password)
  .then((user) => {
//console.warn(user);
const userRef=firebase.firestore().collection('users').doc(user.uid);
//console.warn(authData.token,authData.email,user.uid)
 return  userRef.set({
    uid:user.uid,
    email:authData.email,
    token:authData.token,
    phoneNumber:'',
    name:''
    
  })

}).then(() => {
  navigatorRef.navigate('FillProfile');
 
})  
  .catch(err => {
                   // console.log(err);
                    alert("Authentication failed, please try again");
                    dispatch(uiStopLoading());
                })

  }


  if (authMode === 'login'){
    firebase
    .auth()
    .signInWithEmailAndPassword(authData.email, authData.password)
    .then(() => {
    navigatorRef.navigate('MainTabNavigator');
    
})
    .catch(err =>{
      //  console.log(err);
        alert("Authentication failed, please try again");
        dispatch(uiStopLoading());
    } )

  }
  }
 )}

