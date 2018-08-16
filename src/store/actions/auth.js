
import { uiStartLoading, uiStopLoading } from './index';
import firebase from 'react-native-firebase';
import { navigatorRef } from '../../screen/Auth/Auth';
export const tryAuth = (authData, authMode) => {
  return dispatch => {

  dispatch(uiStartLoading());
  if (authMode === 'signup'){
  firebase
  .auth()
  .createUserWithEmailAndPassword(authData.email, authData.password)
  .then(() => navigatorRef.navigate('Main'))
  .catch(err => {
                    console.log(err);
                    alert("Authentication failed, please try again");
                    dispatch(uiStopLoading());
                })
  }
  if (authMode === 'login'){
    firebase
    .auth()
    .signInWithEmailAndPassword(authData.email, authData.password)
    .then(() => navigatorRef.navigate('Main'))
    .catch(err =>{
        console.log(err);
        alert("Authentication failed, please try again");
        dispatch(uiStopLoading());
    } )

  }
  }
}

