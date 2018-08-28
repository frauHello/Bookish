import React, { Component } from "react";
import { SwitchNavigator } from 'react-navigation';
import Loading from '../../screen/Loading/Loading';
import Auth from '../../screen/Auth/Auth';
import MainTabNavigator from './MainTabNavigator';


class MainSwitchNavigator extends Component 
{
render() {
    return (<Navigator />)
           }
}


const Navigator = SwitchNavigator(
  {
    Loading,
    Auth,
    MainTabNavigator
  },

  {initialRouteName: 'Loading'}

   )
   
export default MainSwitchNavigator;