import React, { Component } from "react";
import Add from '../../screen/Add/Add';

import {createBottomTabNavigator} from 'react-navigation';
import ProfileStackNavigator from './ProfileStackNavigator';
import ExploreBooksNavigator from './ExploreBooksNavigator';
import BookmarkNavigator from './BookmarkNavigator';
import { Icon } from 'react-native-elements'


export default class MainTabNavigator extends Component {
  render() {
    return(
    
    
    <Tabs/> 
  
 
  
  
  );
  }
}
const Tabs =  createBottomTabNavigator({
  Explore: {

    screen:ExploreBooksNavigator,
    navigationOptions: {
     
      tabBarIcon: ({ tintColor }) => <Icon name="search" type="font-awesome" size={28} color={tintColor} />
    }
    

},


 MySpace: {

      screen:BookmarkNavigator,
      navigationOptions: {
       
        tabBarIcon: ({ tintColor }) => <Icon name="bookmark" type="octicon" size={28} color={tintColor} />
      }
  },

 
  Add : {

      screen: Add,
      navigationOptions: {
       
        tabBarIcon: ({ tintColor }) => <Icon name="library-add" size={28} color={tintColor} />
      }


  },

  

Profile: {

      screen: ProfileStackNavigator,
      navigationOptions: {
       
        tabBarIcon: ({ tintColor }) => <Icon name="user-circle-o" type="font-awesome" size={28} color={tintColor} />
      },

  },

},
{
    initialRouteName: 'Explore',
    
    tabBarOptions: {
      showLabel: false,
      activeTintColor:'#bb5538' ,
      inactiveTintColor: '#27636d',
      style: {
        backgroundColor: '#e7e7d6' // TabBar background
    }
    }
    
  }
);




