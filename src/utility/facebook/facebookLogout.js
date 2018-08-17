const FBSDK = require('react-native-fbsdk');
const { LoginManager} = FBSDK;

const facebookLogout=()=>{
    LoginManager.logOut();
    //alert("Facebook log out success");
    }

    export default facebookLogout;