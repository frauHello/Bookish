import React, { Component } from "react";
import { SwitchNavigator } from 'react-navigation';
import Loading from '../Loading/Loading';
import Auth from '../Auth/Auth';
import Main from '../Main/Main';


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
    Main
  },

  {initialRouteName: 'Loading'}

   )
   
export default MainSwitchNavigator;