import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import AppNavigator from './src/AppNavigator'
import FlashMessage from "react-native-flash-message";
import { Provider } from 'react-redux';
import store from './src/redux/store';
import { getUserData } from './src/utils/utils';
import { saveUserData } from './src/redux/actions/auth';


const App = () => {
  
  useEffect(()=>{
    (async()=>{
      const userData = await getUserData()
      console.log("user data App.js",userData)
      if(!!userData){
        saveUserData(userData)
      }  
    })();
  },[])

  return (
    <Provider store={store}>
      <AppNavigator/>
      <FlashMessage position='top' />
    </Provider>
  )
}

export default App