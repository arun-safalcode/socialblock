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
import Permissions from './screens/Permissions';
const Stack=createStackNavigator();

const AppNavigator = () => {
  const userData = useSelector((state)=> state.auth.userData)
  return (
    <NavigationContainer>
        <Stack.Navigator>
        <Stack.Screen name='Splash' component={Splash}
                options={{
                    headerShown: false
                }} />
            <Stack.Screen name='Login' component={Login}
                options={{
                    headerShown: false
                }} />
            <Stack.Screen name='Forgot Password' component={ForgotPassword}
                options={{
                    headerShown: false
                }} />
            <Stack.Screen name='Success' component={Success}
                options={{
                    headerShown: false
                }} />
            <Stack.Screen name='Failure' component={Failure}
                options={{
                    headerShown: false
                }} />
        <Stack.Screen name='Parent' component={Parent}
                options={{
                    headerShown: false
                }} />
            <Stack.Screen name='Home' component={Home}
                options={{
                    headerShown: false
                }} />
            <Stack.Screen name='Profile' component={Profile}
                options={{
                    headerShown: false
                }} />

            <Stack.Screen name='Scanner' component={Scanner}
                options={{
                    headerShown: false
                }} />
            <Stack.Screen name='Logout' component={Logout}
                options={{
                    headerShown: false
                }} />
            <Stack.Screen name='Permissions' component={Permissions}
                options={{
                    headerShown: false
                }} />
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AppNavigator