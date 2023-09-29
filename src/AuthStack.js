import React from 'react';
import Login from './screens/Login';
import ForgotPassword from './screens/ForgotPassword';
import Logout from './screens/Logout';
import Success from './screens/components/Success';
import Failure from './screens/components/Failure';
import Splash from './normal/Splash';
export default function (Stack) {
    return (
        <>
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
        </>
    )
}