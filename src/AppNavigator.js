import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native';
import Splash from './normal/Splash';
import Parent from './normal/Parent';
import Profile from './screens/Profile';
import Login from './screens/Login';
import Logout from './screens/Logout';
import ForgotPassword from './screens/ForgotPassword';
import Success from './screens/components/Success';
import Failure from './screens/components/Failure';
import Scanner from './screens/Scanner';
import Home from './screens/Home';
import MainStack from './MainStack';
import AuthStack from './AuthStack';
import { useSelector } from 'react-redux';
const Stack=createStackNavigator();

const AppNavigator = () => {
    const userData = useSelector((state)=> state.auth.userData)

console.log("user data",userData)
  return (
    <NavigationContainer>
        <Stack.Navigator>
            
            {!!userData && userData?.access_token ? MainStack(Stack)
                : AuthStack(Stack)
            }
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AppNavigator