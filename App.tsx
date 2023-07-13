/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import {registerRootComponent} from 'expo';
import React from 'react';

import Login from './src/screens/Login';
import { SafeAreaView } from 'react-native';
import Signup from './src/screens/Singup';
import Welcome from './src/screens/Welcome';


//React navigation stack
import RootStack from './src/navigators/RootStack';
function App(): JSX.Element {

  return (
    
      <RootStack />
   
    
  );
}


export default registerRootComponent(App);
