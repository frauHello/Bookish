
import facebookLogout from './facebook/facebookLogout';
import { Alert } from 'react-native';
import firebase from 'react-native-firebase';
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
            //console.warn('YES Pressed'),
            firebase.auth().signOut();
            facebookLogout();

          }
        }
      ]
    );
  }
  export default ConfirmSignOut;