import { View, Text } from 'react-native'
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import Home from '../screens/Home';
import CustomeDrawer from './CustomeDrawer';
import Profile from '../screens/Profile';
import Login from '../screens/Login';
const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator drawerContent={props=><CustomeDrawer {...props} />} >
        <Drawer.Screen name='Home' component={Home}
        options={{
          headerShown:false
        }}
        />
        <Drawer.Screen name='Profile' component={Profile}
        options={{
          headerShown:false
        }}
        />
    </Drawer.Navigator>
  )
}

export default DrawerNavigator