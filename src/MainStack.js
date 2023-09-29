import React from 'react';
import Parent from './normal/Parent';
import Home from './screens/Home';
import Profile from './screens/Profile';
import Scanner from './screens/Scanner';
import Logout from './screens/Logout';

export default function (Stack) {
    return (
        <>
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
        </>
    )
}