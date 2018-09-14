
import facebookLogout from './facebook/facebookLogout';
import { Alert } from 'react-native';
import firebase from 'react-native-firebase';
import { uiStopLoading } from '../store/actions/index';
const ConfirmSignOut =()=> {
 
   
    Alert.alert(
      'Sign Out',
      'Are you sure that you want to sign out',
      [
        {
          text: 'NO',
          //onPress: () => console.warn('NO Pressed'),
          style: 'cancel'
        },
        {
          text: 'YES', onPress: () => {
           // dispatch(uiStopLoading()); 
            firebase.auth().signOut();
            facebookLogout();

          }
        }
      ]
    );


  
  }
  export default ConfirmSignOut;