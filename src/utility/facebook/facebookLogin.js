const FBSDK = require('react-native-fbsdk');
const { AccessToken, LoginManager, GraphRequestManager, GraphRequest } = FBSDK;
import firebase from 'react-native-firebase';



async function facebookLogin(saveInRedux) {

  // native_only config will fail in the case that the user has
  // not installed in his device the Facebook app. In this case we
  // need to go for webview.
  let result;
  let user = {
    last_name: "",
    first_name: "",
    name: "",
    picture: null,
    email: ""


  };
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
    ////lezm 7tt chi ennu yredni 3al auth ....
  } else {
    AccessToken.getCurrentAccessToken().then((data) => {
      //Create a new Firebase credential with the token
      const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);

      //Login with the credential
      // return firebase.auth().signInWithCredential(credential);
      firebase.auth().signInWithCredential(credential);
      const responseInfoCallback = (error, res) => {
        if (error) {
         // console.warn(error)
          alert('Error fetching data: ' + error.toString());
        } else {
        //  console.warn(res)
          alert('Success fetching data: ' + res.toString());
          user.email = res.email;
          user.picture = res.picture.data.url;
          user.last_name = res.last_name;
          user.first_name = res.first_name;
          user.name = res.name;

          saveInRedux(user.picture,user.name);
            // console.warn(user.first_name)
            // console.warn(user.name)
            // console.warn(user.email)
            // console.warn(user.picture)
        }
      }

      const infoRequest = new GraphRequest(
        '/me',
        {
          accessToken: data.accessToken,
          parameters: {
            fields: {
              string: 'email,name,first_name,last_name,picture.type(large)',
              redirect:false

            }
          }
        },
        responseInfoCallback
      );

      // Start the graph request.
      new GraphRequestManager().addRequest(infoRequest).start();




    })

  }

}



export default facebookLogin;