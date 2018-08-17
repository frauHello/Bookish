const FBSDK = require('react-native-fbsdk');
const {AccessToken, LoginManager} = FBSDK;
import firebase from 'react-native-firebase';
 
   async function facebookLogin() {
   
        // native_only config will fail in the case that the user has
        // not installed in his device the Facebook app. In this case we
        // need to go for webview.
        let result;
        try {
            
          LoginManager.setLoginBehavior('NATIVE_ONLY');
          result = await LoginManager.logInWithReadPermissions(['public_profile', 'email']);
          
         

        } catch (nativeError) {
          try {
            //console.warn(nativeError);
            LoginManager.setLoginBehavior('WEB_ONLY');
            result = await LoginManager.logInWithReadPermissions(['public_profile', 'email']);
          } catch (webError) {
            // show error message to the user if none of the FB screens
            // did not open
          }
        }
        // handle the case that users clicks cancel button in Login view
        if (result.isCancelled) {
         
        } else {
            AccessToken.getCurrentAccessToken()   .then((data) => {
        //Create a new Firebase credential with the token
       const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);
         //Login with the credential
         return firebase.auth().signInWithCredential(credential);
              })
          // Create a graph request asking for user information
          //this.FBGraphRequest('id, email, picture.type(large)', this.FBLoginCallback);
        }
      }
      export default facebookLogin;