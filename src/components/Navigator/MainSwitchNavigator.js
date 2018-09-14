import React, { Component } from "react";
import { SwitchNavigator } from 'react-navigation';
import Loading from '../../screen/Loading/Loading';
import Auth from '../../screen/Auth/Auth';
import MainTabNavigator from './MainTabNavigator';
import EditProfile from '../../screen/Profile/EditProfile';
import twoFactor from '../../screen/Auth/twoFactor';

class MainSwitchNavigator extends Component 
{
render() {
    return (<Navigator />)
           }
}


const Navigator = SwitchNavigator(
  {
    Loading,
    twoFactor,
    Auth,
    EditProfile,
    MainTabNavigator
    

  },

  {initialRouteName: 'Loading'}

   )
   
export default MainSwitchNavigator;