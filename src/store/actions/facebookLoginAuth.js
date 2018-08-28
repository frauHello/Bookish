
import {FACEBOOK_AUTH} from "./actionTypes";

import facebookLogin from "../../utility/facebook/facebookLogin";
const facebookLoginAuth = () => ({
  type: FACEBOOK_AUTH,
  payload: facebookLogin()

})
export default facebookLoginAuth;