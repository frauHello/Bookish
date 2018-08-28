import {EMAIL_AUTH} from "./actionTypes"


export const emailAuth =(user)=>{
   // console.warn(user.currentUser.email);
return  {
    type: EMAIL_AUTH,
   
    email:user.currentUser.email,
    name: user.currentUser.displayName,
    image:user.currentUser.photoURL
    
    
   // emailVerified = user.emailVerified,


};


}