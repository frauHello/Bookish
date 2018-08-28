import React, {Component} from 'react';
import { Provider } from 'react-redux';
import MainSwitchNavigator from './src/components/Navigator/MainSwitchNavigator';

import configureStore from './src/store/ConfigureStore';
const store = configureStore();

export default class App extends Component {
  




  render() {

    return ( 
      <Provider store={store}>
      <MainSwitchNavigator />
      </Provider>

    )}}
     