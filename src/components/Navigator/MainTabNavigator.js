import React, { Component } from "react";
import Explore from '../../screen/Explore/Explore';
import Profile from '../../screen/Profile/Profile';
import Add from '../../screen/Add/Add';
import MySpace from '../../screen/MySpace/MySpace';
import {  createBottomTabNavigator} from 'react-navigation';
import ProfileStackNavigator from './ProfileStackNavigator';

export default class MainTabNavigator extends Component {
  render() {
    return(
    
    
    <Tabs/> 
  
 
  
  
  );
  }
}







 const Tabs =  createBottomTabNavigator({

 MySpace: {

      screen: MySpace,

      navigationOptions: {

          tabBarLabel: 'My space',

         // tabBarIcon: ({tintColor}) => <Icon name="open-book" type="entypo" size={28} color={tintColor}/>

      },

  },

  Explore: {

      screen: Explore,

      navigationOptions: {

          tabBarLabel: 'Explore',

         // tabBarIcon: ({tintColor}) => <Icon name="ios-map" type="ionicon" size={28} color={tintColor}/>

      },

  },

  Add : {

      screen: Add,

      navigationOptions: {

          tabBarLabel: 'Add',

         // tabBarIcon: ({tintColor}) => <Icon name="ios-add-circle-outline" type="ionicon" size={28}

                          //                   color={tintColor}/>

      },

  },

  

Profile: {

      screen: ProfileStackNavigator,

      navigationOptions: {

          tabBarLabel: 'Profile',

       //   tabBarIcon: ({tintColor}) => <Icon name="ios-person" type="ionicon" size={28} color={tintColor}/>

      },

  },

});


// export const BookcaseStack = () => {

//   return  createStackNavigator({

//   MySpace: {

//       screen: MySpace,

//       navigationOptions: ({navigation}) => ({

//           header: null,

//       }),

//   },

//   EditBook: {

//       screen: EditBook,

//       navigationOptions: ({navigation}) => ({

//           header: null,

//           tabBarVisible: false,

//           gesturesEnabled: false

//       }),

//   },

// });};



