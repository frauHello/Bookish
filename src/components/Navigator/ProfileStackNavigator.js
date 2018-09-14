 
 import React, { Component } from "react";
 import { createStackNavigator } from 'react-navigation';
 import Profile from "../../screen/Profile/Profile";
 import EditProfile from "../../screen/Profile/EditProfile";
 import Reports from "../../screen/Profile/Reports";


 
 
  class  ProfileStackNavigator extends Component {
 
 
    
     
     render() {
         return( <Navigator />
     )
     }
 }
 
 
 
 
 
 
 
 
 
 
 
 
 const Navigator =  createStackNavigator(
  
        {
  
            Profile: {
  
                screen:Profile,
  
               
  
            },
  
            EditProfile: {
  
                screen:EditProfile,
  
              
  
            },
            Reports: {
  
                screen:Reports,
  
              
  
            },
  
  
        },
     
  
        {  headerMode: "none",
  
            mode: "modal"
  
        },
        {
            initialRouteName: 'Profile',
          }
   
    );
  
  export default ProfileStackNavigator;